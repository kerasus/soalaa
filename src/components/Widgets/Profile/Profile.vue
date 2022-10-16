<template>
  <div class="profile-page-widget">
    <div class="profile-card-title"
         :hidden="$q.screen.lt.md">اطلاعات کاربری</div>
    <div v-if="$q.screen.lt.md"
         class="flex justify-start profile-btn">
      <q-btn
        color="dark"
        flat
      >
        <svg width="22"
             height="22"
             viewBox="0 0 22 22"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M13.228 5.43555L18.7922 10.9997L13.228 16.5639"
                stroke="#434765"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round" />
          <path d="M3.2085 11H18.636"
                stroke="#434765"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
        <div class="profile-card-title-2">
          اطلاعات کاربری
        </div>
      </q-btn>
    </div>

    <div class="profile-card relative-position">
      <entity-crud-form-builder
        ref="EntityCrudFormBuilder"
        v-model:value="inputs"
      />

      <div class="card-actions">
        <div class="card-actions-button dont-save-button"
             @click="goToDashboard()"
        >
          انصراف
        </div>

        <div class="card-actions-button save-button"
             @click="edit"
        >
          ذخیره
        </div>
      </div>

      <q-inner-loading :showing="loading"
                       label="کمی صبر کنید..."
      />

    </div>
  </div>
</template>

