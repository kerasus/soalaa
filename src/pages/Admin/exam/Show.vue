<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات آزمون"
    :api="api"
    :entity-id-key="entityIdKey"
    :entity-param-key="entityParamKey"
    :edit-route-name="editRouteName"
    :index-route-name="indexRouteName"
  />
</template>

<script>
import EntityShow from 'components/Entity/Show/EntityShow'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Show',
  components: { EntityShow },
  data () {
    return {
      api: API_ADDRESS.exam.base(),
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.Exam.Edit',
      indexRouteName: 'Admin.Exam.index',
      inputs: [
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه', col: 'col-md-6' },
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
