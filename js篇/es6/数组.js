// 结构赋值
// 扩展运算符

// 扩展运算符能轻松实现数组和松散化序列的相互转化  取代apply 传值
function f(x, y, z) {}
var args = [1, 2, 3]
f.apply(null, args)
f(...args)
// 克隆数组
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;


// 合并数组