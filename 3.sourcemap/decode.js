var base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function decode(str){
    let parts = str.split('');
    console.log('parts',parts);
    let numbers = [];
    let allNumbers = [];
    for(let i=0;i<parts.length;i++){
       const index = base64.indexOf(parts[i]);
       const binary = index.toString(2).padStart(6,'0');
       numbers.push(binary.slice(1));
       let isLastSegment = binary[0]==='0';
       //如果遇到0表示当前的数值结束了，就可以开启读取新的数字了
       if(isLastSegment){
        allNumbers.push(numbers);
        numbers=[];
       }
    }
    console.log('allNumbers',allNumbers);
    let result = [];
    for(let i=0;i<allNumbers.length;i++){
        let numbers = allNumbers[i];
        let sign;
        let binary = numbers.map((number,index)=>{
            //如果是最后一组的话，最后一个数字代表符号位，前面的者数值本身
            if(index === 0){
                sign = number[number.length-1]==='0'?1:-1;
                return number.slice(0,4);
            }
            return number;//否则number就是数值
        }).reverse().join('')
        result.push(parseInt(binary,2)*sign);
    }
    return result;
}

//console.log(decode('yIAEDF'));//137
function explain(lines){
    return lines.split(',').map(decode)
}
let postions = explain('AAAA,IAAIA,EAAE,CAAN,CACIC,EAAE,CADN,CAEIC,EAAE;');
console.log(postions);
// [ 0, 0, 0, 0 ],
//[item[2],item[3],0,item[0]] 转换前的第几行，第几列，转换后的第几列
let offsets = postions.map(item=>[item[2],item[3],0,item[0]]);
console.log(offsets);
let origin;
let target;
let mappings = [];
for(let i=0;i<offsets.length;i++){
    const [originRow,originCol,targetRow,targetCol] = offsets[i];
    if(i===0){
        origin = {row:originRow,col:originCol}
        target = {row:targetRow,col:targetCol}
    }else{
        origin.row+=originRow;
        origin.col+=originCol;
        target.row+=targetRow;
        target.col+=targetCol;
    }
    mappings.push(`([${origin.row},${origin.col}](#0)=>[${target.row},${ target.col}])`);

}
console.log(mappings);