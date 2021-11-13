import getRefs from '../refs/get-refs';
const {
  textError,
  pagesContainer,
  pageNumbersContainer,
  firstPageBtn,
  prevBtn,
  nextBtn,
  lastPageBtn,
} = getRefs();

export default function (isTrue) {
  if (isTrue) {
    const activePageRef = pagesContainer.querySelector('.page__number--active');
    activePageRef.classList.remove('page__number--active');
    textError.classList.remove('is-hidden');
    pagesContainer.style.pointerEvents = 'none';
    pagesContainer.style.opacity = '0.5';
    firstPageBtn.setAttribute('disabled', true);
    prevBtn.setAttribute('disabled', true);
    nextBtn.setAttribute('disabled', true);
    lastPageBtn.setAttribute('disabled', true);
    return;
  }
  const activePageRef = pageNumbersContainer.firstElementChild;
  activePageRef.classList.add('page__number--active');
  textError.classList.add('is-hidden');
  pagesContainer.style.pointerEvents = 'initial';
  pagesContainer.style.opacity = '1';
  firstPageBtn.setAttribute('disabled', false);
  prevBtn.setAttribute('disabled', false);
  nextBtn.setAttribute('disabled', false);
  lastPageBtn.setAttribute('disabled', false);
}
