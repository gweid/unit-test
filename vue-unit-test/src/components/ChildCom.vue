<template>
  <div>
    <button @click="onClick">change</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClick() {
      this.$emit('changeClick', 'child')
    }
  }
}
</script>
