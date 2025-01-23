current
2 刚进来  _callback();
2 结束 
var _fn2 = _x[2];
_fn2(name, age, (function () {
    _callback();
}));

code
1 刚进来 var _fn2 = _x[2];
_fn2(name, age, (function () {
    _callback();
}));
1 unroll _next1();
1 结束 var _fn1 = _x[1];
_fn1(name, age, (function () {
    _next1();
}));

code function _next1() {
    var _fn2 = _x[2];
    _fn2(name, age, (function () {
        _callback();
    }));
}

0 刚进来 var _fn1 = _x[1];
_fn1(name, age, (function () {
    _next1();
}));
0 unroll _next0();
0 结束 var _fn0 = _x[0];
_fn0(name, age, (function () {
    _next0();
}));

code function _next1() {
    var _fn2 = _x[2];
    _fn2(name, age, (function () {
        _callback();
    }));
}
function _next0() {
    var _fn1 = _x[1];
    _fn1(name, age, (function () {
        _next1();
    }));
}