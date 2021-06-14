import getters from '../../src/store/getters'
import mutations from '../../src/store/mutations'
import actions from '../../src/store/actions'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TestVuex from '../../src/components/TestVuex.vue'

describe('单独测试getters, mutations, actions', () => {
  test('getters', () => {
    const state = {
      name: 'jack'
    }

    const { getName } = getters
    expect(getName(state)).toBe('jack')
  })

  test('mutations', () => {
    const state = {
      name: 'jack'
    }
    const newName = 'mark'

    const { setName } = mutations
    setName(state, newName)
    expect(state.name).toBe(newName)
  })

  test('actions', () => {
    const state = {
      name: 'jack'
    }
    const newName = 'marry'
    const context = {
      commit: jest.fn()
    }

    const { setName } =  actions
    setName(context, newName)
    // commit('setName', payload)
    // commit 被调用了，并且传入了两个参数：'setName' 和 newName
    expect(context.commit).toHaveBeenCalledWith('setName', newName)
  })
})


const localVue = createLocalVue()
localVue.use(Vuex)
describe('组合测试 store', () => {
  const storeConfig = {
    state: {
      name: 'jack'
    },
    getters: {
      getName: jest.fn()
    },
    mutations: {
      setName: jest.fn()
    },
    actions: {
      setName: jest.fn()
    }
  }
  const store = new Vuex.Store(storeConfig)

  test('store', () => {
    const wrapper = shallowMount(TestVuex, {
      store,
      localVue
    })

    // 测试 state
    expect(wrapper.find('.state').text()).toBe('jack')
    // 测试 getters
    expect(wrapper.find('.getter').text()).toBe('jack')
    // 测试 mutations
    // wrapper.vm.setNameMutation()
    // expect(store.mutations.setName).toHaveBeenCalled()
  })
})