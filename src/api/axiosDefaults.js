import axios from "axios";

axios.defaults.baseURL = 'https://ci-pp5-nexus-drf-danpearce.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
