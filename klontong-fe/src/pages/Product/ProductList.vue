<template>
  <div class="mx-auto px-4 py-8 bg-gray-200 dark:bg-gray-900">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Our Products</h1>
      <RouterLink to="/product/add">
        <button 
          class="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New
        </button>
      </RouterLink>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <div class="relative max-w-md">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          v-model="searchQuery"
          @input="handleSearchInput"
          type="search" 
          class="block w-full p-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Search products..."
        >
      </div>
    </div>
    
    <div v-if="loading && products.length === 0" class="flex justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div 
      ref="productGrid"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div 
        v-for="product in products" 
        :key="product.id" 
        @click="handleDetail(product.id)"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:cursor-pointer transition-shadow duration-300"
      >
        <div class="relative pb-[100%] overflow-hidden">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-300"
          >
        </div>

        <div class="p-3">
          <h3 class="font-medium text-gray-800 mb-1 line-clamp-2 h-12">
            {{ product.name }}
          </h3>
          <div class="mt-2">
            <p class="text-red-600 font-bold text-lg">
              Rp{{ formatPrice(product.price) }}
            </p>
          </div>
          <div class="mt-1">
            <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {{ product.category.categoryName }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="loading && products.length > 0" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-if="!hasMore && products.length > 0" class="text-center py-6 text-gray-500">
      No more products to load
    </div>

    <div v-if="!loading && products.length === 0" class="text-center py-12">
      <p class="text-gray-500">No products found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../../services/api';

const router = useRouter();

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

const products = ref<Product[]>([]);
const loading = ref(false);
const hasMore = ref(true);
const searchQuery = ref('');
const searchTimeout = ref<NodeJS.Timeout | null>(null);
const page = ref(1);
const limit = 10;
const productGrid = ref<HTMLElement | null>(null);

const fetchProducts = async () => {
  if (!hasMore.value || loading.value) return;

  loading.value = true;
  
  try {
    const response = await apiClient.get('/products', {
      params: {
        limit,
        page: page.value,
        search: searchQuery.value
      }
    });

    const newProducts = response.data.data;
    
    if (newProducts.length < limit) {
      hasMore.value = false;
    }

    products.value = [...products.value, ...newProducts];
    page.value++;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleSearchInput = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }

  searchTimeout.value = setTimeout(() => {
    resetPagination();
    fetchProducts();
  }, 500);
};

const resetPagination = () => {
  products.value = [];
  page.value = 1;
  hasMore.value = true;
};

const handleDetail = (id: number) => {
  router.push(`/product/${id}`);
};

const formatPrice = (price: string) => {
  return parseFloat(price).toLocaleString('id-ID');
};

const handleScroll = () => {
  if (!productGrid.value || loading.value || !hasMore.value) return;

  const gridRect = productGrid.value.getBoundingClientRect();
  const scrollPosition = window.innerHeight + window.scrollY;
  
  if (scrollPosition > gridRect.bottom - 300) {
    fetchProducts();
  }
};

// Initialize
onMounted(() => {
  fetchProducts();
  window.addEventListener('scroll', handleScroll);
});

// Cleanup
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>