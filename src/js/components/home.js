import home from '../API/api-service';
import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';

const { insertPoint } = getRefs();
const { fetchMovieTrending} = home;

fetchMovieTrending().then((result) => {
   insertPoint.insertAdjacentHTML('beforeend', card(result))
   console.log(result);
 })
 .catch( (err) => {
   console.log(err);
 })

