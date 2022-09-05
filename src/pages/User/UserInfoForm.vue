<template>
  <div id="q-app"
       class="q-ma-lg row justify-center"
       style="min-height: 100vh">
    <q-linear-progress
      v-if="percentageOfInformationCompletion"
      size="30px"
      :value="percentageOfInformationCompletion"
      color="primary"
      class="q-mt-sm">
      <div class="absolute-full flex flex-center">
        <q-badge
          text-color="black"
          color="transparent"
          class="text-subtitle1 text-weight-bold"
          align="middle"
          :label="percentageOfInformationCompletionLabel">
        </q-badge>
      </div>
    </q-linear-progress>
    <div class="col-9 form-box">
      <div class="q-pa-md">
        <div class="row justify-between  q-col-gutter-xl">
          <div class="col-md-6 col-12">
            <q-input
              v-model="userData.first_name"
              label="نام"
              :rules="[
                val => val !== null && val !== '' || 'پر کردن این فیلد اجباری است' ]"
            ></q-input>
          </div>
          <div class="col-md-6 col-12">
            <q-input
              v-model="userData.last_name"
              label=" نام خانوادگی"
              :rules="[
                val => val !== null && val !== '' || 'پر کردن این فیلد اجباری است' ]"
            ></q-input>
          </div>
        </div>
      </div>
      <div class="q-pa-md">
        <q-select
          v-model="userData.gender.id"
          use-input
          label="جنسیت"
          color="light-blue-6"
          :options="genders"
          option-label="title"
          option-value="id"
          map-options
          emit-value
          :rules="[
            val => val !== null && val !== '' || 'انتخاب این فیلد اجباری است' ]"
        />
      </div>
      <div class="q-pa-md">
        <div class="row justify-between  q-col-gutter-xl">
          <div class="col-md-6 col-12">
            <q-select
              v-model="selectedProvince"
              use-input
              color="light-blue-6"
              input-debounce="0"
              label="استان"
              :options="provinces"
              option-label="title"
              option-value="id"
              map-options
              emit-value
              :rules="[
                val => val !== null && val !== '' || 'انتخاب این فیلد اجباری است' ]"
              @filter="filterProvinces"
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
          <div class="col-md-6 col-12">
            <q-select
              v-model="selectedCity"
              use-input
              input-debounce="0"
              map-options
              color="light-blue-6"
              emit-value
              label="شهر"
              :options="citiesForSelectedProvince"
              option-label="title"
              option-value="id"
              :rules="[
                val => val !== null && val !== '' || 'انتخاب این فیلد اجباری است' ]"
              @filter="filterCity"
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
        </div>
      </div>
      <div class="q-pa-md">
        <div class="row justify-between  q-col-gutter-xl">
          <div class="col-md-6 col-12">
            <q-select
              v-model="userData.major.id"
              color="light-blue-6"
              label="رشته"
              :options="majors"
              option-label="title"
              emit-value
              option-value="id"
              map-options
              :model-value="userData.major.id"
              :rules="[
                val => val !== null && val !== '' || 'انتخاب این فیلد اجباری است' ]"
            >
            </q-select>
          </div>
          <div class="col-md-6 col-12">
            <q-select
              v-model="userData.grade.id"
              label="مقطع"
              color="light-blue-6"
              :options="grades"
              option-label="title"
              option-value="id"
              emit-value
              map-options
              :rules="[
                val => val !== null && val !== '' || 'انتخاب این فیلد اجباری است' ]"
            />
          </div>
        </div>
      </div>
      <!--      verify ------------------------------------------------------------------------------------------------------------>
      <verify
        v-if="needVerify"
        @verified="verified"
      />
      <div class="row justify-end q-mt-lg">
        <!--        submit form ---------------------------------------------------------------------------------->
        <q-btn
          :disabl="!this.user.mobile_verified_at"
          color="blue"
          class="q-px-xl"
          rounded
          dark
          type="submit"
          size="16px"
          @click="checkForSubmit">
          ثبت
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>

