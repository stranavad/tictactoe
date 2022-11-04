<script setup lang="ts">
import Symbol from './Symbol.vue';
const {value, active} = defineProps<{ value: number, active: boolean, won: boolean, rotation: number}>()

const emit = defineEmits(['trigger'])

const onClick = () => {
    if(value){
      return;
    }
    emit("trigger")
}
</script>



<template>
    <div :class="{'square-div': true,'active': active}" @click="onClick">
      <Symbol :value="value" :active="active"/>
      <div v-if="won" class="won-line" :style="`transform: rotate(${rotation}deg)`" />
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