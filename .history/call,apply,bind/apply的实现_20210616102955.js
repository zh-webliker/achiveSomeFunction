Function.prototype.apply2 = function (context, argsArray) {
  var context = context || window
  context.fn = this // this 值为 foo， 谁调用，this值就指向谁
  var result;
  if (!argsArray) {
    result = context.fn()
  } else {
    var args = []
    for (let i = 0; i < argsArray.length; i++) {
      args.push(`argsArray[${i}]`)
    }
    result = eval('context.fn(' + args + ')')
  }
  console.log(result)
  delete context.fn
  return result
}
var bar = {
  value: 1
}
function foo (name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}
var value = 2
foo.apply2(bar, ['张三', 19])
foo.apply2(null, ['李四', 20])

// 另外的知识
// ES6 Symbol，ES6的扩展符...、eval、new Function()

// 1.apply 只能函数调用
// 2.添加fn属性 可能原函数中有fn属性
//   解决办法： Sybmol()  Math.random()

Function.prototype.apply2 = function (context, argsArray) {
  if (typeof this != 'function') {
    throw new TypeError(`${this} is not a function`)
  }
  var context = context || window
  var fn = Symbol('fn')
  context[fn] = this
  if (!argsArray) {
    context[fn]()
  } else {
    var args = []
    for (let index = 0; index < argsArray.length; index++) {
      args.push(`argsArray[${index}]`)
    }
    eval(`context[fn](${args})`)
  }
  delete context[fn]
}
