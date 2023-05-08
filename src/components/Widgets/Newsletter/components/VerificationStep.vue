<template>
  <q-card class="dialog-card">
    <q-card-section class="dialog-title">
      ثبت نام
    </q-card-section>
    <q-card-section class="dialog-subtitle"> کد ۶ رقمی خود را وارد کنید</q-card-section>
    <q-card-section class="login-input-wrapper">
      <v-otp-input ref="otpInput"
                   v-model:value="bindModal"
                   input-classes="landing-otp-input"
                   separator=""
                   :num-inputs="6"
                   :should-auto-focus="true"
                   input-type="letter-numeric"
                   :conditionalClass="['one', 'two', 'three', 'four','five','six']"
                   :placeholder="[]"
                   @on-change="handleOnChange"
                   @on-complete="handleOnComplete" />
    </q-card-section>
    <q-card-actions class="dialog-action">
      <q-btn class="send-btn"
             :disabled="loading"
             color="primary"
             @click="verifyCode">
        تایید کد
      </q-btn>
      <q-btn class="send-btn"
             :disabled="loading"
             color="warning"
             @click="changeNumber">
        تغییر شماره
      </q-btn>
    </q-card-actions>
    <q-card-actions class="code-resend-wrapper">
      <q-btn v-if="canReset"
             color="warning"
             class="resend-btn"
             flat
             label="ارسال مجدد"
             @click="resend" />
      <timer v-else
             ref="timer"
             :end-date="date"
             @end="onTimerEnd" />
    </q-card-actions>
  </q-card>
</template>

<script>
import Timer from './Timer.vue'
import VOtpInput from 'vue3-otp-input'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'VerificationStep',
  components: {
    VOtpInput,
    Timer
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['gotoPrevStep', 'gotoNextStep', 'updateUser'],
  data() {
    return {
      loading: false,
      otpInput: null,
      bindModal: '',
      otpValue: null,
      canReset: true,
      date: Date.now() + 120000
    }
  },
  mounted() {
    if (this.userInfo.code) {
      this.bindModal = this.userInfo.code
    }
  },
  methods: {
    verifyCode() {
      this.$axios.post(API_ADDRESS.user.verifyMoshavereh, {
        mobile: this.userInfo.mobile, // String
        code: this.bindModal // String
      })
      // this.$apiGateway.user.verifyMoshavereh(verifyData)
        .then(() => {
          this.$emit('gotoNextStep')
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    setLoading(loading) {
      this.loading = loading
    },
    showMessage(message, type = 'negative') {
      this.$q.notify({
        message,
        color: type,
        position: 'top',
        multiLine: true
      })
    },
    handleOnComplete(value) {
      this.otpValue = value
    },
    handleOnChange(value) {

    },
    clearInput() {
      this.otpInput.value?.clearInput()
    },
    changeNumber() {
      this.$emit('gotoPrevStep')
    },
    resend() {
      this.date = Date.now() + 120000
      const loginData = {
        mobile: this.userInfo.mobile
      }
      this.resendRequest(loginData)
      this.canReset = false
    },
    resendRequest(userInfo) {
      this.setLoading(true)
      this.$axios.get(API_ADDRESS.user.resendGuest + '?mobile=' + userInfo.mobile)
      // this.$apiGateway.user.resendGuest(userInfo)
        .then(response => {
          const message = response.data.message
          this.showMessage(message, 'success')
          this.$emit('updateUser', {
            mobile: this.userInfo.mobile,
            code: this.otpValue
          })
          this.$emit('gotoNextStep')
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    onTimerEnd() {
      this.canReset = true
    }
  }
}
</script>

<style lang="scss" scoped>
.login-input-wrapper{
  direction: rtl;
}

.code-resend-wrapper {
  display: flex;
  justify-content: flex-end;
  padding: 0;
  color: #A12047;

  .resend-btn{
      height: 20px;
      min-width: 64px;
      padding: 0px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
  }
}
.dialog-card {
    background: transparent;
    box-shadow: none !important;

    .dialog-title {
        display: flex;
        justify-content: center;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #383838;
        padding-top: 0;
        padding-bottom: 0;
    }

    .dialog-subtitle {
        margin-top: 24px;
        padding-bottom: 0;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #383838;

        @media screen and (max-width: 1439px) {
            margin-top: 16px;
        }
        @media screen and (max-width: 1023px) {
            margin-top: 16px;
        }
        @media screen and (max-width: 599px) {
            margin-top: 16px;
        }
    }
    .dialog-action {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 20px;

        .send-btn {
            width: 100%;
            margin-bottom: 24px;
            box-shadow: none;

            @media screen and (max-width: 1439px) {
                width: 280px;
            }
            @media screen and (max-width: 1023px) {
                width: 280px;
            }
            @media screen and (max-width: 599px) {
                width: 240px;
            }
        }

        @media screen and (max-width: 1439px) {
            margin-top: 60px;
        }
        @media screen and (max-width: 1023px) {
            margin-top: 60px;
        }
        @media screen and (max-width: 599px) {
            margin-top: 49px;
        }
    }
 .landing-text-input {
    height: 40px;
    background: #F7E5C6;
    border-radius: 8px;

    &.desabled {
      background: #F7E5C6;
      mix-blend-mode: normal;
      opacity: .4;
    }
  }
}

</style>

<style>
.landing-otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
/* Background colour of an input field with value */
.landing-otp-input.is-complete {
  background-color: #e4e4e4;
}
.landing-otp-input::-webkit-inner-spin-button,
.landing-otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
