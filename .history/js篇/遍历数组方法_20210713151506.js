// forEach、map、filter、find、every、some、reduce，它们有个共同点：不会改变原始数组。

// forEach 遍历数组 没有返回值
var a = [1, 2, 5, 99, 4]
var sun = 0
a.forEach(item => sun+=item)