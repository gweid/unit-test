<template>
  <div v-show="show">
    <p>显示与隐藏</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    showHandle() {
      this.show = true
    },
    hideHandle() {
      this.show = false
    }
  }
}
</script>
