<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات خبر"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
    :before-get-data="loadCategories"
  />
</template>

<script>
import { EntityShow } from 'quasar-crud'
// import EntityShow from 'components/Entity/Show/EntityShow'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      api: API_ADDRESS.questionSubcategory.base,
      entityIdKey: 'data.id',
      entityParamKey: 'data.id',
      editRouteName: 'Admin.subCategory.Edit',
      indexRouteName: 'Admin.subCategory.Index',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' },
        { type: 'select', options: [], optionLabel: 'title', optionValue: 'id', name: 'category_id', responseKey: 'data.category_id', label: 'نوع دفترچه', col: 'col-md-6' }
      ],
      categories: []
    }
  },
  computed: {

  },
  watch: {
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  mounted () {
  },
  methods: {
    async loadCategories () {
      const that = this
      const response = await that.$axios.get(API_ADDRESS.questionCategory.base)
      that.categories = response.data.data
      that.inputs.forEach(item => {
        if (item.name === 'category_id') {
          item.options = that.categories
          console.log(item.options)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
