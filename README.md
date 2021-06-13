# `Vue` 单元测试

对 `Vue` 进行单元测试相关的一些随笔记录。主要是以 `Vue Test Utils` + `jest` 进行单元测试

`Vue Test Utils` 文档：https://vue-test-utils.vuejs.org/zh/

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



## 3、`Vue` 单元测试环境搭建



### 3-1、利用 vue-cli

如果是新建项目，那么可以利用 `vue-cli` 快速集成测试环境

首先在创建项目的时候，将单元测试选上：

![](/imgs/img1.png)

然后选择 jest 作为测试运行器

![](/imgs/img2.png)

生成的项目，会比常规的多出：

- tests 目录：这里面存放的就是单元测试用例
- `jest.config.js`：jest 相关的配置项

![](/imgs/img3.png)



并且在 `package.json` 中，会多出一条命令：

```js
{
  "scripts": {
    "test:unit": "vue-cli-service test:unit"
  }
}
```

执行 `npm run test:unit` 实际上就是执行的 `tests/unit/example.spec.js` 这个测试用例：

```js
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
```



### 3-2、现有项目添加单元测试

现有项目，可以通过 `vue-cli` 添加插件的方式，执行命令：

```js
vue add unit-jest
```



### 3-3、常用的 jest.config.js 配置

```js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  snapshotSerializers: ['jest-serializer-vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/components/**/*.vue',
    'src/utils/**/*.ts',
    'src/store/modules/*.ts',
    '!src/utils/axios.ts',
    '!src/utils/notify.ts'
  ]
}
```

- `snapshotSerializers`：`Vue`组件进行`Jest`快照序列化的工具配置
- `moduleNameMapper`：模块别名配置
- `testMatch`：测试文件查找规则，可以是统一放在`src/tests`目录下，也可以就近放在`__tests__`目录下
- `collectCoverage`：是否进行测试覆盖率收集
- `coverageDirectory`：测试报告存放位置
- `collectCoverageFrom`：测试哪些文件和不测试哪些文件

