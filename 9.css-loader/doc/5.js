const { stringifyRequest } = require("css-loader/dist/utils");

let request = `
C:\aproject\zhufengwebpack20230305\9.css-loader\loaders\css-loader\index.js!
C:\aproject\zhufengwebpack20230305\9.css-loader\src\basic.css
`;
let result = stringifyRequest(request);

`
./loaders/css-loader/index.js!./src/basic.css
`
require('basic.css')
/* 会找node_modules目录
因为basic.css在src目录里的
所以需要把basic.css变成相对于当前的目录的相对路径 */