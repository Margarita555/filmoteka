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
    const response = await axios.get(`/trending/movie/day?page=${this._page}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Фетч жанров
API.prototype.fetchMovieGenre = async function () {
  try {
    const response = await axios.get('/genre/movie/list?');
    const data = await response.data;
    const result = await data.genres;
    return result;
  } catch (error) {
    console.error(error);
  }
};

//Фетч популярных фильмов
API.prototype.fetchMoviePopular = async function () {
  try {
    const response = await axios.get(`/movie/popular?`);
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

// Фетч по поисковому запросу
API.prototype.fetchMovieSearchQuery = async function () {
  try {
    const response = await axios.get(
      `/search/movie?&query=${this._searchQuery}&page=${this._page}`,
    );
    return response.data;
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

// записывает новую страницу
API.prototype._setPage = function (newPage) {
  this._page = newPage;
};
// сбрас страниц
API.prototype._resetPage = function () {
  this._page = 1;
};

export default API;
