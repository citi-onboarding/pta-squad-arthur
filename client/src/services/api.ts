import axios from 'axios';

// api para desenvolvimento local 'http://localhost:3001'
// api para deploy '...'

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;