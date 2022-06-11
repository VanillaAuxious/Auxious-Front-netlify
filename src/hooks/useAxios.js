import axios from 'axios';

async function useAxios(url, method = 'get', body = null, headers = null) {
  const API_URL =
    process.env.REACT_APP_ENV === 'development'
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_API_URL_PROD;

  try {
    const API = axios.create({
      baseURL: API_URL,
      withCredentials: true,
    });

    const response = await API[method](url, body, headers);

    return response.data;
  } catch (error) {
    return error;
  }
}

export default useAxios;
