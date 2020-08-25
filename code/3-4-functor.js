
// 4. 使用 Maybe 重写 ex4，不要有 if 语句
const fp = require('lodash/fp')
const { Container, Maybe } = require('./support')

let ex4 = function(n) {
  if (n) {
    return parseInt(n)
  }
}
let _ex4 = n => Maybe.of(n).map(parseInt)
console.log(_ex4('8'));