<script>
import { EntityCrudFormBuilder } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Profile',
  components: {
    EntityCrudFormBuilder
  },

  data () {
    return {
      loading: false,
      inputs: [
        { type: 'input', name: 'first_name', responseKey: 'first_name', label: 'نام', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'input', name: 'last_name', responseKey: 'last_name', label: 'نام خانوادگی', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'input', name: 'national_code', responseKey: 'national_code', label: 'کدملی', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'select', name: 'gender', responseKey: 'gender.title', dropdownIcon: 'isax:arrow-down-1', label: 'جنسیت', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'input', name: 'mobile', responseKey: 'mobile', label: 'شماره موبایل', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'input', name: 'email', responseKey: 'email', label: 'ایمیل', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'input', value: 'دانش آموز', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', label: 'نوع کاربری', placeholder: ' ', disable: true },
        { type: 'select', name: 'major', label: 'رشته تحصیلی', responseKey: 'major.title', dropdownIcon: 'isax:arrow-down-1', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' },
        { type: 'select', name: 'grade', responseKey: 'grade.title', dropdownIcon: 'isax:arrow-down-1', col: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', label: 'پایه تحصیلی', placeholder: ' ' },
        { type: 'select', name: 'province', responseKey: 'province.title', dropdownIcon: 'isax:arrow-down-1', col: 'province-option col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', label: 'استان', placeholder: ' ' },
        { type: 'select', name: 'city', responseKey: 'city.title', dropdownIcon: 'isax:arrow-down-1', col: 'city-option col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', label: 'شهر', placeholder: ' ' },
        { type: 'input', name: 'school', responseKey: 'school', label: 'مدرسه', options: {}, col: 'school-option col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4', placeholder: ' ' }
      ],
      find: null,
      genders: null,
      provinces: null,
      cities: null,
      majors: null,
      grades: null,
      isCityLocked: false
    }
  },

  mounted() {
    this.onLoadPage()
  },

  computed: {
    user () {
      return this.$store.getters['Auth/user']
    },

    provinceInputValue () {
      return this.findInput(this.inputs, 'province').value
    }
  },

  watch: {
    provinceInputValue (newValue) {
      if (!newValue) {
        this.findInput(this.inputs, 'province').value = this.findInput(this.inputs, 'province').options[0]
      }
      this.setCityInputOptions(this.getCitiesOfProvince(typeof this.provinceInputValue === 'object' ? this.provinceInputValue.value : this.provinceInputValue))
    }
  },

  methods: {
    onLoadPage () {
      this.loading = true
      this.getFormData()
        .then(() => {
          this.setInputsInitData()
          this.disableFilledInputs()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          // this.goToDashboard()
        })
    },

    goToDashboard () {
      this.$router.push({ name: 'User.Dashboard' })
    },

    disableFilledInputs() {
      const allInputs = this.$refs.EntityCrudFormBuilder.$refs.formBuilder.getValues()
      allInputs.forEach(input => {
        if (input.value) {
          this.findInput(this.inputs, input.name).readonly = true
        }
      })
    },

    getFormData () {
      return new Promise((resolve, reject) => {
        this.$axios.get(API_ADDRESS.user.formData)
          .then((response) => {
            this.genders = response.data.data.genders
            this.provinces = response.data.data.provinces
            this.cities = response.data.data.cities
            this.majors = response.data.data.majors
            this.grades = response.data.data.grades
            resolve(true)
          })
          .catch(() => {
            reject(true)
          })
      })
    },

    setInputsInitData () {
      this.$refs.EntityCrudFormBuilder.loadInputData(this.user, this.inputs)
      this.setProvinceValue(this.user.province)
      if (this.user.city) {
        this.setCityValue(this.user.city)
        this.lockCityValue()
      }
      this.setInputOption('gender', this.customizedOptionList(this.genders))
      this.setInputOption('province', this.customizedOptionList(this.provinces))
      this.setInputOption('major', this.customizedOptionList(this.majors))
      this.setInputOption('grade', this.customizedOptionList(this.grades))
    },

    setInputOption (inputName, optionList) {
      this.findInput(this.inputs, inputName).options = optionList
    },

    customizedOptionList (currentList) {
      const newOptionList = []
      currentList.forEach(option => {
        newOptionList.push({
          label: option.title,
          value: option.id
        })
      })
      return newOptionList
    },

    findInput (inputList, inputName) {
      inputList.forEach(input => {
        const findingInput = inputList.find(input => input.name === inputName)

        if (findingInput) {
          this.find = findingInput
        } else if (input.type === 'formBuilder' && input.value.length > 0) {
          this.findInput(input.value, inputName)
        }
      })
      return this.find
    },

    getCitiesOfProvince(provinceId) {
      return this.cities.filter(city => city.province.id === provinceId)
    },

    setCityInputOptions (cityList) {
      this.setInputOption('city', this.customizedOptionList(cityList))
      if (!this.isCityLocked) {
        this.setCityInputValueAfterProvinceChange()
      }
    },

    setCityInputValueAfterProvinceChange () {
      this.findInput(this.inputs, 'city').value = this.findInput(this.inputs, 'city').options[0]
    },

    edit () {
      this.loading = true
      const formData = this.$refs.EntityCrudFormBuilder.getFormData()

      // console.log('formData', formData)
      this.$axios.put(API_ADDRESS.user.edit(this.user.id), formData)
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },

    setProvinceValue(title) {
      let provinceValue
      const indexOfInput = this.inputs.findIndex(input => input.name === 'province')
      provinceValue = this.provinces.find(item => item.title === title)
      if (!this.user.province && this.user.city) {
        provinceValue = this.cities.find(item => item.title === this.user.city)
      }
      this.inputs[indexOfInput].value = {
        label: provinceValue.title,
        value: provinceValue.id
      }
    },

    setCityValue(title) {
      const indexOfInput = this.inputs.findIndex(input => input.name === 'city')
      const cityValue = this.cities.find(item => item.title === title)
      this.inputs[indexOfInput].value = {
        label: cityValue.title,
        value: cityValue.id
      }
    },

    lockCityValue() {
      this.isCityLocked = true
    }

  }
}
</script>

<style lang="scss" scoped>
.profile-page-widget {
  .profile-card-title {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #434765;
    margin-bottom: 20px;

    @media only screen and (max-width: 1439px) {
      font-size: 16px;
      line-height: 25px;
      margin-bottom: 16px;
    }

    //@media only screen and (max-width: 1023px) {
    //  font-size: 14px;
    //  line-height: 22px;
    //  margin-bottom: 20px;
    //}
    //
    //@media only screen and (max-width: 599px) {
    //  font-size: 14px;
    //  line-height: 22px;
    //  margin-bottom: 16px;
    //}
  }
  .profile-btn {
    margin-bottom: 10px;
    color: #434765;
    @media screen and (max-width: 599px) {
      margin-bottom: 6px;
    }
    :deep(.q-btn) {
      font-weight: 600 !important;
      font-size: 16px !important;
      line-height: 25px !important;
      color: #434765 !important;
      @media screen and (max-width: 599px) {
        font-size: 14px !important;
        line-height: 22px !important;
      }
      .profile-card-title-2 {
        padding-left: 8px;
      }
    }
  }
  .profile-card {

    :deep(.outsideLabel) {
        margin-left: 12px;
      @media only screen and (max-width: 599px) {
        margin-left: 0;
      }
    }
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    padding: 45px 30px 30px 45px;
    //padding-left: 45px;
    @media only screen and (max-width: 1439px) {
      padding: 20px 18px;
    }

    @media only screen and (max-width: 1023px) {
      //padding: 16px 8px;
      border-radius: 12px;
      padding: 35px 20px 20px 35px;
    }

    @media only screen and (max-width: 599px) {
      padding: 16px 20px;
      border-radius: 8px;
    }

    &:deep(.form-builder-separator-col) {
      padding: 0;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      text-align: right;
      letter-spacing: -0.03em;
      color: #434765;
      b {
        font-weight: 400;
      }
      margin-bottom: 8px;
      margin-left: 12px;

      @media only screen and (max-width: 599px) {
        margin-left: 0;
      }
    }

    &:deep(.form-builder-input-col) {
      padding: 0;
    }

    &:deep(.form-builder-select-col) {
      padding: 0;
    }

    &:deep(.q-field ) {
      margin: 0 12px 32px 12px;

      @media only screen and (max-width: 1439px) {
        margin-bottom: 24px;
      }

      @media only screen and (max-width: 599px) {
        margin: 0 0 16px 0;
      }

      .q-field__append {
        //padding: 0;
      }
    }

    &:deep(.q-field--focused .q-field__control) {
      background: #FFFFFF !important;
      border: 1px solid #FFB74D;
      box-shadow: 0 0 0 2px #FFEDD2;
      border-radius: 8px;
    }

    &:deep(.q-field .q-field__control) {
      height: 40px;
      background: #F2F5F9;
      border-radius: 8px;
    }

    &:deep(.q-field__native) {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: #6D708B;
    }

    .card-actions {
      display: flex;
      justify-content: left;
      margin-right: 12px;
      margin-top: -2px;

      @media only screen and (max-width: 1439px) {
        margin-top: 6px;
      }

      @media only screen and (max-width: 599px) {
        justify-content: center;
        margin-top: 8px;
        margin-right: 0;
      }

      .card-actions-button {
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.03em;
        width: 120px;
        height: 40px;
        border-radius: 8px;
        cursor: pointer;

        &.save-button {
          color: #FFFFFF;
          background: #9690E4;
        }

        &.dont-save-button {
          color: #6D708B;
          background: #F2F5F9;
          margin-right: 10px
        }
      }

    }
  }
  :deep(.province-option){
    @media screen and (max-width: 1023px) {
      order: 2;
    }
  }
  :deep(.city-option){
    @media screen and (max-width: 1023px) {
      order: 3;
    }
  }
  &:deep(.school-option){
    @media screen and (max-width: 1023px) {
      order: 1;
    }
  }
}
</style>
