var foo = {
  name: 'zhangsna'
}
function a (size, age, color) {
  console.log(this.name)
  console.log(size, age, color)
}
a.bind2(foo, 'bif', 19 )('学生')

Function.prototype.bind2 = function (context) {
  var arguments1 = arguments
  var self = this
  var context = context || window
  console.log(arguments)
  return function () {
    console.log(arguments)
    if (typeof self !== 'function') {
      throw new TypeError(`${self} is not a function`)
    }
    var fn = Symbol('fn')
    context[fn] = self
    // 拿到参数
    var agrs = []
    for (let index = 1; index < arguments1.length; index++) {
      agrs.push(`arguments1[${index}]`)
    }
    // 执行函数
    eval(`context[fn](${agrs})`)
    delete context[fn]
  }
}

// bind 可以分步骤传参
Function.prototype.bind2 = function (context) {
  var argumentsFirst = arguments
  var self = this
  var context = context || window
  return function () {
    if (typeof self !== 'function') {
      throw new TypeError(`${self} is not a function`)
    }
    var fn = Symbol('fn')
    context[fn] = self
    // 拿到参数 合并 一起传入   数组合并 args.concat(args2) 不改变原数组
    var agrs = []
    for (let index = 1; index < argumentsFirst.length; index++) {
      agrs.push(`argumentsFirst[${index}]`)
    }
    for (let index = 0; index < arguments.length; index++) {
      agrs.push(`arguments[${index}]`)
    }
    // 执行函数
    eval(`context[fn](${agrs})`)
    delete context[fn]
  }
}

// bind  返回函数做为构造函数时
Function.prototype.bind2 = function (context) {
  var argumentsFirst = arguments
  var self = this
  var context = context || window
  var fBind = function () {
    if (typeof self !== 'function') {
      throw new TypeError(`${self} is not a function`)
    }
    // 看是否 fBind作为构造函数使用；若是 this指向要改变，指向fBind; 若不是则还是实现call方法指向context
    var thisA = this instanceof fBind ? this : context
    var fn = Symbol('fn')
    thisA[fn] = self
    var agrs = []
    for (let index = 1; index < argumentsFirst.length; index++) {
      agrs.push(`argumentsFirst[${index}]`)
    }
    for (let index = 0; index < arguments.length; index++) {
      agrs.push(`arguments[${index}]`)
    }
    eval(`thisA[fn](${agrs})`)
    delete thisA[fn]
  }
  // 不太懂
  var fNOP = function () {}
  fNOP.prototype = this.prototype
  fBind.prototype = fNOP.prototype
  return fBind
}


// instanceof