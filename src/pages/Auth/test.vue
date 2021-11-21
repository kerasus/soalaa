<template>
  <q-btn @click="testMitra">click me </q-btn>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'
export default {
  created () {
    this.$axios.get('/cdn/upload/knowledgeTree.json', {
      headers: {
        Accept: 'application/json; charset=utf-8',
        dataType: 'json'
      },
      transformRequest: (data, headers) => {
        delete headers.common.Authorization
        return data
      }
    })
      .then((res) => {
        console.log('res', res)
      })
      .catch((err) => {
        console.log('error', err)
      })
  },
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
