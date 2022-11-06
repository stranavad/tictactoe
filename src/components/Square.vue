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
      <div v-if="data.won" class="won-line" :style="`transform: rotate(${data.rotation}deg)`" />
    </div>
</template>

<style scoped>

  .won-line {
    height: 4px;
    width: 56px;
    background-color: white;
    position: absolute;
    margin: auto;
    transform-origin: center;
    border-radius: 8px; 
  }

  
    .square-div{
        border: 1px solid lightgray;
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .active {
      background-color: #ffffffcc;
    }
</style>