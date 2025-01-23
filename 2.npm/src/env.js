
console.log('process.env.NODE_ENV',process.env.NODE_ENV);
console.log('AUTHOR',AUTHOR);
var isProd = process.env.NODE_ENV==='production';
if(isProd){

}else{
    console.log('打印日志');
}