<script setup lang="ts">
  import {createApp} from 'vue'
  import Squares from "./components/Squares.vue"
  createApp({}).mount('#app')

</script>

<template>
  <Squares :rows="15" :cols="15"/>
</template>



<style scoped>

</style>
