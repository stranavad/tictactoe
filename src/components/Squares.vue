<script setup>
  import {ref, onMounted, reactive, computed} from 'vue'
  import Square from './Square.vue'
  import Symbol from "./Symbol.vue";
  import {checkHorizontalCallback, checkVerticalCallback, checkDiagonalLeftCallback, checkDiagonalRightCallback} from '../checks';

  const {rows, cols} = defineProps(['rows', 'cols'])
  const score = reactive({1: 0, 2: 0});
  const players = ref([1, 2]);
  let plays = ref(0);
  let lastItem = reactive({line: 0, item: 0});
  let lastScore = score;

  const setBoard = (clear=false) => {
    won.value = false;
    if(!clear){
      items.value = [];
      for(let i=0; i<rows; i++){
        let arr = [];
        for(let j=0; j<cols; j++){
          arr.push({value: 0, active: false, won: false, rotation: 0})
        }
        items.value.push(arr)
      }
    } else {
      items.value.map((line) => {
        line.map((item) => {
          item.value = 0;
          item.active = false;
          item.won = false;
          item.rotation = 0;
        })
      })
      count.value = 0;
    }
  }

  onMounted(setBoard)


  const onSquareClick = (line, item) => {
    if(won.value){
      return;
    }
    if(items.value[line][item].active){
      onSecondClick(line, item)
      items.value[line][item].active = false;
    }
    else{
      for(let i=0; i<rows; i++){
        for(let j=0; j<cols; j++){
          items.value[i][j].active = false;
        }
      }
      items.value[line][item].active = true;
    }

    
    plays.value = 0;
    lastItem.line = line;
    lastItem.item = item;
  }




    const onSecondClick = (line, item) => {

      count.value++
      if(count.value % 2 === 1){
          items.value[line][item].value = 1;
      } else{
          items.value[line][item].value = 2;
      }
      const symbol = items.value[line][item].value;
      checkWin(line, item, symbol);

      if(!won.value){
          return;
      }
      score[symbol === 1 ? 1 : 2]++;
      plays.value++;
    }

    const checkWin = (line, item, symbol)=> {

      checkHorizontalCallback(line, item, symbol, items.value, (firstIndex, secondIndex) => {
        let str = items.value[line].slice(firstIndex, secondIndex + 1).map(item => item.value).join("")
        const index = str.indexOf(generateWin(symbol));
        items.value[line].slice(firstIndex + index, firstIndex + index + 5).map(item => {
          item.won = true;
          item.rotation = 0;
        })
        won.value = true;
      })

      !won.value && checkVerticalCallback(line, item, symbol, items.value, (firstIndex, secondIndex) => {
        let str = items.value.slice(firstIndex, secondIndex + 1).map(array => array[item].value).join("")
        const index =  str.indexOf(generateWin(symbol))
        items.value.slice(firstIndex + index, firstIndex + index + 5).map(line => {
          line[item].rotation = 90;
          line[item].won = true;
        })
        won.value = true
      })

      !won.value && checkDiagonalLeftCallback(line, item, symbol, items.value, (firstIndex, secondIndex) => {
        let str = items.value.slice(firstIndex.line, secondIndex.line + 1).map((array, index) => array[index + firstIndex.item].value).join("");
        const index = str.indexOf(generateWin(symbol))
        items.value.slice(firstIndex.line + index, firstIndex.line + index + (str.length - str.split("").reverse().join("").indexOf(generateWin(symbol)) - index)).map((line, itemIndex) => {
          line[itemIndex + (firstIndex.item + index)].won = true;
          line[itemIndex + (firstIndex.item + index)].rotation = 45;
        })
        won.value = true;
      })

      !won.value && checkDiagonalRightCallback(line, item, symbol, items.value, (firstIndex, secondIndex) => {
        let str = items.value.slice(firstIndex.line, secondIndex.line + 1).map((array, index) => array[firstIndex.item - index].value).join("");
        const index = str.indexOf(generateWin(symbol))
        items.value.slice(firstIndex.line + index, firstIndex.line + index + (str.length - str.split("").reverse().join("").indexOf(generateWin(symbol)) - index)).map((line, itemIndex) => {
          line[(firstIndex.item - index) - itemIndex].won = true;
          line[(firstIndex.item - index) - itemIndex].rotation = 135;
        })
        won.value = true;
      })
      if(won.value){
        if(score[1] != lastScore[1] || score[2] != lastScore[2]){

        }
      }
    }
        


      const generateWin = (symbol) => {
        let str = []
        for(let i=0; i<5; i++){
            str.push(symbol)
        }
        return str.join("")
    }

    const items = ref([])
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
          <Square :data="items[lineIndex][itemIndex]" :data.active="isActive(lineIndex, itemIndex)" @trigger="onSquareClick(lineIndex, itemIndex)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.score {
  display: flex;
}

.score-text {
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: bolder;
  line-height: 1em;
  margin-top: 3px;
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
  height: auto;
  width: auto;
  overflow: scroll;
  border: 3px solid white;
}

.line{
display: flex;
}

@media only screen and (max-width: 768px) {
  [class*="line-container"] {
    height: 90vw;
    width: 90vw;
  }
}

</style>
