<template>
  <entity-create
    v-model:value="inputs"
    title="لیست دروس"
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
      api: API_ADDRESS.questionSubcategory.base,
      entityIdKeyInResponse: 'id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.subCategory.Show',
      indexRouteName: 'Admin.subCategory.Index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6', placeholder: ' ', filled: true },
        { type: 'select', options: [], optionLabel: 'title', optionValue: 'id', name: 'category_id', responseKey: 'data.category_id', label: 'دفترچه', col: 'col-md-6' }
      ],
      categories: []
    }
  },
  created () {
    this.loadCategories()
  },
  methods: {
    loadCategories () {
      const that = this
      that.$axios.get(API_ADDRESS.questionCategory.base)
        .then(function (response) {
          that.categories = response.data.data
          that.inputs[1].options = that.categories
        })
        .catch(function (error) {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
