export const generateWin = (symbol) => {
    let str = []
    for(let i=0; i<5; i++){
        str.push(symbol)
    }
    return str.join("")
}

export const generateWinSec = (symbol) => {
    let str = []
    for(let i=0; i<4; i++){
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
    if(Math.min(line, item) < 4){
        let len = Math.min(line, item);
        firstIndex.line = line - len;
        firstIndex.item = item - len;
    } else{
        firstIndex.line = line - 4;
        firstIndex.item = item - 4;
    }

    const lastIndex = {line: line, item: item}
    if(Math.max(line, item) > items[0].length-1 - 4){
        let len = items[0].length-1-Math.max(line, item)
        lastIndex.line = line + len;
        lastIndex.item = item + len;
    } else{
        lastIndex.line = line + 5;
        lastIndex.item = item + 5;
    }


    console.log(generateWin(symbol) )


    let str = items.slice(firstIndex.line, lastIndex.line).map((array, index) => array[index + firstIndex.item].value).join("");

    if(item === 14){
        str.includes(generateWinSec(symbol)) && callback(firstIndex, lastIndex);    
    } else{
        str.includes(generateWin(symbol)) && callback(firstIndex, lastIndex);
    }
}


export const checkDiagonalRightCallback = (line, item, symbol, items, callback) => {
    const firstIndex = {line: line - Math.min(line, items[0].length - 1), item: item - Math.min(line, items[0].length - 1)}
    let len = Math.min(items[0].length-1-item, line);
    if(len < 4){
        firstIndex.line = line - len;
        firstIndex.item = item + len;
    } else{
        firstIndex.line = line - 4;
        firstIndex.item = item + 4;
    }

    const lastIndex = {line: line, item: item}

    len = Math.min(items[0].length-1-line, item);
    if(len < 4){
        lastIndex.line = line + len;
        lastIndex.item = item - len;
    } else{
        lastIndex.line = line + 4;
        lastIndex.item = item - 4;
    }

    let str = items.slice(firstIndex.line, lastIndex.line + 1).map((array, index) => array[firstIndex.item - index].value).join("");

    str.includes(generateWin(symbol)) && callback(firstIndex, lastIndex);
}