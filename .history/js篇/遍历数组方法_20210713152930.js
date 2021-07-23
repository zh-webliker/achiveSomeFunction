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
  {name:"cucumber",type:"vegetable"},
  {name:"banana",type:"fruit"},
  {name:"celery",type:"vegetable"},
  {name:"orange",type:"fruit"}
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


// ervey & some 
// 
