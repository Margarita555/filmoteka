import getRefs from '../refs/get-refs';
const { textError, pagesContainer, firstPageBtn, prevBtn, nextBtn, lastPageBtn } = getRefs();

export default function (isTrue) {
  firstPageBtn.setAttribute('disabled', isTrue);
  prevBtn.setAttribute('disabled', isTrue);
  nextBtn.setAttribute('disabled', isTrue);
  lastPageBtn.setAttribute('disabled', isTrue);

  if (isTrue) {
    textError.classList.remove('is-hidden');
    pagesContainer.style.pointerEvents = 'none';
    pagesContainer.style.opacity = '0.5';
    return;
  }
  textError.classList.add('is-hidden');
  pagesContainer.style.pointerEvents = 'initial';
  pagesContainer.style.opacity = '1';
}
