<template>
  <div id="q-app q-ma-lg" style="min-height: 100vh">
    <div class="q-pa-md">
      <div class="row justify-between  q-col-gutter-xl">
        <div class="col-md-6">
          <q-input v-model="user.first_name" label="نام" :model-value="user.first_name"></q-input>
        </div>
        <div class="col-md-6">
          <q-input v-model="user.last_name" label=" نام خانوادگی" :model-value="user.last_name"></q-input>
        </div>
      </div>
    </div>
    <q-select
      filled
      v-model="user.gender.id"
      use-input
      label="جنسیت"
      color="light-blue-6"
      :options="genders"
      option-label="title"
      option-value="id"
      map-options
      emit-value
    />

    <div class="q-pa-md">
      <div class="row justify-between  q-col-gutter-xl">
        <div class="col-md-6">
          <q-select
            v-model="selectedProvince"
            use-input
            color="light-blue-6"
            input-debounce="0"
            label="استان"
            :options="provinces"
            option-label="title"
            option-value="id"
            @filter="filterProvinces"
            map-options
            emit-value
           >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                   داده ای یافت نشد
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-md-6">
          <q-select
            v-model="selectedCity"
            use-input
            input-debounce="0"
            option-value="id"
            map-options
            color="light-blue-6"
            emit-value
            label="شهر"
            @filter="filterCity"
            :options="citiesForSelectedProvince"
            option-label="title">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  داده ای یافت نشد
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <div class="q-pa-md">
      <div class="row justify-between  q-col-gutter-xl">
        <div class="col-md-6">
          <q-select
            v-model="user.major.id"
            color="light-blue-6"
            label="رشته"
            :options="majors"
            option-label="title"
            emit-value
            option-value="id"
            map-options
            :model-value="user.major.id">
          </q-select>
        </div>
        <div class="col-md-6">
          <q-select
            v-model="user.grade.id"
            label="مقطع"
            color="light-blue-6"
            :options="grades"
            option-label="title"
            option-value="id"
            map-options
            emit-value
           />
        </div>
      </div>
    </div>
    <q-btn color="blue" dark @click="submit">
      submit
    </q-btn>

  </div>
</template>

<script>

import Time from 'src/plugins/time'
import { mixinAuth } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'

