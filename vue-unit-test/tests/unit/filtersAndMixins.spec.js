import { shallowMount } from '@vue/test-utils'
import FiltersAndMixins from '../../src/components/FiltersAndMixins.vue'

describe('FiltersAndMixins.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(FiltersAndMixins)
  })

  test('filters', () => {
    expect(wrapper.find('.filter').text()).toBe('10.00')
  })

  test('mixins', () => {
    expect(wrapper.find('.msg').text()).toBe('hello')
  })
})