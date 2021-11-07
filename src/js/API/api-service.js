import ACCESS from './api-authorization';

const axios = require('axios').default;

axios.defaults.baseURL = ACCESS.BASE_URL;
axios.defaults.headers.common.Authorization = ACCESS.AUTH_TOKEN;

export default {
  // Получение полной информации о трендах
  async fetchMovieTrending() {
    try {
      const response = await axios.get('/trending/movie/day?');
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  },
  // Фетч по поисковому запросу
  async fetchMovieSearchQuery(searchQuery) {
    try {
      const response = await axios.get(`/search/movie?&query=${searchQuery}`);
      return response.data.results;
    } catch (error) {
      console.error(error);
    }
  },
  // Фетч описания фильма по его ID
  async fetchMovieDescription(movieId) {
    try {
      const response = await axios.get(`/movie/${movieId}?`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

// export default class API {
//   constructor() {
//     this.searchQuery = '';
//     this.movieId = '';
//   }

//   async fetchMovieTrending() {
//     try {
//       const response = await axios.get('/trending/movie/day?');
//       return response.data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async fetchMovieSearchQuery() {
//     try {
//       const response = await axios.get(`/search/movie?&query=${this.searchQuery}`);
//       return response.data.results;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }

//   async fetchMovieDescription() {
//     try {
//       const response = await axios.get(`/movie/${this.movieId}?`);
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   get id() {
//     return this.movieId;
//   }

//   set id(newMovieId) {
//     this.movieId = newMovieId;
//   }
// }
