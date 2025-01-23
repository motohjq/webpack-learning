const modulesCss = require('./modules.css');
console.log(modulesCss);
const div = document.createElement('div');
div.className=modulesCss.background;
document.body.appendChild(div);
