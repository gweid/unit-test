import { shallowMount } from '@vue/test-utils'
import ComTimer from '../../src/components/ComTimer.vue'

describe('测试setTimeout', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(ComTimer)
    jest.useFakeTimers() // 使用 Jest.useFakeTimers 替换全局定时器函数
  })

  test('setTimeout', () => {
    expect(wrapper.vm.text).toBe('')
    wrapper.vm.startSetTimeout()
    jest.runTimersToTime(5000) // 向前推进 5000ms
    expect(wrapper.vm.text).toBe('test setTimeout')
  })

  test('setInterval', () => {
    expect(wrapper.vm.count).toBe(0)
    wrapper.vm.start()
    jest.runTimersToTime(1000) // 向前推进 1000ms
    expect(wrapper.vm.count).toBe(1)
    jest.runTimersToTime(9000) // 向前推进 9000ms
    expect(wrapper.vm.count).toBe(10)
  })

  test('clearInterval', () => {
    jest.spyOn(window, 'clearInterval')
    setInterval.mockReturnValue(123)
    wrapper.vm.start()
    wrapper.vm.stop()
    expect(window.clearInterval).toHaveBeenCalledWith(123)
  })
})