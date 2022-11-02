<script setup lang="ts">
import {ref, onMounted, reactive} from 'vue'
import Square from './Square.vue'

const {rows, cols} = defineProps<{rows: number, cols: number}>()


const activeIndex = reactive({line: -1, item: -1})

  onMounted( () => {
    for(let i=0; i<rows; i++){
        let array = [];
      for(let j=0; j<cols; j++){
        array.push(0)
      }
      items.value.push(array)
    }
  })


    const onSquareClick = (line: number, item: number) => {
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

        checkHorizontal(line, item, items.value[line][item])
        checkVertical(line, item, items.value[line][item])
        checkDiagonalLeft(line, item, items.value[line][item])
        checkDiagonalRight(line, item, items.value[line][item])
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

        if(str.includes(generateWin(symbol))){
            alert("WINNNNNNN");
        }
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

        if(str.includes(generateWin(symbol))){
            alert("WINNNNN")
        }        
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
        if(str.includes(generateWin(symbol))){
            alert("WINNNNNNN")
        }
    }

    const checkDiagonalRight = (l: number, i: number, symbol: number=1) => {
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
    if(str.includes(generateWin(symbol))){
        alert("WINNNNNNN")
    }
}


    const items = ref<number[][]>([])
    const count = ref(0)


</script>

<template>

    <div class="line-container">
        <div v-for="(line, lineIndex) in items" class="line">
            <div v-for="(item, itemIndex) in line">
                <Square :value="item" :active="activeIndex.line === lineIndex && activeIndex.item === itemIndex" @trigger="onSquareClick(lineIndex, itemIndex)"/>
            </div>
        </div>
    </div>

</template>

<style scoped>

    .line-container{
    display: flex;
    flex-direction: column;
    }

    .line{
    display: flex;
    }

</style>
