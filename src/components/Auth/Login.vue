<template>
  <v-card>
    <slot title="ورود به آلا" />
    <v-card-text>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="yellow darken-2"
      />
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="mobile"
              dir="ltr"
              label="شماره همراه"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              name="pass"
              dir="ltr"
              label="رمز "
              type="password"
              required
              @keydown="enter"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-alert
        v-for="message in errorMessages"
        :key="message"
        dense
        outlined
        text
        type="error"
        dismissible
      >
        {{ message }}
      </v-alert>
    </v-card-text>
    <v-card-actions class="d-flex flex-column">
      <v-btn
        block
        dark
        color="#ff8f00"
        class="mb-3"
        @click="login"
      >
        <span class="btn-text-size">
          ورود
        </span>
      </v-btn>
      <div class="d-flex">
        <v-btn
          v-if="config.hasSignIn"
          text
          class="mb-3"
          color="#3e5480"
          @click="goSignIn"
        >
          <span class="btn-text-size">
            هنوز ثبت نام نکرده ام
          </span>
        </v-btn>
        <v-btn
          v-if="config.hasForgotPass"
          text
          color="#C62828"
          class="mb-3"
          @click="recoverPass"
        >
          <span class="btn-text-size">
            فراموشی رمز عبور
          </span>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
//import API_ADDRESS from "@/api/Addresses";
export default {
  name: 'Login',
  props:{
    config:{
      type:Object,
      default: () => {
        return {
          hasLogin:true,
          hasSignIn:true,
          hasVerify:true,
          hasForgotPass:true,
          starter:'login'
        }
      }
    },
  },
  data: () => ({
    errorMessages: [],
    mobile: null,
    password: null,
    loading: false,
  }),
  methods: {
    enter(e) {
      e.keyCode === 13 ? this.login() : ''
    },

    login() {
      this.loading = true
      axios.post('/login', {mobile: this.mobile, password: this.password})
          .then(response => {

            if(response.status === 200 && !response.data.data.user.mobile_verified_at){
              this.$emit('phoneNumberNeedVerify',{
                phone :response.data.data.user.mobile,
                source : 'login',
                user_id : response.data.data.user.id,
                access_token : response.data.data.access_token
              })
              return
            }
            window.document.location.reload()
          })
          .catch(error => {
            this.showErrorMessages(error)
          })
    },
    showErrorMessages(error) {
      this.loading = false
      const messages = []
      const err = error.response
      if(err.status === 401 || err.status === 403 || err.status === 422 || err.status === 429){
        if (err.data.message){
          messages.push(err.data.message)
          if(err.status === '403'){
            this.$emit('phoneNumberNeedVerify')
          }
        }else {
          messages.push(err.statusText)
        }
      }
      for (let key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          messages.push(message)
        })
      }
      this.errorMessages = messages
      this.clearErrorMessages();
    },
    clearErrorMessages(){
      let that = this
      setTimeout(() => {
        that.errorMessages=[]
      }, 20000)
    },

    goSignIn() {
      this.$emit('goSignIn')
    },

    getLoginActionUrl() {
      return document.querySelector('input[name="js-var-loginActionUrl"]').value
    },

    recoverPass() {
      this.$emit('recoverPass')
    },

    showLoginModal() {
      setTimeout(function () {
        Authentication.showLogin(GlobalJsVar.loginActionUrl(), function (response) {
          window.location.reload();
        }, true);
      }, 1000);
    },
  }
}
</script>

<style scoped lang="scss">
.btn-text-size{
  font-size: 14px;
  letter-spacing: normal;
  font-weight: 500;
}
</style>
