<template>
  <div>
    <p>{{ count }}</p>
    <button class="btn1" @click="addCount">count++</button>
    <child-com @changeClick="handleChange" />
  </div>
</template>

<script>
import ChildCom from './ChildCom.vue'
export default {
  components: {
    ChildCom
  },
  data() {
    return {
      count: 0,
      param: ''
    }
  },
  methods: {
    addCount() {
      this.count++
    },
    handleChange(param) {
      this.param = param
    }
  }
}
</script>
