import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api', // Updated backend base URL to correct port
});

export default api;
