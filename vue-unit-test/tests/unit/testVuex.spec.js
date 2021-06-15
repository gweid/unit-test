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
      getName: state => state.name
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
    // 测试 getters，需要关心的是 getters 执行后的结果是否符合期望
    expect(wrapper.find('.getter').text()).toBe('jack')
    // 测试 mutations，仅仅关心 mutations 函数是否被调用，而不用太关心内部逻辑
    wrapper.vm.setNameMutation()
    expect(storeConfig.mutations.setName).toHaveBeenCalled()
    // 测试 actions，仅仅关心 actions 函数是否被调用，而不用太关心内部逻辑
    wrapper.vm.setNameAction()
    expect(storeConfig.actions.setName).toHaveBeenCalled()
  })
})