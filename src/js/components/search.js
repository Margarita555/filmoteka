import getRefs from '../refs/get-refs';
import fetchObj from '../API/api-service';
import card from '../../handlebars/cardMovie.hbs'
const { searchInputRef, searchBtnRef,insertPoint } = getRefs();
const { fetchMovieSearchQuery } = fetchObj;

searchBtnRef.addEventListener('click', onSearchInput);

async function onSearchInput(e) {
  if (!searchInputRef.value.trim()) return;
  insertPoint.innerHTML = '';
  e.preventDefault();
  const results = await fetchMovieSearchQuery(searchInputRef.value);
  if (!results.lengths) {
    console.log(results);
    console.log(insertPoint);
    insertPoint.insertAdjacentHTML('beforeend', card(results))
    return;
  }
  
  //   renderGallery(resolve.hits);
}
