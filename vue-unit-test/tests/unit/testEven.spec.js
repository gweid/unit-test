import { mount, shallowMount } from '@vue/test-utils'
import TestEven from '../../src/components/TestEven.vue'
import ChildCom from '../../src/components/ChildCom.vue'

describe('TestEven.vue', () => {
//   test('dom even', () => {
//     const wrapper = shallowMount(TestEven)
//     const btn = wrapper.find('.btn1')
//     expect(wrapper.vm.count).toBe(0)
//     btn.trigger('click')
//     expect(wrapper.vm.count).toBe(1)
//   })

  test('custom even', () => {
    const wrapper = mount(TestEven)
    expect(wrapper.vm.param).toBe('')
    wrapper.findComponent(ChildCom).vm.$emit('changeClick', 'child')
    expect(wrapper.vm.param).toBe('child')
  })
})