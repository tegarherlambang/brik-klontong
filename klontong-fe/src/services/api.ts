import axios from 'axios';
import { useAuthStore } from '../store/AuthStore.ts';
import { useRouter } from 'vue-router';

// Create the global axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor to inject the auth token
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    
    // Handle unauthorized errors
    
    if (error.response?.status === 401) {
      authStore.clearToken();
      window.location.href = '/';
    }
    
    // Handle other common errors
    if (error.response?.status >= 500) {
      console.error('Server error:', error);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;