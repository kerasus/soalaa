<template>
  <entity-create v-model:value="inputs"
                 title="لیست دروس"
                 :api="api"
                 :entity-id-key-in-response="entityIdKeyInResponse"
                 :show-route-param-key="showRouteParamKey"
                 :index-route-name="indexRouteName"
                 :show-route-name="showRouteName" />
</template>

<script>
import { EntityCreate } from 'quasar-crud'
// import EntityCreate from 'src/components/Entity/Create/EntityCreate'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'Create',
  components: { EntityCreate },
  data () {
    return {
      expanded: true,
      api: APIGateway.questionSubcategory.APIAdresses.base,
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
      that.$apiGateway.questionCategory.get()
        .then(function (questCategoryList) {
          that.categories = questCategoryList
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
