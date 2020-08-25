
// 2. 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
const fp = require('lodash/fp')
const { Container, Maybe } = require('./support')

let xs = Container.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'xi', 'do'])
let ex2 = xs.map(i => fp.first(i))
console.log(ex2);
