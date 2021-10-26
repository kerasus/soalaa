<template>
  <v-card>
    <slot title="ثبت نام در آلا " />
    <v-card-text>
      <v-progress-linear
        v-if="loading"
        indeterminate
        color="yellow darken-2"
      />
      <v-container>
        <v-text-field
          v-if="!showPasswordInput"
          v-model="inputData.mobile"
          name="sendToVerify"
          :disabled="disable"
          label="شماره همراه"
          dir="ltr"
          required
          @keydown="verifyEnterKey"
        />
        <div v-if="showPasswordInput">
          <v-text-field
            v-model="inputData.password"
            name="signIn"
            label="رمز عبور"
            type="password"
            dir="ltr"
            required
            @keydown="signInEnterKey"
          />
          <v-text-field
            v-model="inputData.password_confirmation"
            name="signIn"
            label="تکرار رمز عبور"
            type="password"
            dir="ltr"
            required
            @keydown="signInEnterKey"
          />
        </div>
      </v-container>
      <div v-if="errorMessages">
        <v-alert
          v-for="(message , index) in errorMessages"
          key="index"
          dense
          outlined
          text
          type="error"
          dismissible
        >
          {{ message }}
        </v-alert>
      </div>
      <div v-if="successMessage">
        <v-alert
          dense
          outlined
          text
          type="success"
          dismissible
        >
          {{ successMessage }}
        </v-alert>
      </div>
    </v-card-text>
    <v-card-actions class="d-flex flex-column">
      <v-btn
        v-if="!showPasswordInput"
        block
        dark
        :loading="loading"
        color="green"
        class="form-btn mb-3 btn-text-size"
        @click="sendToVerify"
      >
        دریافت کد تایید
      </v-btn>
      <v-btn
        v-if="showPasswordInput"
        block
        dark
        :loading="loading"
        color="green"
        class="form-btn mb-3 btn-text-size"
        @click="signIn"
      >
        ثبت نام
      </v-btn>
    </v-card-actions>
    <v-card-actions class="d-flex flex-column">
      <v-btn
        v-if="!showPasswordInput"
        text
        color="#3e5480"
        class="mb-3 btn-text-size"
        @click="backToLogin"
      >
        بازگشت به صفحه ی ورود
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios';
// import API_ADDRESS from "@/api/Addresses";

export default {
  name: "SignIn",
  props: {
    verifyData: {
      type: Object,
      default: () => {
        return {
          phone: null,
          code: null
        }
      },
    },
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
      inputData: {
        mobile: null,
        code: null,
        password: '',
        password_confirmation: '',
      },
      loading: false,
      disable: false,
      showPasswordInput: false,
      errorMessages: [],
      successMessage: null,
    }
  },
  watch: {},
  created() {
    if (this.verifyData.phone) {
      this.showPasswordInput = true;
      this.loading = false;
      this.isVerified();
    }
  },
  methods: {
    validateMobile(mobile) {
      mobile = this.inputData.mobile;
      let status = true;
      let regexMobile = RegExp('^09[0-9]{9}$');
      let message;
      if (mobile && mobile.length === 0) {
        status = false;
        message = 'شماره همراه خود را وارد کنید.';
      } else if (!regexMobile.test(mobile)) {
        status = false;
        message = 'شماره همراه خود را به درستی وارد نکرده اید.';
      }
      this.errorMessages.push(message);
      this.handleErrorMessages(this.errorMessages);
      return status
    },
    handleErrorMessages(messages) {
      for (let i in messages) {
        i = messages.indexOf(undefined);
        if (i >= 0) {
          messages.splice(i, 1);
        }
      }
    },
    successMessageAlert() {
      this.successMessage = 'ثبت نام شما با موفقیت انجام شد'
    },
    isVerified() {
      if (this.verifyData) {
        this.inputData.code = this.verifyData.code;
        this.inputData.mobile = this.verifyData.phone;
      }
    },
    sendToVerify() {
      this.errorMessages = [];
      let data = {
        phone: this.inputData.mobile,
        source: 'signeIn'
      };
      if (this.validateMobile(data.phone)) {
        if (this.config.hasVerify) {
          this.loading = true;
          this.$emit('checkVerify', data)
        } else {
          this.showPasswordInput = true;
        }
      }
    },
    signIn() {
      this.errorMessages = [];
      this.loading = true;
      axios.post('/register', this.inputData)
          .then(response => {
            this.loading = false;
            if (response.status === 200) {
              this.successMessageAlert()
              setTimeout(() => {
                this.$emit('closeDialog')
              }, 2000)
            }
          })
          .catch(err => {
            this.loading = false;
            for (let key in err.response.data.errors) {
              err.response.data.errors[key].forEach(message => {
                this.errorMessages.push(message)
              })
            }
          })

    },
    verifyEnterKey(e) {
      if (e.keyCode === 13) {
        return this.sendToVerify()
      }
    },
    signInEnterKey(e) {
      if (e.keyCode === 13) {
        return this.signIn()
      }
    },
    backToLogin() {
      this.$emit('backToLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-text-size {
  font-size: 14px;
  letter-spacing: normal;
  font-weight: 500;
}
</style>
