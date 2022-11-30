<template>
  <div :class="{'small': size === 'small'}">
    <div v-if="value === 1" :class="{'circle': true, 'active': active}"></div>
    <div v-if="value === 2" :class="{'cross': true, 'active': active}">
      <div class="line1"/>
      <div class="line2"/>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  value: Number,
  active: Boolean,
  size: {
    default(){
      return 'medium'
    }
  }
});

</script>

<style scoped>

.small {
  transform: scale(0.6)
}

.cross {
  height: 28px;
  width: 28px;
  position: relative;
}

.line1, .line2 {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 6px;
  width: 30px;
  background-color: blue;
  transform-origin: center;
  border-radius: 5px;
}
.line1 {
  transform: rotate(45deg);
}

.line2 {
  transform: rotate(-45deg);
}

.cross.active div {
  background-color: #000000;
}
.circle.active {
  border-color: #000000;
}


/*
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
 */
.circle {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 4px solid red;
}

</style>