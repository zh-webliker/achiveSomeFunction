// forEach、map、filter、find、every、some、reduce，它们有个共同点：不会改变原始数组。

// forEach 遍历数组 没有返回值 不会改变原始数组
var a = [1, 2, 5, 99, 4]
var sun = 0
a.forEach(item => sun+=item)

// map 有返回值 不会改变原始数组
var dubel = a.map(item => item*2)
  // 去数组中每个对象的某个属性
var cars = [
  {color: 'red'}, {color: 'yellow'}, {color: 'green'}
]
var colors = cars.map(item => item.color)

// filter 返回符合条件的元素数组，filter不会改变原始数组
var porducts = [
  {name:"cucumber",type:"vegetable", price: 15},
  {name:"banana",type:"fruit", price: 35},
  {name:"celery",type:"vegetable", price: 45},
  {name:"orange",type:"fruit", price: 25}
];
var vegetableList = porducts.filter(item => {
  // if (item.type === 'vegetable') {
  //   return item
  // }
  return item.type === 'vegetable'
})


// find  返回符合条件的  第一个  元素, 不改变原数组
var vegetable = porducts.find((item) => {
  return item.type === 'fruit'
})


// every & some 
// every 数组中每个元素是否都满足条件 返回Boolean值
// some 数组中是否有元素满足条件

var isAllFruit = porducts.every(item => {
  return item.type === 'fruit'
})
var ishasFruit = porducts.some(item => {
  return item.type === 'fruit'
})


// reduce 传入一个函数做为累加器，将其结果汇总返回
var sum = porducts.reduce((acc, cur) => {
  return acc + cur
}, 0)
