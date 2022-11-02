<script setup lang="ts">
const {value, active} = defineProps<{ value: number, active: boolean}>()
import Symbol from './Symbol.vue';

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
      <Symbol :value="value"/>
    </div>
</template>

<style scoped>
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