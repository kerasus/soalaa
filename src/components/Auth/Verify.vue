<template>
  <v-card>
    <slot title="تایید شماره" />
    <div
      v-if="registered"
      class="close_modal"
    >
      <v-btn
        class="ma-2"
        outlined
        fab
        small
        color="red"
        @click="reloadPage"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex">
              <v-text-field
                :value="userData.phone"
                solo
                dense
                dir="ltr"
                disabled
                class="mx-5 text-left"
              />
            </div>
            <v-alert
              v-if="successMessage"
              dense
              outlined
              class="mx-5"
              text
              type="success"
              dismissible
            >
              {{ successMessage }}
            </v-alert>
            <v-alert
              v-for="message in errorMessages"
              :key="message"
              v-model="alert"
              dense
              outlined
              class="mx-5"
              text
              type="error"
              dismissible
            >
              {{ message }}
            </v-alert>
            <div
              v-if="canEnterCode"
              class="d-flex timer-box"
            >
              <div>
                <p class="text-size">
                  زمان باقی مانده
                </p>
                <div class="d-flex">
                  <span
                    class="col-5 time-text pa-0 text-center"
                    :class="minutes === 0 ? 'red-text' : ''"
                  >
                    {{ Second }}
                  </span>
                  <span class="col-2 py-0 time-text">
                    :
                  </span>
                  <span class="col-5 time-text pa-0 text-center"> {{ minutes }}</span>
                </div>
              </div>
            </div>
            <v-text-field
              v-if="canEnterCode"
              ref=" confirm_cod"
              v-model="inputData.code"
              name="confirm_cod"
              dir="ltr"
              class="text-left"
              :disabled="registered"
              label="کد تایید"
              @keydown="pressEnter"
            />
            <v-btn
              v-if="canSendCodeAgain && !loading && sendCodeAgain"
              block
              dark
              color="red"
              class="mb-3"
              @click="sendVerifyCodeAgain"
            >
              <span class="btn-text-size">
                ارسال مجدد
              </span>
            </v-btn>
            <div
              v-if="canEnterCode"
              class="width-100"
            >
              <v-text-field
                ref="pass"
                v-model="inputData.password"
                name="pass"
                label="رمز عبور"
                type="password"
                :disabled="registered"
                dir="ltr"
                required
                @keydown="pressEnter"
              />
              <v-text-field
                ref="rePass"
                v-model="inputData.password_confirmation"
                name="rePass"
                label="تکرار رمز عبور"
                type="password"
                dir="ltr"
                required
                :disabled="registered"
                @keydown="pressEnter"
              />
              <v-btn
                dark
                :loading="loading"
                :disabled="registered"
                color="green"
                class="my-3 btn-text-size width-100"
                @click="signInOrCheckVerify"
              >
                {{ btnType }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="d-flex flex-column">
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="#ff9000"
      />
      <!--        ---------------------------------------------------------------------------------go back  btn ----------------------------------------------------------------------------------------------- -->
      <div
        v-if="oldUser"
        class="d-flex"
      >
        <v-btn
          text
          color="#ff5050"
          class="mb-3"
          @click="logout"
        >
          <span class="btn-text-size">
            خروج
          </span>
        </v-btn>
        <v-btn
          text
          :href="ticketAddress"
          :disabled="ticketLoading"
          color="#ff9000"
          class="mb-3"
        >
          <span class="btn-text-size">
            ثبت تیکت
          </span>
          <v-progress-circular
            v-if="ticketLoading"
            :size="20"
            indeterminate
            color="#ff9000"
            class="mr-2"
          />
        </v-btn>
      </div>
      <v-btn
        v-if="!oldUser"
        block
        text
        color="#3e5480"
        class="mb-3"
        @click="goToSignIn"
      >
        <span class="btn-text-size">
          تصحیح شماره موبایل
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
import API_ADDRESS from "@/api/Addresses";

export default {
  name: "Verify",
  props: {
    userData: {
      type: Object,
      default: () => {
        return {
          phone: 0,
          source: '',

        }
      }
    }
  },
  data: () => ({
    errorMessages: [],
    sendCodeAgain: true,
    alert: false,
    countDown: 0,
    timeout:300,
    userHasAccount:false,
    loading: false,
    resendApi: '',
    verifyApi: '',
    oldUser: false,
    registered:false,
    successMessage: null,
    ticketLoading:false,
    ticketAddress:'',
    inputData: {
      mobile: null,
      code: null,
      password: '',
      password_confirmation: '',
    },
  }),

  computed: {
    btnType() {
      if ( this.oldUser ){
        return 'ارسال '
      }else {
        return 'ثبت نام'
      }
    },

    canEnterCode() {
      return this.countDown !== 0;
    },

    canSendCodeAgain() {
      return this.countDown === 0 && true
    },

    minutes() {
      return Math.trunc(this.countDown / 60)
    },

    Second() {
      return this.countDown - (Math.trunc(this.countDown / 60) * 60)
    }
  },
  created() {
    this.checkApiUrl()
    this.sendVerifyCodeToUser()
    if(this.oldUser) this.getTicketUrl()
  },
  methods: {
    getTicketUrl() {
      this.sendCodeAgain = false
      this.ticketLoading=true
      let url =  '/api/v2/ticket?department_id[]=12&user_id='+this.userData.user_id
      axios.get(url, {
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': window.Laravel.csrfToken,
          'Authorization' : 'Bearer ' + this.userData.access_token
        }
      }).then(res =>{
        this.ticketLoading=false
        this.setTicketAddress(res.data.data)
      }).catch(error => {
        this.ticketAddress='/t?depId=12'
        this.ticketLoading = false
        this.showErrorMessages(error)
      })
    },

    setTicketAddress(data) {
      if(data && data.length>0){
        let ticket_id =  data[0].id
        this.ticketAddress='/t#/t/' + ticket_id
        return
      }
      this.ticketAddress='/t?depId=12'
    },

    signInOrCheckVerify() {
      this.oldUser ? this.checkVerifyCode() : this.signIn()
    },

    pressEnter(e){
      let actions = {
        rePass: () => this.signIn(),
        pass: () => this.$refs.rePass.focus(),
        confirm_cod: () =>  this.$refs.pass.focus(),
      }
      if(e.keyCode === 13 )  actions[e.originalTarget.name].call()
    },

    sendVerifyCodeAgain() {
      if (this.countDown === 0) {
        this.sendVerifyCodeToUser()
      }
    },

    logout() {
      window.document.getElementById('logout-form').submit();
      window.localStorage.setItem('access_token', '');
    },

    clearErrorMessages() {
      let that = this
      setTimeout(() => {
        that.errorMessages = []
      }, 20000)
    },

    goToSignIn() {
      this.$emit('goSignIn')
    },

    checkApiUrl() {
      if (this.userData.source === 'login') {
        this.resendApi = API_ADDRESS.user.mobile.resend
        this.verifyApi = API_ADDRESS.user.mobile.verify
        this.oldUser = true
        return
      }
      this.resendApi = API_ADDRESS.user.mobile.resendGuest
      this.verifyApi = API_ADDRESS.user.mobile.verifyGuest
    },

    sendVerifyCodeToUser() {
      this.loading = true
      console.log('this.resendApi  in send verify code :',this.resendApi)
      axios.get(this.resendApi, this.oldUser ? null : {params: {'mobile': this.userData.phone,}})
          .then(response => {
            if (response.data['code(just_for_development)']) {
              this.inputData.code = response.data['code(just_for_development)']
            }
            this.successMessage = response.data.message
            this.clearAlertMessages();
            this.loading = false
            this.timeout = response.data.timeout
            this.countDown = this.timeout
            this.countDownTimer()
          }).catch(error => {
        this.showErrorMessages(error)
      })
    },

    showErrorMessages(error) {
      this.loading = false
      this.alert = true
      const messages = []
      const err = error.response
      if (err.status === 400 ) {
        if (err.data.message) messages.push(err.data.message)
        else  messages.push(err.statusText)
        // for redirect user to ticket page
        // localStorage.setItem('alaatvFlashMessage', JSON.stringify(err.data.message))
        // window.history.pushState({}, '','/t')
        // this.reloadPage()
      }
      if (err.status === 422 && err.config.url === '/api/v2/mobile/resendToGuest') {
        if (err.data.message) messages.push(err.data.message)
        else  messages.push(err.statusText)
        this.sendCodeAgain = false
        this. userHasAccount = true
      }

      if (err.status === 429) {
        this.sendCodeAgain = false
        if (err.data.message) messages.push(err.data.message)
        else  messages.push(err.statusText)
        if(!this.oldUser){
          this.countDown = this.timeout
          this.countDownTimer()
        }
      }
      if (err.status === 403 || err.status === 503) {
        messages.push(err.data.error)
      }
      for (let key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          messages.push(message)
        })
      }
      this.errorMessages = messages
      this.clearErrorMessages();
    },

    reloadPage() {
      this.$emit('closeDialog')
      window.document.location.reload()
    },

    clearAlertMessages() {
      let that = this
      setTimeout(() => {
        that.successMessage = '';
      }, 3000)
    },

    checkVerifyCode() {
      this.loading = true
      delete this.inputData.mobile;
      axios.post(this.verifyApi,this.inputData)
          .then(response => {
            console.log(response)
            this.loading = false
            this.reloadPage()
          }).catch(error => {
        this.showErrorMessages(error)
      })
    },

    signIn() {
      this.loading = true;
      this.inputData.mobile=this.userData.phone;
      axios.post(API_ADDRESS.auth.register, this.inputData)
          .then(response => {
            this.loading = false;
            if (response.status === 200) {
              this.successMessageAlert()

              this.registered =true
              setTimeout(() => {
                this.reloadPage()
              }, 7000)
            }
          })
          .catch(error => {
            this.showErrorMessages(error)
          })
    },

    successMessageAlert() {
      this.successMessage = 'ثبت نام شما با موفقیت انجام شد'
    },

    countDownTimer() {
      if (this.countDown > 0) {
        this.sendCodeAgain = true
        setTimeout(() => {
          this.countDown -= 1
          if(!this.registered)this.countDownTimer()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.close_modal{
  position: absolute;
  top: 10px;
  left: 10px;
}

.btn-text-size {
  font-size: 14px;
  letter-spacing: normal;
  font-weight: 500;
}

.red-text {
  color: #ff5050
}

.directions {
  .v-input__control {
    .v-input__slot {
      .v-text-field__slot {
        .v-label {
          right: auto !important;
          left: 0 !important;
          direction: ltr !important;
        }
      }
    }
  }
}
.width-100 {
  width:100%;
}
.text-size {
  color: #151515;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
}

.time-text {
  font-size: 14px;
  font-weight: 500;
}

.timer-box {
  justify-content: center;
}
</style>
