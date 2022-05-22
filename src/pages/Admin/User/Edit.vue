<template>
  <entity-edit
    ref="entityEdit"
    v-model:value="inputs"
    title="ویرایش اطلاعات کاربر"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :show-route-name="showRouteName"
  />
</template>

<script>
import { EntityEdit } from 'quasar-crud'
// import API_ADDRESS from "src/api/Addresses";

export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      expanded: true,
      potentialDatesLoading: false,
      // api: API_ADDRESS.user.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      inputs: [
        { type: 'input', name: 'id', responseKey: 'id', value: 'null', label: 'شناسه', col: 'col-md-3', disable: true },
        { type: 'input', name: 'nickname', responseKey: 'nickname', value: 'null', label: 'نام', col: 'col-md-3' },
        { type: 'input', name: 'mobile_number', responseKey: 'mobile_number', value: 'null', label: 'موبایل', col: 'col-md-3' },
        { type: 'input', name: 'phone_number', responseKey: 'phone_number', value: 'null', label: 'تلفن', col: 'col-md-3' },
        { type: 'input', name: 'national_code', responseKey: 'national_code', value: 'null', label: 'کدملی', col: 'col-md-3' },
        { type: 'select', name: 'roles', responseKey: 'roles', multiple: true, optionValue: 'id', optionLabel: 'name', options: [{ name: 'ادمین کل', id: 1 }, { name: 'مبلغ', id: 3 }, { name: 'بانی', id: 4 }], col: 'col-md-3', disable: true }
      ]
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  }
}
</script>

<style scoped>

</style>
