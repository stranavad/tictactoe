<script setup lang="ts">
  import {createApp} from 'vue'
  import Squares from "./components/Squares.vue"
  createApp({}).mount('#app')

</script>

<template>
  <Squares :rows="25" :cols="25"/>
</template>



<style scoped>

</style>
