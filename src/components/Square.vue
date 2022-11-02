<script setup lang="ts">
const {value, active} = defineProps<{ value: number, active: boolean}>()

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
        <div v-if="value === 1" class="circle"></div>
        <div v-if="value === 2" class="cross"></div>
    </div>
</template>

<style scoped>


    .cross {
      background: red;
      height: 28px;
      position: relative;
      width: 6px;
      transform: rotate(45deg);
      border-radius: 10px;
    }
    .cross:after {
      background: red;
      content: "";
      height: 6px;
      left: -11px;
      position: absolute;
      top: 11px;
      width: 28px;
      border-radius: 10px;
    }
    .circle {
        height: 20px;  
        width: 20px;
        border-radius: 50%;
        border: 4px solid blue;
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
    background-color: yellow;
    }
</style>