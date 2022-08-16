<template>
  <div class="login-page row flex">
    <q-card v-if="!userLogin" class="col-lg-4 col-md-5 col-sm-6 col-xs-10 login-card my-card shadow-6">
      <q-card-section class="row bg-primary text-white justify-between">
        <div class="row login-header-right-side justify-center items-center">
          <svg class="login-alaa-logo" width="1154" height="600" viewBox="0 0 1154 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M376.661 115.386H314.443V434.259H376.661V115.386Z" fill="white"/>
            <path d="M203.427 334.288C203.427 339.268 202.443 344.199 200.533 348.799C198.622 353.4 195.821 357.58 192.291 361.102C188.76 364.623 184.568 367.416 179.955 369.322C175.342 371.227 170.398 372.208 165.405 372.208H150.991L108.372 115.989L47.053 126.124L87.9266 372.208H46.1543V434.259H165.405C191.98 434.227 217.458 423.684 236.25 404.943C255.041 386.202 265.613 360.792 265.645 334.288V115.386H203.427V334.288Z" fill="white"/>
            <path d="M1045.48 196.699V336.004C1045.48 346.061 1041.47 355.706 1034.34 362.817C1027.21 369.929 1017.54 373.924 1007.46 373.924H988.946V213.936H926.728V336.004C926.728 346.061 922.722 355.706 915.592 362.817C908.461 369.929 898.79 373.924 888.706 373.924H837.895C837.231 373.924 836.567 373.883 835.907 373.803C835.726 373.105 835.633 372.387 835.631 371.666V213.936H773.413V336.004C773.413 336.659 773.413 337.314 773.413 337.952C773.413 338.279 773.413 338.589 773.413 338.917C773.413 339.244 773.413 339.555 773.413 339.865C773.413 340.175 773.327 340.434 773.292 340.709C773.258 340.985 773.292 341.416 773.171 341.761L773.016 342.571C773.016 342.933 772.895 343.278 772.826 343.622C772.756 343.967 772.705 344.122 772.653 344.381C772.601 344.639 772.497 345.105 772.411 345.467L772.203 346.173L771.892 347.259L771.633 348C771.529 348.345 771.408 348.69 771.287 349.017C771.166 349.345 771.115 349.483 771.011 349.724C770.907 349.965 770.752 350.396 770.613 350.741L770.25 351.551C770.112 351.844 769.991 352.137 769.853 352.413C769.715 352.689 769.576 352.93 769.455 353.206L769.006 354.05C768.885 354.292 768.747 354.516 768.609 354.757C768.47 354.998 768.28 355.343 768.09 355.636C767.9 355.929 767.814 356.067 767.675 356.291L767.105 357.187L766.656 357.808C766.448 358.101 766.258 358.394 766.051 358.67L765.549 359.29L764.91 360.1C764.755 360.307 764.564 360.497 764.392 360.704C764.219 360.911 763.96 361.221 763.718 361.479C763.476 361.738 763.337 361.876 763.147 362.083L762.473 362.789L761.816 363.41C761.592 363.617 761.384 363.841 761.142 364.048L760.451 364.651L759.777 365.237L759.051 365.806L758.343 366.357L757.582 366.892L756.839 367.426L756.079 367.926L755.301 368.408L754.506 368.874C754.247 369.029 753.987 369.184 753.711 369.322L752.847 369.77L752.086 370.166L751.188 370.563L750.393 370.925L749.528 371.27L748.664 371.614L747.783 371.907L746.901 372.2C746.625 372.304 746.314 372.373 746.02 372.459L745.104 372.717C744.81 372.717 744.499 372.855 744.205 372.924L743.272 373.148L742.322 373.321L741.406 373.476L740.455 373.596L739.504 373.717L738.554 373.803H737.569H736.653H735.599L683.18 373.459V270.816C683.153 244.31 672.583 218.898 653.79 200.156C634.998 181.414 609.517 170.872 582.94 170.845H524.3C497.723 170.872 472.243 181.414 453.45 200.156C434.658 218.898 424.088 244.31 424.061 270.816V335.194C424.093 361.698 434.664 387.107 453.455 405.849C472.247 424.59 497.725 435.133 524.3 435.165H600.448C587.338 456.252 571.256 475.35 552.696 491.873C539.383 503.723 524.841 514.124 509.316 522.898L539.941 576.917C559.32 565.97 577.477 552.998 594.105 538.221C620.607 514.621 643.019 486.818 660.436 455.935C664.152 449.374 667.425 442.573 670.235 435.579L704.282 435.803V435.975H735.391C755.681 435.992 775.494 429.834 792.182 418.325C802.932 429.08 818.244 435.975 837.895 435.975H888.706C890.434 435.975 892.163 435.975 893.891 435.837C911.774 434.953 929.088 429.279 944.011 419.411C954.733 430.001 969.207 435.952 984.297 435.975H1007.46C1034.03 435.943 1059.51 425.4 1078.3 406.659C1097.09 387.918 1107.66 362.508 1107.7 336.004V196.699H1045.48ZM486.278 335.194V270.816C486.278 260.759 490.284 251.114 497.415 244.002C504.545 236.891 514.216 232.896 524.3 232.896H582.75C592.834 232.896 602.505 236.891 609.636 244.002C616.766 251.114 620.772 260.759 620.772 270.816V369.443C620.772 370.672 620.772 371.896 620.772 373.114H611.301L580.4 372.907V373.114H524.3C514.216 373.114 504.545 369.119 497.415 362.007C490.284 354.896 486.278 345.251 486.278 335.194Z" fill="white"/>
          </svg>
        </div>
        <q-avatar>
          <img src="img/alaa-logo.png" alt="logo">
        </q-avatar>
      </q-card-section>
      <q-linear-progress v-if="loadingList" color="warning" class="q-mt-sm"/>
      <q-separator></q-separator>
      <div class="q-pa-lg">
        <q-input
          bottom-slots
          color="blue-8"
          ref="userName"
          name="userName"
          v-model="username"
          label="شماره همراه"
          @keydown.enter="getEnter('pass')"
        >
          <template v-slot:before>
            <q-icon name="person"></q-icon>
          </template>
        </q-input>
        <q-input
          color="blue-8"
          bottom-slots
          ref="pass"
          name="pass"
          v-model="password"
          label="رمز"
          @keydown.enter="login"
          type="password">
          <template v-slot:before>
            <q-icon name="lock"></q-icon>
          </template>
        </q-input>
        <q-card-actions align="left">
          <q-btn class="full-width" color="primary" label="ورود" @click="login"/>
        </q-card-actions>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'
