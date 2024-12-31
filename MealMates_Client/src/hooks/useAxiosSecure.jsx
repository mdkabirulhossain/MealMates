import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// Create a single Axios instance
const axiosSecure = axios.create({
  baseURL: 'https://meal-mates-server-mu.vercel.app', // Use environment variables for production
});

// Interceptors should be registered once
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      console.log('Request intercepted, token:', token);
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      console.log('Status error in the interceptor:', status);

      // Handle unauthorized (401) and forbidden (403) responses
      if (status === 401 || status === 403) {
        const { logOut } = useAuth(); // Ensure logOut is asynchronous
        const navigate = useNavigate(); // Keep navigation in scope

        try {
          await logOut(); // Log the user out
          navigate('/login'); // Redirect to the login page
        } catch (logoutError) {
          console.error('Error during logout:', logoutError);
        }
      }
    } else {
      console.error('No response object in error:', error);
    }
    return Promise.reject(error);
  }
);

// Hook to use the Axios instance
const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
