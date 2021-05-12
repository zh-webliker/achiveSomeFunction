// 1.将函数设置成对象属性
// 2.执行函数
// 3.删除属性
Function.prototype.call2 = function (context) {
  context.fn = this
  context.fn()
  delete context.fn
}
var foo = {
  value: 1
}
function bar () {
  console.log(this.value)
}
bar.call2(foo)


// call可以给定参数
Function.prototype.call2 = function (context, ...args) {
  context.fn = this
  context.fn(...args)  // 2.
  delete context.fn
}
var foo = {
  value: 1
}
function bar (name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}
bar.call2(foo, '张三', 19)

// 解决问题2
// eval()
Function.prototype.call2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`)
  }
  var context = context || window // 当context为null的时候，则this指向window
  context.fn = this
  var args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }
  // context.fn(args.join(',')) // 这样name打印出来值是  '张三',19
  var result = eval('context.fn(' + args + ')')  // 这里 args 会自动调用 Array.toString() 这个方法
  delete context.fn
  return result
}
var foo = {
  value: 1
}
function bar (name, age) {
  console.log(this.value)
  console.log(name)
  console.log(age)
}
bar.call2(foo, '张三', 19)

// new Function()解决问题1  (搭配sybmol) 有时间再研究
Function.prototype.call2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`)
  }
  var context = context || window
  var fn = Symbol('fn')
  context[fn] = this
  var args = []
  for (let index = 1; index < arguments.length; index++) {
    args.push(`arguments[${index}]`)
  }
  new Function()
}



// 解决问题1
// Sybmol()
Function.prototype.call2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not a function`)
  }
  var context = context || window
  var fn = Symbol('fn')
  context[fn] = this
  var args = []
  for (let index = 1; index < arguments.length; index++) {
    args.push(`arguments[${index}]`)
    // args.push(arguments[index]) 为什么不行
    // var a = ['张三', 'aaa'].toString()  "张三,aaa"
    // 当args.toString()，并且作为参数传入的时候是作为一个整的字符串， 如果是后一种方法的时候就会使得 张三 直接作为一个变量传入而不是字符串。从而报错
  }
  eval(`context[fn](${args})`)  
  // eval(`context[fn](args)`) 
  // 区别是 前一种是将 args转化成字符串，arguments[1], arguments[2] ..依次传入方法
  // 后一种是args直接作为一个参数传给函数
  delete context[fn]
}

// 生成时间戳解决问题1
// var fn = _new Date().getTime()

// 出现的问题 
// 1.fn 可能存在在对象当中
// 2. ...args 是es6的方法，不使用es6的方法. 如果用运算扩展符就不需要用eval()
