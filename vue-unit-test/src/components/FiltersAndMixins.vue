<template>
  <div>
    <p class="filter">{{ price | formatPrice }}</p>
    <p class="msg">{{ msg }}</p>
  </div>
</template>

<script>
import testMixin from '../mixins/testMixin'

export default {
  mixins: [testMixin],
  data() {
    return {
      price: 10,
    }
  },
  filters: {
    formatPrice(price) {
      return price.toFixed(2)
    }
  }
}
</script>
