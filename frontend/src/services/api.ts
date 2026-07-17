import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.biosaude.com/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para injetar token JWT e header X-Store-ID
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('biosaude-auth-storage');
    if (authStorage) {
      try {
        const parsed = JSON.parse(authStorage);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error parsing token from store', e);
      }
    }

    const storeConfigStorage = localStorage.getItem('biosaude-store-config');
    if (storeConfigStorage) {
      try {
        const parsed = JSON.parse(storeConfigStorage);
        const storeId = parsed?.state?.config?.id;
        if (storeId) {
          config.headers['X-Store-ID'] = storeId;
        }
      } catch (e) {
        console.error('Error parsing store id', e);
      }
    }
  }
  return config;
});

export default api;
