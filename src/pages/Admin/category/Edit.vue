<template>
  <div>
    <entity-edit
      ref="entityEdit"
      v-model:value="inputs"
      title="ویرایش اطلاعات خبر"
      :api="api"
      :entity-id-key="entityIdKey"
      :entity-param-key="entityParamKey"
      :show-route-name="showRouteName"
    />
  </div>
</template>

<script>
import EntityEdit from 'components/Entity/Edit/EntityEdit'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Edit',
  components: { EntityEdit },
  data () {
    return {
      api: API_ADDRESS.questionCategory.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      showRouteName: 'Admin.Category.Show',
      inputs: [
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه', col: 'col-md-6', disable: true },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' }
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
