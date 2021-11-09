import API from '../API/api-service';
import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';

const { insertPoint, homeLink } = getRefs();

const api = new API();

api
  .fetchMoviePopular()
  .then(result => {
    insertPoint.insertAdjacentHTML('beforeend', card(result));
    homeLink.classList.add('active');
  })
  .catch(err => {
    console.log(err);
  });
