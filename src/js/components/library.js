import getRefs from '../refs/get-refs';
const { libraryLink, homeLink, btnWatched, btnQueue, header, headerForm, headerButton } = getRefs();
libraryLink.addEventListener('click', openLibrary);
function openLibrary(e) {
  header.classList.replace('header__background-home', 'header__background-library');
  homeLink.classList.remove('active');
  libraryLink.classList.add('active');
  headerForm.classList.add('disabled');
  headerButton.classList.remove('disabled');
}
