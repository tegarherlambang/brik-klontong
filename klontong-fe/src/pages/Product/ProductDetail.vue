<template>
    <div class="bg-gray-200 dark:bg-gray-900 min-h-screen">
    
      <div class="container mx-auto px-4 py-6">
        <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Product Detail</h1>
        <router-link 
          to="/product"
          class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Back to Products
        </router-link>
      </div>
        <div class="bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div class="relative pb-[60%] mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="absolute h-full w-full object-contain"
                >
              </div>
            </div>
  
            <!-- Product Info -->
            <div>
              <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ product.name }}</h1>
              <div class="mb-4">
                <p class="text-3xl font-bold text-red-600 dark:text-red-500">Rp{{ formatPrice(product.price) }}</p>
              </div>
  
              <!-- Product Detail -->
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                 <!-- Left Column -->
                <div>
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Category</h3>
                        <p class="text-gray-900 dark:text-white">{{ product.category?.categoryName }}</p>
                    </div>
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">SKU</h3>
                        <p class="text-gray-900 dark:text-white">{{ product.sku }}</p>
                    </div>
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</h3>
                        <p class="text-gray-900 dark:text-white">{{ product.weight }} gram</p>
                    </div>
                </div>
                
                <!-- Right Column -->
                <div>
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Dimensions</h3>
                        <p class="text-gray-900 dark:text-white">{{ product.length }}cm (L) × {{ product.width }}cm (W) × {{ product.height }}cm (H)</p>
                    </div>
                    <div class="mb-4">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                        <p class="text-gray-900 dark:text-white">{{ product.description }}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import apiClient from '../../services/api';
  
  interface Category {
    id: number;
    categoryName: string;
  }
  
  interface Product {
    id: number;
    category: Category;
    categoryId: number;
    sku: string;
    name: string;
    description: string;
    weight: string;
    width: string;
    length: string;
    height: string;
    image: string;
    price: string;
  }
  
  const route = useRoute();
  const product = ref<Product>({} as Product);
  const loading = ref(true);
  
  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString('id-ID');
  };
  
  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(`/products/${route.params.id}`);
      product.value = response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchProduct();
  });
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>