import getRefs from '../refs/get-refs';
import API from '../API/api-service';
import searchErr from './search-error';
import card from '../../handlebars/cardMovie.hbs';
const { searchForm, insertPoint } = getRefs();
const api = new API();

import { startSpinner, stopSpinner } from './spinner.js';
import createCardData from './create-card-data';

searchForm.addEventListener('submit', onSearchInput);

async function onSearchInput(e) {
  e.preventDefault();

  const value = e.currentTarget.elements.query.value;
  if (!value.trim()) return;
  initialReset();

  e.currentTarget.reset();
  try {
    api._setQuery(value);

    startSpinner();

    const data = await api.fetchMovieSearchQuery();
    const result = await data.results;

    const markup = await createCardData(result);

    if (!result.length) searchErr(true);

    insertPoint.insertAdjacentHTML('beforeend', card(markup));
    stopSpinner();
  } catch (error) {
    console.error(error);
  }
}

function initialReset() {
  insertPoint.innerHTML = '';
  searchErr(false);
  api._setPage(1);
}
