import ACCESS from './api-authorization';

const axios = require('axios').default;

axios.defaults.baseURL = ACCESS.BASE_URL;
axios.defaults.headers.common.Authorization = ACCESS.AUTH_TOKEN;

const API = function () {
  this._page = 1;
  this._searchQuery = '';
  this._movieId = '';
};

// Фетч полной информации о трендах
API.prototype.fetchMovieTrending = async function () {
  try {
    const response = await axios.get('/trending/movie/day?');
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

// Фетч популярных фильмов
API.prototype.fetchMoviePopular = async function () {
  try {
    const response = await axios.get(`/movie/popular?page=${this._page}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

// Фетч по поисковому запросу
API.prototype.fetchMovieSearchQuery = async function () {
  console.log(this._page);
  try {
    const response = await axios.get(
      `/search/movie?&query=${this._searchQuery}&page=${this._page}`,
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

// Фетч описания фильма по его ID
API.prototype.fetchMovieDescription = async function () {
  try {
    const response = await axios.get(`/movie/${this._movieId}?`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// записывает новый _searchQuery
API.prototype._setQuery = function (newQuery) {
  this._searchQuery = newQuery;
};

// записывает новый _searchQuery
API.prototype._setId = function (newId) {
  this._movieId = newId;
};

//увеличить значение страницы на еденицу
API.prototype._incrementPage = function () {
  this._page += 1;
};

//уменьшить значение страницы на еденицу
API.prototype._decrementPage = function () {
  this._page -= 1;
};

export default API;
// export default {
//   // Фетч полной информации о трендах
//   async fetchMovieTrending() {
//     try {
//       const response = await axios.get('/trending/movie/day?');
//       return response.data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   // Фетч популярных фильмов
//   async fetchMoviePopular(page) {
//     try {
//       const response = await axios.get(`/movie/popular?page=${page}`);
//       return response.data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   // Фетч по поисковому запросу
//   async fetchMovieSearchQuery(searchQuery) {
//     try {
//       const response = await axios.get(`/search/movie?&query=${searchQuery}`);
//       return response.data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   // Фетч описания фильма по его ID
//   async fetchMovieDescription(movieId) {
//     try {
//       const response = await axios.get(`/movie/${movieId}?`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };
