import getRefs from '../refs/get-refs';
import fetchObj from '../API/api-service';
import modal from '../../handlebars/modal.hbs';
const { insertPoint } = getRefs();
const { fetchMovieDescription } = fetchObj;

searchBtnRef.addEventListener('click', onClickOnCard);

async function onClickOnCard(e) {
  console.log(e);
  if (e.target) return;
  e.preventDefault();
  const result = await fetchMovieDescription(e.target);
  if (result) console.log(result);
}
