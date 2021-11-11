import API from '../API/api-service';

const api = new API();

async function createCardData(result) {
  const genres = await api.fetchMovieGenre();

  let cardList = [];

  cardList = result.map(
    ({ genre_ids, release_date, backdrop_path, poster_path, original_title, vote_average, id }) => {
      const genreList = [];

      if (genre_ids) {
        genre_ids.forEach(id => {
          const genre = genres.find(genre => genre.id === id);

          if (genre && genreList.length <= 3) {
            genreList.push(genre.name);
          }
        });
      }

      const date = release_date ? release_date.slice(0, 4) : '';

      return {
        backdrop_path,
        poster_path,
        original_title,
        vote_average,
        release_date: date,
        id,
        genres: genreList,
      };
    },
  );
  return cardList;
}

export default createCardData;
