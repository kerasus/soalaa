<template>
  <q-card
    class="profile-card"
  >
    <img src="https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg">
    <q-card-actions vertical>
      <a
        class="profile-link bg-green"
        @click="goHome"
      >
        <span>بازگشت به پیشخوان</span>
      </a>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mixinAuth, mixinQuiz } from 'src/mixin/Mixins'

export default {
  name: 'onlineQuizTopMenu',
  mixins: [mixinAuth, mixinQuiz],
  methods: {
    goHome () {
      this.$router.push({ name: 'dashboard' })
    },
    sendAnswersAndFinishExam () {
      const that = this
      this.quiz.sendAnswersAndFinishExam()
        .then(() => {
          that.$store.commit('clearExamData', that.quiz.id)
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'positive'
          })
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          that.$q.notify({
            title: 'توجه!',
            message: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
            type: 'warn',
            duration: 30000
          })
          that.$router.push({ name: 'user.exam.list' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card{
  width: 100%;
  max-width: 324px;
  border-radius: 20px;
  .q-card__actions{
    padding: 0 !important;
    a{
      text-decoration: none;
      cursor: pointer;
      height: 44px;
      color: white;
      text-align: center;
      padding: 12px;
      box-sizing: border-box;
    }
  }
}
</style>
