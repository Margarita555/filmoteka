import getRefs from '../refs/get-refs';
import API from '../API/api-service';
import card from '../../handlebars/cardMovie.hbs';
const { searchInputRef, searchBtnRef, insertPoint } = getRefs();
const api = new API();

searchBtnRef.addEventListener('click', onSearchInput);

async function onSearchInput(e) {
  if (!searchInputRef.value.trim()) return;
  insertPoint.innerHTML = '';
  e.preventDefault();
  api._setQuery(searchInputRef.value);
  const results = await api.fetchMovieSearchQuery();
  if (!results.lengths) insertPoint.insertAdjacentHTML('beforeend', card(results));
}
