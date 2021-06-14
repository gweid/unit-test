<template>
  <div>
    <p>{{ count }}</p>
    <button @click="onClick">点击</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onClick() {
      this.count = this.$addFun(this.count)
    }
  }
}
</script>
