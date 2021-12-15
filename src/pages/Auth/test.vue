<template>
  <div class="text-center q-mb-lg">
    debug page
    <br />
    don't forget rollback your code
    <br />
   name : {{getStore}}
<q-btn @click="getStore">
  get from store
</q-btn>
    <q-btn @click="change">
change
</q-btn>
  </div>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'

export default {
  data: () => ({
    name: ''
  }),
  created () {
  },
  computed: {
    getStore () {
      return this.$store.state.vuexTest.name
    }
  },
  methods: {
    change () {
      this.$store.commit('vuexTest/callOther', 'mitra')
    }

  }
}
</script>
<style scoped>

</style>
