let s = 'hello world'
s.includes('hello') // true
s.startsWith('hello') // true
s.endsWith('world') // true
// 这三个方法都有第二个参数n， 表示第n个字符位置知道结束，endwidth就是前n个字符

'x'.repeat(3) // 'xxx'  repeat重复一个字符串 返回一个新的字符串

// padStart() 补全头部, 第二个参数无就用 空格代替
// padEnd() 补全尾部
'x'.padStart(6, 'abb') // abbabx
'x'.padEnd(6, 'abb') // xabbab


// trimStart() trimEnd()  消除空格
const s = '   ddd   ' 
s.trimStart() // 'ddd   '
s.trimEnd() // '   ddd'

// repalce()  只能替换掉第一个匹配的字符串