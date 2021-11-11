import getRefs from '../refs/get-refs';
const { headerErrorRef, firstPageBtn, prevBtn, nextBtn, lastPageBtn } = getRefs();

export default function (isTrue) {
  if (isTrue) {
    headerErrorRef.classList.remove('is-hidden');
    firstPageBtn.setAttribute('disabled', true);
    prevBtn.setAttribute('disabled', true);
    nextBtn.setAttribute('disabled', true);
    lastPageBtn.setAttribute('disabled', true);
    return;
  }
  headerErrorRef.classList.add('is-hidden');
  firstPageBtn.setAttribute('disabled', false);
  prevBtn.setAttribute('disabled', false);
  nextBtn.setAttribute('disabled', false);
  lastPageBtn.setAttribute('disabled', false);
}
