import { shallowMount } from '@vue/test-utils'
import ComMount from '../../src/components/ComMount.vue'

describe('测试组件', () => {
  // test('mount', () => {
  //   const wrapper = shallowMount(ComMount)
  //   // 测试组件是否被挂载
  //   expect(wrapper.exists()).toBe(true)
  // })

  // test('text', () => {
  //   const wrapper = shallowMount(ComMount)
  //   const msg = 'hello, test'
  //   // expect(wrapper.text()).toBe(msg) // 严格相等，只能有一个 msg 文本
  //   expect(wrapper.text()).toContain(msg) // 是否包含
  //   expect(wrapper.find('.msg').text()).toBe(msg)
  // })

  // test('html', () => {
  //   const wrapper = shallowMount(ComMount)
  //   const html = '<span>哈哈哈</span>'
  //   expect(wrapper.html()).toContain(html)
  // })

  // test('dom', () => {
  //   const wrapper = shallowMount(ComMount)
  //   const h4Ele =  wrapper.find('h4')
  //   expect(h4Ele.attributes().id).toBeTruthy() // 是否有 id 属性
  //   expect(h4Ele.attributes().id).toBe('p-text') // id 属性是否为 span-text

  //   // 另一种方式
  //   expect(h4Ele.attributes('id')).toBeTruthy() // 是否有 id 属性
  //   expect(h4Ele.attributes('id')).toBe('p-text') // id 属性是否为 span-text
  // })

  // test('class', () => {
  //   const wrapper = shallowMount(ComMount)
  //   const h4Ele =  wrapper.find('h4')
  //   expect(h4Ele.classes()).toContain('p-ele')
  // })

  // test('style', () => {
  //   const wrapper = shallowMount(ComMount)
  //   const style = wrapper.find('h4').element.style
  //   expect(style.color).toBe('red')
  // })

  test('props', () => {
    const wrapper = shallowMount(ComMount, {
      propsData: {
        name: 'jack',
        age: 18
      }
    })

    expect(wrapper.props('name')).toBe('jack')
    expect(wrapper.props().age).toBe(18)
    expect(wrapper.find('.user-info').text()).toContain('jack')
  })
})