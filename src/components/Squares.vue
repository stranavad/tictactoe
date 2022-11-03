<script setup lang="ts">
import {ref, onMounted, reactive, computed} from 'vue'
import Square from './Square.vue'
import Symbol from "./Symbol.vue";

const {rows, cols} = defineProps<{rows: number, cols: number}>()
const score = reactive({1: 0, 2: 0});
const players = ref([1, 2]);
const plays = ref(0);

const activeIndex = reactive({line: -1, item: -1})

  const setBoard = (clearScore: boolean=false) => {
    if(clearScore){
      count.value = 0;
      plays.value = 0;
      score[1] = 0;
      score[2] = 0;
    }
    won.value = false;
    count.value = plays.value % 2;
    activeIndex.line = -1;
    activeIndex.item = -1;
    // count.value = 0;
    items.value = [];
    for(let i=0; i<rows; i++){
      let array = [];
      for(let j=0; j<cols; j++){
        array.push(0)
      }
      items.value.push(array)
    }
  }

  onMounted(setBoard)

  const isActive = (line: number, item: number): boolean => {
    return activeIndex.line === line && activeIndex.item === item;
  }


    const onSquareClick = (line: number, item: number) => {
        if(activeIndex.line === line && activeIndex.item === item){
            onSecondClick(line, item)
        }

        activeIndex.line = line
        activeIndex.item = item
    }


    const onSecondClick = (line:number, item: number) => {
        if(items.value[line][item]){
            return
        }

        count.value++
        if(count.value % 2 === 1){
            items.value[line][item] = 1
        } else{
            items.value[line][item] = 2
        }
        const symbol: number = items.value[line][item];

        if(checkWin(line, item, symbol)){
          score[symbol === 1 ? 1 : 2]++;
          won.value = true;
          plays.value++;
        }
    }

    const checkWin = (line: number, item: number, symbol: number) => {
      if(checkHorizontal(line, item, symbol)){
        return true;
      }

      if(checkVertical(line, item, symbol)){
        return true;
      }

      if(checkDiagonalLeft(line, item, symbol)){
        return true;
      }

      return checkDiagonalRight(line, item, symbol)
    }


    const generateWin = (symbol: number) => {
        let str = []
        for(let i=0; i<5; i++){
            str.push(symbol)
        }
        return str.join("")
    }

    const checkHorizontal = (line: number, item: number, symbol: number) => {
        let firstIndex = 0;
        let secIndex = items.value[line].length

        if(item > 3){
            firstIndex = item - 4;
        }
        if(items.value[line].length > item + 4){
            secIndex = item + 4;
        }

        let str = items.value[line].slice(firstIndex, secIndex + 1).join("")
        return str.includes(generateWin(symbol))
    }

    const checkVertical = (line: number, item: number, symbol: number) => {
        let firstIndex = 0;
        let secIndex = items.value.length;

        if(line > 3){
            firstIndex = line - 4;
        }
        if(items.value.length > line + 4){
            secIndex = line + 4;
        }

        let str = items.value.slice(firstIndex, secIndex + 1).map((array) => array[item]).join("")
        return str.includes(generateWin(symbol))
    }

    const checkDiagonalLeft = (l: number, i: number, symbol:number=1) => {
        let firstIndex = {line: l - Math.min(l, i), item: i - Math.min(l, i)}
        if(l > 3 && i > 3){
            firstIndex.line = l - 4;
            firstIndex.item = i - 4
        }

        const lastIndex = {line: l + Math.min(items.value[0].length - i, items.value.length - l), item: i + Math.min(items.value[0].length - i, items.value.length - l)}

        if(items.value[0].length > i+ 4 && items.value.length > l + 4){
            lastIndex.line = l + 4;
            lastIndex.item = i + 4;
        }

        let str = items.value.slice(firstIndex.line, lastIndex.line + 1).map((array, index) => array[index + firstIndex.item]).join("");
        return str.includes(generateWin(symbol))
    }

    const checkDiagonalRight = (l: number, i: number, symbol: number=1): boolean => {
        const firstIndex = {
            line: l - Math.min(l, items.value[0].length - 1),
            item: i + Math.min(l, items.value[0].length - 1)
        }

        if(l > 3 && items.value[0].length - 3 > 3){
            firstIndex.line = l - 4;
            firstIndex.item = i + 4;
        }

        const lastIndex = {
            line: l + Math.min(i, items.value.length - l),
            item: i - Math.min(i, items.value.length - l),
        }

        if(i > 3 && items.value.length - l > 3){
            lastIndex.line = l + 4;
            lastIndex.item = i - 4;
        }

        let str = items.value.slice(firstIndex.line, lastIndex.line + 1).map((array, index) => array[firstIndex.item - index]).join("");
        return str.includes(generateWin(symbol))
    }


    const items = ref<number[][]>([])
    const count = ref(0)
    const won = ref(false);

    const currentlyPlaying = computed(() => {
      if(!count.value){
        return 1;
      }
      return count.value % 2 ? 2 : 1;
    })


</script>

<template>
  <div v-if="won" class="win-container">
    <h3>You've won</h3>
    <button @click="setBoard(false)">New game</button>
  </div>
  <div class="main-container">
    <div class="toolbox">
      <div class="playing">
        <span>Playing:</span>
        <Symbol :value="currentlyPlaying" :active="false" :size="'small'"/>
      </div>
      <div class="score"><Symbol :value="1" :size="'small'"/><text class="score-text">{{score[1]}} - {{score[2]}}</text><Symbol :value="2" :size="'small'"/></div>
      <button @click="setBoard(true)">CLEAR BOARD</button>
    </div>
    <div class="line-container">
      <div v-for="(line, lineIndex) in items" class="line">
        <div v-for="(item, itemIndex) in line">
          <Square :value="item" :active="isActive(lineIndex, itemIndex)" @trigger="onSquareClick(lineIndex, itemIndex)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.score {
  display: flex;
  /*align-items: first;*/
}

.score-text {
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: bolder;
  line-height: 1em;
}

.main-container {
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.win-container {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #242424;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.win-container h3 {
  margin-bottom: 50px;
  font-size: 36px;
}

.win-container button {
  cursor: pointer;
  padding: 10px;
  background-color: #ffffff22;
  border-radius: 8px;
  border: none;
}

.toolbox {
  width: 90vw;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff22;
  padding: 15px;
  border-radius: 8px;
}

.toolbox span {
  font-family: Helvetica;
  font-weight: bold;
  margin-right: 5px;
}

.playing {
  display: flex;
  align-items: center;
}

.toolbox button {
  font-family: Helvetica;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bold;
  color: white;
}

.line-container{
  display: flex;
  flex-direction: column;
  height: 90vw;
  width: 90vw;
  overflow: scroll;
  border: 3px solid white;
}

    .line{
    display: flex;
    }

</style>
