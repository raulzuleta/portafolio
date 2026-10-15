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

const galleryItems = [...activeCase.querySelectorAll('.pedagogy-gallery-button')];
const lightbox = document.querySelector('#pedagogy-lightbox');

if (lightbox && galleryItems.length) {
  const enlargedImage = lightbox.querySelector('img');
  const enlargedCaption = lightbox.querySelector('figcaption');
  const counter = lightbox.querySelector('.project-lightbox-counter');
  const closeButton = lightbox.querySelector('.cenvi-lightbox-close');
  const previousButton = lightbox.querySelector('.project-lightbox-prev');
  const nextButton = lightbox.querySelector('.project-lightbox-next');
  let sectionItems = [];
  let currentIndex = 0;

  const showItem = (index) => {
    currentIndex = (index + sectionItems.length) % sectionItems.length;
    const item = sectionItems[currentIndex];
    const sourceImage = item.querySelector('img');
    const sourceCaption = item.closest('figure')?.querySelector('figcaption');
    enlargedImage.src = sourceImage.currentSrc || sourceImage.src;
    enlargedImage.alt = sourceImage.alt;
    enlargedCaption.textContent = sourceCaption?.textContent || '';
    counter.textContent = `${currentIndex + 1}/${sectionItems.length}`;
    const hasSiblings = sectionItems.length > 1;
    counter.hidden = !hasSiblings;
    previousButton.hidden = !hasSiblings;
    nextButton.hidden = !hasSiblings;
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const section = item.closest('section') || activeCase;
      sectionItems = [...section.querySelectorAll('.pedagogy-gallery-button')];
      showItem(sectionItems.indexOf(item));
      lightbox.showModal();
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  previousButton.addEventListener('click', () => showItem(currentIndex - 1));
  nextButton.addEventListener('click', () => showItem(currentIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('keydown', (event) => {
    if (sectionItems.length < 2) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showItem(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showItem(currentIndex + 1);
    }
  });
}
