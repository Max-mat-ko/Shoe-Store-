<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://7fbc3abfc2152472.mokky.dev/favorites?_relations=items'
    )

    favorites.value = data.map((obj) => obj.item)
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Favorites</h1>

    <CardList :items="favorites" is-favorite />
  </div>
</template>
