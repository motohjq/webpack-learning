"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModuleGraphModule = function ModuleGraphModule(module) {
  _classCallCheck(this, ModuleGraphModule);

  //当前的模块
  this.module = module; //谁引用了当有的module  
  //a引用了b a的ModuleGraphModule关系放在outgoingConnections
  //b的ModuleGraphModule关系放在incomingConnections

  this.incomingConnections = new Set(); //自己引用了哪些module

  this.outgoingConnections = new Set();
};

module.exports = ModuleGraphModule;