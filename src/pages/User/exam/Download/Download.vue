<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
export default {
  name: 'Download',
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'download-exam'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {}
                }
              }
            ]
          },
          options: {}
        }
      ],
      pageConfig: {}
    }
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>

<style scoped>

</style>
