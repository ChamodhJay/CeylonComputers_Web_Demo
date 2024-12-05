<template>
  <div>
    <section class="text-center mb-8 sm:mb-16 px-4">
      <h1 class="text-3xl sm:text-4xl font-bold mb-4">Welcome to TechRepair Hub</h1>
      <p class="text-lg sm:text-xl text-gray-600 mb-8">Your one-stop shop for computer parts and repair services</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink to="/products" class="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-center">
          Shop Products
        </NuxtLink>
        <NuxtLink to="/services" class="w-full sm:w-auto bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-center">
          Repair Services
        </NuxtLink>
      </div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 px-4">
      <div v-for="feature in features" :key="feature.title" class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
        <p class="text-gray-600">{{ feature.description }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  {
    title: 'Quality Computer Parts',
    description: 'Wide selection of premium computer components from trusted brands.'
  },
  {
    title: 'Mobile Repair Services',
    description: 'Professional repair services for smartphones and tablets.'
  },
  {
    title: 'Expert Support',
    description: 'Technical guidance and support from our experienced team.'
  }
];
</script>