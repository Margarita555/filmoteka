import getRefs from '../refs/get-refs';
import fetchObj from '../API/api-service';
import modal from '../../handlebars/modal.hbs';

const { insertPoint, modalСardRef, overlayRef, lightboxRef, clsBtnRef } = getRefs();
const { fetchMovieDescription } = fetchObj;

//cardRef = insertPoint.querySelector('');
insertPoint.addEventListener('click', onClickOnCard);

async function onClickOnCard(e) {
  if (e.target.nodeName === 'IMG') {
    e.preventDefault();
    const result = await fetchMovieDescription(e.target.dataset.src);
    modalСardRef.insertAdjacentHTML('beforeend', modal(result));
    lightboxRef.classList.add('is-open');
    clsBtnRef.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', closeModal);
    window.addEventListener('keydown', onEscape);
  }
}

function onEscape(e) {
  if (e.code === 'Escape') closeModal();
}

function closeModal() {
  modalСardRef.innerHTML = '';
  lightboxRef.classList.remove('is-open');
  clsBtnRef.removeEventListener('click', onClickClsBtn);
  overlayRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', onEscape);
}
