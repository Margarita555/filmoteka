import getRefs from '../refs/get-refs';
import API from '../API/api-service';
import modal from '../../handlebars/modal.hbs';

const { insertPoint, modalСardRef, overlayRef, lightboxRef, clsBtnRef } = getRefs();
const api = new API();

//cardRef = insertPoint.querySelector('');
insertPoint.addEventListener('click', onClickOnCard);

async function onClickOnCard(e) {
  if (e.target.nodeName === 'IMG') {
    e.preventDefault();
    api._setId(e.target.dataset.src);
    const result = await api.fetchMovieDescription();
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
