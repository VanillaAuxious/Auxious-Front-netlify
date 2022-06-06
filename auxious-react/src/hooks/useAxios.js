import axios from 'axios';

async function useAxios(url, method = 'get', body = null, headers = null) {
  try {
    const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });
    const response = await API[`${method}`](url, body, headers);

    return response.data;
  } catch (error) {
    return error;
  }
}

export default useAxios;
