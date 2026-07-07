import axios from 'axios';
import config from './env.config.js'
import { fetchAccessToken } from '../services/nomba.service.js'

const api = axios.create({
  baseURL: config.NOMBA_API_URL || 'https://api.nomba.com',
  headers: {
    'Content-Type': 'application/json',
    'accountId': config.NOMBA_MAIN_ACCOUNT_ID,
  }
});

api.interceptors.request.use(
  async (config) => {
    const access_token = await fetchAccessToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;