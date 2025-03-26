<template>
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Left Section - Image -->
          <div class="w-full md:w-1/2 bg-blue-600 dark:bg-blue-800 p-8 flex items-center justify-center">
            <div class="text-center text-white">
              <a href="#" class="flex items-center justify-center mb-6 text-2xl font-semibold">
                Klontong APP
              </a>
              <p class="mb-6">Sign in to manage your products!</p>
              <img 
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" 
                alt="Login Illustration"
                class="w-full max-w-xs mx-auto"
              >
            </div>
          </div>
  
          <!-- Right Section - Form -->
          <div class="w-full md:w-1/2 p-8">
            <div class="p-6 space-y-4 md:space-y-6">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    v-model="form.email" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="name@company.com" 
                    required
                  >
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    v-model="form.password" 
                    placeholder="••••••••" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required
                  >
                </div>
                <button 
                  type="submit" 
                  class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-300"
                  :disabled="loading"
                >
                  <span v-if="loading">
                    <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                  <span v-else>Sign in</span>
                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account yet? 
                  <router-link to="/register" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign up</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../store/AuthStore';
  
  const router = useRouter();
  const authStore = useAuthStore();
  const loading = ref(false);
  
  const form = reactive({
    email: '',
    password: ''
  });
  
  const handleLogin = async () => {
    try {
      loading.value = true;
      await authStore.login({
        email: form.email,
        password: form.password
      });
      router.push('/product');
    } catch (error :any) {
        if (error.response) {
            if (error.response.status === 401) {
                alert("Invalid Credentials");
            } else if (error.response.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Login failed. Please try again.");
            }
        } else if (error.request) {
            alert("Network error. Please check your connection.");
        } else {
            alert("An unexpected error occurred.");
        }
    } finally {
      loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  </style>