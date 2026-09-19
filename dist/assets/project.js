const projects = {
  'viejito-perro': {
    es: ['Viejito-Perro (Acto de Amor)', 'Infraestructura doméstica experimental en funcionamiento · desde agosto de 2026', 'Un computador reutilizado se ha convertido en una pequeña infraestructura de sensores, registros e interfaces para explorar distintas maneras de percibir y representar variaciones del ambiente cotidiano.', '¿Qué implica medir un ambiente y cómo participan los instrumentos en aquello que se vuelve perceptible?', 'Diseño y construcción iterativa de nodos ambientales, programación de interfaces y exploración de formas visuales, sonoras e históricas de relacionarse con los datos.', 'Conceptualización, diseño del sistema, construcción y programación de los nodos, documentación y articulación con preguntas antropológicas.', 'Proyecto personal en desarrollo; las colaboraciones específicas se acreditarán junto a cada componente.', ['Nodos ambientales funcionales', 'Interfaz OLED del nodo 01', 'Configuraciones y documentación técnica', 'Registro ambiental en construcción']],
    en: ['Viejito-Perro (Act of Love)', 'In progress · material research', 'A domestic infrastructure for observing environments through nodes, data, and forms of representation.', 'What does it mean to measure an environment, and how do instruments participate in what becomes perceptible?', 'Iterative design and construction of environmental nodes, interface programming, and exploration of visual, sonic, and historical ways of relating to data.', 'Conceptualization, system design, node construction and programming, documentation, and connection to anthropological questions.', 'Personal project in development; specific collaborations will be credited with each component.', ['Functional environmental nodes', 'Node 01 OLED interface', 'Technical configurations and documentation', 'Environmental record in progress']]
  },
  cenvi: {
    es: ['CENVI: aprender a pensar con un instrumento', 'Dispositivo pedagógico diseñado y pilotado · 2026', 'CENVI fue un dispositivo pedagógico desarrollado por el Centro de Investigación e Intervención en Psicología Educacional de la Universidad Central de Chile (CIPSE-UCEN), sede Región de Coquimbo. Articuló un manual, una herramienta informática, una capacitación y un proceso de acompañamiento para apoyar a estudiantes de Psicología en la aplicación e interpretación del Cuestionario de Convivencia Escolar para la No Violencia (CENVI). El proyecto no buscaba solamente facilitar la corrección de un cuestionario. Su propósito era acompañar el trabajo que comienza después de obtener los datos: revisar su calidad, relacionar factores y dimensiones, construir un diagnóstico situado y formular orientaciones pertinentes para cada establecimiento educacional.', '', '', '', '', []],
    en: ['CENVI', 'Completed · teaching device', 'A device for developing diagnostic skills with fifth-year Educational Psychology students.', 'How can a school climate instrument become a learning experience about diagnosis and intervention?', 'CENVI selection, handbook editing, interpretive guidance, piloting, evaluation, and collaborative development of a scoring application.', 'Initial formulation, instrument selection, handbook editing, guidance, pilot support, evaluation supervision, and preparation of the presentation and abstract.', 'Jorge, teaching assistant and CIPSE intern; Matías, Computer Engineering student; Tania, course instructor; Raúl Zuleta, CIPSE coordinator.', ['Teaching handbook', 'Internal presentation', 'Conference abstract submission', 'Functional automated scoring application']]
  },
  punitaqui: {
    es: ['Organizar la convivencia escolar a escala comunal', 'Política comunal y sistema de orientaciones · 2019', 'En 2019, mientras trabajaba como coordinador comunal de Convivencia Escolar en el Departamento de Educación Municipal de Punitaqui, elaboré una política y un conjunto de documentos destinados a organizar el trabajo de los establecimientos educacionales de la comuna. El proyecto surgió ante una dificultad práctica: los equipos de convivencia que debía supervisar trabajaban con criterios, procedimientos y formas de organización muy diferentes. Como coordinador comunal, consideré necesario ofrecer un marco compartido que orientara su trabajo sin reemplazar las decisiones propias de cada establecimiento.', '¿Cómo traducir problemas y criterios técnicos en orientaciones claras, situadas y utilizables?', 'Levantamiento de necesidades, organización de información y redacción de documentos operativos para actores comunales.', 'Análisis, estructuración y redacción de las orientaciones.', 'Trabajo desarrollado en contexto municipal.', ['Política comunal', 'Cinco documentos de orientación', 'Matrices, diagramas e instrumentos de trabajo']],
    en: ['Guidance for municipal teams', 'Professional practice · municipal management', 'Documents intended to support municipal teams during my professional work in Punitaqui.', 'How can technical problems and criteria be translated into clear, situated, usable guidance?', 'Needs assessment, information organization, and drafting of operational documents for municipal actors.', 'Analysis, structuring, and drafting of the guidance. The description will be expanded after reviewing the preserved document corpus.', 'Work developed in a municipal context; specific teams and responsibilities will be documented in the next review.', ['Preserved guidance documents', 'Context and audiences to be documented', 'Excerpt selection pending']]
  },
  cencosud: {
    es: ['Del análisis de una experiencia financiera al prototipo', 'Proyecto académico grupal · diseño de experiencia y prototipado · 2023', 'Este proyecto fue realizado como trabajo final del Diplomado en Customer Experience: Data, Design and Innovation de la Pontificia Universidad Católica de Chile. El equipo tomó como caso la experiencia de solicitud y administración de avances mediante la aplicación de Tarjeta Cencosud Scotiabank.', '¿Cómo traducir hallazgos y una propuesta de experiencia en una interfaz comprensible y consistente?', 'Análisis colectivo de la experiencia y desarrollo de un prototipo visual en Figma.', 'Participación en todo el proceso grupal y diseño de todas las pantallas del prototipo.', 'Pablo Poblete, Wendy Vazquez, Benjamín Gallegos, Pablo Pincheira y Raúl Zuleta.', ['Journey map', 'Service blueprint', 'Prototipo editable en Figma']],
    en: ['Cencosud case · Customer experience', 'Group academic project · experience design', 'Redesign of a banking application’s screens, produced as the final project of a customer experience diploma.', 'How can findings and an experience proposal be translated into a clear and consistent interface?', 'The team developed the case and proposal; quotations were examples created for the exercise. The visual prototype was built in Figma.', 'I designed every screen and led much of the visual development. The case and outcomes must be presented as group work.', 'Group project. The full team and roles will be added from the final presentation before publication.', ['Final presentation', 'Functional Figma file', 'Prototype screen system']]
  }
};

