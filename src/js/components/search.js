import getRefs from '../refs/get-refs';
import fetchObj from '../API/api-service';
const { searchInputRef, searchBtnRef } = getRefs();
const { fetchMovieSearchQuery } = fetchObj;

searchBtnRef.addEventListener('click', onSearchInput);

async function onSearchInput(e) {
  if (!searchInputRef.value.trim()) return;
  //   galleryRef.innerHTML = '';
  e.preventDefault();
  const results = await fetchMovieSearchQuery(searchInputRef.value);
  if (!results.lengths) {
    console.log(results);
    return;
  }
  //   renderGallery(resolve.hits);
}