export default {
  name: 'Auth',
  mixins: [mixinAuth],
  data: () => ({
    userLogin: false,
    loadingList: false,
    username: null,
    password: null
  }),
  async created () {
    if (this.getToken()) {
      await this.getUserData()
      this.redirectTo()
    }
  },
  methods: {
    getToken () {
      return this.$store.getters['Auth/accessToken']
    },

    getEnter (targetRefKey) {
      this.$refs[targetRefKey].focus()
    },

    redirectTo () {
      if (this.$route.query.redirectTo_exam) {
        this.$router.push({
          name: 'onlineQuiz.StartExamAutomatically',
          params: {
            examId: this.$route.query.redirectTo_exam,
            autoStart: this.$route.query.exam_auto_start
          }
        })
        return
      }
      let redirectTo = window.localStorage.getItem('redirectTo')
      if (!redirectTo) {
        redirectTo = 'dashboard'
      }
      this.$router.push({ name: redirectTo })
    },

    handleErr (err) {
      this.loadingList = false
      const messages = []
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          this.$q.notify({
            type: 'negative',
            message,
            position: 'top'
          })
        })
      }
      if (!err.data.errors) {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    login () {
      this.loadingList = true
      this.$store.dispatch('Auth/login', {
        mobile: this.username,
        password: this.password
      })
        .then((response) => {
          this.loadingList = false
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + this.$store.getters['Auth/accessToken']
          this.redirectTo()
          this.$store.commit('Auth/updateUser', response.data.data.user)
          // this.getUserData().then(() => { this.redirectTo() })
        })
        .catch(err => {
          console.log('in auth :', err)
          this.handleErr(err.response)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
  height: 100vh;
  .login-card{
    margin: auto;
    .login-header-right-side{
      .login-alaa-logo{
        width: 48px;
        height: 48px;
      }
    }
  }
}
</style>
