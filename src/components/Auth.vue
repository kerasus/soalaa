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
    <v-form @submit.prevent="login">
      <v-card-text>
        <v-text-field
          id="username"
          v-model="username"
          label="شماره همراه"
          name="login"
          prepend-icon="mdi-account"
          type="text"
          @animationstart="checkAnimationUserName"
        />

        <v-text-field
          id="password"
          v-model="password"
          label="کد ملی"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          :loading="loadingList"
          :disabled="loadingList"
          type="submit"
        >
          ورود
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-form>
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
        data () {
            return {
                user: new User(window.localStorage.getItem('user')),
                loadingList: false,
                username: null,
                password: null,
                autofilledUsername:false,
                autofilledPass:false
            }
        },
        created() {
            if (this.getToken()) {
                this.getUserData( () => { this.redirectTo() })
            }
        },
        methods: {
            checkAnimationUserName(e) {
                if(e.animationName == "onAutoFillStart")
                {
                    this.autofilledUsername = true;
                }
                else if(e.animationName == "onAutoFillCancel")
                {
                    this.autofilledUsername = false;
                }

                // if (this.autofilledUsername) {
                //     document.getElementById('username').focus()
                //     document.getElementById('password').focus()
                //     document.getElementById('username').focus()
                // }
            },
            checkAnimationPass(e) {
                if(e.animationName == "onAutoFillStart")
                {
                    this.autofilledPass = true;
                }
                else if(e.animationName == "onAutoFillCancel")
                {
                    this.autofilledPass = false;
                }

                if (this.autofilledPass) {
                    document.getElementById('password').focus()
                }
            },

            getToken () {
                return this.$store.getters['Auth/accessToken']
            },
            setUserData (userData) {
                this.$store.commit('Auth/updateUser', new User(userData))
                // this.redirectTo()
            },
            setAccessToken (access_token) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token
                this.$store.commit('Auth/updateAccessToken', access_token)
            },
            redirectTo () {
                let redirect_to = window.localStorage.getItem('redirect_to')
                if (!redirect_to) {
                    redirect_to = 'dashboard'
                }
                this.$router.push({ name: redirect_to })
            },
            login () {
                console.log('called')
                let that = this
                this.loadingList = true
                axios.post(API_ADDRESS.auth.login, {
                    mobile: this.username,
                    password: this.password
                })
                .then((response) => {

                    this.loadingList = false

                    that.user = new User(response.data.data.user)
                    that.$store.commit('Auth/updateUser', that.user)
                    const access_token = response.data.data.access_token

                    this.setAccessToken(access_token)
                    that.setUserData(response.data.data.user)
                    this.getUserData(() => { this.redirectTo() })
                })
                .catch( () => {
                    this.loadingList = false
                })
            }
        }
    }
</script>


<style>
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
