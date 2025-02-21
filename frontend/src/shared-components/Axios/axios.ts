// eslint-disable-next-line no-restricted-imports
import axios from 'axios';

export const Axios = axios.create({
  baseURL: `${process.env?.CRAPMAP_DEFINE_URL ? process.env.BACKEND_PROXY : ''}/api`, // use env variable to determine url to retrieve from
  timeout: 12 * 1000,
});
