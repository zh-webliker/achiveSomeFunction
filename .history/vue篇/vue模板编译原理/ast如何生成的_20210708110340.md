1. 分词，将代码字符串分割成单元数组（能解析的最小单元），生成语法单元数组。
2. 语义分析，将分词得到的语法单元进行整合，转化成树形表达形式。同时会验证语法，语法错误会抛出错误


生命周期钩子如何实现的 
Vue 实例在被创建之前都要经过一系列的初始化过程。比如设置数据监听，编译模板，挂载实例到dom，在数据更新的时候更新dom。
在这个过程中就会运行一些叫做生命周期钩子的函数，给予用户机会在一些特定的场景下添加他们自己的代码。

Vue初始化之前，会将各个阶段的生命周期函数合并一个数组中。
  beforeCreated,created的钩子在初始化 props,data,methods,watch,computeed等属性前后调用。
所以beforeCreated不能获取到props data中定义的值，也不能调用methods里的方法。在这俩个钩子函数执行的时候，并没有渲染 DOM，所以我们也不能够访问 DOM

  beforeMount 钩子函数发生 DOM 挂载之前, mounted DOM 挂载之后。
  beforeUpdate 和 updated 的钩子函数执行时机都应该是在数据更新的时候
  beforeDestroy 和 destroyed 钩子函数的执行时机在组件销毁的阶段，
  beforeDestroy 钩子函数的执行时机是在 $destroy 函数执行最开始的地方，接着执行了一系列的销毁动作，包括从 parent 的 $children 中删掉自身，删除 watcher，当前渲染的 VNode 执行销毁钩子函数等，执行完毕后再调用 destroy 钩子函数。

在 $destroy 的执行过程中，它又会执行 vm.__patch__(vm._vnode, null) 触发它子组件的销毁钩子函数，这样一层层的递归调用，所以 destroy 钩子函数执行顺序是先子后父，和 mounted 过程一样。