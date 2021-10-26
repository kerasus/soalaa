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

export default {
  name: "HandleModal",
  components: {
    Verify,
    ForgotPassword,
    Login,
    SignIn,
  },
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
    this.dialog = true
    this.setDialogBody()
  },
  methods: {
    closeDialog() {
      this.dialog = false
    },

    setDialogBody() {
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
