import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';

const {
  libraryLink,
  homeLink,
  btnWatched,
  btnQueue,
  header,
  headerForm,
  headerButton,
  insertPoint,
} = getRefs();

btnWatched.addEventListener('click', watchedStorage);
btnQueue.addEventListener('click', queuedStorage);
libraryLink.addEventListener('click', openLibrary);

function openLibrary() {
  insertPoint.innerHTML = '';
  header.classList.replace('header__background-home', 'header__background-library');
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  headerForm.classList.add('disabled');
  headerButton.classList.remove('disabled');
}
function watchedStorage() {
  changeStorage('Watched');
  btnQueue.classList.remove('in-active');
  btnWatched.classList.add('in-active');
}

function queuedStorage() {
  changeStorage('Queue');
  btnWatched.classList.remove('in-active');
  btnQueue.classList.add('in-active');
}

function changeStorage(value) {
  insertPoint.innerHTML = '';
  let items = JSON.parse(localStorage.getItem(value));
  insertPoint.insertAdjacentHTML('beforeend', card(items));
}
