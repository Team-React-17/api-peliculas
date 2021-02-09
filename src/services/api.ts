import axios from 'axios';
import { dbMovies } from '../environment/environment';

const { API_KEY } = dbMovies;
const BASE_URL = 'https://api.themoviedb.org/3/';
const params = {
  api_key: API_KEY
};

const api = axios.create();

export default {
  getLatestMovies: async () =>
    await api.get(`${BASE_URL}movie/popular`, { params }),
  getUpcomingMovies: async () =>
    await api.get(`${BASE_URL}movie/upcoming`, { params })
};
