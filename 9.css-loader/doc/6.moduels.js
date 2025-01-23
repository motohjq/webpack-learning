//分析实现原理
cssLoaderExport.push([module.id, ".src-modulesbackground--tTVAW{\r\n    width:100px;\r\n    height:100px;\r\n    background-color: green;\r\n}", ""]);
cssLoaderExport.locals = {
  "background": "src-modulesbackground--tTVAW"
};
//1.找出CSS代码中用.local包裹的类名 :local(.background)
//2.生成一个新的类名，把这个选择器的名称给替换掉 .src-modulesbackground--tTVAW{}
//3.返回老的类名和新的类型的映射
