export const generateWin = (symbol) => {
    let str = []
    for(let i=0; i<5; i++){
        str.push(symbol)
    }
    return str.join("")
}


export const checkHorizontalCallback = (line, item, symbol, items, callback) => {
    let firstIndex = 0;
    let secIndex = items[line].length

    if(item > 3){
        firstIndex = item - 4;
    }
    if(items[line].length > item + 4){
        secIndex = item + 4;
    }

    let str = items[line].slice(firstIndex, secIndex + 1).map(item => item.value).join("")

    return str.includes(generateWin(symbol)) && callback(firstIndex, secIndex);

}


export const checkVerticalCallback = (line, item, symbol, items, callback) => {
    let firstIndex = 0;
    let secIndex = items.length; 

    if(line > 3){
        firstIndex = line - 4;
    }
    if(items.length > line + 4){
        secIndex = line + 4;
    }
    
    let str = items.slice(firstIndex, secIndex + 1).map(array => array[item].value).join("")
    
    str.includes(generateWin(symbol)) && callback(firstIndex, secIndex);
}


export const checkDiagonalLeftCallback = (line, item, symbol, items, callback) => {
    let firstIndex = {line: line - Math.min(line, item), item: item - Math.min(line, item)}
    if(line > 3 && item > 3){
        firstIndex.line = line - 4;
        firstIndex.item = item - 4;
    }

    const lastIndex = {line: line + Math.min(items[0].length - item, items.length - line), item: item + Math.min(items[0].length - item, items.length - line)}

    if(items[0].length > item + 4 && items.length > line + 4){
        lastIndex.line = line + 4;
        lastIndex.item = item + 4;
    }

    let str = items.slice(firstIndex.line, lastIndex.line + 1).map((array, index) => array[index + firstIndex.item]).join("");
    str.includes(generateWin(symbol)) && callback(firstIndex, lastIndex);
}


export const checkDiagonalRightCallback = (line, item, symbol, items, callback) => {
    const firstIndex = {
        line: line - Math.min(line, items[0].length - 1),
        item: item + Math.min(line, items[0].length - 1)
    }

    if(line > 3 && items[0].length - 3 > 3){
        firstIndex.line = line - 4;
        firstIndex.item = item + 4;
    }

    const lastIndex = {
        line: line + Math.min(item, items.length - line),
        item: item - Math.min(item, items.length - line),
    }

    if(item > 3 && items.length - line > 3){
        lastIndex.line = line + 4;
        lastIndex.item = item - 4;
    }

    let str = items.slice(firstIndex.line, lastIndex.line + 1).map((array, index) => array[firstIndex.item - index]).join("");
    str.includes(generateWin(symbol)) && callback(firstIndex, lastIndex);
}