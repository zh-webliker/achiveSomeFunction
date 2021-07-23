// 原型链继承 
// Child 继承 Parent 的所有属性
function Parent () {
  this.name = ['111']
  this.age = 13
}
Parent.prototype.getName = function () {
  console.log(this.name, this.age)
}
function Child () {
}
Child.prototype = new Parent()
var child1 = new Child()
child1.name.push('222')
child1.age = 15
child1.getName() // ['111', '222']
var child2 = new Child()
child2.getName() // ['111', '222']
// 在构建实例的时候，不能向parent传参; 引用类型数据被所有实例共享
function Child2 () {
}
Child2.prototype = new Parent()
var child3 = new Child2()
child3.getName() // ['111']



// 经典继承 (借用构造函数继承)
// 可以传参；避免了引用类型数据被所有实例共享
// 但是 所有方法都在构造函数中定义 每次创建实例都会创建一遍方法，实例访问不了原型对象上的方法
function Parent () {
  this.name = ['111']
  this.age = 13
  // this.getName = function () {
  //   console.log(this.name, this.age)
  // }
}
Parent.prototype.getName = function () {
  console.log(this.name, this.age)
}
function Child () {
  Parent.call(this)
  // 相当于Child 将 Parent中的每个属性都复制一遍（不使用原型）
}
var child1 = new Child()
child1.name.push('222')
child1.age = 15
child1.getName() // 为什么getName()不存在 Parent.call(this)相当于执行了一遍这个方法
var child2 = new Child()


// 3.组合继承
function Parent (name) {
  this.name = name
  this.color = [1, 2, 3]
}
Parent.prototype.getName = function () {
  console.log(this.name, this.age)
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent() // 调用两次构造函数,这一步把Parents的属性又一次继承了， 其实只需要继承prototype上的属性
// Child.prototype.__proto__ === Parent.prototype  true
Child.prototype.constructor = Child

var child1 = new Child('kevin', 18)
// 此时Child.prototype和child1都有属性color, 像这种不改变的属性，就可以直接挂在原型对象上

// 4.寄生组合式继承
function Parent (name) {
  this.name = name
  this.color = [1, 2, 3]
}
Parent.prototype.getName = function () {
  console.log(this.name, this.age)
}

function Child (name, age) {
  Parent.call(this, name)
  this.age = age
}
function F () {}
F.prototype = Parent.prototype
Child.prototype = new F()
// Child.prototype.constructor = Child
var child1 = new Child('kiven', 13)
// 避免了在 Child.prototype 上面创建不必要的、多余的属性

// 封装继承方法
function createObject (o) {
  function F () {}
  F.prototype = o.prototype
  return new F()
}
function prototype (Parent, Child) {
  Child.prototype = createObject(Parent)
  Child.prototype.constructor = Child
}
prototype(Parent, Child)


// 寄生式组合继承 3
// 避免在Child prototype上建立不必要的多余的属性
function inheritPrototype (Child, Parent) {
  var prototype = Object.create(Parent.prototype)
  prototype.constructor = Child
  Child.prototype = prototype
}
function Parent (name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
inheritPrototype(Child, Parent)
function Child (name) {
  Parent.call(this, name)
}
var child1 = new Child('张三')
var child2 = new Child('李四')


// es6 继承
class Parent {
  constructor(name) {
    this.name = name
  }
  getName () {
    console.log(this.name)
  }
}
class Child extends Parent {
  constructor (name) {
    super(name)
    
  }
}
