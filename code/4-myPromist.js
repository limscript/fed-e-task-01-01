
const PENDING = "pending";// 等待状态
const FULFILLED = "fulfilled"; // 成功状态
const REJECTED = "rejected"; // 失败状态

// 封装异步方法
function asyncExecFun(fn) {
  setTimeout(() => fn(), 0);
}

// 执行promise resolve功能
function resolvePromise(promise, x, resolve, reject) {
  // 返回同一个promise
  if (promise === x) {
    reject(new TypeError("Chaining cycle detected for promise #<MyPromise>"));
    return;
  }
  // promise 对象
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    // 非promise 对象
    resolve(res);
  }
}

class MyPromise {
  // promsie 状态
  status = PENDING;
  // 成功之后的值
  value = undefined;
  // 失败后的原因
  reason = undefined;
  // 成功回调
  successCallbacks = [];
  // 失败回调
  failCallbacks = [];

  //构造函数
  constructor(exector) {
    // 异步执行状态变更
    // 捕获执行器的异常
    try {
      exector(
        (value) => asyncExecFun(() => this.resolve(value)),
        (reason) => asyncExecFun(() => this.reject(reason))
      );
    } catch (e) {
      this.reject(e)
    }
  }

  resolve(value) {
    // 如果状态不是等待则直接返回
    if (this.status !== PENDING) return;
    // 保存成功之后的值
    this.value = value;
    // 将状态更改为成功
    this.status = FULFILLED;
    // 执行所有成功回调
    while (this.successCallbacks.length) this.successCallbacks.shift()();
  }

  reject(reason) {
    // 如果状态不是等待则直接返回
    if (this.status !== PENDING) return;
    // 保存失败后的原因
    this.reason = reason;
    // 将状态更改为失败
    this.status = REJECTED;
    // 执行所有失败回调
    while (this.failCallbacks.length) this.failCallbacks.shift()();
  }
  then(successCallback, failCallback) {
    // 成功函数处理 忽略函数之外的其他值
    successCallback =
      typeof successCallback == "function" ? successCallback : (v) => v;
    // 失败函数处理 忽略函数之外的其他值 抛出异常  实现catch冒泡的关键
    failCallback =
      typeof failCallback == "function"
        ? failCallback
        : (reason) => {
          throw reason;
        };

    let promise = new MyPromise((resolve, reject) => {
      // 统一异常处理逻辑
      const execFun = (fn, val) => {
        try {
          let res = fn(val);
          resolvePromise(promise, res, resolve, reject);
        } catch (e) {
          reject(e);
        }
      };
      // 执行成功回调
      const execSuccessCallback = () => execFun(successCallback, this.value);
      // 执行失败回调
      const execFailCallback = () => execFun(failCallback, this.reason);
      // 同步将对应成功或者失败回调事件加入对应回调队列
      if (this.status === PENDING) {
        // 将成功回调加入队列
        this.successCallbacks.push(execSuccessCallback);
        // 讲失败回调加入队列
        this.failCallbacks.push(execFailCallback);
        return;
      }
      // 延迟执行 可以将函数执行结果和当前then 返回的promise 进行比较
      asyncExecFun(() => {
        // 如果已经 fulfilled 可直接调用成功回调方法
        if (this.status === FULFILLED) {
          execSuccessCallback();
          // 如果已经 rejected 可直接调用失败回调方法
        } else if (this.status === REJECTED) {
          execFailCallback();
        }
      });
    });
    return promise;
  }

  catch(failCallback) {
    return this.then(undefined, failCallback);
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  static resolve(value) {
    // 如果是MyPromise 实例 则直接返回
    if (value instanceof MyPromise) return value;
    // 如果不是MyPromise 实例 否则返回一个 MyPromise实例
    return new MyPromise((resolve) => resolve(value));
  }
  static reject(reason) {
    // 如果是MyPromise 实例 则直接返回
    if (reason instanceof MyPromise) return reason;
    // 如果不是MyPromise 实例 否则返回一个 MyPromise实例
    return new MyPromise((resolve, reject) => reject(reason));
  }

  // all方法
  static all(array) {
    // 存储结果
    let result = [];
    // 存储数组长度
    let len = array.length;
    // 创建返回MyPromise
    let promise = new MyPromise((resolve, reject) => {
      // 定义当前MyPromise的索引
      let index = 0;
      // 添加数据的公用方法
      function addData(key, data) {
        // 赋值
        result[key] = data;
        // 索引递增
        index++;
        // 全部执行完则resolve
        if (index == len) {
          resolve(result);
        }
      }
      // 按顺序变量数组
      for (let i = 0; i < len; i++) {
        let curr = array[i];
        // promise 对象
        if (curr instanceof MyPromise) {
          curr.then((value) => addData(i, value), reject);
        } else {
          // 非MyPromise
          addData(i, curr);
        }
      }
    });
    // 返回新的MyPromise实例
    return promise;
  }
  // 只要有一个成功或者失败就返回
  static race(array) {
    let promise = new MyPromise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        let curr = array[i];
        // MyPromise实例
        if (curr instanceof MyPromise) {
          curr.then(resolve, reject);
        } else {
          // 非MyPromise
          resolve(curr);
        }
      }
    });
    return promise;
  }
}

module.exports = MyPromise;
