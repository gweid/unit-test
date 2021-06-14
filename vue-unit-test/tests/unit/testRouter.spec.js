import { shallowMount } from '@vue/test-utils'
import TestRouter from '../../src/components/TestRouter.vue'

describe('TestRouter.vue', () => {
  let $route
  let $router
  beforeEach(() => {
    $route = {
      query: {
        name: 'jack'
      }
    }
    $router = {
      push: jest.fn()
    }
  })

  test('$route', () => {
    const wrapper = shallowMount(TestRouter, {
      mocks: {
        $route
      }
    })

    expect(wrapper.find('.route').text()).toBe('jack')
  })

  test('changeRoute', () => {
    $route.query.name = 'mark'
    const wrapper = shallowMount(TestRouter, {
      mocks: {
        $route
      }
    })

    expect(wrapper.find('.route').text()).toBe('mark')
  })

  test('$router', () => {
    const wrapper = shallowMount(TestRouter, {
      mocks: {
        $route,
        $router
      }
    })

    wrapper.vm.btnClick()
    expect($router.push).toHaveBeenCalled() // 判断 $router.push 是否触发
  })
})