<template>
  <div>
    <v-row justify="center">
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      >
        <component
            v-slot="{title}"
            :is = "selectedComponent"
            :phoneNumber = "userPhoneNumber"
            :verifyData="verifyData"
            :config="config"
            @checkVerify = "verifyPhoneNumber"
            @verified = "verified"
            @closeDialog = "closeDialog"
            @goSignIn = "goSignIn"
            @phoneNumberNeedVerify = "verifyPhoneNumber"
            @recoverPass = "recoverUserPassword"
            @backToLogin = "backToLogin"
        >
          <v-card-title >
            <v-img src="https://nodes.alaatv.com/upload/footer-alaaLogo.png?w=30&h=40"
                   max-height="40"
                   max-width="30"
            />
            <span class="text-h5 px-2" slot="title">{{ title }}</span>
          </v-card-title>
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
  props: {
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
  components: {
    Verify,
    ForgotPassword,
    Login,
    SignIn,
  },
  data() {
    return {
      dialog: false,
      selectedComponent: '',
      userPhoneNumber: 0,
      verifyData:{}
    }
  },
  created() {
    this.dialog = !this.isLoggedIn()
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
