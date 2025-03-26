<template>
    <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div class="flex flex-col md:flex-row">
          <!-- Left Section - Image -->
          <div class="w-full md:w-1/2 bg-blue-600 dark:bg-blue-800 p-8 flex items-center justify-center">
            <div class="text-center text-white">
              <h2 class="text-2xl font-bold mb-4">Welcome to Klontong APP</h2>
              <p class="mb-6">You can manage your product by register now!</p>
              <img 
                src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg" 
                alt="Registration Illustration"
                class="w-full max-w-xs mx-auto"
              >
            </div>
          </div>
  
          <!-- Right Section - Form -->
          <div class="w-full md:w-1/2 p-8">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Account</h1>
            
            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address*</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="your@email.com" 
                >
              </div>
  
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password*</label>
                <input 
                  type="password" 
                  id="password" 
                  v-model="form.password"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="••••••••" 
                >
              </div>
  
              <div>
                <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password*</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  v-model="form.confirmPassword"
                  required
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="••••••••" 
                >
              </div>
  
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input 
                    id="terms" 
                    type="checkbox" 
                    v-model="form.acceptTerms"
                    required
                    class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                  >
                </div>
                <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  I agree to the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">Terms and Conditions</a>
                </label>
              </div>
  
              <button 
                type="submit" 
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
                <span v-else>Register</span>
              </button>
  
              <!-- Login Link -->
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? 
                <router-link to="/" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login here</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import apiClient from '../services/api';
    
    const router = useRouter();
    const isSubmitting = ref(false);
    const errorMessage = ref('');
    
    const form = ref({
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    });
    
    const handleSubmit = async () => {
        if (form.value.password !== form.value.confirmPassword) {
            alert ("Passwords don't match!");
            return
        }

        if (!form.value.acceptTerms) {
            alert("You must accept the terms and conditions");
            return;
        }

        isSubmitting.value = true;
        errorMessage.value = '';

        try {
            await apiClient.post('/auth/register', {
              email: form.value.email,
              password: form.value.password
            });

            router.push({path: '/'});
            
        } catch (error: any) {
            if (error.response) {
              if (error.response.status === 409) {
                   alert("Email already exists");
              } else if (error.response.data?.message) {
                  alert(error.response.data.message);
              } else {
                  alert("Registration failed. Please try again.");
              }
            } else if (error.request) {
              alert("Network error. Please check your connection.");
            } else {
              alert("An unexpected error occurred.");
            }
        } finally {
            isSubmitting.value = false;
        }
        };

  </script>
  
  <style scoped>
  </style>