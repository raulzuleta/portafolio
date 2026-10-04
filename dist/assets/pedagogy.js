const pedagogyId = new URLSearchParams(location.search).get('id') || 'guia';
const pedagogyCases = [...document.querySelectorAll('[data-pedagogy-case]')];
const activeCase = pedagogyCases.find((item) => item.dataset.pedagogyCase === pedagogyId) || pedagogyCases[0];

pedagogyCases.forEach((item) => {
  item.hidden = item !== activeCase;
});

const staticEnglish = document.documentElement.dataset.staticLanguage === 'en';
document.title = `${staticEnglish ? activeCase.querySelector('h1').textContent : activeCase.dataset.title} — Raúl Zuleta`;
const languageSwitcher = document.querySelector('.language-switch');
if (languageSwitcher?.tagName === 'A') {
  languageSwitcher.href = `${staticEnglish ? 'pedagogia.html' : 'pedagogia-en.html'}?id=${activeCase.dataset.pedagogyCase}`;
}
