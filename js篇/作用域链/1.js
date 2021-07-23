var x = 10
function fn() {
  console.log(x)
}
function show(f) {
  var x = 20
  f() //10，而不是20
}
show(fn)

// 在fn函数中要取自由变量x, 要到创建fn函数的作用域中去取，无论fn在哪里调用
