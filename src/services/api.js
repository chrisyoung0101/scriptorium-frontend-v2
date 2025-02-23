import axios from 'axios';

await api.post('/documents', payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  
