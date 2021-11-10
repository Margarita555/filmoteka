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
libraryLink.addEventListener('click', openLibrary);
function openLibrary(e) {
  insertPoint.innerHTML = '';
  header.classList.replace('header__background-home', 'header__background-library');
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  headerForm.classList.add('disabled');
  headerButton.classList.remove('disabled');
}
function watchedStorage() {
  insertPoint.innerHTML = '';
  let items = JSON.parse(localStorage.getItem('Watched'));
  console.log(items);

  insertPoint.insertAdjacentHTML('beforeend', card(items));
}
function queuedStorage() {
  insertPoint.innerHTML = '';
  let items = JSON.parse(localStorage.getItem('Queue'));
  console.log(items);
  insertPoint.insertAdjacentHTML('beforeend', card(items));
}
btnWatched.addEventListener('click', watchedStorage);
btnQueue.addEventListener('click', queuedStorage);
