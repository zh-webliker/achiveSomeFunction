// 创建obj   
// 创建新的this属性 访问到原型上的属性   
// 构造函数返回的是函数/对象  或者是普通数据类型
function ctor (name, age) {
  this.name = name
  this.age = age
}
ctor.prototype.student = function () {
  console.log(this.name)
}
function newOperator(ctor) {
  if (typeof ctor != 'function') {
    throw 'newOperator funtion the first param must be a function '
  }
  let obj = Object.create(ctor.prototype)
  const args = [].slice.call(arguments, 1)
  let ret = ctor.apply(obj, args)
  const isObject = typeof ret === 'object' && typeof ret !== null
  const isFunction = typeof ret === 'function'
  if ( isObject || isFunction ) {
    return ret
  }
  return obj
}
var ctor1 = newOperator(ctor, '张三', 19)