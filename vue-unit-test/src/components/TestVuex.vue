<template>
  <div>
    <p class="state">{{ $store.state.name }}</p>
    <p class="getter">{{ getName }}</p>
    <button class="mutation" @click="setNameMutation">mutation</button>
    <button class="action" @click="setNameAction">action</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"

export default {
  data() {
    return {
      
    }
  },
  methods: {
    ...mapMutations({
      mSetName: 'setName'
    }),
    ...mapActions({
      aSetName: 'setName'
    }),
    setNameMutation() {
      this.mSetName('mark')
    },
    setNameAction() {
      this.aSetName('marry')
    }
  },
  computed: {
    ...mapGetters(['getName'])
  }
}
</script>
