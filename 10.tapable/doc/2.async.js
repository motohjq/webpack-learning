function (name, age, _callback) {
  //header 头部取出当前存放所的事件函数
  var _x = this._x;
  //声明一个计数器
  var _counter = 3;
  //创建一个done方法
  var _done = (function() {
    _callback();
  });
  var _fn0 = _x[0];
  _fn0(name, age, (function() {
      if(--_counter === 0) _done();
  }));
  
  var _fn1 = _x[1];
  _fn1(name, age, (function() {
      if(--_counter === 0) _done();
  }));
  
  var _fn2 = _x[2];
  _fn2(name, age, (function() {
      if(--_counter === 0) _done();
  }));
  
}