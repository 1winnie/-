<!--  -->
<template>
 <div>
    <MealsFilter/>
   <div class="box" ref="box" @scroll="getscollTop">
      <Video :box="scrolltop"/>
    <Meals :desc="true" :meals="meals.filterMeals"/>
   </div>
   <!-- <router-view></router-view> -->
    <NavBar/>
 </div>
</template>

<script setup>
import {reactive , toRefs ,ref} from 'vue'
import MealsFilter from '../../components/MealsFilter/MealsFilter.vue';
import Meals from '../../components/Meals/Meals.vue';
import NavBar from '../../components/NavBar/index.vue'
import { useMealsStore } from '../../store/meals';
import Video from '../../components/Video/index.vue'
const meals = useMealsStore()
const box = ref()
const scrolltop = ref()
const getscollTop = (e)=>{
   scrolltop.value = e.target.scrollTop
}
</script>
<style lang='less' scoped>
   .box{
      height: 100vh;
      width: 100%;
      overflow-y: scroll;
   }
</style>