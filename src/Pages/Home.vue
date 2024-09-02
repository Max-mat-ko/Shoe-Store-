<script setup>
import { reactive, watch, ref, onMounted, inject } from 'vue';
import axios from 'axios';
import debounce from 'lodash.debounce';
import CardList from '../components/CardList.vue';


const { addToCart, removeFromCart, cart } = inject('cart');

const items = ref([]);


const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
});


const onCleckAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item); 
  } else { 
    removeFromCart(item); 
  }
    
  console.log(cart.value);  
}


const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};


const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 500);


const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_Id: item.id
      };  

      const { data } = await axios.post('https://7fbc3abfc2152472.mokky.dev/favorites', obj);
      item.isFavorite = true;
      item.favoritedId = data.id;
    } else {
      await axios.delete(`https://7fbc3abfc2152472.mokky.dev/favorites/${item.favoritedId}`);
      item.isFavorite = false;
      item.favoritedId = null;
    }
  } catch (err) {
    console.error(err);
  }
};


const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://7fbc3abfc2152472.mokky.dev/favorites');

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_Id === item.id);

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoritedId: favorite.id,
      };
    });
  } catch (err) {
    console.error(err);
  }
};



const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await axios.get('https://7fbc3abfc2152472.mokky.dev/items', { params });

    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoritedId: null,
      isAdded: false,
    }));
  } catch (err) {
    console.error(err);
  }
};


onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fetchFavorites();

   items.value = items.value.map((imem) => ({
    ...imem,
    isAdded: cart.value.some((CartItem) => CartItem.id === imem.id)
  }));
});



watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  })) 
})


watch(filters, fetchItems);
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">All sneakers</h1>
        
        <div class="flex items-center gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none">
            <option value="name">By name</option>
            <option value="price">By price (cheap)</option>
            <option value="-price">By price (expensive)</option>
          </select>
          <div class="relative">
            <input
              @input="onChangeSearchInput"
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Search..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/search.svg" />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" @add-to-favorite="addToFavorite" @add-to-cart="onCleckAddPlus"/>
      </div>
    </div>

    
</template>