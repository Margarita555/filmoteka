import getRefs from '../refs/get-refs';
import createModalFilm from '../data/create-modal-film-data';
import modal from '../../handlebars/modal.hbs';

const { insertPoint, modalRef, modalСardRef, overlayBackgroundRef, overlayRef, clsBtnRef } =
  getRefs();

let storageWatched = localStorage.getItem('Watched')
  ? JSON.parse(localStorage.getItem('Watched'))
  : [];
let storageQueue = localStorage.getItem('Queue') ? JSON.parse(localStorage.getItem('Queue')) : [];

insertPoint.addEventListener('click', onClickOnCard);

async function onClickOnCard(e) {
  if (e.target.nodeName !== 'UL') {
    e.preventDefault();
    const imgRef = e.target.parentNode.querySelector('img');
    const result = await createModalFilm(imgRef.dataset.src);
    modalСardRef.insertAdjacentHTML('beforeend', modal(result));
    addItemToLocalStorage(result);

    overlayBackgroundRef.classList.add('is-open');
    overlayRef.classList.add('is-open');
    overlayBackgroundRef.style.backgroundImage = `url("${result.backdrop}")`;

    clsBtnRef.addEventListener('click', closeModal);
    overlayRef.addEventListener('click', e => {
      if (e.target === overlayRef) closeModal();
    });
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') closeModal();
    });
  }
}

function closeModal() {
  modalСardRef.innerHTML = '';
  overlayBackgroundRef.classList.remove('is-open');
  overlayRef.classList.remove('is-open');
  clsBtnRef.removeEventListener('click', closeModal);
  overlayRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
  localStorage.removeItem('ky');
}

function addItemToQueue() {
  localStorage.setItem('Queue', addItem(storageQueue));
}
function addItemToWatched() {
  localStorage.setItem('Watched', addItem(storageWatched));
}

function addItemToLocalStorage(i) {
  const btnAddWatched = document.querySelector('#btn-add-watched');
  const btnAddQueue = document.querySelector('#add-to-queue');
  btnAddWatched.addEventListener('click', addItemToWatched);
  btnAddQueue.addEventListener('click', addItemToQueue);
  let res = JSON.stringify(i);
  localStorage.setItem('ky', res);
}
function addItem(value) {
  let getItems = localStorage.getItem('ky');
  value.push(JSON.parse(getItems));
  let res = JSON.stringify(value);
  return res;
}
