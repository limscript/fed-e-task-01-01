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
// 使用帮助函数_average重构averageDollarValue, 使用函数组合的方式实现

let _average = function(xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
}

let averageDollarValue = function(cars) {
  let dollar_values = fp.map(function(car) {
    return car.dollar_value
  }, cars)
  return _average(dollar_values)
}

const _averageDollarValue = fp.flowRight(_average, fp.map('dollar_value'))

console.log(_averageDollarValue(cars));
