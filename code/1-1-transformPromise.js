
// promise
new Promise(resolve => {
  resolve('hello')
}).then(a => {
  let b = 'lagou'
  return a + b
}).then(ab => {
  let c = 'I ❤ U'
  console.log(ab + c)
})

// async await
async function foo() {
  let a = await Promise.resolve('hello');
  let b = await Promise.resolve('lagou');
  let c = await Promise.resolve('I ❤ U');
  console.log(a + b + c);
}
foo();
