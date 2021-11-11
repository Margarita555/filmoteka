import getRefs from '../refs/get-refs';
import API from '../API/api-service';
import searchErr from './search-error';
import card from '../../handlebars/cardMovie.hbs';
const { searchInputRef, searchBtnRef, insertPoint } = getRefs();
const api = new API();

import { startSpinner, stopSpinner } from './spinner.js';

searchBtnRef.addEventListener('click', onSearchInput);

async function onSearchInput(e) {
  if (!searchInputRef.value.trim()) return;
  initialReset();
  e.preventDefault();
  api._setQuery(searchInputRef.value);
  startSpinner();
  const results = await api.fetchMovieSearchQuery();
  if (!results.length) searchErr(true);
  insertPoint.insertAdjacentHTML('beforeend', card(results));
  stopSpinner();
}

function initialReset() {
  insertPoint.innerHTML = '';
  searchErr(false);
  api._setPage(1);
}