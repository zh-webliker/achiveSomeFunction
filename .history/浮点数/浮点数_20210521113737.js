// 浮点数精度误差原因
// 是由于 es中采用的就是 双精确度来表示浮点数 就是说会用64位字节来存储一个浮点数
// 1个符号位（表示正数还是负数） 11位存储指数  尾数位52位

// 由于部分浮点数用二进制表示的时候是无穷的， 超出存储部分就会截取，从而造成了计算误差

// 解决方法： 
// 将整数部分拆开 * 相同倍数 / 相同倍数
getTwoInteger (firstNum, secondNum){
  const ret = {firstNum: '', secondNum: '', num: ''}
  firstNum += ''
  secondNum += ''
  // 判断小数位数
  const num1 = firstNum.split('.')[1].length
  const num2 = secondNum.split('.')[1].length
  ret.num = parseInt(num1 >= num2 ? num1 : num2 )
  
  return ret
}
