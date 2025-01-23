
let IndexList = [];
IndexList.i = function (modules) {
    IndexList.push(...modules);
   /*  for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      IndexList.push(item);
    } */
};
IndexList.push(['index.css', "\r\n"]);


let basicList = [];
basicList.push(['basic', "body{\r\n    background-color: green;\r\n}"]);
IndexList.i(basicList);
console.log(IndexList);