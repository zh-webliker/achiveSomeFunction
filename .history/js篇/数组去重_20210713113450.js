// 双重循环
function unique (arr) {
  if(!Array.isArray(arr)) {
    return
  }
  let newArr = [arr[0]]
  for(let i = 0; i < arr.length; i++) {
    let flag = true
    for (let j = 0; j < newArr.length; j++) {
      if(arr[i] === newArr[j]) {
        flag = false
        break
      }
    }
    if (flag) {
      
      newArr.push(arr[i])
    }
  }
  return newA
}

// indexof
// sort()
// set 与 解构赋值（Array.from()）去重 

// set 数据结构类似于数组，所有成员的值都是唯一的 
// var s = new Set() s.add(1)    s.size()   s.delete(1) s.has()  s.clear()
// set 还能去重字符串 [...new Set('ababbc')].join('')
// Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。

function unique(arr) {
  if (!Array.isArray(arr)) {
    return
  }
  return [...new Set(arr)]
}