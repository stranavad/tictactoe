<script setup lang="ts">
import { ref, watch } from 'vue'

const {value, active} = defineProps<{ value: number, active: boolean}>()

const emit = defineEmits(['trigger'])

watch(() => active, () => {
    console.log(active)
})

const onClick = () => {
    emit("trigger")
}

const count = ref(0)


</script>



<template>
    <div class="square-div" @click="onClick">{{value}}</div>
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
</style>