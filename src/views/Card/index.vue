<!--  -->
<template>
 <div>
    <CartDetails/>
    <CartBar />
    <NavBar/>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref} from 'vue'
import CartBar from '../../components/Cart/CartBar.vue';
import CartDetails from '../../components/Cart/CartDetails.vue';
import NavBar from '../../components/NavBar/index.vue';
const state = reactive({
   total:''
})

</script>
<style lang='less' scoped>
</style>