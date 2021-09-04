<template>
  <v-card class="elevation-12">
    <v-progress-linear
      color="#ffc107"
      absolute
      top
      :active="loadingList"
      indeterminate
      rounded
      height="6"
    />
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
            ورود / ثبت نام
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
    <v-card-text>
      <v-text-field
        id="username"
        v-model="username"
        label="شماره همراه"
        name="login"
        prepend-icon="mdi-account"
        type="text"
      />

      <v-text-field
        id="password"
        v-model="password"
        label="کد ملی"
        name="password"
        prepend-icon="mdi-lock"
        type="password"
      />
      <v-alert
        v-for="message in errorMessages"
        :key="message"
        dense
        outlined
        text
        type="error"
        dismissible
      >
        {{ message }}
      </v-alert>
    </v-card-text>
    <v-card-actions>
      <v-btn
        color="primary"
        :loading="loadingList"
        :disabled="loadingList"
        @click="login"
      >
        ورود
      </v-btn>
      <div class="d-flex">
        <v-btn
          v-if="config.hasSignIn"
          text
          class="mb-3"
          color="#3e5480"
          @click="goSignIn"
        >
          <span class="btn-text-size">
            هنوز ثبت نام نکرده ام
          </span>
        </v-btn>
        <v-btn
          v-if="config.hasForgotPass"
          text
          color="#C62828"
          class="mb-3"
          @click="recoverPass"
        >
          <span class="btn-text-size">
            فراموشی رمز عبور
          </span>
        </v-btn>
      </div>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
    import axios from 'axios'
    import API_ADDRESS from "@/api/Addresses";
    import {User} from "@/models/User";
    import { mixinAuth } from '@/mixin/Mixins'

    export default {
        name: 'Auth',
        mixins: [mixinAuth],
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
        data () {
            return {
                // user: new User(window.localStorage.getItem('user')),
                loadingList: false,
                username: null,
                password: null,
              errorMessages: [],
            }
        },
        created() {
          console.log('created in auth  :' ,this.getToken() )
            if (this.getToken()) {
              console.log('if run ')
                this.getUserData( () => { this.redirectTo() })
            }
        },
        methods: {
          goSignIn() {
            this.$emit('goSignIn')
          },

          recoverPass() {
            this.$emit('recoverPass')
          },
            getToken () {
              console.log('getToken :' ,this.$store.getters['Auth/accessToken'] )
                return this.$store.getters['Auth/accessToken']
            },
            setUserData (userData) {//after login
              console.log('set user data : ',userData)
                this.$store.commit('Auth/updateUser', new User(userData))
            },
            setAccessToken (access_token) { //after login
              console.log('setAccessToken :', access_token)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
                this.$store.commit('Auth/updateAccessToken', access_token)
            },
            redirectTo () {
              if (this.$route.query.redirect_to_exam) {
                this.$router.push({
                  name: 'onlineQuiz.StartExamAutomatically',
                  params: {
                    examId: this.$route.query.redirect_to_exam,
                    autoStart: this.$route.query.exam_auto_start
                  }
                })
                return
              }
                let redirect_to = window.localStorage.getItem('redirect_to')
              console.log('redirect_to :' , redirect_to)
                if (!redirect_to) {
                    redirect_to = 'dashboard'
                }
                this.$router.push({ name: redirect_to })
            },
            login () {
                let that = this
                this.loadingList = true
                axios.post(API_ADDRESS.auth.login, {
                    mobile: this.username,
                    password: this.password
                })
                .then((response) => {
                   this.loadingList = false
                  console.log('response in auth login :',response)
                  that.user = new User(response.data.data.user)
                  that.$store.commit('Auth/updateUser', that.user)
                  const access_token = response.data.data.access_token
                  this.setAccessToken(access_token)
                  that.setUserData(response.data.data.user)
                  this.getUserData(() => { this.redirectTo() })
                  if (response.status === 200 && !response.data.data.user.mobile_verified_at_2) {
                    this.$emit('phoneNumberNeedVerify', {
                      phone: response.data.data.user.mobile,
                      source: 'login'
                    })
                  }
                })
                .catch( (error) => {
                    this.loadingList = false
                  const messages = []
                  for (let key in error.response.data.errors) {
                    error.response.data.errors[key].forEach(message => {
                      messages.push(message)
                    })
                  }
                  this.errorMessages = messages
                })
            }
        }
    }
</script>


<style>
.btn-text-size {
  font-size: 14px;
  letter-spacing: normal;
  font-weight: 500;
}
    :-webkit-autofill {
        animation-name: onAutoFillStart;
    }
    :not(:-webkit-autofill) {
        animation-name: onAutoFillCancel;
    }
    @keyframes onAutoFillStart {
        from {
        }
        to {
        }
    }
    @keyframes onAutoFillCancel {
        from {
        }
        to {
        }
    }

</style>
