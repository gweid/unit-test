import { shallowMount } from '@vue/test-utils'
import ComMethod from '../../src/components/ComMethod.vue'

describe('测试组件方法', () => {
  let wrapper
  // jest 的钩子函数，在执行每一个测试用例之前调用
  beforeEach(() => {
    wrapper = shallowMount(ComMethod)
  })

  test('showHandle', async () => {
    expect(wrapper.vm.show).toBe(false) // 一开始是 false
    expect(wrapper.isVisible()).toBe(false) // 一开始，是隐藏状态

    wrapper.vm.showHandle()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.show).toBe(true)
    expect(wrapper.isVisible()).toBe(true)
  })

  test('hideHandle', async () => {
    // 先将 data 中的 show 设置为 true，这个方法是异步的，需要配合 $nextTick
    wrapper.setData({
      show: true
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.show).toBe(true)
    expect(wrapper.isVisible()).toBe(true)

    wrapper.vm.hideHandle()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.show).toBe(false)
    expect(wrapper.isVisible()).toBe(false)
  })
})