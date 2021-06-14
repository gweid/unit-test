import { shallowMount, createLocalVue } from '@vue/test-utils'
import RenderOpt from '../../src/components/RenderOpt.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

describe('RenderOpt.vue', () => {
//   test('data', () => {
//     const wrapper = shallowMount(RenderOpt, {
//       data() {
//         return {
//           name: 'mark',
//           age: 25
//         }
//       }
//     })
//     expect(wrapper.vm.name).toBe('mark')
//     expect(wrapper.vm.age).toBe(25)
//   })

//   test('slot', () => {
//     const defaultSlot = {
//       template: `<div>default slot</div>`
//     }
//     const lastSlot = {
//       template: `<div>last slot</div>`
//     }
//     const wrapper = shallowMount(RenderOpt, {
//       slots: {
//         default: defaultSlot,
//         last: lastSlot
//       }
//     })
//     expect(wrapper.find('.default-slot').html()).toContain(defaultSlot.template)
//     expect(wrapper.find('.last-slot').html()).toContain(lastSlot.template)
//   })

  test('localVue', () => {
    const wrapper = shallowMount(RenderOpt, {
      localVue
    })
  })
})