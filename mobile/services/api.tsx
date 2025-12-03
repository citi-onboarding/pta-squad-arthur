import axios from 'axios';

// IMPORTANTE:
// 1. Substitua '192.168.1.15' pelo SEU Endereço IPv4.
// 2. Mantenha a porta :3001 (ou a porta que seu backend usa).
// 3. Certifique-se que seu celular e PC estão no MESMO Wi-Fi.

const api = axios.create({
  baseURL: 'http://localhost:3001', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;