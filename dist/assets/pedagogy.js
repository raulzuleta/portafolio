const pedagogyId = new URLSearchParams(location.search).get('id') || 'guia';
const pedagogyCases = [...document.querySelectorAll('[data-pedagogy-case]')];
const activeCase = pedagogyCases.find((item) => item.dataset.pedagogyCase === pedagogyId) || pedagogyCases[0];

pedagogyCases.forEach((item) => {
  item.hidden = item !== activeCase;
});

document.title = `${activeCase.dataset.title} — Raúl Zuleta`;
