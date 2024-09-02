<script setup>
import Card from './Card.vue';

defineProps({
  items: Array,
  isFavorite: Boolean,
});

const emit = defineEmits(['addToFavorite', 'addToCart']);

function handleAddToFavorite(item) {
  emit('addToFavorite', item);
}

function handleAddToCart(item) {
  emit('addToCart', item);
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickFavorite="isFavorite ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorite ? null : () => emit('addToCart', item)"
    />
  </div>
</template>
