const sum = (a, b) => {
  return a + b
}

const setTimeoutFun = (cb) => {
  const data = { name: 'jack' }
  setTimeout(() => {
    cb && cb(data)
  }, 1000)
}

const promiseFun = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('promise'), 1500);
  })
}

module.exports = {
  sum,
  setTimeoutFun,
  promiseFun
}