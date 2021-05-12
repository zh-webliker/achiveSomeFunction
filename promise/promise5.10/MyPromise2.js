// 支持then中添加异步任务
// 每个then里的回调函数注册在对应的前一个promise的fulfilledCallbacks 里
// 之前那一版就是所有回调函数都放在了同一个fulfilledCallbacks
// then可以返回自身 返回一个新的promise
const pending = 'pending'
const fulfilled = 'fulfilled'
const rejected = 'rejected'
function MyPromise (fn) {
  let self = this
  self.value = null
  self.error = null
  self.status = null
  self.onFulfiledCallbacks = []
  self.onRejectedCallbacks = []
  function resolve (value) {
    if (self.status === pending) {
      setTimeout(() => {
        self.value = value
        self.status = fulfilled
        onFulfiledCallbacks.forEach(callbacks => {
          callbacks(self.value)
        });
      })
    }
  }
  function reject (error) {
    if (self.status === pending) {
      setTimeout(() => {
        self.error = error
        self.status = rejected
        setTimeout(() => {
          onRejectedCallbacks.forEach((callbacks) => {
            callbacks(self.error)
          })
        })
      })
    }
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    rejected(e)
  }
}

MyPromise.prototype.then = function (onFulfiled, onRejected) {
  const self = this
  let bridgePromise
  // 防止传入的不传成功或者失败的回调函数 所以成功失败的回调函数都默认好
  onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : value => value // 返回一个函数，并且可以传参
  onRejected = typeof onRejected === 'function' ? onRejected : error => {throw error}
  if (self.status === fulfilled) {
    return bridgePromise = new MyPromise((resolve, rejected) => {
      setTimeout(() => {
        try {
          let x = onFulfiled(self.value)
          resolvePromise(bridgePromise, x, resolve, rejected)
        } catch (e) {
          rejected(e)
        }
      })
    })
  }
  if (self.status === rejected) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(self.error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  if (self.status === pending) {
    return bridgePromise = new MyPromise((resolve, reject) => {
      self.onFulfilledCallbacks.push((value) => { // value 是为了接收这个方法
        try {
          let x = onFulfiled(value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) { 
          rejected(e)
        }
      })
      self.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
// 用来解析回调函数的返回值x， x可能是普通值也可能是个promis对象
function resolvePromise (bridgePromise, x, resolve, reject) {
  if (x instanceof MyPromise) {
    // 如果这个promise是pending状态，就在它的then方法里继续执行resolvePromise，直到返回一个状态不为pending的promise为止
    if (x.status === pending) {
      x.then(y => {
        resolvePromise(bridgePromise, y, resolve, reject) // 这步不懂
      }, error => {
        reject(error)
      })
    } else {
      x.then(resolve, reject)
    }
  } else {
    resolve(x)
  }
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}


var a = new Promise((resolve, rejected) => {
  setTimeout(() => {
    console.log(1)
  }, 1000)
  resolve(1)
})
a.then((res) => {
  console.log(res)
})