import API from '../API/api-service';
import comingSoon from '../../images/coming-soon.jpg';

const api = new API();

async function createModalFilmData(id) {
  api._setId(id);

  const description = await api.fetchMovieDescription();

  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
    backdrop_path,
  } = description;

  const poster = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : comingSoon;
  const backdrop = backdrop_path ? `https://image.tmdb.org/t/p/w500${backdrop_path}` : comingSoon;

  return {
    id,
    poster,
    title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
    backdrop,
  };
}

export default createModalFilmData;
