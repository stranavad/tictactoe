<template>
  <div v-if="value === 1" :class="{'circle': true, 'active': active}"></div>
  <div v-if="value === 2" :class="{'cross': true, 'active': active}"></div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

defineProps<{value: number, active: boolean}>();

</script>

<style scoped>


.cross {
  background: #ffffffdd;
  height: 28px;
  position: relative;
  width: 6px;
  transform: rotate(45deg);
  border-radius: 10px;
}

.cross.active, .cross.active:after{
  background: #000000;
}

.circle.active {
  border-color: #000000;
}

.cross:after {
  background: #ffffffdd;
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
  border: 4px solid #ffffffdd;;
}

</style>