export default {
  name: 'UserInfoForm',
  mixins: [mixinAuth],
  props: {
    requiredItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      alert: false,
      errorMessages: [],
      isCodeVerified: false,
      showTimer: false,
      mobileVerify: null,
      timer: null,
      totalTime: 0,
      minutes: null,
      seconds: null,
      resetButton: false,
      typedCode: null,
      code: null,
      waiting: false,
      userInfoInForm: {},
      submitMessage: [],
      selectedProvince: null,
      selectedCity: null,
      firstNameDisabled: false,
      lastNameDisabled: false,
      genders: [],
      majors: [],
      cities: [],
      provinces: [],
      grades: []
    }
  },

  computed: {
    redirectAfterCompleteInfoPage () {
      return this.$store.getters.redirectAfterCompleteInfoPage
    },
    percentageOfInformationCompletion () {
      return this.user.percentageOfInformationCompletion()
    },
    citiesForSelectedProvince () {
      if (this.selectedProvince) {
        return this.cities.filter(item => item.province.id === this.selectedProvince)
      }
      return []
    }
  },
  watch: {
    selectedProvince (newVal) {
      console.log('selectedProvince', newVal)
      if (newVal) {
        const selectedProvince = this.provinces.find(item => newVal === item.id)
        if (selectedProvince) {
          this.user.province = selectedProvince.title
          this.$store.commit('Auth/updateUser', new User(this.user))
        }
      }
    },
    selectedCity (newVal) {
      if (newVal) {
        const selectedCity = this.cities.find(item => newVal === item.id)
        if (selectedCity) {
          this.user.city = selectedCity.title
          this.$store.commit('Auth/updateUser', new User(this.user))
        }
      }
    }
  },

  mounted: function () {
    console.log('user :', this.user)
    this.getUserData()
    // this.$store.commit('AppLayout/updateDrawer', false)
    this.$store.dispatch('AppLayout/updateDrawer', false)
  },
  methods: {
    filterProvinces (val, update) {
      // ToDo 'search problem'
      update(() => {
        this.provinces = this.provinces.filter(item => {
          return item.title.includes(val)
        })
      })
    },

    filterCity (val, update) {
      update(() => {
        this.citiesForSelectedProvince = this.citiesForSelectedProvince.filter(item => {
          return item.title.includes(val)
        })
      })
    },
    pressedEnter (e) {
      if (e.keyCode === 13) this.verifyCode()
    },

    getUserProvince () {
      if (!this.user.city && this.user.city.id !== null && typeof this.user.city.id !== 'undefined') {
        return
      }
      const userCity = this.cities.find(item => item.id === this.user.city.id)
      let userProvince = null
      if (userCity) {
        userProvince = userCity.province
      }

      return userProvince
    },
    loadUserCity () {
      if (!this.user.city) {
        return
      }
      const userProvince = this.getUserProvince()
      this.selectedProvince = userProvince.id
      this.selectedCity = this.user.city.id
    },
    getUserData () {
      console.log('get user data')
      const that = this
      this.user.loading = true
      this.user.getUserData()
        .then((user) => {
          this.user.loading = false
          that.getUserFormData()
          that.$store.commit('Auth/updateUser', user)
          if (!that.user.needToCompleteInfo()) {
            if (!this.redirectAfterCompleteInfoPage) {
              // that.$router.push({ name: 'test' })
            } else {
              that.$router.push({
                name: this.redirectAfterCompleteInfoPage.name,
                params: this.redirectAfterCompleteInfoPage.params
              })
            }
          } else {
            console.log('نیاز به تکمیل اطلاعات هست.')
          }
        })
        .catch(err => {
          console.log('err in get data :', err)
        })
    },
    startTimer () {
      this.totalTime = 180
      this.timer = setInterval(() => this.countdown(), 1000)
    },
    getUserFormData () {
      this.user.loading = true
      this.$axios.get(API_ADDRESS.user.formData)
        .then((resp) => {
          this.genders = resp.data.data.genders
          this.grades = resp.data.data.grades
          this.majors = resp.data.data.majors
          this.provinces = resp.data.data.provinces
          this.cities = resp.data.data.cities
          this.user.loading = false
          // this.loadSomeData()
          this.loadUserCity()
        })
        .catch(() => {
          // this.$notify({
          //   group: 'notifs',
          //   title: 'توجه!',
          //   text: 'مشکلی در گرفتن اطلاعات رخ داده است. لطفا دوباره امتحان کنید.',
          //   type: 'error'
          // })
          this.user.loading = false
        }
        )
    },

    countdown: function () {
      if (this.totalTime > 0) {
        this.totalTime--
      } else {
        this.waiting = true
      }
    },
    submit () {
      const that = this
      delete this.user.photo
      this.user.loading = true
      this.user.ostan_id = this.selectedProvince
      this.user.shahr_id = this.selectedCity
      this.user.update()
        .then((response) => {
          that.user.loading = false
          console.log('submit done')
          that.$store.commit('Auth/updateUser', response.data.data)
          that.getUserData()
        })
        .catch(() => {
          that.user.loading = false
          console.log('submit fucked up :)')
          // that.$notify({
          //   group: 'notifs',
          //   title: 'توجه!',
          //   text: 'مشکلی در ویرایش اطلاعات رخ داده است. لطفا دوباره امتحان کنید.',
          //   type: 'error'
          // })
        })
    },

    showErrorMessages (error) {
      this.alert = true
      console.log('show error massage run')
      this.user.loading = false
      const messages = []
      const err = error.response
      if (err.status === 429) {
        console.log('in if ')
        this.startTimer()
        this.waiting = true
        this.showTimer = true
        messages.push('کد برای شما قبلا ارسال شده است')
      }
      if (err.status === 400) {
        console.log('in if ')
        messages.push('کد وارد شده اشتباه است')
      }
      for (const key in err.data.errors) {
        err.data.errors[key].forEach(message => {
          messages.push(message)
        })
      }
      this.errorMessages = messages
      this.clearErrorMessages()
    },

    clearErrorMessages () {
      const that = this
      setTimeout(() => {
        that.errorMessages = []
      }, 20000)
    },
    sendCode () {
      const that = this
      this.user.loading = true
      this.$axios.get(API_ADDRESS.user.mobile.resend)
        .then((resp) => {
          that.user.loading = false
          that.code = resp
          that.startTimer()

          that.waiting = true
          that.showTimer = true
          // that.$notify({
          //   group: 'notifs',
          //   title: 'توجه!',
          //   text: 'کد فعالسازی با موفقیت ارسال شد.',
          //   type: 'success'
          // })
        })
        .catch((e) => {
          console.log('error in comp : ', e.response)
          this.showErrorMessages(e)
          // that.$notify({
          //   group: 'notifs',
          //   title: 'توجه!',
          //   text: 'مشکلی در ارسال کد رخ داده است. لطفا دوباره امتحان کنید.',
          //   type: 'error'
          // })
        }
        )
    },

    verifyCode () {
      const that = this
      this.user.loading = true
      this.$axios.post(API_ADDRESS.user.mobile.verify, { code: this.typedCode })
        .then(() => {
          that.user.loading = false
          this.user.mobile_verified_at = Time.now()
          this.isCodeVerified = true
          // this.$notify({
          //   group: 'notifs',
          //   title: 'توجه!',
          //   text: 'شماره موبایل با موفقیت ثبت شد.',
          //   type: 'success'
          // })
          // this.getUserData()
        })
        .catch((error) => {
          this.showErrorMessages(error)
          console.log('error in check', error)
        })
    },

    canSubmit () {
      let status = true
      if (!this.isValidString(this.user.first_name)) {
        status = false
        this.submitMessage.push('نام خود را مشخص کنید.')
      }
      if (!this.isValidString(this.user.last_name)) {
        status = false
        this.submitMessage.push('نام خانوادگی خود را مشخص کنید.')
      }
      if (!this.isValidString(this.user.province)) {
        status = false
        this.submitMessage.push('استان خود را مشخص کنید.')
      }
      if (!this.isValidString(this.user.city)) {
        status = false
        this.submitMessage.push('شهر خود را مشخص کنید.')
      }
      if (!this.isValidString(this.user.gender.id)) {
        status = false
        this.submitMessage.push('جنسیت خود را مشخص کنید.')
      }
      if (!this.isValidString(this.user.major.id)) {
        status = false
        this.submitMessage.push('رشته خود را مشخص کنید.')
      }
      if (!this.isValidString(this.user.grade.id)) {
        status = false
        this.submitMessage.push('مقطع خود را مشخص کنید.')
      }

      return status
    },
    isValidString (string) {
      return (typeof string !== 'undefined' && string !== null && string.toString().trim().length > 0)
    }
  }
}
</script>

<style scoped>
.codeBtnPadding {
  padding-top: 30px;
}

.wrapper {
  width: 80%;
  margin: auto;
  margin-top: 30px;
  text-align: center;
}

.red-text {
  color: #ff5050
}

.requiredItem {
  color: red;
}
</style>
