避免在运行时向Vue实例或其根$data添加被动属性-在data选项中预先声明它。

1. 使用
vue.set(target|（object/ array）, key/index, value)
是向响应式对象中添加属性或者 响应式数组中添加数组项，并且新添加的也是响应式的。

2. 原理
当target为原始类型值： :number string boolean null undefined时，警告。

当target是数组的时候，index是有效数组索引 set使用数组splice(index， 1， value)方法来触发响应的。
splice(index, howmany, item1, item2, ..items) 
添加/删除项目的位置, 删除项目的数量, 添加的项目

当target是对象的时候，key在target上或者key在target.prototype上, 直接修改  object[key] = val。

如果不在，通过defineReactive 定义一个响应式对象，给对象动态添加 getter 和 setter，最后派发更新

（不满足上面类型）


注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

