
// 1.使用fp.add(x, y)和fp.map(f, x)创建一个能让functor里面的值增加的函数ex1
const fp = require('lodash/fp')
const { Container, Maybe } = require('./support')

let maybe = Maybe.of([5, 6, 1])
let ex1 = maybe.map((i) => fp.map(fp.add(1), i));
console.log(ex1);
