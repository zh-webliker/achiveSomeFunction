// Otaku 御宅族，简称宅
function Otaku (name, age) {
  this.name = name;
  this.age = age;
  this.habit = 'Games';
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}
var person = new Otaku('Kevin', '18');
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // 60
person.sayYourName(); // I am Kevin

// new 关键字做了什么
// 返回的是一个对象； 能访问到构造函数里的属性；能访问到构造函数原型对象上的属性

// 第一版
var person1 = objectFactory(Otaku, 'kevin', 19)
function objectFactory () {
  var obj = new Object(),
  Constructor = [].shift.call(arguments); // Constrctor 是一个函数，去了参数的第一个值
  // 将Constructor和obj结合起来
  obj.__proto__ = Constructor.prototype // 只能继承原型对象上的属性 
  Constructor.apply(obj, arguments)
  
  return obj
}

// 第二版
// 如果构造函数返回一个对象, 此时person值为Otaku返回的对象，并且person没有继承原型上的属性
// 如果构造函数返回一个基本类型，返回值就相当于没有的时候
function Otaku (name, age) {
  this.name = name;
  this.age = age;
  return {
    name: name,
    habit: 'Games'
  }
}
Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}
var person = new Otaku('Kevin', '18');
console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined
person.sayYourName(); // 报错 不是一个function

var person1 = objectFactory(Otaku, 'kevin', 19)
function objectFactory () {
  var obj = new Object(), 
  Constrctor = [].shift.call(arguments)
  obj.__proto__ = Constrctor.prototype
  var ret = Constrctor.apply(obj, arguments)
  return typeof ret === 'object' ? ret || obj : obj
}


function objectFactory (func, ...args) {
  var obj = Object.create(func.prototype)
  var ret = func.call(obj, ...args)
  return typeof ret === 'object' ? ret || obj : obj
}

// 区分new Object()  Object.create() {} 的区别

// new.target