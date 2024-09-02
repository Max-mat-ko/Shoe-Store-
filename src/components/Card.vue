<script setup>

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})


</script>

<template>
  <div class="relative m-10 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 transition hover:shadow-xl">

    <img 
      v-if="onClickFavorite"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'" 
      alt="Favorite" 
      class="absolute top-8 left-8" 
      @click="onClickFavorite" 
    />

    <img :src="imageUrl" alt="Sneakers" />

    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Price</span>
        <b>{{ price }} $</b>
      </div>

      <!-- Обновление изображения при добавлении товара в корзину -->
      <img 
        v-if="onClickAdd"
        :src="isAdded ? '/checked.svg' : '/plus.svg'" 
        alt="Add to Cart" 
        @click="onClickAdd" 
        class="cursor-pointer"
      />
    </div>
  </div>
</template>
