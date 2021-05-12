function myPromise (executor) {
  let self = this
  self.status = 'pending' // 保存状态
  self.value = undefined  // 保存
  self.reason = undefined 
  function resolve (value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.value = value
    }
  }
  function reject (reason) {
    if (self.status === 'pengding') {
      self.status = 'rejected'
      self.reason = reason
    }
  }
  executor(resolve, reject)
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === 'fulfilled') {
    onFulfilled(this.value) // 传进来的函数，self.value作为传进来函数的参数
  }
  if (this.status === 'rejected') {
    onRejected(this.reason)
  }
}
let a = new myPromise((resolve) => {
  console.log(1)
  resolve(2) // 此时还没做异步回调处理 就是如果resolve()放入异步中执行 则不能正常处理.then的调用
  // setTimeout(() => {
  //   resolve(2)
  // }, 2000)
})
a.then((res) => {
  console.log(res)
})

var a = new Promise((resolve, reject) => {
  resolve(1)
})