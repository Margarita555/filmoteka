import API from '../API/api-service';

const api = new API();

async function createCardData(result) {
  const genres = await api.genre();

  let cardList = [];

  cardList = result.map(card => {
    const genreList = [];

    if (card.genre_ids) {
      card.genre_ids.forEach(id => {
        const genre = genres.find(genre => genre.id === id);

        if (genre && genreList.length <= 3) {
          genreList.push(genre.name);
        }
      });
    }

    const date = card.release_date ? card.release_date.slice(0, 4) : '';

    return {
      backdrop_path: card.backdrop_path,
      poster_path: card.poster_path,
      original_title: card.original_title,
      vote_average: card.vote_average,
      release_date: date,
      id: card.id,
      genres: genreList,
    };
  });
  return cardList;
}

export default createCardData;
