import getRefs from '../refs/get-refs';
const { textError, pagesContainer, firstPageBtn, prevBtn, nextBtn, lastPageBtn } = getRefs();

export default function (isTrue) {
  if (isTrue) {
    textError.classList.remove('is-hidden');
    pagesContainer.style.pointerEvents = 'none';
    pagesContainer.style.opacity = '0.5';
    firstPageBtn.setAttribute('disabled', true);
    prevBtn.setAttribute('disabled', true);
    nextBtn.setAttribute('disabled', true);
    lastPageBtn.setAttribute('disabled', true);
    return;
  }
  textError.classList.add('is-hidden');
  pagesContainer.style.pointerEvents = 'initial';
  pagesContainer.style.opacity = '1';
  firstPageBtn.setAttribute('disabled', false);
  prevBtn.setAttribute('disabled', false);
  nextBtn.setAttribute('disabled', false);
  lastPageBtn.setAttribute('disabled', false);
}
