import axios from 'axios';
import { getFirebaseToken } from './authService';
import { getAuth, signOut } from 'firebase/auth';
import { log, warn } from '@/utils/logger';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getFirebaseToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(undefined, async (error) => {
  if (error.response && error.response.status === 401) {
    warn('API Client', 'Unauthorized request, signing out user');
    const auth = getAuth();
    await signOut(auth);
    window.location.href = '/'; // Redirect to login page
  } else {
    log('API Client', 'Error in API response:', error);
  }
  return Promise.reject(error);
});

export default apiClient;
