<template>
  <div class="profile-page-widget">
    <div class="profile-card-title">اطلاعات کاربری</div>

    <div class="profile-card">
      <entity-crud-form-builder
        ref="EntityCrudFormBuilder"
        v-model:value="inputs"
      />

      <div class="card-actions">
        <div
          class="card-actions-button dont-save-button"
        >
          انصراف
        </div>

        <div
          class="card-actions-button save-button"
          @click="edit"
        >
          ذخیره
        </div>
      </div>
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
      inputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'نام', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'first_name', responseKey: 'first_name', label: '', col: 'col-12', placeholder: '' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'نام خانوادگی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'last_name', responseKey: 'last_name', label: '', col: 'col-12', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'کدملی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'national_code', responseKey: 'national_code', label: '', col: 'col-12', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'جنسیت', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'gender', responseKey: 'gender.title', label: '', col: 'col-12', placeholder: '' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'شماره موبایل', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'mobile', responseKey: 'mobile', label: '', col: 'col-12', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'ایمیل', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'email', responseKey: 'email', label: '', col: 'col-12', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'نوع کاربری', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', value: 'دانش آموز', col: 'col-12', placeholder: ' ', disable: true }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'رشته تحصیلی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'major', responseKey: 'major.title', col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'پایه تحصیلی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'grade', responseKey: 'grade.title', col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'استان', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'province', responseKey: 'province.title', col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'شهر', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'city', responseKey: 'city.title', col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-4 col-sm-6',
          value: [
            { type: 'separator', label: 'مدرسه', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'school', responseKey: 'school', label: '', options: {}, col: 'col-12', placeholder: ' ' }
          ]
        }

      ],
      find: null,
      genders: null,
      provinces: null,
      cities: null,
      majors: null,
      grades: null
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
      this.getFormData()
        .then(() => {
          this.setInputsInitData()
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
            return resolve(true)
          })
          .catch(() => {
            reject(true)
          })
      })
    },

    setInputsInitData () {
      this.$refs.EntityCrudFormBuilder.loadInputData(this.user, this.inputs)
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
      this.setCityInputValue()
    },

    setCityInputValue () {
      this.findInput(this.inputs, 'city').value = this.findInput(this.inputs, 'city').options[0]
    },

    edit () {
      this.$axios.put(API_ADDRESS.user.edit(this.user.id))
        .then((resp) => {
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
        })
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

    @media only screen and (max-width: 1023px) {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 20px;
    }

    @media only screen and (max-width: 599px) {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 16px;
    }
  }

  .profile-card {
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    padding: 30px 28px;

    @media only screen and (max-width: 1439px) {
      padding: 20px 18px;
    }

    @media only screen and (max-width: 1023px) {
      padding: 16px 8px;
      border-radius: 12px;
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
        padding: 0;
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
}
</style>
