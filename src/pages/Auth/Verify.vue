<template>
  <div>
    <div class="row justify-center q-ma-lg">
      <q-btn
        v-if="!waiting"
        color="blue"
        rounded
        @click="sendCode"
      >
        دریافت کد فعالسازی
      </q-btn>
    </div>
    <div v-if="totalTime"
         class="row justify-center q-ma-lg">
      <div class="col-12 row justify-center mit">
        <span
          :class="totalTime <60 ? 'red-text' : ''"
        >{{ ((totalTime) % 3600) % 60 }}</span>
        <span>:</span>
        <span
          :class="totalTime <60 ? 'red-text' : ''"
        >{{ Math.floor(((totalTime) % 3600) / 60) }}</span>
      </div>
      کد ارسال شده را وارد نمایید.
    </div>
    <div class="q-px-lg">
      <q-input
        v-if="totalTime"
        dir="ltr"
        v-model="typedCode"
        label="کد فعالسازی"
        @keydown="pressedEnter"
      />
    </div>
    <div class="row justify-center q-px-lg">
      <q-btn
        rounded
        v-if="!totalTime && waiting"
        color="blue"
        @click="sendCode"
      >
        دریافت مجدد کد
      </q-btn>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn
        rounded
        v-if="totalTime"
        color="blue"
        @click="verifyCode"
      >
        ثبت شماره موبایل
      </q-btn>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'

export default {
  name: 'Verify',
  props: {
    modelValue: {
      type: User,
      default: () => new User()
    }
  },
  data: () => ({
    waiting: false,
    timer: null,
    totalTime: 0,
    minutes: null,
    seconds: null,
    typedCode: null
  }),
  created () {
  },
  methods: {
    pressedEnter (e) {
      if (e.keyCode === 13) this.verifyCode()
    },

    startTimer () {
      this.totalTime = 180
      this.timer = setInterval(() => this.countdown(), 1000)
    },

    verifyCode () {
      const that = this
      //  that.modelValue.loading = true
      this.$axios.post(API_ADDRESS.user.mobile.verify, { code: this.typedCode })
        .then(() => {
          // that.user.loading = false
          that.$emit('verified')
          // this.isCodeVerified = true
          this.$q.notify({
            type: 'positive',
            message: 'شماره موبایل با موفقیت ثبت شد.',
            position: 'center'
          })
          // this.getUserData()
        })
    },
    countdown () {
      if (this.totalTime > 0) {
        this.totalTime--
      } else {
        this.waiting = true
      }
    },

    sendCode () {
      const that = this
      // this.user.loading = true
      this.$axios.get(API_ADDRESS.user.mobile.resend)
        .then((resp) => {
        //  that.user.loading = false
          that.code = resp
          that.startTimer()
          that.waiting = true
          that.showTimer = true
          this.$q.notify({
            type: 'positive',
            message: 'کد فعالسازی با موفقیت ارسال شد.',
            position: 'center'
          })
        })
        .catch((e) => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در ارسال کد رخ داده است. لطفا دوباره امتحان کنید',
            position: 'center'
          })
        }
        )
    }
  }
}
</script>

<style scoped lang="scss">
.red-text {
  color: #ff5050
}
.time-text {
  font-size: 14px;
  font-weight: 500;
}
.mit span {
  font-size: 16px;
  padding: 10px;
}

.timer-box {
  justify-content: center;
}
</style>
