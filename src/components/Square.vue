<script setup>
import Symbol from './Symbol.vue';
const {data} = defineProps(['data'])

const emit = defineEmits(['trigger'])

const onClick = () => {

    if(data.value){
      return;
    }
    emit("trigger")
}
</script>



<template>
    <div :class="{'square-div': true,'active': data.active}" @click="onClick">
      <Symbol :value="data.value" data.active="active"/>
      <div v-if="data.won && data.rotation == 0" class="won-line-hor" />
      <div v-if="data.won && data.rotation == 90" class="won-line-ver" />
      <div v-if="data.won && data.rotation == 45" class="won-line-dileft" />
      <div v-if="data.won && data.rotation == 135" class="won-line-diright" />
    </div>
</template>

<style scoped>

  .won-line-hor {
    height: 4px;
    width: 56px;
    background-color: white;
    position: absolute;
    z-index: 10;
    margin: auto;
    transform-origin: center;
    border-radius: 8px;
    rotate: 0deg;
  }
  .won-line-ver {
    height: 4px;
    width: 56px;
    background-color: white;
    position: absolute;
    z-index: 10;
    margin: auto;
    transform-origin: center;
    border-radius: 8px;
    rotate: 90deg;
  }
  .won-line-dileft {
    height: 4px;
    width: 56px;
    background-color: white;
    position: absolute;
    z-index: 10;
    margin: auto;
    transform-origin: center;
    border-radius: 8px;
    rotate: 45deg;
  }
  .won-line-diright {
    height: 4px;
    width: 56px;
    background-color: white;
    position: absolute;
    z-index: 10;
    margin: auto;
    transform-origin: center;
    border-radius: 8px;
    rotate: 135deg;
  }

  
    .square-div{
        border: 1px solid lightgray;
        width: 35px;
        height: 35px;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;

    }
    .active {
      background-color: lightgray;
    }
</style>