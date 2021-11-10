import API from '../API/api-service';
import getRefs from '../refs/get-refs';
import card from '../../handlebars/cardMovie.hbs';

const { insertPoint, homeLink, libraryLink, headerForm, headerButton } = getRefs();

const api = new API();
api
  .fetchMovieTrending()
  .then(result => {
    let newResult = result.map(el => ({
      ...el,
      release_date: el.release_date.split('-')[0],
    }));
    api
      .genre()
      .then(genresList => {
        console.log(genresList);
      })
      .catch(err => {
        console.log(err);
      });

    // result = genresList.map((x) => ({ genre_ids: x.id, name: x.name }))
    // console.log(result);

    insertPoint.insertAdjacentHTML('beforeend', card(newResult));
    homeLink.classList.add('active');
    libraryLink.classList.remove('active');
    headerForm.classList.remove('disabled');
    headerButton.classList.add('disabled');
  })
  .catch(err => {
    console.log(err);
  });
