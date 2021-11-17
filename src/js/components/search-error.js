import getRefs from '../refs/get-refs';
const { textError, pagesContainer } = getRefs();

export default function (isTrue) {

  if (isTrue) {
    textError.classList.remove('is-hidden');
    pagesContainer.style.pointerEvents = 'none';
    pagesContainer.style.opacity = '0';
    return;
  }
  textError.classList.add('is-hidden');
  pagesContainer.style.pointerEvents = 'initial';
  pagesContainer.style.opacity = '1';
}
