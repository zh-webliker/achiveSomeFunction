// 实现当resolve() reject()在异步中执行的时候，即状态为pending的时后，then注册的回调函数先保存起来
// 当状态变为resolved 或者 rejected的时候 再将所有的函数执行一遍
function myPromise (executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined // 存储resolve函数的参数
  self.reason = undefined // 存储reject函数的参数
  self.onResolvedCallbacks = [] // 存储当状态为pending的时候的then的第一个参数
  self.onRejectedCallbacks = [] // 存储当状态为pending的时候的then的第二个参数
  function resolve (value) {
    self.status = 'fulfilled'
    self.value = value
    self.onResolvedCallbacks.forEach((fn) => {
      fn() // 执行储存起来的then的第一个参数
    })
  }
  function reject (reason) {
    self.status = 'rejected'
    self.reason = reason
    self.onRejectedCallbacks.forEach((fn) => {
      fn()
    })
  }
  // executor(resolve, reject)
  try { // 异常处理
    executor(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
myPromise.prototype.then = function (onFulfilled, onRjected) {
  if (this.status === 'fulfilled') {
    onFulfilled(this.value)
  } else if (this.status === 'rejected') {
    onRjected(this.reason)
  } else if (this.status === 'pending') {
    this.onResolvedCallbacks.push(() => {
      onFulfilled(this.value)
    })
    this.onRejectedCallbacks.push(() => {
      onRjected(this.reason)
    })
    // this.onResolvedCallbacks.push( // 直接push onFulfilled onRjected，有可能没传值 造成报错
    //   onFulfilled(this.value)
    // )
    // this.onRejectedCallbacks.push(
    //   onRjected(this.reason)
    // )
  }
}

var a = new myPromise((resolve) => {
  console.log(1)
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
a.then((res) => {
  console.log(res)
}, (err) => {
  console.log(err, 'err')
})

var b = new myPromise((resolve) => {
  console.log(x)
  resolve(1)
})
b.then((res) => {
  console.log(res, 'resolve')
}, (err) => {
  console.log(err, 'err')
})