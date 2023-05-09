<template>
  <q-card class="dialog-card">
    <q-card-section class="dialog-title">
      ثبت نام
    </q-card-section>
    <q-card-section class="dialog-subtitle">شماره همراه خود را وارد کنید</q-card-section>
    <q-card-section class="login-input-wrapper">
      <q-input v-model="mobile"
               class="landing-text-input dialog-input"
               placeholder="09 - - - - - - - - -"
               outlined
               color="primary"
               dir="ltr" />
    </q-card-section>
    <q-card-actions class="dialog-action">
      <q-btn class="send-btn"
             :disabled="loading"
             color="primary"
             @click="getCodeForLogin">
        ارسال کد تایید
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>

import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'SignupStep',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  emits: ['gotoNextStep', 'updateUser'],
  data() {
    return {
      loading: false,
      rules: {
        required: value => !!value || 'این فیلد الزامی است'
      },
      mobile: null
    }
  },
  methods: {
    getCodeForLogin() {
      const loginData = {
        mobile: this.mobile
      }
      this.sendCodeRequest(loginData)
    },
    setLoading(loading) {
      this.loading = loading
    },
    sendCodeRequest(userInfo) {
      this.setLoading(true)
      this.$axios.get(API_ADDRESS.user.resendGuest + '?mobile=' + userInfo.mobile)
      // this.$apiGateway.user.resendGuest(userInfo)
        .then(response => {
          const message = response.data.message
          const code = response.data.data.code
          this.showMessage(message, 'success')
          this.$emit('updateUser', {
            mobile: this.mobile,
            code: code || null
          })
          this.$emit('gotoNextStep')
          this.setLoading(false)
        })
        .catch(() => {
          this.setLoading(false)
        })
    },
    showMessage(message, type = 'negative') {
      this.$q.notify({
        message,
        color: type,
        position: 'top',
        multiLine: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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

    .login-input-wrapper {
        margin-top: 20px;

        .dialog-input {
          width: 100%;
        }

        @media screen and (max-width: 1920px) {
        }
        @media screen and (max-width: 1439px) {
            margin-top: 60px;
        }
        @media screen and (max-width: 1023px) {
            margin-top: 60px;
        }
        @media screen and (max-width: 599px) {
            margin-top: 66px;
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
