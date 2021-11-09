import API from '../API/api-service';
import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';

const { insertPoint, homeLink, libraryLink, headerForm, headerButton } = getRefs();

const api = new API();
api
  .fetchMovieTrending()
  .then(result => {
    insertPoint.insertAdjacentHTML('beforeend', card(result));
    homeLink.classList.add('active');
    libraryLink.classList.remove('active');
    headerForm.classList.remove('disabled');
    headerButton.classList.add('disabled');
  })
  .catch(err => {
    console.log(err);
  });
