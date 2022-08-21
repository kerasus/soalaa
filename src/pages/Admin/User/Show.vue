<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات کاربر"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
  />
  <portlet ref="portlet">
    <template #title>
      روزهای آزاد کاربر
    </template>
    <template #toolbar>
      <q-btn color="primary" @click="setPotentialDates">
        ذخیره روزهای آزاد
      </q-btn>
    </template>
    <template #content>
      <div class="row">
        <div class="col-md-4">
          <q-date v-model="potentialDates" calendar="persian" :range="false" :multiple="true">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="بستن" color="primary" flat />
            </div>
          </q-date>
        </div>
        <div class="col-md-8">
          <div class="row">
            <div v-for="item in potentialDates" :key="item" class="col-md-2">
              <q-card class="text-center">{{ item }}</q-card>
            </div>
          </div>
        </div>
      </div>
      <q-inner-loading :showing="potentialDatesLoading">
        <q-spinner-ball color="primary" size="50px" />
      </q-inner-loading>
    </template>
  </portlet>
</template>

<script>
import moment from 'moment-jalaali'
import API_ADDRESS from 'src/api/Addresses'
import { ref } from 'vue'
import { EntityShow, Portlet } from 'quasar-crud'

export default {
  name: 'Show',
  components: { EntityShow, Portlet },
  data () {
    return {
      potentialDates: ref([]),
      expanded: true,
      potentialDatesLoading: false,
      // api: API_ADDRESS.user.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.User.Edit',
      indexRouteName: 'Admin.User.Index',
      inputs: [
        { type: 'input', name: 'id', responseKey: 'id', value: 'null', label: 'شناسه', col: 'col-md-3' },
        { type: 'input', name: 'nickname', responseKey: 'nickname', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'mobile_number', responseKey: 'mobile_number', value: 'null', label: 'موبایل', col: 'col-md-3' },
        { type: 'input', name: 'phone_number', responseKey: 'phone_number', value: 'null', label: 'تلفن', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'national_code', value: 'null', label: 'کدملی', col: 'col-md-3' },
        { type: 'select', name: 'roles', responseKey: 'roles', multiple: true, optionValue: 'id', optionLabel: 'name', options: [{ name: 'ادمین کل', id: 1 }, { name: 'مبلغ', id: 3 }, { name: 'بانی', id: 4 }], col: 'col-md-3' },
        { type: 'other', name: 'potential_dates', responseKey: 'potential_dates', value: [], col: 'col-md-3', disable: true }
      ]
    }
  },
  computed: {
    inputPotentialDates () {
      return this.inputs.find(item => item.name === 'potential_dates').value
    },
    userId () {
      return this.inputs.find(item => item.name === 'id').value
    }
  },
  watch: {
    inputPotentialDates (newValue) {
      this.loadPotentialDates(newValue)
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    loadPotentialDates (miladiPotentialDates) {
      this.potentialDates = miladiPotentialDates.map(item => moment(item, 'YYYY-M-D').format('jYYYY/jMM/jDD'))
    },
    async setPotentialDates () {
      const dates = this.potentialDates.map(item => moment(item, 'jYYYY/jM/jD').format('YYYY-MM-DD'))
      this.potentialDatesLoading = true
      this.$axios.post(API_ADDRESS.user.setPotentialDates, { user_id: this.userId, dates })
        .then((response) => {
          this.potentialDatesLoading = false
          this.loadPotentialDates(response.data.potential_dates)
        })
        .catch(() => {
          this.potentialDatesLoading = false
          this.potentialDates = []
        })
    }
  }
}
</script>

<style scoped>

</style>
