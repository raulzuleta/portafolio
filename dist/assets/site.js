const switcher = document.querySelector('.language-switch');
const staticLanguage = document.documentElement.dataset.staticLanguage;
const languageTarget = staticLanguage === 'en' ? 'index.html' : 'index-en.html';
const tabLinks = document.querySelectorAll('[data-tab]');
const navTabs = document.querySelectorAll('nav [data-tab]');
const panels = document.querySelectorAll('[data-panel]');
const diagramNodes = document.querySelectorAll('.diagram-node, [data-diagram-node]');
const diagramCard = document.querySelector('.diagram-card');
const diagramClose = document.querySelector('.diagram-close');
const knowledgeDiagram = document.querySelector('.knowledge-diagram');
const trainingDetails = document.querySelectorAll('.training-grid details');
const contactForm = document.querySelector('[data-contact-form]');
const contactMessage = document.querySelector('#contact-message');
const messageCount = document.querySelector('[data-message-count]');
const formStatus = document.querySelector('[data-form-status]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeDiagramNode = null;
let previewDiagramNode = null;

trainingDetails.forEach((detail) => detail.removeAttribute('name'));

contactMessage?.addEventListener('input', () => {
  messageCount.textContent = contactMessage.value.length;
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const language = document.documentElement.lang === 'en' ? 'en' : 'es';
  if (!contactForm.checkValidity()) {
    contactForm.querySelectorAll('input, textarea').forEach((field) => {
      if (field.validity.valid) field.removeAttribute('aria-invalid');
      else field.setAttribute('aria-invalid', 'true');
    });
    formStatus.textContent = language === 'en'
      ? 'Please review the highlighted fields.'
      : 'Revisa los campos señalados antes de enviar.';
    contactForm.reportValidity();
    return;
  }
  formStatus.textContent = language === 'en'
    ? 'Prototype only: your message has not been sent or stored.'
    : 'Esto es solo un prototipo: tu mensaje no fue enviado ni almacenado.';
});

contactForm?.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => {
    if (field.validity.valid) field.removeAttribute('aria-invalid');
    else field.setAttribute('aria-invalid', 'true');
    if (contactForm.checkValidity()) formStatus.textContent = '';
  });
});

function renderDiagramCard() {
  if (!activeDiagramNode || !diagramCard) return;
  const language = document.documentElement.lang === 'en' ? 'en' : 'es';
  diagramCard.querySelector('.diagram-card-title').textContent = activeDiagramNode.dataset[`title${language === 'es' ? 'Es' : 'En'}`];
  diagramCard.querySelector('.diagram-card-copy').textContent = activeDiagramNode.dataset[`copy${language === 'es' ? 'Es' : 'En'}`];
  diagramCard.querySelector('.diagram-card-example').textContent = activeDiagramNode.dataset[`example${language === 'es' ? 'Es' : 'En'}`];
  const link = diagramCard.querySelector('.diagram-card-link');
  link.textContent = activeDiagramNode.dataset[`link${language === 'es' ? 'Es' : 'En'}`];
  link.href = `#${activeDiagramNode.dataset.target}`;
  link.dataset.tab = activeDiagramNode.dataset.target;
}

function closeDiagramCard(returnFocus = false) {
  if (!activeDiagramNode || !diagramCard) return;
  const previousNode = activeDiagramNode;
  activeDiagramNode = null;
  diagramCard.hidden = true;
  knowledgeDiagram?.classList.remove('is-card-open');
  if (knowledgeDiagram) knowledgeDiagram.inert = false;
  diagramNodes.forEach((node) => {
    node.classList.remove('is-active');
    node.setAttribute('aria-expanded', 'false');
  });
  if (returnFocus) previousNode.focus();
}

function activateTab(tabName, updateAddress = true, moveFocus = false) {
  const validTab = [...navTabs].some((tab) => tab.dataset.tab === tabName) ? tabName : 'inicio';
  let activePanel = null;

  panels.forEach((panel) => {
    const active = panel.dataset.panel === validTab;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
    if (active) activePanel = panel;
  });

  navTabs.forEach((tab) => {
    if (tab.dataset.tab === validTab) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });

  if (updateAddress) history.pushState(null, '', `#${validTab}`);
  if (switcher?.tagName === 'A') switcher.href = `${languageTarget}#${validTab}`;
  window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
  if (moveFocus && activePanel) {
    const heading = activePanel.querySelector('h1, h2');
    if (heading) {
      heading.tabIndex = -1;
      requestAnimationFrame(() => heading.focus({ preventScroll: true }));
    }
  }
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateTab(link.dataset.tab, true, true);
  });
});

