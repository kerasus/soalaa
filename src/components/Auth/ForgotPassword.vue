<template>
  <v-card>
    <slot title="بازیابی رمز عبور " />
    <v-card-text class="mt-5">
      <v-alert
        outlined
        color="red"
      >
        <div class="text-h6 text-center mb-5">
          <span>
            :) It comes sooner than you think
          </span>
        </div>
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
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script>
//import axios from 'axios'
export default {
    name: "ForgotPassword",
    methods:{
        goBackLogin() {
            this.$emit('backToLogin')
        }
    }
}
</script>

<style scoped>
.btn-text-size{
    font-size: 14px;
    letter-spacing: normal;
    font-weight: 500;
}
</style>
