<template>
  <entity-create
    v-model:value="inputs"
    title="ساخت دفترچه"
    :api="api"
    :entity-id-key-in-response="entityIdKeyInResponse"
    :show-route-param-key="showRouteParamKey"
    :index-route-name="indexRouteName"
    :show-route-name="showRouteName"
  />
</template>

<script>
import { EntityCreate } from 'quasar-crud'
// import EntityCreate from 'components/Entity/Create/EntityCreate'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api: API_ADDRESS.questionCategory.base,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Category.Show',
      indexRouteName: 'Admin.Category.Index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'title', label: 'عنوان', col: 'col-md-3', placeholder: ' ', filled: true }
      ]
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