diagramNodes.forEach((node) => {
  node.addEventListener('pointerenter', () => {
    if (activeDiagramNode) return;
    if (previewDiagramNode === node || !knowledgeDiagram) return;
    previewDiagramNode = node;
    knowledgeDiagram.classList.add('is-resetting');
    void knowledgeDiagram.offsetWidth;
    requestAnimationFrame(() => knowledgeDiagram.classList.remove('is-resetting'));
  });
  node.addEventListener('click', () => {
    if (activeDiagramNode) return;
    activeDiagramNode = node;
    knowledgeDiagram?.classList.add('is-card-open');
    if (knowledgeDiagram) knowledgeDiagram.inert = true;
    diagramNodes.forEach((item) => {
      const active = item === node;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-expanded', String(active));
    });
    renderDiagramCard();
    diagramCard.hidden = false;
    requestAnimationFrame(() => diagramClose?.focus());
  });
});

knowledgeDiagram?.addEventListener('pointerleave', () => {
  previewDiagramNode = null;
});

diagramClose?.addEventListener('click', () => closeDiagramCard(true));
diagramCard?.querySelector('.diagram-card-link').addEventListener('click', (event) => {
  event.preventDefault();
  closeDiagramCard();
  activateTab(event.currentTarget.dataset.tab);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && activeDiagramNode) closeDiagramCard(true);
});

window.addEventListener('popstate', () => activateTab(location.hash.slice(1), false));

const oledPages = [...document.querySelectorAll('[data-oled-page]')];
const oledHistory = [
  ['05 SEP 2026 · 00:00', 22.1, 36.3, 950.1, 0, 21.2, 54.5],
  ['05 SEP 2026 · 12:00', 24.3, 32.8, 946.4, 1327, 20.8, 49.1],
  ['06 SEP 2026 · 18:00', 27.8, 27.3, 944.9, 342, 5.2, 46.9],
  ['07 SEP 2026 · 12:00', 20.3, 36.0, 945.0, 599, 13.0, 78.9],
  ['08 SEP 2026 · 18:00', 17.6, 45.4, 948.8, 117, 4.0, 39.9],
  ['09 SEP 2026 · 12:00', 19.5, 41.4, 951.8, 886, 24.4, 64.7],
  ['10 SEP 2026 · 18:00', 21.1, 32.8, 946.2, 554, 3.4, 36.6],
  ['11 SEP 2026 · 18:00', 24.0, 33.0, 949.2, 892, 5.7, 19.2]
];
let oledHistoryIndex = 0;

function renderOledHistory() {
  const [time, temperature, humidity, pressure, light, pmInside, pmOutside] = oledHistory[oledHistoryIndex];
  const difference = pmInside - pmOutside;
  document.querySelector('[data-oled-th]').textContent = `T ${temperature.toFixed(1)} C  H ${humidity.toFixed(1)}%`;
  document.querySelector('[data-oled-p]').textContent = `P ${pressure.toFixed(1)} hPa`;
  document.querySelector('[data-oled-l]').textContent = `L ${light.toFixed(1)} lux`;
  document.querySelector('[data-oled-pm-in]').textContent = `Dentro   ${pmInside.toFixed(1)} ug/m3`;
  document.querySelector('[data-oled-pm-out]').textContent = `Fuera    ${pmOutside.toFixed(1)} ug/m3`;
  document.querySelector('[data-oled-pm-diff]').textContent = `Diferencia ${difference >= 0 ? '+' : ''}${difference.toFixed(1)}`;
  document.querySelector('[data-oled-action]').textContent = difference > 3 ? 'Ventilar: ayuda' : difference < -3 ? 'Mejor cerrar' : 'Efecto menor';
  document.querySelector('[data-oled-time]').textContent = time;
}

if (oledPages.length) renderOledHistory();
if (oledPages.length > 1 && !reduceMotion.matches) {
  let oledPageIndex = 0;
  window.setInterval(() => {
    oledPages[oledPageIndex].classList.remove('is-current');
    oledPageIndex = (oledPageIndex + 1) % oledPages.length;
    if (oledPageIndex === 0) {
      oledHistoryIndex = (oledHistoryIndex + 1) % oledHistory.length;
      renderOledHistory();
    }
    oledPages[oledPageIndex].classList.add('is-current');
  }, 2800);
}

localStorage.setItem('portfolio-language', staticLanguage);
activateTab(location.hash.slice(1), false);
