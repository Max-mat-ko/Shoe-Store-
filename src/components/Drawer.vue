<script setup>
import axios from 'axios';
import { ref, inject, computed } from 'vue';

import DrawerHead from './DrawerHead.vue';
import CartItemList from './CartItemList.vue';
import InfoBlock from './InfoBlock.vue';



const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart, closeDrawer } = inject('cart');

const isCreating = ref(false);
const orderId = ref(false);

const createOrder = async () => {
  try {
    isCreating.value = true;
    const { data } = await axios.post('https://7fbc3abfc2152472.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice.value
    })

    cart.value = []

    orderId.value = data.id

    return data;
  } catch (err) {
    console.error(err);
  } finally {
    isCreating.value = false;
  }
}


const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisebled = computed(() => isCreating.value || cartIsEmpty.value)

</script>

<template>
  <div>
  <div 
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    @click="closeDrawer"></div>
    <DrawerHead />

  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">



    <div  v-if="!totalPrice || orderId" class="flex h-full items-center">
    <InfoBlock 
    v-if="!totalPrice && !orderId"
     title="Cart is empty"
     description="Please add at least one pair of sneakers to place an order." 
     image-url="/package-icon.png" 
     />

     <InfoBlock 
     v-if="orderId"
     title="Order placed "
     :description="`Your order #${orderId} will soon be transferred to courier delivery.`" 
     image-url="/order-success-icon.png" 
     
     />

     </div>



    <div v-else> 

    <CartItemList /> 
    
    <div v-if="totalPrice">
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex items-end gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">{{ totalPrice }} руб.</span>
        </div>

        <div class="flex items-end gap-2">
          <span>Tax 5%:</span>
          <div class="flex-1 border-b border-dashed" />
          <span class="font-bold">{{ vatPrice }} руб.</span>
        </div>
      </div>

      <button
        :disabled="buttonDisebled"
        @click="createOrder"
        class="flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600"
        >
        Place an order
        <img src="/arrow-next.svg" alt="Arrow" />
      </button>
    </div>  
      </div> 
  </div>
  </div>
</template>
