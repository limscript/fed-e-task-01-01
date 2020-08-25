const fp = require('lodash/fp')

// 使用flowRight写一个sanitizeNames()函数,返回一个下划线连接的小写字符串，把数组中的name转换为这种形式。
// 例如: sanitizeNames(['Hello World']) => ['hello_world']


let _undercore = fp.replace(/\W+/g, '_')


const sanitizeNames = fp.flowRight(fp.map(_undercore), fp.map(fp.toLower))

console.log(sanitizeNames(['Hello World', 'La Gou']));
