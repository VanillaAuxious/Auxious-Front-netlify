import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export async function askServerToken(clientId, token) {
  const response = await API.post(
    'users/login',
    {
      clientId,
      token: `Bearer ${token}`,
    },
    {
      withCredentials: true,
    },
  );

  return response.data;
}

