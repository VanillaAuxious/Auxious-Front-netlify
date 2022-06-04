import axios from 'axios';

const API = axios.create({ url: process.env.REACT_APP_API_URL });

export async function askServerToken(token) {
  const response = await API.post('/users/login', { token: `BEARER ${token}` });
  return response.data;
}
