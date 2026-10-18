import { useEffect, useRef, useState } from "react";
import { Captions, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { CHANNEL_URL, chapters } from "@/film/chapters";
import { previewPathPrefix } from "@/lib/preview-path-prefix";

type Phase = "idle" | "playing" | "paused" | "ended";
type Cue = { start: number; end: number; text: string };

function formatClock(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function cuesFromText(text: string, duration: number): Cue[] {
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length === 0 || duration <= 0) return [];
  const slice = duration / parts.length;
  return parts.map((part, i) => ({ start: i * slice, end: (i + 1) * slice, text: part }));
}

function usePrefix() {
  const [prefix, setPrefix] = useState("");
  useEffect(() => {
    setPrefix(previewPathPrefix(window.location.hostname, window.location.pathname) ?? "");
  }, []);
  return prefix;
}

export function Documentary() {
  const prefix = usePrefix();
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [localTime, setLocalTime] = useState(0);
  const [durations, setDurations] = useState<number[]>(() => chapters.map(() => 0));
  const [volume, setVolume] = useState(1);
  const [captions, setCaptions] = useState(true);
  const [cues, setCues] = useState<Cue[]>([]);
  const [clipLength, setClipLength] = useState(8);
  const [audioReady, setAudioReady] = useState(false);
  const bed = useRef<AudioContext | null>(null);
  const bedGain = useRef<GainNode | null>(null);

  const chapter = chapters[index]!;
  indexRef.current = index;

  const starts = durations.map((_, i) => durations.slice(0, i).reduce((sum, n) => sum + n, 0));
  const total = durations.reduce((sum, n) => sum + n, 0);
  const globalTime = (starts[index] ?? 0) + localTime;
  const showMotion = Boolean(chapter.clip) && localTime < Math.max(0, clipLength - 0.12);
  const cue = cues.find((item) => localTime >= item.start && localTime < item.end);

  function src(path: string) {
    return `${prefix}${path}`;
  }

  function rememberDuration(i: number, value: number) {
    if (!Number.isFinite(value) || value <= 0) return;
    setDurations((prev) => {
      if (Math.abs(prev[i]! - value) < 0.05) return prev;
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function ensureBed() {
    if (bed.current) return;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 220;
    const low = ctx.createOscillator();
    low.type = "sine";
    low.frequency.value = 55;
    const fifth = ctx.createOscillator();
    fifth.type = "triangle";
    fifth.frequency.value = 82.4;
    low.connect(filter);
    fifth.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    low.start();
    fifth.start();
    bed.current = ctx;
    bedGain.current = gain;
  }

  function setBed(active: boolean) {
    const gain = bedGain.current;
    const ctx = bed.current;
    if (!gain || !ctx) return;
    const target = active ? 0.018 * volume : 0;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.linearRampToValueAtTime(target, ctx.currentTime + 0.4);
  }

  function playAt(nextIndex: number, offset = 0) {
    ensureBed();
    const next = Math.max(0, Math.min(chapters.length - 1, nextIndex));
    audioRefs.current.forEach((audio, i) => {
      if (!audio || i === next) return;
      audio.pause();
    });
    const audio = audioRefs.current[next];
    setIndex(next);
    setLocalTime(offset);
    setClipLength(8);
    if (!audio) return;
    audio.volume = volume;
    const start = () => {
      const dur = audio.duration;
      const max = Number.isFinite(dur) ? Math.max(0, dur - 0.05) : offset;
      audio.currentTime = Math.max(0, Math.min(offset, max));
      void audio.play().then(() => {
        setAudioReady(true);
        setPhase("playing");
        void bed.current?.resume();
        setBed(true);
      }).catch(() => {
        setPhase("paused");
      });
    };
    if (audio.readyState >= 1) start();
    else {
      audio.addEventListener("loadedmetadata", start, { once: true });
      audio.load();
    }
  }

  function toggle() {
    if (phase === "ended") {
      playAt(0, 0);
      return;
    }
    if (phase === "playing") {
      audioRefs.current[index]?.pause();
      setPhase("paused");
      setBed(false);
      return;
    }
    playAt(index, phase === "idle" ? 0 : localTime);
  }

  function seekGlobal(target: number) {
    const cap = total > 0 ? total : target;
    const goal = Math.max(0, Math.min(target, cap));
    let acc = 0;
    for (let i = 0; i < chapters.length; i++) {
      const span = durations[i] || 0;
      const last = i === chapters.length - 1;
      if (last || goal < acc + span) {
        playAt(i, Math.max(0, goal - acc));
        return;
      }
      acc += span;
    }
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (phase === "playing" && showMotion) void video.play().catch(() => undefined);
    else video.pause();
  }, [phase, showMotion, index]);

  useEffect(() => {
    audioRefs.current.forEach((audio) => {
      if (audio) audio.volume = volume;
    });
    if (phase === "playing") setBed(true);
  }, [volume, phase]);

  useEffect(() => {
    const chapterDuration = durations[index] || 0;
    setCues(cuesFromText(chapter.narration, chapterDuration || 80));
  }, [index, chapter.narration, durations[index]]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      if (event.code === "Space") {
        event.preventDefault();
        toggle();
      } else if (event.code === "ArrowRight") {
        event.preventDefault();
        seekGlobal(globalTime + 5);
      } else if (event.code === "ArrowLeft") {
        event.preventDefault();
        seekGlobal(Math.max(0, globalTime - 5));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const lowerThird = phase !== "idle" && phase !== "ended" && localTime < 5.2;
  const runtime = total > 0 ? formatClock(total) : "15:00";

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl overflow-x-hidden px-4 py-5 sm:px-6 sm:py-8">
      <header className="mb-4 flex min-w-0 items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-widest text-amber uppercase">InodeAi presenta</p>
          <h1 className="font-display text-3xl leading-none text-paper italic sm:text-6xl">La Máquina Roja</h1>
        </div>
        <p className="hidden text-right text-sm text-ash sm:block">
          Historia de YouTube
          <span className="mt-1 block text-paper">{runtime}</span>
        </p>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <section>
          <div className="stage-shadow overflow-hidden rounded-xl bg-ink ring-1 ring-paper/10">
            <div
              className="relative aspect-video bg-ink"
              onClick={toggle}
              role="presentation"
            >
              <img
                src={src(chapter.still)}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${
                  index % 2 === 0 ? "film-drift" : "film-drift-alt"
                } ${phase === "playing" ? "" : "film-paused"}`}
              />
              {chapter.clip && showMotion ? (
                <video
                  key={chapter.id}
                  ref={videoRef}
                  src={src(chapter.clip)}
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => setClipLength(event.currentTarget.duration || 6)}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : null}
              <div className="stage-vignette pointer-events-none absolute inset-0" />

              {phase === "idle" ? (
                <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-ink via-ink/25 to-transparent p-4 sm:p-8">
                  <p className="text-xs tracking-widest text-amber uppercase">Documental · 16:9</p>
                  <p className="font-display mt-2 max-w-xl text-3xl leading-tight text-paper italic sm:text-5xl">
                    Cómo diecinueve segundos se volvieron el archivo del mundo.
                  </p>
                </div>
              ) : null}

              {phase === "ended" ? (
                <div
                  className="absolute inset-0 flex flex-col items-start justify-end bg-ink/75 p-4 sm:p-8"
                  onClick={(event) => event.stopPropagation()}
                >
                  <p className="text-xs tracking-widest text-amber uppercase">Fin de la pieza</p>
                  <p className="font-display mt-2 max-w-lg text-3xl leading-tight text-paper italic sm:text-5xl">
                    Si te quedaste, quédate cerca.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={CHANNEL_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-sm font-semibold text-paper"
                    >
                      Seguir a InodeAi
                    </a>
                    <button
                      type="button"
                      onClick={() => playAt(0, 0)}
                      className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm text-paper ring-1 ring-paper/25"
                    >
                      <RotateCcw className="size-4" />
                      Ver otra vez
                    </button>
                  </div>
                </div>
              ) : null}

              {lowerThird ? (
                <div className="pointer-events-none absolute bottom-16 left-4 max-w-[80%] sm:bottom-20">
                  <p className="text-xs tracking-widest text-amber uppercase">{chapter.kicker}</p>
                  <p className="font-display text-2xl text-paper italic sm:text-4xl">{chapter.title}</p>
                </div>
              ) : null}

              {captions && cue && phase !== "idle" && phase !== "ended" ? (
                <p className="pointer-events-none absolute right-3 bottom-14 left-3 text-center text-sm leading-snug text-paper sm:bottom-16 sm:text-base">
                  <span className="rounded-md bg-ink/80 px-2 py-1">{cue.text}</span>
                </p>
              ) : null}

              {phase !== "playing" && phase !== "ended" ? (
                <button
                  type="button"
                  aria-label={phase === "idle" ? "Reproducir documental" : "Reanudar"}
                  onClick={(event) => {
                    event.stopPropagation();
                    toggle();
                  }}
                  className="absolute top-[42%] left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal text-paper shadow-lg"
                >
                  <Play className="size-7 translate-x-0.5" fill="currentColor" />
                </button>
              ) : null}
            </div>

            <div
              className="bg-ink px-3 pt-3 pb-3 sm:px-4"
              onClick={(event) => event.stopPropagation()}
            >
              <label className="block py-2">
                <span className="sr-only">Posición del documental</span>
                <input
                  className="scrub"
                  type="range"
                  min={0}
                  max={Math.max(total, 1)}
                  step={0.1}
                  value={Math.min(globalTime, Math.max(total, 1))}
                  onChange={(event) => seekGlobal(Number(event.target.value))}
                />
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={phase === "playing" ? "Pausar" : "Reproducir"}
                  className="grid size-11 place-items-center rounded-full text-paper"
                >
                  {phase === "playing" ? <Pause className="size-5" /> : <Play className="size-5" fill="currentColor" />}
                </button>
                <p className="min-w-24 text-xs tabular-nums text-ash">
                  {formatClock(globalTime)} / {runtime}
                </p>
                <button
                  type="button"
                  aria-label={captions ? "Ocultar subtítulos" : "Mostrar subtítulos"}
                  aria-pressed={captions}
                  onClick={() => setCaptions((value) => !value)}
                  className={`grid size-11 place-items-center rounded-full ${captions ? "text-paper" : "text-ash"}`}
                >
                  <Captions className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label={volume === 0 ? "Activar sonido" : "Silenciar"}
                  onClick={() => setVolume((value) => (value === 0 ? 1 : 0))}
                  className="grid size-11 place-items-center rounded-full text-paper"
                >
                  {volume === 0 ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                </button>
                <input
                  className="scrub hidden w-24 sm:block"
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  aria-label="Volumen"
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
                {!audioReady && phase !== "idle" ? (
                  <p className="ml-auto text-xs text-amber">Cargando voz…</p>
                ) : (
                  <p className="ml-auto hidden text-xs text-ash sm:block">Espacio para pausar</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-signal text-paper" aria-hidden>
              <Play className="size-5 translate-x-0.5" fill="currentColor" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-paper">InodeAi</p>
              <p className="truncate text-sm text-ash">El mejor contenido de YouTube, contado con calma</p>
            </div>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 shrink-0 items-center rounded-full bg-signal px-4 text-sm font-semibold text-paper"
            >
              Seguir
            </a>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ash">
            De los elefantes de San Diego a la catedral del algoritmo. Doce capítulos, formato horizontal,
            para ver de un tirón. Al final, la señal sigue en el canal.
          </p>
        </section>

        <aside className="min-w-0 max-w-full">
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-sm font-medium tracking-widest text-paper uppercase">Capítulos</h2>
            <p className="text-xs text-ash">{chapter.year}</p>
          </div>
          <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-1 lg:block lg:max-h-screen lg:overflow-y-auto lg:pr-1">
            {chapters.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => playAt(i, 0)}
                  className={`mb-2 flex w-56 shrink-0 items-center gap-3 rounded-lg p-2 text-left lg:w-full ${
                    active ? "bg-paper/10 ring-1 ring-signal" : "ring-1 ring-paper/10"
                  }`}
                >
                  <img src={src(item.still)} alt="" className="h-12 w-20 shrink-0 rounded-md object-cover" />
                  <span className="min-w-0">
                    <span className="block text-xs tracking-wider text-amber uppercase">{item.year}</span>
                    <span className="block truncate text-sm text-paper">{item.title}</span>
                    <span className="block text-xs text-ash tabular-nums">
                      {durations[i] ? formatClock(starts[i] ?? 0) : item.kicker}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      {chapters.map((item, i) => (
        <audio
          key={item.id}
          ref={(node) => {
            audioRefs.current[i] = node;
          }}
          src={src(item.audio)}
          preload={i === 0 ? "auto" : "metadata"}
          onLoadedMetadata={(event) => rememberDuration(i, event.currentTarget.duration)}
          onTimeUpdate={(event) => {
            if (i !== indexRef.current) return;
            setLocalTime(event.currentTarget.currentTime);
          }}
          onEnded={() => {
            if (i !== indexRef.current) return;
            if (i < chapters.length - 1) playAt(i + 1, 0);
            else {
              setPhase("ended");
              setBed(false);
            }
          }}
          onError={() => {
            if (i === indexRef.current && phase === "playing") setAudioReady(false);
          }}
        />
      ))}
    </main>
  );
}
