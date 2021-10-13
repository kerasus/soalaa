<template>
  <entity-create
    v-model:value="inputs"
    title="تعریف کاربر"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  />
</template>

<script>
import EntityCreate from 'components/Entity/Create/EntityCreate'
// import API_ADDRESS from "src/api/Addresses";

export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      // api: API_ADDRESS.user.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.User.Show',
      indexRouteName: 'Admin.User.Index',
      inputs: [
        { type: 'input', name: 'nickname', value: '', label: 'نام و نام خانوادگی', col: 'col-md-4' },
        { type: 'input', name: 'national_code', value: '', label: 'کدملی', col: 'col-md-4' },
        { type: 'optionGroupCheckbox', name: 'roles', multiple: true, optionValue: 'id', value: [3], optionLabel: 'name', options: [{ label: 'سخنران', value: 3 }, { label: 'مداح', value: 4 }], col: 'col-md-4' },
        { type: 'input', name: 'mobile_number', value: '', label: 'موبایل', col: 'col-md-6' },
        { type: 'input', name: 'phone_number', value: '', label: 'تلفن', col: 'col-md-6' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
