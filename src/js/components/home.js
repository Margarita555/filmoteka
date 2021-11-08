import home from '../API/api-service';
import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';

const { insertPoint, homeLink } = getRefs();
const { fetchMovieTrending } = home;
console.log(homeLink);

fetchMovieTrending()
  .then(result => {
    insertPoint.insertAdjacentHTML('beforeend', card(result));
    homeLink.classList.add('active');
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
