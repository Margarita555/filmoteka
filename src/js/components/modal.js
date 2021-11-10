import getRefs from '../refs/get-refs';
import API from '../API/api-service';
import modal from '../../handlebars/modal.hbs';

const {
  insertPoint,
  modalСardRef,
  overlayRef,
  lightboxRef,
  clsBtnRef,
  btnAddWatched,
  btnAddQueue,
} = getRefs();
const api = new API();
const storageWatched = [];
const storageQueue = [];
//cardRef = insertPoint.querySelector('');
insertPoint.addEventListener('click', onClickOnCard);
// console.log(btnAddWatched);

async function onClickOnCard(e) {
  if (e.target.nodeName !== 'UL') {
    e.preventDefault();
    const imgRef = e.target.parentNode.querySelector('img');
    api._setId(imgRef.dataset.src);
    const result = await api.fetchMovieDescription();

    modalСardRef.insertAdjacentHTML('beforeend', modal(result));
    addItemToLocalStorage(result);
    const btnAddWatched = document.querySelector('#btn-add-watched');
    const btnAddQueue = document.querySelector('#add-to-queue');
    console.log(btnAddWatched);
    btnAddWatched.addEventListener('click', addItemToWatched);
    btnAddQueue.addEventListener('click', addItemToQueue);
    lightboxRef.classList.add('is-open');
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
  lightboxRef.classList.remove('is-open');
  clsBtnRef.removeEventListener('click', closeModal);
  overlayRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
  localStorage.removeItem('ky');
}
function addItemToQueue(e) {
  let getItems = localStorage.getItem('ky');
  console.log(getItems);
  storageQueue.push(JSON.parse(getItems));
  let res = JSON.stringify(storageQueue);
  localStorage.setItem('Queue', res);
}
function addItemToWatched(e) {
  let getItems = localStorage.getItem('ky');
  console.log(getItems);
  storageWatched.push(JSON.parse(getItems));
  let res = JSON.stringify(storageWatched);
  localStorage.setItem('Watched', res);
}
function addItemToLocalStorage(i) {
  let res = JSON.stringify(i);
  localStorage.setItem('ky', res);
}
// addItemToWatched();
