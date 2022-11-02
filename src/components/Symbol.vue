<template>
  <div v-if="value === 1" class="circle"></div>
  <div v-if="value === 2" class="cross"></div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{value: number}>();

</script>

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

</style>