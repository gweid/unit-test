const { sum } = require('./example')

test('测试两者相加是否相等', () => {
  expect(sum(1, 2)).toBe(3)
})

describe('it 和 test', () => {
  test('test 函数', () => {
    expect(2).toBe(2)
  })

  it('it 函数', () => {
    expect(2).toBe(2)
  })
})

describe('expect断言方法', () => {
  test('常用断言', () => {
    expect(2).toBe(2)
    expect(1).not.toBe(2)
    expect({ a: 1 }).toEqual({ a: 1 })
  })
})


const { setTimeoutFun, promiseFun } = require('./example')
describe('异步代码', () => {
  test('setTimeout', done => {
    function callback(data) {
      expect(data).toEqual({ name: 'jack' })
      done()
    }

    setTimeoutFun(callback)
  })

  test('promise', () => {
    // 一定要把 Promise 返回，否则测试用例会在异步方法执行完之前结束
    return promiseFun().then(data => {
      expect(data).toBe('promise')
    })
  })

  test('promise async...await', async() => {
    // 一定要把 Promise 返回，否则测试用例会在异步方法执行完之前结束
    const data = await promiseFun()
    expect(data).toBe('promise')
  })
})