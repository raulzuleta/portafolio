const switcher = document.querySelector('.language-switch');
const translatable = document.querySelectorAll('[data-es][data-en]');
const tabLinks = document.querySelectorAll('[data-tab]');
const navTabs = document.querySelectorAll('nav [data-tab]');
const panels = document.querySelectorAll('[data-panel]');
const diagramNodes = document.querySelectorAll('.diagram-node, [data-diagram-node]');
const diagramCard = document.querySelector('.diagram-card');
const diagramClose = document.querySelector('.diagram-close');
const knowledgeDiagram = document.querySelector('.knowledge-diagram');
let activeDiagramNode = null;
let previewDiagramNode = null;

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
  diagramNodes.forEach((node) => {
    node.classList.remove('is-active');
    node.setAttribute('aria-expanded', 'false');
  });
  if (returnFocus) previousNode.focus();
}

function setLanguage(language) {
  document.documentElement.lang = language;
  translatable.forEach((element) => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('[data-alt-es][data-alt-en]').forEach((image) => {
    image.alt = image.dataset[`alt${language === 'es' ? 'Es' : 'En'}`];
  });
  document.querySelectorAll('[data-aria-es][data-aria-en]').forEach((element) => {
    element.setAttribute('aria-label', element.dataset[`aria${language === 'es' ? 'Es' : 'En'}`]);
  });
  document.querySelectorAll('[data-label-es][data-label-en]').forEach((element) => {
    element.setAttribute('aria-label', element.dataset[`label${language === 'es' ? 'Es' : 'En'}`]);
  });
  renderDiagramCard();

  const english = language === 'en';
  switcher.setAttribute('aria-pressed', String(english));
  switcher.setAttribute('aria-label', english ? 'Cambiar idioma a español' : 'Change language to English');
  switcher.children[0].classList.toggle('active', !english);
  switcher.children[1].classList.toggle('active', english);
  document.title = english
    ? 'Raúl Zuleta — Anthropology, teaching, and environmental media'
    : 'Raúl Zuleta — Antropología, pedagogía y medios ambientales';
  localStorage.setItem('portfolio-language', language);
}

switcher.addEventListener('click', () => {
  setLanguage(document.documentElement.lang === 'es' ? 'en' : 'es');
});

function activateTab(tabName, updateAddress = true) {
  const validTab = [...navTabs].some((tab) => tab.dataset.tab === tabName) ? tabName : 'inicio';

  panels.forEach((panel) => {
    const active = panel.dataset.panel === validTab;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });

  navTabs.forEach((tab) => {
    tab.setAttribute('aria-selected', String(tab.dataset.tab === validTab));
  });

  if (updateAddress) history.pushState(null, '', `#${validTab}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    activateTab(link.dataset.tab);
  });
});

diagramNodes.forEach((node) => {
  node.addEventListener('pointerenter', () => {
    if (previewDiagramNode === node || !knowledgeDiagram) return;
    if (activeDiagramNode && activeDiagramNode !== node) closeDiagramCard();
    previewDiagramNode = node;
    knowledgeDiagram.classList.add('is-resetting');
    void knowledgeDiagram.offsetWidth;
    requestAnimationFrame(() => knowledgeDiagram.classList.remove('is-resetting'));
  });
  node.addEventListener('click', () => {
    if (activeDiagramNode === node) {
      closeDiagramCard();
      return;
    }
    activeDiagramNode = node;
    diagramNodes.forEach((item) => {
      const active = item === node;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-expanded', String(active));
    });
    renderDiagramCard();
    diagramCard.hidden = false;
  });
});

knowledgeDiagram?.addEventListener('pointerleave', () => {
  previewDiagramNode = null;
});

diagramClose?.addEventListener('click', () => closeDiagramCard(true));
diagramCard?.querySelector('.diagram-card-link').addEventListener('click', (event) => {
  event.preventDefault();
  activateTab(event.currentTarget.dataset.tab);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && activeDiagramNode) closeDiagramCard(true);
});

window.addEventListener('popstate', () => activateTab(location.hash.slice(1), false));

setLanguage(localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'es');
activateTab(location.hash.slice(1), false);
