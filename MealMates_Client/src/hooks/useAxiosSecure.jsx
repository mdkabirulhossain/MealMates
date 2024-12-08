import axios from 'axios';

const axiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(function (config) {
    
    const token = localStorage.getItem('access-token')
    console.log("Request stop by interceptors", token);
   config.headers.authorization = `Bearer ${token}`
   
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })

  return axiosSecure; 
};

export default useAxiosSecure;