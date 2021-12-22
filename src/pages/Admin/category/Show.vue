<template>
  <entity-show
    v-model:value="inputs"
    title="اطلاعات خبر"
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
      api: API_ADDRESS.questionCategory.base,
      entityIdKey: 'id',
      entityParamKey: 'id',
      editRouteName: 'Admin.Category.Edit',
      indexRouteName: 'Admin.Category.Index',
      inputs: [
        { type: 'input', name: 'id', responseKey: 'data.id', label: 'شناسه', col: 'col-md-6' },
        { type: 'input', name: 'title', responseKey: 'data.title', label: 'عنوان', col: 'col-md-6' }
      ]
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
  }
}
</script>

<style scoped>

</style>
