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

  allStorage();
}
function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  console.log(keys);
  while (i--) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }
  console.log(values);

  insertPoint.insertAdjacentHTML('beforeend', card(values));
}
