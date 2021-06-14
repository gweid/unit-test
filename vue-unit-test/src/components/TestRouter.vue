<template>
  <div>
    <p class="route">{{ $route.query.name }}</p>
    <button @click="btnClick">跳转</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    btnClick() {
      this.$router.push('/user')
    }
  }
}
</script>
