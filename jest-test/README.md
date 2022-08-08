# 单元测试

`jest` 文档：https://jestjs.io/zh-Hans/




## 1、什么是单元测试

单元测试，简单来说就是允许将独立单元的代码进行隔离测试，其目的是为了提高开发者对代码的信心。通过编写细致且有意义的测试，能够有信心在构建新特性或重构已有代码的同时，保持应用的功能和稳定。

这个单元，是应用中最小的可测试部分。在`Vue`中，组件与函数都是可测试的单元。



## 2、jest 测试框架



### 2-1、jest 文件和目录命名规范

待测试文件: `hello.js` 

- 测试脚本文件取名：`hello.test.js` 或者 `hello.spec.js` 

- 测试目录：`tests` 或者 `__tests__`



### 2-2、基本使用

先来看一段最基本的 jest 代码

```js
describe('it 和 test', () => {
  test('test 函数', () => {
    expect(2).toBe(2)
  })
  it('it 函数', () => {
    expect(2).toBe(2)
  })
})
```

这里面包括了：

- 测试函数 test 和 it（在 jest 中，test 和 it 都是测试函数，功能和用法是完全一样的）

- 分组函数 describe：主要作用就是将测试函数进行分组

- 断言函数 expect，测试即运行结果是否与我们预期结果一致 断言函数用来验证结果是否正确，基本用法：

  ```js
  exspect(运行结果).toBe(期望的结果);
  
  // 常见断言方法
  expect(2).toBe(2)// toBe 函数内部使用了 Object.is 来进行精确匹配，用来对普通数据类型进行比较
  expect(1).not.toBe(2)// 前面加 .not 是指相反值的意思，这里判断不等
  expect({ a: 1 }).toEqual({ a: 1 }) // 用来比较对象数组等复杂类型
  expect(n).toBeNull(); // 判断是否为 null
  expect(n).toBeUndefined(); // 判断是否为 undefined
  expect(n).toBeDefined(); // 判断结果与 toBeUndefined 相反
  expect(n).toBeTruthy(); // 判断结果为 true
  expect(n).toBeFalsy(); // 判断结果为 false
  expect(value).toBeGreaterThan(3); // 大于 3
  expect(value).toBeGreaterThanOrEqual(3.5); // 大于等于 3.5
  expect(value).toBeLessThan(5); // 小于 5
  expect(value).toBeLessThanOrEqual(4.5); // 小于等于 4.5
  expect(value).toBeCloseTo(0.3); // 浮点数判断相等
  expect('Christoph').toMatch(/stop/); // 正则表达式判断
  expect(['one','two']).toContain('one'); // 判断是否包含某元素
  ```

  更多的 expect 方法参考：https://jestjs.io/zh-Hans/docs/expect



### 2-3、异步代码测试

在开发中，往往很多场景是异步的，比如 `setTimeout`、或者异步请求等

代码要想实现异步，常见的是 `callback` 回调，另外一种是使用 `Promise`



#### 2-3-1、callback 回调形式的异步代码测试：

```js
const setTimeoutFun = (cb) => {
  const data = { name: 'jack' }
  setTimeout(() => {
    cb && cb(data)
  }, 1000)
}
```

可以在 `callback` 方法中进行测试。但是要注意`Jest`默认在执行完 `test` 中代码就退出。因此下面的代码是起不到测试作用的

```js
// 错误事例
test('setTimeout', () => {
    function callback(data) {
      expect(data).toEqual({ name: 'jack' })
    }

    setTimeoutFun(callback)
})
```

为了让`Jest` 可以等待异步方法执行完成，可以在调用`test` 方法的时候传入一个`done` 参数方法，`Jest` 会等待 `done` 方法执行完成才退出。如果 `done` 方法没有被调用（比如超时），`Jest` 会返回测试失败

```js
describe('异步代码', () => {
  test('setTimeout', done => {
    function callback(data) {
      expect(data).toEqual({ name: 'jack' })
      done()
    }

    setTimeoutFun(callback)
  })
})
```



#### 2-3-2、Promise 的测试：

`Promise` 方式的异步测试非常简单，可以在 `then` 方法里面进行判断，也可以使用 `ES6` 中的 `async/await` 方法编写同步风格的测试代码

```js
const promiseFun = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('promise'), 1500);
  })
}
```

使用 then 方式：一定要把 Promise 返回，否则测试用例会在异步方法执行完之前结束

```js
test('promise', () => {
    // 一定要把 Promise 返回，否则测试用例会在异步方法执行完之前结束
    return promiseFun().then(data => {
      expect(data).toBe('promise')
    })
})
```

使用 `async...await` 方式：

```js
test('promise async...await', async() => {
    // 一定要把 Promise 返回，否则测试用例会在异步方法执行完之前结束
    const data = await promiseFun()
    expect(data).toBe('promise')
})
```

可以发现，`async...await` 比 then 更加简单，也更加推荐使用



### 2-4、全局挂载与卸载钩子函数

有时，在执行每一个测试函数之前或者之后，需要进行一些操作，此时，就可以利用全局钩子

```js
describe('全局钩子', () => {
  beforeEach(() => {
     // ...在执行每一个测试用例之前调用
  })

  afterEach(() => {
    // ...在执行每一个测试用例之后调用
  })
 
  test('', () => {})
})
```
