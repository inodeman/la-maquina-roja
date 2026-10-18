export type Chapter = {
  id: string;
  kicker: string;
  title: string;
  year: string;
  still: string;
  clip?: string;
  audio: string;
  stamps: string;
  narration: string;
};

export const CHANNEL_URL = "https://www.youtube.com/@InodeAi";

export const chapters: Chapter[] = [
  {
    id: "zoo",
    kicker: "Capítulo 01",
    title: "Diecinueve segundos",
    year: "2005",
    still: "/film/stills/01.jpg",
    clip: "/film/clips/01.mp4",
    audio: "/film/audio/01.mp3",
    stamps: "/film/audio/01.timestamps.json",
    narration:
      "Hay una tarde de abril en la que la historia de internet cabe en diecinueve segundos. El veintitrés de abril de dos mil cinco, en el zoológico de San Diego, Jawed Karim apunta una cámara modesta hacia dos elefantes. Se cuela el viento. Dice que lo interesante de esos animales es la trompa, larga de verdad, y que eso es genial. Se acaba. El archivo se llama Me at the zoo. Es el primer video que YouTube enseña al público. No hay intro. No hay miniatura pensada. No hay música. Hay una reja, una tarde caliente y la decisión de no esperar a que el video se vea profesional para que exista. El dominio se había registrado a mediados de febrero de ese mismo año. Detrás estaban tres amigos salidos de PayPal. Chad Hurley venía del diseño. Steve Chen, de la ingeniería. Karim, de la idea incómoda. Habían visto el mismo problema una y otra vez. El video de un desastre, el del espectáculo de medio tiempo, el chiste grabado en una fiesta. Nada de eso viajaba. El correo lo rechazaba. Las páginas se ahogaban. Compartir un recuerdo en movimiento era un oficio, no un gesto. Nadie cubrió la tarde de los elefantes. No hacía falta. La primera ley del sitio ya estaba escrita, aunque nadie la hubiera leído. Si puedes grabarlo, puedes publicarlo. El permiso llegó después. La cámara llegó antes.",
  },
  {
    id: "sillas",
    kicker: "Capítulo 02",
    title: "Tres sillas",
    year: "2005",
    still: "/film/stills/02.jpg",
    clip: "/film/clips/02.mp4",
    audio: "/film/audio/02.mp3",
    stamps: "/film/audio/02.timestamps.json",
    narration:
      "La imagen que quedó de aquellos meses cabe en una habitación. Una oficina chica, encima de una pizzería, en San Mateo, California. Tres escritorios. Cables por el suelo. Cajas de pizza. Monitores que zumban de noche. Hurley, Chen y Karim no estaban levantando una televisora. Estaban levantando un tubo. Entra un archivo. Sale una página. Esa página se puede mandar. Al principio la idea coqueteó con otras formas. Hubo quien contó después que pensaron en citas por video, en perfiles, en un sitio para verse la cara. Lo que sobrevivió no fue el romance. Fue el tubo. En mayo de dos mil cinco abrieron la beta, y el crecimiento empezó a parecer un error de la hoja de cálculo. Gente subiendo cosas que no tenían otro lugar donde vivir. En noviembre, Sequoia Capital puso tres millones y medio de dólares. Roelof Botha, que ya conocía de cerca la historia de PayPal, entendió algo que todavía sonaba exagerado. El video iba a ser la lengua de la web. Y quien tuviera el reproductor tendría la plaza. No ganaron por el discurso. Ganaron porque subir un video dejó de ser un proyecto y pasó a ser un reflejo. Tres sillas. Una pizzería abajo. Y arriba, sin que el barrio lo supiera, el borrador de la máquina.",
  },
  {
    id: "ventana",
    kicker: "Capítulo 03",
    title: "La ventana",
    year: "2005",
    still: "/film/stills/03.jpg",
    clip: "/film/clips/03.mp4",
    audio: "/film/audio/03.mp3",
    stamps: "/film/audio/03.timestamps.json",
    narration:
      "El golpe de gracia no fue un anuncio. Fue un rectángulo que se podía incrustar en cualquier otra página. YouTube entendió, antes que nadie con esta escala, que el video no tenía que vivir solo en su casa. Podía vivir en los blogs, en los foros, en MySpace, en el sitio de un periódico que todavía no sabía qué hacer con una cámara. El reproductor de aquellos años, hecho con Flash, era una ventana portátil. Tú ponías el archivo. La ventana hacía el resto. Y cada vez que alguien la pegaba fuera, el sitio crecía en una tierra que no era suya. En diciembre de dos mil cinco, un corto de Saturday Night Live, Lazy Sunday, se escapó de la televisión y se multiplicó ahí. No lo subió la cadena como estrategia. Lo subió la gente, porque por fin podía. Millones de reproducciones en cuestión de días, cuando el servicio todavía era un recién llegado. De pronto los noticieros tenían que explicar qué era aquella página de fondo claro y botón de play. Ahí se vio el trato, aunque nadie lo firmara en voz alta. La televisión hacía el espectáculo. YouTube hacía la circulación. Y en internet la circulación es la propiedad que importa. El monumento no era el video. Era la ventana. Quien controla la ventana controla la plaza, aunque el edificio sea de otro.",
  },
  {
    id: "compra",
    kicker: "Capítulo 04",
    title: "Mil seiscientos cincuenta",
    year: "2006",
    still: "/film/stills/04.jpg",
    clip: "/film/clips/04.mp4",
    audio: "/film/audio/04.mp3",
    stamps: "/film/audio/04.timestamps.json",
    narration:
      "El nueve de octubre de dos mil seis, Google anunció que compraba YouTube por mil seiscientos cincuenta millones de dólares en acciones. El cierre llegó en noviembre. En poco más de año y medio, tres amigos y una beta habían pasado a ser la apuesta más ruidosa de la compañía que ya organizaba la web. Muchos dijeron que era una locura. YouTube perdía dinero a cubos. El ancho de banda costaba una fortuna. Los abogados costaban más. Las discográficas y los estudios veían sus obras circulando sin contrato. En marzo de dos mil siete, Viacom demandaría al sitio por mil millones de dólares. Parecía un mercado de pulgas con luz de estadio. Google no compró un negocio ordenado. Compró el hábito, la atención y el miedo a llegar tarde. Dentro de la empresa, Susan Wojcicki había empujado una idea simple. El video no era un accesorio del buscador. Era el siguiente lugar donde la gente iba a preguntar por el mundo. Años después, en dos mil catorce, ella misma tomaría el timón de YouTube. Pero en aquel octubre el gesto ya era claro. El cuarto de arriba de la pizzería había terminado. Empezaba la infraestructura. Mil seiscientos cincuenta millones parecieron un exceso. Vistos desde aquí, parecen la entrada más barata al siglo.",
  },
  {
    id: "sobre",
    kicker: "Capítulo 05",
    title: "El sobre",
    year: "2007",
    still: "/film/stills/05.jpg",
    audio: "/film/audio/05.mp3",
    stamps: "/film/audio/05.timestamps.json",
    narration:
      "Si dos mil seis fue la compra, dos mil siete fue la pregunta incómoda. La gente que llena esto, ¿vive de qué? En mayo de ese año llegó el Programa de Socios. No era caridad. Era un trato. Tú traes audiencia. La plataforma pone anuncios. El dinero se parte. Por primera vez, un cuarto, una voz y una cámara mala podían parecerse a un oficio. El sobre en el escritorio de un adolescente dejó de ser un chiste de la cena. Al mismo tiempo había que sobrevivir a los abogados. Content ID, el sistema que compara lo que subes con los archivos de quienes tienen los derechos, empezó a tomar forma. La idea era brutal y elegante. No borrar todo. Reconocer la canción, la escena, el partido, y decidir si se bloquea, se rastrea o se monetiza. La cultura del remix y la cultura del copyright se sentaron a la misma mesa. No se han levantado. Ese año también se entiende el virus doméstico. Un bebé le muerde el dedo a su hermano y el mundo entero se detiene a mirar. No es cine. Es la prueba de que la intimidad, repetida millones de veces, puede ser más fuerte que un estreno. YouTube ya no solo alojaba videos. Estaba inventando una clase social. El creador. Gente sin canal de televisión, y con más público que muchos canales.",
  },
  {
    id: "sala",
    kicker: "Capítulo 06",
    title: "La sala de estar",
    year: "2012",
    still: "/film/stills/06.jpg",
    audio: "/film/audio/06.mp3",
    stamps: "/film/audio/06.timestamps.json",
    narration:
      "Entre dos mil nueve y dos mil quince, la sala de estar del planeta cambió de mueble sin cambiar de sofá. Un sueco que comenta juegos a gritos se vuelve, durante años, la suscripción más grande del mundo. No pidió permiso a una cadena. Pidió una cámara y constancia. En dos mil doce, un artista coreano, Psy, publica un tema que se baila raro y en diciembre alcanza mil millones de reproducciones. El primero en llegar ahí. Gangnam Style no fue solo una canción. Fue la prueba de que un hit global ya no necesitaba el visto bueno de Nueva York, ni de Londres, ni de una disquera que te eligiera. Necesitaba una ventana, y una coreografía que la gente pudiera imitar en su cocina. Las miniaturas se volvieron carteles. Los títulos, promesas. La cámara subió de calidad y el oficio también. Aparecieron redes de canales, agencias, historias contadas cada semana con una disciplina de redacción. YouTube se parecía cada vez menos a un álbum de recortes y cada vez más a una programación que nadie dirigía del todo, porque la dirigían millones de decisiones chicas. Darle al play. Quedarse. Irse. En esas salas, de Seúl a Ciudad de México, la tele seguía encendida. Solo que el control remoto había aprendido a buscar nombres de personas, no números de canal.",
  },
  {
    id: "catedral",
    kicker: "Capítulo 07",
    title: "La catedral",
    year: "2016",
    still: "/film/stills/07.jpg",
    clip: "/film/clips/07.mp4",
    audio: "/film/audio/07.mp3",
    stamps: "/film/audio/07.timestamps.json",
    narration:
      "Hay un momento en que YouTube deja de ser un estante y se vuelve un criterio. Hacia dos mil doce la brújula interna se mueve. Ya no basta el click. Importa cuánto tiempo te quedas. El tiempo de reproducción pasa al centro. Una miniatura puede engañarte una vez. El reloj no se deja engañar igual. El sitio empieza a premiar lo que retiene, no solo lo que atrae. Y en dos mil dieciséis la recomendación da otro salto. Redes neuronales. Modelos que no miran un video como lo miraría una persona, sino como una estadística enorme de lo que otros, parecidos a ti, no pudieron soltar. El resultado se siente magia y se administra como una catedral. Entras por una receta y sales de noche, habiendo cruzado un pasillo que no pediste. A veces el pasillo es una clase gratis, un concierto, una herramienta. A veces es un pozo. La máquina no tiene una moral propia. Tiene una función. Que la sesión no se termine. Susan Wojcicki, al frente desde dos mil catorce, hereda esa catedral ya encendida. En esos años el sitio se vuelve la televisión de una generación que no distingue entre un canal y una persona. También se vuelve un problema político. Porque cuando el archivo recomienda, el archivo gobierna un pedazo de lo que una sociedad cree haber elegido. La catedral no te obliga a entrar. Te hace muy difícil encontrar la puerta de salida.",
  },
  {
    id: "tormenta",
    kicker: "Capítulo 08",
    title: "La tormenta",
    year: "2017",
    still: "/film/stills/08.jpg",
    clip: "/film/clips/08.mp4",
    audio: "/film/audio/08.mp3",
    stamps: "/film/audio/08.timestamps.json",
    narration:
      "En marzo de dos mil diecisiete, varias marcas grandes descubren, o deciden descubrir, que sus anuncios aparecen junto a videos extremos. Retiran el dinero. En los pasillos de los creadores ese susto tiene nombre. Adpocalypse. El apocalipsis de la publicidad. El símbolo del dólar junto al video se pone en aviso, o desaparece. De un mes a otro, gente que había dejado su empleo para vivir de la plataforma aprende que el oficio depende de un interruptor que no controla. A fin de ese año, un creador famoso filma en un bosque de Japón algo que no debía ser contenido. La indignación es global. YouTube aprieta las reglas, los anuncios, las recomendaciones. Parte de la respuesta era necesaria. El sitio se había hecho demasiado grande para fingir que todo clip es inocente. Otra parte dejó un sabor a arbitraje. Normas opacas. Castigos difíciles de apelar. Temas enteros, como la noticia, la historia o la salud, tratados como riesgo aunque estuvieran contados con cuidado. La tormenta enseñó la cláusula que estaba en letra chica desde el sobre de dos mil siete. El creador pone la cara. La plataforma pone la plaza. Y la plaza puede cambiar de precio sin avisar. Desde entonces, quien vive de esto vive también de un segundo plan. De una comunidad directa. De no deberle la casa entera a un solo botón. No fue el fin de YouTube. Fue el fin de la inocencia.",
  },
  {
    id: "telefono",
    kicker: "Capítulo 09",
    title: "El teléfono de pie",
    year: "2021",
    still: "/film/stills/09.jpg",
    clip: "/film/clips/09.mp4",
    audio: "/film/audio/09.mp3",
    stamps: "/film/audio/09.timestamps.json",
    narration:
      "Mientras la catedral debatía sus reglas, el teléfono se puso de pie. TikTok, heredero de una aplicación china y ya global hacia dos mil dieciocho, no le pedía al espectador que eligiera. Le ponía el siguiente video en la cara. Vertical. Corto. Sonando solo. Hecho para el pulgar. El formato era una bofetada de claridad. Menos ceremonia. Más reflejo. Una generación aprendió a mirar el mundo en vertical. YouTube contestó con Shorts. Primero en India, en dos mil veinte. Después en el resto del mundo, en dos mil veintiuno. No era una moda prestada y ya. Era la admisión de que el escritorio ya no era el centro, y de que el competidor no era la tele del salón, sino el rectángulo que cabe en una mano en el metro. Hubo fondos para creadores, tijeras de edición dentro del propio teléfono, y una guerra de hábitos que sigue abierta. En febrero de dos mil veintitrés, Neal Mohan releva a Susan Wojcicki. El mandato es el de una plataforma que ya no cabe en una sola forma. Largo y corto. Televisión y pulgar. Archivo y reflejo. El teléfono no mató al documental de cuarenta minutos. Le recordó que cada segundo tiene que ganarse el derecho a existir. Incluidos estos.",
  },
  {
    id: "set",
    kicker: "Capítulo 10",
    title: "Hollywood de almacén",
    year: "2024",
    still: "/film/stills/10.jpg",
    clip: "/film/clips/10.mp4",
    audio: "/film/audio/10.mp3",
    stamps: "/film/audio/10.timestamps.json",
    narration:
      "Mira un set grande. De los que huelen a cable caliente y a café. Grúas. Paredes de luces. Un equipo que dice acción para un video que no va a un cine, sino a una página que cualquiera abre en la cocina. Eso también es YouTube, y no es una metáfora. En la última década, un puñado de creadores empujó la producción hasta un lugar que las televisoras reconocen con envidia y con miedo. Mister Beast, y otros con él, convirtieron el reto, el experimento y el gesto enorme en un género industrial. Presupuestos de cine. Ritmo de anuncio. Moral de cuento. Y una miniatura que se lee a tres metros. No son todos. Son la punta. Debajo hay cocinas, talleres, aulas, canales de ciencia, de humor y de barrio, que publican cada semana con un rigor que ya no cabe en la palabra aficionado. YouTube se volvió, a la vez, el estudio, la sala y la taquilla. Ahí se estrena música. Ahí se explica una ley. Ahí alguien, en cualquier ciudad, puede tener más espectadores un martes que un noticiero local en un mes. El oficio se democratizó y se profesionalizó en el mismo movimiento. Eso solo parece una contradicción si no has pasado tiempo en internet. Hollywood no se mudó. Creció una segunda industria al lado, con otra puerta de entrada. Subir el archivo.",
  },
  {
    id: "archivo",
    kicker: "Capítulo 11",
    title: "El archivo",
    year: "Hoy",
    still: "/film/stills/11.jpg",
    clip: "/film/clips/11.mp4",
    audio: "/film/audio/11.mp3",
    stamps: "/film/audio/11.timestamps.json",
    narration:
      "Ponle números, aunque los números se queden cortos. Más de dos mil millones de personas entran cada mes. Durante años, la propia plataforma habló de más de quinientas horas de video subidas cada minuto. Quinientas horas. Un minuto. Ni un equipo de archivistas, ni una cineteca, ni la suma de los noticieros del siglo veinte se acercan a ese caudal. Ahí está la clase que no te dio la escuela, y la mentira que te dio un extraño. El concierto que no pudiste pagar. El testimonio de una guerra. El tutorial que te ahorró un técnico. El rumor que se disfrazó de evidencia. YouTube es el archivo más generoso y más peligroso que hemos construido, porque no separa con un muro lo verdadero de lo viral. Lo pone en la misma estantería y deja que el tiempo, la gente y la máquina decidan qué queda a la altura de los ojos. Eso obliga. Obliga a quien sube, a quien recomienda y a quien mira. El play no es neutral. Es una pequeña coronación. Cada reproducción le dice a la catedral: más de esto. Por eso la historia de YouTube no es solo la historia de una empresa de San Mateo. Es la historia de lo que decidimos, millones de veces al día, que merecía otros diecinueve segundos. Y otros. Y otros.",
  },
  {
    id: "senal",
    kicker: "Capítulo 12",
    title: "Sigue la señal",
    year: "InodeAi",
    still: "/film/stills/12.jpg",
    audio: "/film/audio/12.mp3",
    stamps: "/film/audio/12.timestamps.json",
    narration:
      "Si llegaste hasta aquí, ya hiciste lo más raro que se puede hacer en esa máquina. Te quedaste. Quince minutos es poco para una historia así, y es mucho para un pulgar acostumbrado a irse. Gracias por el tiempo. De verdad. No es un detalle. Es la moneda. Yo soy InodeAi. Armo piezas para ver de un tirón. Archivos, historias, cosas que valen la pena cuando el ruido se apaga. Si esta máquina roja te dejó con ganas de la siguiente, sígueme. Está en el botón, y está en el canal. Ahí sigue el archivo, contado con calma, para quien todavía cree que un video puede ser una conversación y no solo un reflejo. YouTube empezó con elefantes y una cámara que casi nadie tomaba en serio. Sigue siendo eso, a escala de planeta. Alguien que tiene algo que mostrarte, y la esperanza, nada ingenua, de que te quedes a verlo. Si hoy te quedaste, quédate cerca. Nos vemos en el siguiente.",
  },
];
