/* Imports */
import axios from 'axios';

// Unique URL for deployed API site
// Set VITE_API_URL to point a local copy at a local API
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://nexus-api.danielpearce.co.uk/'
// Data Format
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
// Helps to resolve CORS errors
axios.defaults.withCredentials = true;

// Used for refreshing access tokens
export const axiosReq = axios.create();
export const axiosRes = axios.create();
