<template>
  <q-btn @click="changeView('konkoor')">click me </q-btn>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'
import { mixinQuiz } from 'src/mixin/Mixins'
export default {
  mixins: [mixinQuiz],
  created () {
    // this.$axios.get('/cdn/upload/knowledgeTree.json', {
    //   headers: {
    //     Accept: 'application/json; charset=utf-8',
    //     dataType: 'json'
    //   },
    //   transformRequest: (data, headers) => {
    //     delete headers.common.Authorization
    //     return data
    //   }
    // })
    //   .then((res) => {
    //     console.log('res', res)
    //   })
    //   .catch((err) => {
    //     console.log('error', err)
    //   })
  },
  methods: {
    testMitra () {
      this.$router.push({
        name: 'konkoorView',
        params: {
          quizId: this.quiz.id
        }
      })
    },
    changeView (type) {
      console.log('hi')
      if (type === 'alaa') {
        const questionNumber = this.getQuestionNumberFromId(this.currentQuestion.id)
        this.$router.push({
          name: 'onlineQuiz.alaaView',
          params: { quizId: this.quiz.id, questNumber: questionNumber }
        })
      } else if (type === 'konkoor') {
        this.$store.commit('AppLayout/updateDrawer', false)
        setTimeout(() => {
          this.$router.push({ name: 'konkoorView', params: { quizId: '6134aa6d567a60794c3c3d17' } })
        }, 200)
      }
    }
  }

}
</script>
// lumenServer + '/exam?with_pagination=1&page=' + page_number
<style scoped>

</style>
