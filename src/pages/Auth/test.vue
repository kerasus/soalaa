<template>
  <q-btn @click="testMitra">click me </q-btn>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'
export default {
  methods: {
    testMitra () {
      this.$axios.get('/3a/api/v1/exam?with_pagination=1&page=' + '1')
        .then(res => {
          console.log(res)
        })
    }
  }

}
</script>
// lumenServer + '/exam?with_pagination=1&page=' + page_number
<style scoped>

</style>
