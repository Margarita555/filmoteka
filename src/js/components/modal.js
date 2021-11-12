import getRefs from '../refs/get-refs';
import API from '../API/api-service';
import modal from '../../handlebars/modal.hbs';

const { insertPoint, modalСardRef, lightboxRef, clsBtnRef } = getRefs();
const api = new API();

let storageWatched = localStorage.getItem('Watched')
  ? JSON.parse(localStorage.getItem('Watched'))
  : [];
let storageQueue = localStorage.getItem('Queue') ? JSON.parse(localStorage.getItem('Queue')) : [];

insertPoint.addEventListener('click', onClickOnCard);

async function onClickOnCard(e) {
  if (e.target.nodeName !== 'UL') {
    e.preventDefault();
    const imgRef = e.target.parentNode.querySelector('img');
    api._setId(imgRef.dataset.src);
    const result = await api.fetchMovieDescription();
    modalСardRef.insertAdjacentHTML('beforeend', modal(result));
    lightboxRef.classList.add('is-open');

    addItemToLocalStorage(result);

    const btnAddWatched = document.querySelector('#btn-add-watched');
    const btnAddQueue = document.querySelector('#add-to-queue');

    btnAddWatched.addEventListener('click', addItemToWatched);
    btnAddQueue.addEventListener('click', addItemToQueue);
    clsBtnRef.addEventListener('click', closeModal);
    lightboxRef.addEventListener('click', e => {
      if (e.target === lightboxRef) closeModal();
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
  lightboxRef.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
  localStorage.removeItem('ky');
}

function addItemToQueue(e) {
  let getItems = localStorage.getItem('ky');
  storageQueue.push(JSON.parse(getItems));
  let res = JSON.stringify(storageQueue);
  localStorage.setItem('Queue', res);
}
function addItemToWatched(e) {
  let getItems = localStorage.getItem('ky');
  storageWatched.push(JSON.parse(getItems));
  let res = JSON.stringify(storageWatched);
  localStorage.setItem('Watched', res);
}

function addItemToLocalStorage(i) {
  let res = JSON.stringify(i);
  localStorage.setItem('ky', res);
}
