
function loader(source){
    console.log('====================================');
    console.log('logger-loader1',this.resourcePath);
    console.log('====================================');
   return source;
}
module.exports = loader;