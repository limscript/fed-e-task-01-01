const fp = require('lodash/fp')

// 数据
// horsepower: 马力， dollar_value: 价格，in_stock: 库存

const cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jajuar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]
// 使用函数组合fp.flowRight()重新实现下面这个函数
let isLastInStock = function(cars) {
  // 获取最后一条数据
  let last_car = fp.last(cars);
  // 获取最后一条数据的 in_stock 属性值
  return fp.prop('in_stock', last_car)
}

// flowRight 实现
const _isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)

console.log(_isLastInStock(cars));
