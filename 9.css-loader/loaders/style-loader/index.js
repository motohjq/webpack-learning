const { stringifyRequest } = require("../css-loader/utils");


function loader(source){

}
/**
 * 
 * @param {*} remindingRequest 剩下的请求 css-loader!index.css
 *
 */
loader.pitch = function(remindingRequest){
   // 双感叹号 只要行内 不要再去找配置里的配置的loader
   //require("!!../loaders/css-loader/index.js??ruleSet[1].rules[0].use[1]!./index.css");
   let contentCode = `
      let content = require(${stringifyRequest(this,`!!${remindingRequest}`)});
      let element = document.createElement('style');
      element.innerHTML = (content.default || content).toString();
      document.head.appendChild(element);
      module.exports = content;
   `;
   return contentCode;
}

module.exports = loader;