<script setup lang="ts">
import {reactive,  watch} from 'vue'

const {value, activeIndex, currentIndex} = defineProps<{ value: number, activeIndex: {line: number, item: number}, currentIndex: {line: number, item: number}}>()

const emit = defineEmits(['trigger'])
const isActive = reactive({active: false})

watch(() => `${activeIndex.item}|${activeIndex.line}`, () => {
  isActive.active = activeIndex.item === currentIndex.item && activeIndex.line === currentIndex.line;
})

const onClick = () => {
    emit("trigger")
}

</script>



<template>
    <div :class="{'square-div': true,'active': isActive.active}" @click="onClick">{{value}}</div>
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