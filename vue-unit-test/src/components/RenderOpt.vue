<template>
  <div>
    <p>{{ name }}</p>
    <div class="default-slot">
      <slot />
    </div>
    <div class="last-slot">
      <slot name="last" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'jack'
    }
  }
}
</script>
