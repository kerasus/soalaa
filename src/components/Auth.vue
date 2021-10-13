<template>
  <div id="q-app ">
    <div class="row justify-center items-center fullscreen q-px-lg">
      <div class="col-5" >
        <q-card v-if="!userLogin" class="my-card q-mt-auto shadow-6">
          <q-card-section class="row bg-primary text-white justify-between">
            <div class="text-h6">ورود</div>
            <q-avatar square align="right">
              <img src="img/alaa-logo.png" alt="logo">
            </q-avatar>
          </q-card-section>
          <q-linear-progress v-if="loadingList" color="warning" class="q-mt-sm" />
          <q-separator></q-separator>
          <div class="q-pa-lg">
            <q-input bottom-slots
                     v-model="username"
                     label="شماره همراه"
                     class=""
                     model-value="">
              <template v-slot:before>
                <q-icon name="person"></q-icon>
              </template>
            </q-input>
            <q-input bottom-slots   v-model="password" label="رمز "   model-value="">
              <template v-slot:before>
                <q-icon name="lock"></q-icon>
              </template>
            </q-input>
            <q-card-actions align="left">
              <q-btn  style="width: 80px" color="primary" label="ورود" @click="login"/>
            </q-card-actions>
          </div>
        </q-card>
      </div>
    </div>
  </div>

</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'
import { mixinAuth } from 'src/mixin/Mixins'
export default {
  name: 'Auth',
  mixins: [mixinAuth],
  data: () => ({
    userLogin: false,
    loadingList: false,
    username: null,
    password: null,
    autofilledUsername: false,
    autofilledPass: false
  }),
  created () {
    // if (this.getToken()) {
    //   console.log('run')
    //   this.getUserData(() => { this.redirectTo() })
    // }
  },
  methods: {
    checkAnimationUserName (e) {
      if (e.animationName === 'onAutoFillStart') {
        this.autofilledUsername = true
      } else if (e.animationName === 'onAutoFillCancel') {
        this.autofilledUsername = false
      }

      // if (this.autofilledUsername) {
      //     document.getElementById('username').focus()
      //     document.getElementById('password').focus()
      //     document.getElementById('username').focus()
      // }
    },
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },
    setUserData (userData) {
      this.$store.commit('Auth/updateUser', new User(userData))
    },
    setAccessToken (accessToken) {
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
      // this.$store.commit('Auth/updateAccessToken', accessToken)
    },
    redirectTo () {
      if (this.$route.query.redirectTo_exam) {
        this.$router.push({
          name: 'onlineQuiz.StartExamAutomatically',
          params: {
            examId: this.$route.query.redirectTo_exam,
            autoStart: this.$route.query.exam_auto_start
          }
        })
        return
      }

      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'dashboard'
      }
      this.$router.push({ name: redirectTo })
    },

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message: message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },
    login () {
      const that = this
      this.loadingList = true
      this.$axios.post(API_ADDRESS.auth.login, {
        mobile: this.username,
        password: this.password
      })
        .then((response) => {
          this.loadingList = false
          // that.user = new User(response.data.data.user)
          // that.$store.commit('Auth/updateUser', that.user)
          const accessToken = response.data.data.access_token
          that.setAccessToken(accessToken)
          this.userLogin = true
          this.$q.notify({
            type: 'info',
            message: 'برای درخواست‌های axios لطفا صفحه را reload نفرمایید.',
            position: 'center'
          })
          this.$q.notify({
            type: 'positive',
            message: 'ورود با موفقیت انجام شد',
            position: 'center'
          })

          // that.setUserData(response.data.data.user)
          // this.getUserData(() => { this.redirectTo() })
        })
        .catch((err) => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style scoped>

</style>
