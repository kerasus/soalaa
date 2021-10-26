<template>
  <v-card>
    <slot title="بازیابی رمز عبور " />
    <div
      v-if="passChanged"
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
    <v-card-text class="mt-5">
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

      <div v-if="!codeSended">
        <v-text-field
          v-model="inputData.username"
          name="username"
          label="نام کاربری"
          dir="ltr"
          required
          @keydown="enter"
        />

        <v-btn
          v-if="!loading"
          dark
          color="green"
          class="mb-3 mx-auto"
          @click="getVerificationCode"
        >
          <span class="btn-text-size">
            دریافت کد تایید
          </span>
        </v-btn>
      </div>

      <div
        v-if="codeSended"
        class="center"
      >
        <div class="d-flex timer-box">
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
        <v-btn
          v-if="!loading && timerOut"
          dark
          color="red"
          class="my-3  mx-auto"
          @click="getVerificationCode"
        >
          <span class="btn-text-size">
            ارسال مجدد
          </span>
        </v-btn>
        <div
          v-if="!timerOut"
          class="center"
        >
          <v-text-field
            ref="confirm_cod"
            v-model="inputData.code"
            name="confirm_cod"
            dir="ltr"
            class="text-left"
            label="کد تایید"
            :disabled="passChanged"
            @keydown="enter"
          />
          <v-text-field
            ref="pass"
            v-model="inputData.pass"
            name="pass"
            label="رمز عبور"
            type="password"
            dir="ltr"
            :disabled="passChanged"
            required
            @keydown="enter"
          />
          <v-text-field
            ref="rePass"
            v-model="inputData.rePass"
            name="rePass"
            label="تکرار رمز عبور"
            type="password"
            dir="ltr"
            required
            :disabled="passChanged"
            @keydown="enter"
          />
          <v-btn
            v-if="!loading"
            dark
            color="green"
            class="mb-3"
            :disabled="passChanged"
            @click="sendNewPass"
          >
            <span class="btn-text-size">
              ارسال
            </span>
          </v-btn>
        </div>
      </div>
      <v-progress-circular
        v-if="loading"
        indeterminate
        class="loading-margin"
        color="#ff9000"
      />
    </v-card-text>
  </v-card>
</template>
//api/v2/password/reset
<script>
import axios from 'axios';
// import API_ADDRESS from "@/api/Addresses";
export default {
  name: "ForgotPassword",
  data: () => ({
    loading: false,
    errorMessages: [],
    successMessage:'',
    passChanged:false,
    codeSended: false,
    timeout:300,
    timerOut: false,
    countDown: 0,
    inputData: {
      code: null,
      username: null,
      pass: null,
      rePass: null
    }

  }),
  computed: {
    minutes() {
      return Math.trunc(this.countDown / 60)
    },

    Second() {
      return this.countDown - (Math.trunc(this.countDown / 60) * 60)
    }
  },
  methods: {
    goBackLogin() {
      this.$emit('backToLogin')
    },
    reloadPage() {
      this.$emit('closeDialog')
      window.document.location.reload()
    },

    enter(e) {
      let actions = {
        username: () => this.getVerificationCode(),
        rePass: () => this.sendNewPass(),
        pass: () => this.$refs.rePass.focus(),
        confirm_cod: () => this.$refs.pass.focus()
      }
      if(e.keyCode === 13 )  actions[e.originalTarget.name].call()
    },

    sendNewPass() {
      axios.put('/api/v2/password/reset',{
        username: this.inputData.username,
        code : this.inputData.code,
        password:this.inputData.pass,
        password_confirmation:this.inputData.rePass
      })
          .then(res => {
            this.passChanged=true
            this.successMessage = res.data.message
            setTimeout(() => {
              this.reloadPage()
            }, 7000)
          })
          .catch(err => {
            this.showErrorMessages(err)
          })
    },

    getVerificationCode() {
      this.loading = true
      axios.post('/api/v2/password/reset', {username: this.inputData.username})
          .then(response => {
            this.loading = false
            this.timeout = response.data.timeout
            this.countDown =  this.timeout
            if (response.data['code(just_for_development)']) {
              this.inputData.code = response.data['code(just_for_development)']
            }
            this.successMessage = response.data.message
            this.codeSended = true
            this.timerOut = false
            this.countDownTimer()

          }).catch(error => {
        // console.log('error :', error)
        this.showErrorMessages(error)
      })
    },

    countDownTimer() {
      if (this.countDown > 0) {
        this.sendCodeAgain = true
        setTimeout(() => {
          this.countDown -= 1
          if (!this.passChanged) this.countDownTimer()
        }, 1000)
      } else this.timerOut = true
    },

    showErrorMessages(error) {
      this.loading = false
      const messages = []
      const err = error.response
      if (err.status === 401 || err.status === 403 || err.status === 422 || err.status === 429 || err.status === 400) {
        if (err.data.message) {
          messages.push(err.data.message)
          if(err.status === 429){
            this.codeSended = true
            this.timerOut = false
            this.countDown= this.timeout
            this.countDownTimer()
          }
        } else {
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

    clearErrorMessages() {
      let that = this
      setTimeout(() => {
        that.errorMessages = []
      }, 20000)
    },
  },
}
</script>

<style scoped>

.red-text {
  color: #ff5050
}

.time-text {
  font-size: 14px;
  font-weight: 500;
}
.loading-margin{
  margin-top:15px;
  margin-right:50%;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content:center ;
}

.timer-box {
  justify-content: center;
}
.close_modal{
  position: absolute;
  top: 10px;
  left: 10px;
}
.text-size {
  color: #151515;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
}
.btn-text-size {
  font-size: 14px;
  letter-spacing: normal;
  font-weight: 500;
}
</style>
