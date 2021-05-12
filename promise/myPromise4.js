// promise 异步处理， 异常处理， 链式调用， 链式调用返回值处理
// 多次调用reject resolve处理， 值穿透处理
function myPromise (executor) {
  let self = this
  self.status = 'pending' // 状态
  self.value = undefined // 保存状态为fulfilled的值
  self.reason = undefined
  self.onResolvedCallbacks = [] // 异步处理 存放then成功的回调
  self.onRejectedCallbacks = []
  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'fulfilled'
      self.value = value
      self.onResolvedCallbacks.forEach((item) => {
        item()
      })
    }
  }
  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected'
      self.reason = reason
      self.onResolvedCallbacks.forEach((item) => {
        item()
      })
    }
  }
  
  // 异常处理
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}
myPromise.prototype.then = function (onFulfiled, onRejected) {
  onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : (value) => {
    return value
  }
  onRejected = typeof onRejected === 'function' ? onRejected : (err) => {
    throw err
  }
  let self = this
  let promise2
  if (self.status === 'fulfilled') {
    promise2 = new myPromise((resolve, reject) => {
      let called
      try {
        const x = onFulfiled(self.value)
        if (called) return
        called = true
        resolve(x)
      } catch (err) {
        if (called) return
        called = true
        reject(err)
      }
    })
  }
  if (self.status === 'rejected') {
    promise2 = new myPromise((resolve, reject) => {
      let called
      try {
        const x = onRejected(self.reason)
        
        if (called) return
        called = true
        resolve(x) //?
      } catch (err) {
        if (called) return
        called = true
        reject(err)
      }
    })
  }
  if (self.status === 'pending') {
    promise2 = new myPromise((resolve, reject) => {
      let called;
      self.onResolvedCallbacks.push(() => {
        try {
          const x = onFulfiled(self.value)
          console.log(x, called)
          if (called) return
          called = true
          resolve(x)
        } catch (err) {
          if (called) return
          called = true
          console.log(err, called)
          reject(err)
        }
      })
      self.onRejectedCallbacks.push(() => {
        let called;
        try {
          const x = onRejected(self.reason)
          if (called) return
          called = true
          resolve(x)
        } catch (err) {
          if (called) return
          called = true
          reject(err)
        }
      })
    })
  }
  return promise2
}

var a = new myPromise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    resolve(2)
  })
})
a.then((res) => {
  console.log(res, 2)
  
  // try {
  //   
  // } catch(err) {
  //   console.log(err)
  // }
}).then(()=>{
  // console.log(3)
}, (res) => {
  console.log(res, 3)
})

