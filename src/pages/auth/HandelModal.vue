<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
      >
        <component
          :is="selectedComponent"
          v-slot="{title}"
          :user-data="userPhoneNumber"
          :verify-data="verifyData"
          :config="config"
          @checkVerify="verifyPhoneNumber"
          @verified="verified"
          @closeDialog="closeDialog"
          @goSignIn="goSignIn"
          @phoneNumberNeedVerify="verifyPhoneNumber"
          @recoverPass="recoverUserPassword"
          @backToLogin="backToLogin"
        >
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>
              <v-row>
                <v-col>
                  <v-img
                    src="/img/logo.png"
                    width="20"
                  />
                </v-col>
                <v-col>
                  {{ title }}
                </v-col>
              </v-row>
            </v-toolbar-title>
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="'https://alaatv.com/'"
                  icon
                  small
                  target="_blank"
                  v-on="on"
                >
                  <v-img
                    src="img/alaa-logo.png"
                    width="50"
                  />
                </v-btn>
              </template>
              <span>آموزش مجازی آلاء</span>
            </v-tooltip>
          </v-toolbar>
        </component>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import Verify from '@/components/Auth/Verify';
import ForgotPassword from "@/components/Auth/ForgotPassword";
import Login from "@/components/Auth/Login";
import SignIn from "@/components/Auth/SignIn";
import { mixinAuth } from '@/mixin/Mixins';
import axios from "axios";

export default {
  name: "HandleModal",
  components: {
    Verify,
    ForgotPassword,
    Login,
    SignIn,
  },
  mixins: [mixinAuth],
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          hasLogin: true,
          hasSignIn: true,
          hasVerify: true,
          hasForgotPass: true,
          starter: 'login'
        }
      }
    },
  },
  data() {
    return {
      dialog: false,
      selectedComponent: '',
      userPhoneNumber: 0,
      verifyData: {}
    }
  },
  created() {
    if (this.getToken()) {
      this.setAccessToken(this.getToken())
      this.getUserData(() => {
        this.redirectTo()
      })
    }
     else this.setDialogBody()
  },
  methods: {
    setAccessToken (access_token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
      this.$store.commit('Auth/updateAccessToken', access_token)
    },
    redirectTo () {
      console.log('redirect in handele modal ')
      if (this.$route.query.redirect_to_exam) {
        this.$router.push({
          name: 'onlineQuiz.StartExamAutomatically',
          params: {
            examId: this.$route.query.redirect_to_exam,
            autoStart: this.$route.query.exam_auto_start
          }
        })
        return
      }
      let redirect_to = window.localStorage.getItem('redirect_to')
      console.log('redirect_to :' , redirect_to)
      if (!redirect_to) {
        redirect_to = 'dashboard'
      }
      this.$router.push({ name: redirect_to })
    },

    getToken () {
      return this.$store.getters['Auth/accessToken']

    },

    closeDialog() {
      this.dialog = false
    },

    setDialogBody() {
      this.dialog = true
      this.selectedComponent = this.config.starter
    },

    goSignIn() {
      this.selectedComponent = 'SignIn'
    },

    verifyPhoneNumber(phoneNumber) {
      // console.log('verifyPhoneNumber :', phoneNumber)
      this.userPhoneNumber = phoneNumber
      this.selectedComponent = 'Verify'
    },

    recoverUserPassword() {
      this.selectedComponent = 'ForgotPassword'
    },

    verified(data) {
      this.verifyData = data
      this.selectedComponent = 'SignIn'
    },

    backToLogin() {
      this.selectedComponent = 'Login'
    },

    isLoggedIn() {
      const userID = document.querySelector('input[name="js-var-userId"]').value
      return !!(userID && userID !== 0)
    },
  }
}
</script>
<style scoped>

</style>
