<template>
    <div class=" bg-gray-200 dark:bg-gray-900 mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
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
  
      <div class="border border-gray-300 bg-neutral-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Basic Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Product Name*</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  required
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter product name"
                >
              </div>
  
              <div>
                <label for="sku" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">SKU*</label>
                <input
                  type="text"
                  id="sku"
                  v-model="form.sku"
                  required
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter SKU"
                >
              </div>
  
              <div>
                <label for="category" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Category*</label>
                <select
                  id="category"
                  v-model="form.categoryId"
                  required
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-800 dark:text-gray-50"
                >
                  <option v-for="category in categories" :key="category.id" :value="category.id">
                    {{ category.categoryName }}
                  </option>
                </select>
              </div>
  
              <div>
                <label for="price" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Price (Rp)*</label>
                <input
                  type="number"
                  id="price"
                  v-model="form.price"
                  min="0"
                  step="0.01"
                  required
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter price"
                >
              </div>
            </div>
          </div>
  
          <div>
            <label for="description" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
              placeholder="Enter product description"
            ></textarea>
          </div>
  
          <div>
            <h2 class="text-xl font-semibold mb-4">Dimensions</h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <!-- Weight -->
              <div>
                <label for="weight" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Weight (gram)</label>
                <input
                  type="number"
                  id="weight"
                  v-model="form.weight"
                  min="0"
                  step="0.01"
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter weight"
                >
              </div>
  
              <div>
                <label for="width" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Width (cm)</label>
                <input
                  type="number"
                  id="width"
                  v-model="form.width"
                  min="0"
                  step="0.01"
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter width"
                >
              </div>
  
              <div>
                <label for="length" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Length (cm)</label>
                <input
                  type="number"
                  id="length"
                  v-model="form.length"
                  min="0"
                  step="0.01"
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter length"
                >
              </div>
  
              <div>
                <label for="height" class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Height (cm)</label>
                <input
                  type="number"
                  id="height"
                  v-model="form.height"
                  min="0"
                  step="0.01"
                  class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600"
                  placeholder="Enter height"
                >
              </div>
            </div>
          </div>
  
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Product Image</label>
            <div class="flex items-center space-x-4">
              <div v-if="imagePreview" class="w-32 h-32 rounded-lg overflow-hidden border">
                <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover">
              </div>
              <div class="flex-1">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="hidden"
                >
                <label for="image" class="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg inline-block">
                  {{ imagePreview ? 'Change Image' : 'Upload Image' }}
                </label>
                <p class="text-xs text-gray-500 dark:text-gray-200 mt-1">Recommended size: 800x800px</p>
              </div>
            </div>
          </div>
  
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:cursor-pointer hover:dark:text-black dark:text-gray-200"
            >
              Reset
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:cursor-pointer disabled:bg-blue-400"
            >
              <span v-if="isSubmitting">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
              <span v-else>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import apiClient from '../../services/api';
  
  interface Category {
    id: number;
    categoryName: string;
  }
  
  interface ProductForm {
    name: string;
    sku: string;
    categoryId: number | null;
    description: string;
    price: string;
    weight: string;
    width: string;
    length: string;
    height: string;
    imageFile: File | null;
  }
  
  const router = useRouter();
  const categories = ref<Category[]>([]);
  const imagePreview = ref<string | null>(null);
  const isSubmitting = ref(false);
  
  const form = ref<ProductForm>({
    name: '',
    sku: '',
    categoryId: null,
    description: '',
    price: '',
    weight: '',
    width: '',
    length: '',
    height: '',
    imageFile: null
  });

  const loadFormData = () => {
    const savedData = localStorage.getItem('productFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          if (key in form.value) {
            (form.value as any)[key] = parsedData[key];
          }
        });
      } catch (e) {
        console.error('Failed to parse saved form data', e);
      }
    }
  };

  const saveFormData = () => {
    const dataToSave = {
      ...form.value,
      imageFile: null // Don't save File object
    };
    localStorage.setItem('productFormData', JSON.stringify(dataToSave));
  };

  watch(form, (newValue) => {
    saveFormData();
  }, { deep: true });
  
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get('/product-categories');
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      form.value.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.value = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  
  const submitForm = async () => {
    isSubmitting.value = true;
    
    try {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('sku', form.value.sku);
      formData.append('categoryId', form.value.categoryId?.toString() || '');
      formData.append('description', form.value.description);
      formData.append('price', form.value.price);
      formData.append('weight', form.value.weight);
      formData.append('width', form.value.width);
      formData.append('length', form.value.length);
      formData.append('height', form.value.height);
      if (form.value.imageFile) {
        formData.append('image', form.value.imageFile);
      }
  
      await apiClient.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      router.push('/product');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const resetForm = () => {
    form.value = {
      name: '',
      sku: '',
      categoryId: null,
      description: '',
      price: '',
      weight: '',
      width: '',
      length: '',
      height: '',
      imageFile: null
    };
    imagePreview.value = null;
    localStorage.removeItem('productFormData');
  };
  
  onMounted(() => {
    fetchCategories();
    loadFormData();
  });
  </script>