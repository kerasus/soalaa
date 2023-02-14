<template>
  <q-card v-if="!userLogin"
          class="login-card">
    <div v-if="loadingList"
         class="text-center">
      <q-spinner-ball
        color="primary"
        size="5em"
      />
    </div>
    <div v-else>
      <div class="header">
        ثبت نام و ورود
      </div>
      <div class="phone-number">
        <div class="label">
          شماره همراه
        </div>
        <q-input
          ref="userName"
          v-model="username"
          bottom-slots
          hide-bottom-space
          autocomplete="off"
          onfocus="this.removeAttribute('readonly');"
          name="userName"
          placeholder=" - - - - - - - - - 09"
          @keydown.enter="getEnter('pass')"
        >
        </q-input>
      </div>
      <div class="national-code">
        <div class="label">
          کد ملی
        </div>
        <q-input
          ref="pass"
          v-model="password"
          name="pass"
          hide-bottom-space
          type="password"
          @keydown.enter="login">
        </q-input>
      </div>
      <q-btn class="full-width login-btn"
             unelevated
             color="primary"
             label="ثبت نام / ورود"
             @click="login" />
    </div>

  </q-card>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
export default {
  name: 'Auth',
  mixins: [mixinAuth],
  data: () => ({
    userLogin: false,
    loadingList: false,
    username: null,
    password: null
  }),
  async created () {
    if (this.getToken()) {
      await this.getUserData()
      this.redirectTo()
    }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
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
      const redirectTo = this.$store.getters['Auth/redirectTo']
      const defaultRoute = { name: 'HomePage' }
      if (!redirectTo) {
        this.$router.push(defaultRoute)
        return
      }
      this.$store.commit('Auth/updateRedirectTo', null)
      this.$router.push(redirectTo)
    },

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message,
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
      this.loadingList = true
      this.$store.dispatch('Auth/login', {
        mobile: this.username,
        password: this.password
      })
        .then(() => {
          this.loadingList = false
          // const accessToken = response.data.data.access_token
          // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
          // this.$store.commit('Auth/updateUser', response.data.data.user)
          this.redirectTo()
        })
        .catch(err => {
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.login-card {
  width: 434px;
  height: 485px;
  margin: auto;
  box-shadow: 0 3px 10px rgba(55, 68, 87, 0.04);
  border-radius: 20px;
  padding:60px 67px;
  .header{
    margin-bottom: 50px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    letter-spacing: -0.03em;
    color: #8075DC;
  }
  .label{
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.03em;
    color: #434765;
    margin-bottom: 8px;
  }
  .login-btn{
    :deep(.q-btn__content){
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .phone-number{
    margin-bottom: 16px;
  }
  .national-code{
    margin-bottom: 56px;
  }
:deep(.q-field--focused) {
  appearance: none;
}
  &:deep(.q-field--focused .q-field__control) {
    background-color: rgba(255,255,255,0) !important;
    appearance: none;
    border: 1px solid #FFB74D;
    box-shadow: 0 0 0 2px #FFEDD2;
    border-radius: 8px;
  }

  &:deep(.q-field .q-field__control) {
    height: 40px;
    background: #F2F5F9;
    border-radius: 8px;
  }

  &:deep(.q-field__native) {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #6D708B !important;
  }
  :deep(.q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input){
    padding: 8px 16px;
    border-radius: 8px
  }

  :deep(.q-field__control){
    &::after{
      height: 0;
    }
    &::before{
      border-bottom: none;
    }
  }
}
@media only screen and (max-width: 1023px){
  .login-card {
    width: 312px;
    height: 409px;
    border-radius: 16px;
    padding:40px 30px;
    .header{
      margin-bottom: 30px;
      font-size: 20px;
      line-height: 31px;
    }
    .label{
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
    }
  }
}

</style>
