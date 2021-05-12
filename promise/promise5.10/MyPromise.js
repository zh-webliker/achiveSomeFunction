function MyPromise (fn) {
  let self = this
  self.value = null;
  self.error = null;
  self.onFulfilled = null; // 成功时的回调函数
  self.onRejected = null;  // 失败时的回调函数
  function resolve (value) {
    self.value = value
    self.onFulfilled(self.value)
  }
  function reject (error) {
    self.error = error
    self.onRejected(self.error)
  }
  fn(resolve, reject)
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  this.onFulfilled = onFulfilled
  this.onRejected = onRejected
}

// 但是此时不可以向resolve中传递同步任务 因为先执行resolve() 此时成功时的回调函数还没挂在到self 上
function MyPromise (fn) {
  let self = this
  self.value = null;
  self.error = null;
  self.onFulfilled = null;
  self.onRejected = null;
  function resolve (value) {
    setTimeout(() => {
      self.value = value
      self.onFulfilled(self.value)
    })
  }
  function reject (error) {
    setTimeout(() => {
      self.error = error
      self.onRejected(self.value)
    })
  }
  fn(resolve, reject)
}
MyPromise.prototype.then = function (onFulfiled, onRejected) {
  this.onFulfilled = onFulfiled
  this.onRejected = onRejected
}

var a = new MyPromise((resolve) => {
  console.log(1)
  resolve(2)
})
a.then((res) => {
  console.log(res)
})

// 3 添加状态, pending fulfilled rejected, 状态一旦改变不能再变
const pending = 'pendeing'
const fulfilled = 'fulfilled'
const rejected = 'rejected'
function MyPromise (fn) {
  let self = this
  self.status = pending
  self.value = null
  self.error = null
  self.onFulfilled = null
  self.onRejected = null
  function resolve (value) {
    if (self.status === pending) {
      setTimeout(() => { // value status 的值不能设置在外面
        self.value = value
        self.status = fulfilled
        self.onFulfilled(self.value)
      })
    }
  }
  function reject (error) {
    if (self.status === pending) {
      setTimeout(() => {
        self.error = error
        self.status = rejected
        self.onRejected(self.error)
      })
    }
  }
  fn(resolve, reject)
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === pending) {
    this.onFulfilled = onFulfilled
    this.onRejected = onRejected
  } else if (this.status === fulfilled) {
    onFulfilled(this.value)
  } else if (this.status === rejected) {
    onRejected(this.error)
  }
  return this  // return this 有什么作用吗 返回实例
}


// 链式调用
// 当状态是pending 时的回调函数用数组都存起来，等状态改变再执行
// 执行回调时遍历数组 执行回调函数
const pengding = 'pending'
const fulfilled = 'fulfilled'
const rejected = 'rejected'
function MyPromise (fn) {
  let self = this
  self.value = null
  self.error = null
  self.status = pending
  self.onFulfilledCallbacks = []
  self.onRejectedCallbacks = []
  function resolve (value) {
    if (self.status === pending) {
      setTimeout(() => {
        self.value = value
        self.status = fulfilled
        self.onFulfilledCallbacks.forEach(callback => {
          callback(self.value)
        });
      })
    }
  }
  function reject (error) {
    if (self.status === pending) {
      setTimeout(() => {
        self.error = error
        self.status = rejected
        self.onRejectedCallbacks.forEach(callback => {
          callback(self.error)
        })
      })
    }
  }
  fn(resolve, reject)
}
MyPromise.prototype.then = function (onFulfiled, onRejected) {
  if (this.status === fulfilled) {
    onFulfiled(self.value)
  } else if (this.status === rejected) {
    onRejected(self.error)
  } else if (this.status === pending) {
    this.onFulfilledCallbacks.push(onFulfiled)
    this.onRejectedCallbacks.push(onRejected)
  }
  return this
}

// 这样实现会造成一个问题 当then有异步操作的时候不能满足要求
