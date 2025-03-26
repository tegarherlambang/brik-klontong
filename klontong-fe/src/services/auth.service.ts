// src/services/auth.service.ts
import apiClient from './api.ts';
import { useAuthStore } from '@/store/AuthStore.ts';

export default {
  async login(email: string, password: string) {
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });

      const authStore = useAuthStore();
      authStore.setToken(response.data.access_token);
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
      const authStore = useAuthStore();
      authStore.clearToken();
  },
};