<template>
  <div>
    <entity-edit
      ref="entityEdit"
      v-model:value="inputs"
      title="ویرایش اطلاعات لیست دروس"
      :api="api"
      :entity-id-key="entityIdKey"
      :entity-param-key="entityParamKey"
      :show-route-name="showRouteName"
      :before-get-data="loadCategories"
    />
  </div>
</template>

<script>
import { EntityEdit } from 'quasar-crud'
// import EntityEdit from 'components/Entity/Edit/EntityEdit'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      api: API_ADDRESS.questionSubcategory.base,
      entityIdKey: 'data.id',
      entityParamKey: 'data.id',
      showRouteName: 'Admin.subCategory.Show',
      inputs: [
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6', placeholder: ' ', filled: true },
        { type: 'select', options: [], optionLabel: 'title', optionValue: 'id', name: 'category_id', responseKey: 'data.category_id', label: 'نوع دفترچه', col: 'col-md-6' }
      ],
      categories: []
    }
  },
  created () {
    this.api += '/' + this.$route.params.id
  },
  methods: {
    async loadCategories () {
      const that = this
      const response = await that.$axios.get(API_ADDRESS.questionCategory.base)
      that.categories = response.data.data
      that.inputs.forEach(item => {
        if (item.name === 'category_id') {
          item.options = that.categories
        }
      })
    }
  }
  // setCategoryTitle () {
  //   let title = ''
  //   const id = this.inputs[1].responseKey
  //   console.log(id)
  //   this.categories.forEach(category => {
  //     if (category.id === id) {
  //       title = category.title
  //     }
  //   })
  //   this.inputs[1].name = title
  // }
}
</script>

<style scoped>

</style>
