<template>
  <div class="text-center q-mb-lg">
    debug page
    <br/>
    don't forget rollback your code
  </div>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'

export default {
  data: () => ({
    name: '',
    test: [
      'a', 'b', 'c', 'd', 'e'
    ]
  }),
  created () {
    console.log(this.test.slice().reverse())
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
