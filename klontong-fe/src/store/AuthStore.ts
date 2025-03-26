// src/stores/auth.ts
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import apiClient from '../services/api.ts';

export const useAuthStore = defineStore('auth', {
  // State
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null as any | null,
  }),

  // Getters
  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  // Actions
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    },

    clearToken() {
      // const router = useRouter();
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      delete apiClient.defaults.headers.common['Authorization'];
      // router.push('/');
    },

    async login(credentials: { email: string; password: string }) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        this.setToken(response.data.access_token);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  }
});