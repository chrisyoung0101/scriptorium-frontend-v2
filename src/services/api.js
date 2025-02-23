import axios from 'axios';
import qs from 'qs'; // For serializing data into x-www-form-urlencoded format

// Create Axios instance with Netlify proxy
const api = axios.create({
  baseURL: '/api', // ✅ Uses Netlify proxy (_redirects handles this)
  headers: {
    'Content-Type': 'application/json', // Default for GET requests
  },
});

// Helper method for POST with URL-encoded data
export const postUrlEncoded = async (url, data) => {
  const serializedData = qs.stringify(data); // Convert JSON to x-www-form-urlencoded

  return api.post(url, serializedData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', // Override Content-Type
    },
  });
};

export default api;
