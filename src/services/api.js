import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // ✅ Uses Netlify proxy
});

export default api;
