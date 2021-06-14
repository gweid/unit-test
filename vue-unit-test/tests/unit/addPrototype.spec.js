import { shallowMount } from '@vue/test-utils'
import AddPrototype from '../../src/components/AddPrototype.vue'

describe('AddPrototype.vue', () => {
  test('prototype', () => {
    const wrapper = shallowMount(AddPrototype, {
      mocks: {
        $addFun: jest.fn((num) => num + 1)
      }
    })

    const count = wrapper.vm.count
    wrapper.vm.onClick()
    expect(wrapper.vm.count).toBe(count + 1)
  })
})