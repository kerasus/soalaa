<template>
  <v-card>
    <slot title="تایید شماره" />
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex">
              <!--                           <v-text-field-->
              <!--                               value="شماره شما :"-->
              <!--                               solo-->
              <!--                               dense-->
              <!--                               disabled-->
              <!--                               class="mx-5"-->
              <!--                           />-->
              <v-text-field
                :value="phoneNumber.phone"
                solo
                dense
                dir="ltr"
                disabled
                class="mx-5 text-left"
              />
            </div>
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
              v-model="verifyCode"
              dir="ltr"
              class="text-left"
              label="کد تایید"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
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
    <v-card-actions class="d-flex flex-column">
      <v-btn
        v-if="canEnterCode"
        block
        dark
        color="green"
        class="mb-3"
        @click="checkVerifyCode"
      >
        ثبت
      </v-btn>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="#ff9000"
      />
      <v-btn
        v-if="canSendCodeAgain"
        block
        dark
        color="red"
        class="mb-3"
        @click="sendVerifyCodeToUser"
      >
        <span class="btn-text-size">
          دریافت مجدد
        </span>
      </v-btn>
      <v-btn
        text
        color="#3e5480"
        class="mb-3"
        @click="goBackLogin"
      >
        <span class="btn-text-size">
          بازگشت به صفحه ی ورود
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from "@/api/Addresses";
export default {
  name: "Verify",
  props: {
    phoneNumber: {
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
    alert: false,
    countDown: 0,
    loading: false,
    resendApi: '',
    verifyApi: '',
    verifyCode: null,
    sendAgainStatus:true,
  }),
  computed: {

    canEnterCode() {
      return this.countDown !== 0;
    },
    canSendCodeAgain() {
      if(this.countDown === 0 && this.errorMessages.length === 0 &&  this.sendAgainStatus ) {
        return true
      }
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
  },
  methods: {
    goBackLogin() {
      this.$emit('backToLogin')
    },

    checkApiUrl() {
      if (this.phoneNumber.source === 'login') {
        this.resendApi = API_ADDRESS.user.mobile.resend
        this.verifyApi = API_ADDRESS.user.mobile.verify
        return
      }
      this.resendApi = API_ADDRESS.user.mobile.resendGuest
      this.verifyApi = API_ADDRESS.user.mobile.verifyGuest
    },
    sendVerifyCodeToUser() {
      this.loading = true
      axios.get( this.resendApi, {params: {'mobile': this.phoneNumber.phone,}})
          .then(response => {
            if (response.data['code(just_for_development)']) {
              this.verifyCode = response.data['code(just_for_development)']
            }
            this.loading = false
            this.countDown = 180
            this.countDownTimer()
          }).catch(error => {
        this.sendAgainStatus=false
            console.log('run catch',error)
        this.showErrorMessages(error)

      })
    },

    showErrorMessages(error) {
      this.loading = false
      this.alert = true
      const messages = []
      for (let key in error.response.data.errors) {
        error.response.data.errors[key].forEach(message => {
          messages.push(message)
        })
      }
      this.errorMessages = messages
    },

    afterVerify() {
      let data = {
        phone: this.phoneNumber.phone,
        code: this.verifyCode
      }
      this.phoneNumber.source === 'login' ? this.reloadPage() : this.$emit('verified', data)
    },
    reloadPage() {
      this.$emit('closeDialog')
      //window.document.location.reload()
    },
    checkVerifyCode() {
      this.loading = true
      axios.post(this.verifyApi, {mobile: this.phoneNumber.phone, code: this.verifyCode})
          .then(response => {
           console.log(response)
            this.loading = false
            this.afterVerify()

          }).catch(error => {
        this.sendAgainStatus=false
        this.showErrorMessages(error)
      })
    },

    countDownTimer() {
      if (this.countDown > 0) {
        this.sendAgainStatus=true
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
