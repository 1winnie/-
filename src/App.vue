<script setup>
import {useMealsStore} from './store/meals'
const meals = useMealsStore()
console.log(meals.$state)
sessionStorage.setItem("store",JSON.stringify(meals.$state))

</script>

<template>
  <router-view></router-view>
</template>

