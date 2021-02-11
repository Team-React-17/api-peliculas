import axios from 'axios';
import { dbMovies } from '../environment/environment';

const { API_KEY } = dbMovies;
const BASE_URL = 'https://api.themoviedb.org/3/';
const params = {
  api_key: API_KEY,
  include_adult: false
};

const api = axios.create();

export default {
  getLatestMovies: async () =>
    await api.get(`${BASE_URL}movie/popular`, { params }),

  getUpcomingMovies: async () =>
    await api.get(`${BASE_URL}movie/upcoming`, { params }),

  getGenres: async () =>
    await api.get(`${BASE_URL}genre/movie/list`, { params }),

  getMoviesByGenres: async (genreId: number) => {
    const customParams: any = {
      ...params,
      with_genres: genreId.toString()
    };

    return await api.get(`${BASE_URL}discover/movie`, { params: customParams });
  },

  getSearch: async (string: string) => {
    if (string) {
      Object.assign(params, { query: string.toString() });
    }

    return await api.get('https://api.themoviedb.org/3/search/movie', {
      params
    });
  }
};
