// 链式回调 的异常处理
// 1.promise 是通过then返回新的promise来进行链式调用的
// 2.then返回新的promise对象的状态应该未rejected resolved,不然再次调用then方法的时候，返回的promise是pending状态
// 3.现在需要做的就是返回promise2中执行resolve() / reject()函数
function myPromise (executor) {
  let self = this
  self.status = 'pending'
  self.value = undefined
  self.reason = undefined
  self.onResolvedCallbacks = []
  self.onRejectedCallbacks = []
  self.called;
  function resolve(value) {
    if (self.called) return
    self.called = true
    self.status = 'fulfilled'
    self.value = value
    self.onResolvedCallbacks.forEach((fn) => {
      fn()
    })
  }
  function rejectc(reason) {
    if (self.called) return
    self.called = true
    self.status = 'rejected'
    self.reason = reason
    self.onRejectedCallbacks.forEach((fn) => {
      fn()
    })
  }
  executor(resolve, rejectc)
}
myPromise.prototype.then = function (onFulfilled, onRejected) {
  let promise2;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (value) {
    return value;
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
    throw err;
  }
  if (this.status === 'fulfilled') {
    promise2 = new myPromise((resolve, reject) => {
      let x = onFulfilled(this.value)
      resolveMyPromise(promise2, x, resolve, reject)
    })
  }
  if (this.status === 'rejected') {
    promise2 = new myPromise(() => {
      onRejected(this.reason)
    })
  }
  if (this.status === 'pending') {
    // 捕获异步回调时候的异常
    promise2 = new myPromise((resolve, reject) => {
      this.onResolvedCallbacks.push(() => {
        try {
          onFulfilled(this.value)
        } catch (err) {
          reject(err)
        }
      })
      this.onRejectedCallbacks.push(() => {
        try {
          onRejected(this.reason)
        } catch (err) {
          reject(err)
        }
      })
    })
  }
  function resolveMyPromise(p2, x, resolve, reject) {
    // 功能：将前一个then的状态改变
    // 怎么做： p2 第二次then的promise实例， x第一个then的返回值，resolve/reject 用来改变第一个promise的状态

    // if (p2 === x) {
    //   return reject(new TypeError('循环应用了')) // 这部分没看懂
    // } 
    // else {
    //   resolve(x)
    // }
    // if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    //   // x 可能是一个promise对象 
    //   if (x instanceof myPromise) {
    //     try {
    //       //
    //     } catch (err) {
    //       reject(err)
    //     }
    //   } else {
    //     resolve(x)
    //   }
    // } else {
    //   // x 是普通值
    //   resolve(x)
    // }
    resolve(x)
  }
  return promise2
}