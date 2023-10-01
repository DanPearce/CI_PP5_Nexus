/* Imports */
import axios from 'axios';

// Unique URL for deployed API site
axios.defaults.baseURL = 'https://ci-pp5-nexus-drf-danpearce.herokuapp.com/'
// Data Format
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// Helps to resolve CORS errors
axios.defaults.withCredentials = true;

// Used for refreshing access tokens
export const axiosReq = axios.create();
export const axiosRes = axios.create();
