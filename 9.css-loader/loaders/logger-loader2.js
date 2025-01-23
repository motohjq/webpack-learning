
function loader(source){
    console.log('====================================');
    console.log('logger-loader2',this.resourcePath);
    console.log('====================================');
   return source;
}
module.exports = loader;