import Time from 'src/plugins/time'
import { mixinAuth } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'
import { User } from 'src/models/User'
import Verify from 'pages/Auth/Verify'

export default {
  name: 'UserInfoForm',
  mixins: [mixinAuth],
  components: { Verify },
  props: {
    requiredItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      userData: new User(),
      needVerify: true,
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
      return (this.user.percentageOfInformationCompletion() / 100)
    },
    percentageOfInformationCompletionLabel () {
      return Math.ceil(this.percentageOfInformationCompletion * 100) + 'درصد از اطلاعات تکمیل شده'
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
      // console.log('select province :', newVal)
      if (newVal) {
        const selectedProvince = this.provinces.find(item => newVal === item.id)
        // console.log('this.provinces :', this.provinces)
        // console.log('selectedProvince :', selectedProvince)
        // console.log('this.user data :', this.userData)
        if (selectedProvince) {
          this.userData.province = selectedProvince
          this.$store.commit('Auth/updateUser', new User(this.userData))
        }
      }
    },

    selectedCity (newVal) {
      if (newVal) {
        const selectedCity = this.cities.find(item => newVal === item.id)
        if (selectedCity) {
          this.userData.city = selectedCity.title
          this.$store.commit('Auth/updateUser', new User(this.userData))
        }
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.checkVerify()
  },

  methods: {
    verified () {
      this.user.mobile_verified_at = Time.now()
      this.needVerify = false
      this.canRedirect()
    },

    getUserInfo () {
      this.userData = this.user
      this.getUserData()
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
    },

    checkVerify () {
      this.user.mobile_verified_at ? this.needVerify = false : this.needVerify = true
    },

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

    getUserProvince () {
      // console.log('this.userData.city.id', this.userData.city.id)
      if (!this.userData.city && this.userData.city.id !== null && typeof this.userData.city.id !== 'undefined') {
        return
      }
      // console.log('this.userData.city :', this.userData.city)
      // console.log(' this.userData.city.id :', this.userData.city.id)
      const userCity = this.cities.find(item => item.id === this.userData.city.id)
      // console.log('get pro :', userCity)
      let userProvince = null
      if (userCity) {
        userProvince = userCity.province
      }
      // console.log('list :', userProvince)

      return userProvince
    },

    loadUserCity () {
      // console.log('loadUserCity :', !this.userData.city, 'user data :', this.userData)
      if (!this.userData.city) {
        return
      }

      const userProvince = this.getUserProvince()
      // console.log('userProvince eroooooor :', userProvince)
      this.selectedProvince = userProvince.id
      this.selectedCity = this.userData.city.id
    },

    getUserData () {
      const that = this
      this.user.loading = true
      // this.user.getUserData()
      this.$axios.get(API_ADDRESS.user.show_user)
        .then((response) => {
          this.user.loading = false
          that.getUserFormData()
          that.$store.commit('Auth/updateUser', response.data.data)
          this.canRedirect()
        })
      // .catch(e => {
      //   // console.log('err in get data :', err)
      // })
    },

    canRedirect () {
      if (this.needVerify) {
        this.$q.notify({
          type: 'warning',
          message: 'نیاز به ثبت شماره موبایل هست.',
          position: 'center'
        })
      } else {
        this.redirectUser()
      }
    },

    redirectUser () {
      if (!this.user.needToCompleteInfo()) {
        if (!this.redirectAfterCompleteInfoPage) {
          this.$router.push({ name: 'home' })
        } else {
          this.$router.push({
            name: this.redirectAfterCompleteInfoPage.name,
            params: this.redirectAfterCompleteInfoPage.params
          })
        }
      } else {
        this.$q.notify({
          type: 'warning',
          message: 'نیاز به تکمیل اطلاعات هست.',
          position: 'center'
        })
      }
    },

    getUserFormData () {
      // console.log('get user form data run ')
      this.user.loading = true
      this.$axios.get(API_ADDRESS.user.formData)
        .then((resp) => {
          // console.log('getUserFormData reeeeeeeesult :', resp)
          this.genders = resp.data.data.genders
          this.grades = resp.data.data.grades
          this.majors = resp.data.data.majors
          this.provinces = resp.data.data.provinces
          this.cities = resp.data.data.cities
          this.user.loading = false
          // this.loadSomeData()
          // console.log(this.user)
          this.userData = this.user
          this.loadUserCity()
        })
        .catch((e) => {
          // console.log('get user form data in catch', e)
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در گرفتن اطلاعات رخ داده است. لطفا دوباره امتحان کنید ',
            position: 'top'
          })
          this.user.loading = false
        }
        )
    },

    checkForSubmit () {
      this.canSubmit() ? this.submit() : this.showSubmitError()
    },

    showSubmitError () {
      this.submitMessage.forEach(msg => {
        this.$q.notify({
          type: 'negative',
          message: msg,
          position: 'top'
        })
      })
    },

    submit () {
      const that = this
      delete this.user.photo
      this.user.loading = true
      this.user.ostan_id = this.selectedProvince
      // console.log('in submit this.user.ostan_id :', this.user.ostan_id, this.selectedProvince)
      this.user.shahr_id = this.selectedCity
      // console.log(' this.user.shahr_id :', this.user.shahr_id, this.selectedCity)
      // console.log(this.user)
      this.user.update()
        .then((response) => {
          that.user.loading = false
          this.$q.notify({
            type: 'positive',
            message: 'ویرایش با موفقیت انجام شد.',
            position: 'center'
          })
          that.$store.commit('Auth/updateUser', response.data.data)
          that.getUserData()
        })
        .catch(() => {
          that.user.loading = false
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در گرفتن اطلاعات رخ داده است. لطفا دوباره امتحان کنید',
            position: 'top'
          })
        })
    },

    showErrorMessages (error) {
      const err = error.response
      const messages = []
      if (err.data.errors) {
        for (const key in err.data.errors) {
          err.data.errors[key].forEach(message => {
            this.$q.notify({
              type: 'negative',
              message,
              position: 'top'
            })
          })
        }
      } else {
        if (err.data.message) messages.push(err.data.message)
        else messages.push(err.statusText)
        this.$q.notify({
          type: 'negative',
          message: messages,
          position: 'top'
        })
      }
    },

    clearErrorMessages () {
      const that = this
      setTimeout(() => {
        that.errorMessages = []
      }, 20000)
    },

    canSubmit () {
      let status = true
      if (!this.isValidString(this.userData.first_name)) {
        status = false
        this.submitMessage.push('نام خود را مشخص کنید.')
      }
      if (!this.isValidString(this.userData.last_name)) {
        status = false
        this.submitMessage.push('نام خانوادگی خود را مشخص کنید.')
      }
      if (!this.isValidString(this.userData.province)) {
        status = false
        this.submitMessage.push('استان خود را مشخص کنید.')
      }
      if (!this.isValidString(this.userData.city)) {
        status = false
        this.submitMessage.push('شهر خود را مشخص کنید.')
      }
      if (!this.isValidString(this.userData.gender.id)) {
        status = false
        this.submitMessage.push('جنسیت خود را مشخص کنید.')
      }
      if (!this.isValidString(this.userData.major.id)) {
        status = false
        this.submitMessage.push('رشته خود را مشخص کنید.')
      }
      if (!this.isValidString(this.userData.grade.id)) {
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

<style scoped lang="scss">
.mit span {
  font-size: 16px;
  padding: 10px;
}

.form-box {
  //height: fit-content;
  //border: 1px solid red;
}

.codeBtnPadding {
  padding-top: 30px;
}

.wrapper {
  width: 80%;
  margin: 30px auto auto;
  text-align: center;
}

.requiredItem {
  color: red;
}

.text-size {
  color: #151515;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 500;
}

.time-text {
  font-size: 14px;
  font-weight: 500;
}

.timer-box {
  justify-content: center;
}
</style>
