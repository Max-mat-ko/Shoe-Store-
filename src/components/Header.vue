<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  totalPrice: Number
})


const emit = defineEmits(['openDrawer']);
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">


     <RouterLink to="/">
      <div class="flex items-center gap-4">
      <img src="/logo.png" alt="logo" class="w-10">
      <div>
        <h2 class="text-xl font-bold uppercase">Shoe-Store</h2>
        <p class="text-slate-500">The best sneakers store</p>
      </div>
    </div>
  </RouterLink>


    
    <ul class="flex items-center gap-10">
      <li 
        @click="emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/cart.svg" alt="Cart">
        <b>{{ totalPrice }} $.</b>
      </li>



     <RouterLink to="/favorites">
       <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/heart.svg" alt="Cart">
        <span>Favorites</span>
      </li>
     </RouterLink>


      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Cart">
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>