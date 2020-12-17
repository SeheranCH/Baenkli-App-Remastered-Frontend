import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASEURL
});

api.interceptors.request.use(
  request => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  request => {
    const info = `REQUEST ${request.method.toLocaleUpperCase()} ${request.url}`;

    if(request.method.toLocaleLowerCase() === "get") {
      console.debug(info);
    } else {
      console.debug(info, request.data);
    }

    return request;
  },
  Promise.reject
)

api.interceptors.response.use(
  response => {
    
    console.debug(`RESPONSE ${response.config.method.toLocaleUpperCase()} ${response.config.url}`, response.data);

    return response;
  },
  error => Promise.reject(error)
)

api.all = axios.all;
export default api;