const switcher = document.querySelector('.language-switch');
const id = new URLSearchParams(location.search).get('id') || 'viejito-perro';
const project = projects[id] || projects['viejito-perro'];
const isCenvi = id === 'cenvi';
const isPunitaqui = id === 'punitaqui';
const isCencosud = id === 'cencosud';
const isSpanishOnly = isCenvi || isPunitaqui || isCencosud;
document.body.classList.toggle('cenvi-detail-page', isCenvi);
document.body.classList.toggle('punitaqui-detail-page', isPunitaqui);

if (isSpanishOnly) {
  switcher.disabled = true;
  switcher.classList.add('is-static');
  switcher.setAttribute('aria-label', 'Contenido disponible actualmente en español');
  switcher.setAttribute('aria-disabled', 'true');
  switcher.title = 'Versión en inglés pendiente';
}

function setupProjectLightbox() {
  const imageSelector = [
    '#viejito-story figure img',
    '#punitaqui-content figure img',
    '#cencosud-content figure img'
  ].join(',');

  document.querySelectorAll('.cenvi-media-button').forEach((button) => button.classList.add('project-media-button'));
  document.querySelectorAll(imageSelector).forEach((image) => {
    if (image.closest('.project-media-button')) return;
    const formerLink = image.parentElement?.tagName === 'A' ? image.parentElement : null;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-media-button';
    button.setAttribute('aria-label', `Ampliar imagen: ${image.alt}`);
    if (formerLink) formerLink.replaceWith(button);
    else image.replaceWith(button);
    button.append(image);
    const hint = document.createElement('span');
    hint.className = 'cenvi-media-hint';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = 'Ampliar';
    button.append(hint);
  });

  const items = [...document.querySelectorAll('.project-media-button')];
  const lightbox = document.querySelector('#project-lightbox');
  if (!lightbox || !items.length) return;

  const enlargedImage = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  const closeButton = lightbox.querySelector('.cenvi-lightbox-close');

  const showItem = (item) => {
    const figure = item.closest('figure');
    const sourceImage = item.querySelector('img');
    enlargedImage.src = sourceImage.currentSrc || sourceImage.src;
    enlargedImage.alt = sourceImage.alt;
    caption.textContent = figure.querySelector('figcaption')?.textContent || '';
  };

  items.forEach((item) => {
    item.addEventListener('click', () => {
      showItem(item);
      lightbox.showModal();
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}

function render(language) {
  if (isSpanishOnly) language = 'es';
  const [title, status, intro, problem, process, role, credits, evidence] = project[language];
  document.documentElement.lang = language;
  document.querySelectorAll('[data-es][data-en]').forEach((element) => { element.textContent = element.dataset[language]; });
  document.querySelector('#project-title').textContent = title;
  document.querySelector('#project-status').textContent = status;
  document.querySelector('#project-intro').textContent = intro;
  document.querySelector('#project-problem').textContent = problem;
  document.querySelector('#project-process').textContent = process;
  document.querySelector('#project-role').textContent = role;
  document.querySelector('#project-credits').textContent = credits;
  const richStory = document.querySelector('#viejito-story');
  const showRichStory = id === 'viejito-perro' && language === 'es';
  richStory.hidden = !showRichStory;
  document.querySelector('#project-standard-content').hidden = showRichStory || isSpanishOnly;
  document.querySelector('#project-standard-evidence').hidden = showRichStory || isSpanishOnly;
  const list = document.querySelector('#project-evidence');
  list.replaceChildren(...evidence.map((item) => { const li = document.createElement('li'); li.textContent = item; return li; }));
  document.title = `${title} — Raúl Zuleta`;
  const english = language === 'en';
  switcher.setAttribute('aria-pressed', String(english));
  if (!isSpanishOnly) switcher.setAttribute('aria-label', english ? 'Cambiar idioma a español' : 'Change language to English');
  switcher.children[0].classList.toggle('active', !english);
  switcher.children[1].classList.toggle('active', english);
  localStorage.setItem('portfolio-language', language);
}

if (isCenvi) {
  document.querySelector('#project-standard-content').hidden = true;
  document.querySelector('#project-standard-evidence').hidden = true;
  document.querySelector('#cenvi-content').hidden = false;
} else if (isPunitaqui) {
  document.querySelector('#project-standard-content').hidden = true;
  document.querySelector('#project-standard-evidence').hidden = true;
  document.querySelector('#punitaqui-content').hidden = false;
} else if (isCencosud) {
  document.querySelector('#project-standard-content').hidden = true;
  document.querySelector('#project-standard-evidence').hidden = true;
  document.querySelector('#cencosud-content').hidden = false;
} else {
  switcher.addEventListener('click', () => render(document.documentElement.lang === 'es' ? 'en' : 'es'));
}
setupProjectLightbox();
render(isSpanishOnly ? 'es' : (localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es'));
