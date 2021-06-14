<template>
  <div>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      count: 0,
      timer: null
    }
  },
  methods: {
    startSetTimeout() {
      setTimeout(() => {
        this.text = 'test setTimeout'
      }, 5000)
    },
    start() {
      this.timer = setInterval(() => {
        this.count++
        if(this.count > 10) {
          this.stop()
        }
      }, 1000)
    },
    stop() {
      clearInterval(this.timer)
    }
  }
}
</script>
