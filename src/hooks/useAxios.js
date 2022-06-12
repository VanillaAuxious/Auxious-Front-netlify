import axios from 'axios';

import { DEV, PROD } from '../utils/constants';

async function useAxios(url, method = 'get', body = null, headers = null) {
  let API_URL = null;

  if (process.env.REACT_APP_ENV === DEV) {
    API_URL = process.env.REACT_APP_API_URL_LOCAL;
  }

  if (process.env.REACT_APP_ENV === PROD) {
    API_URL = process.env.REACT_APP_API_URL_PROD;
  }

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
