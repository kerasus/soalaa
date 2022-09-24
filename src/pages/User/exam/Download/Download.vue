<template>
  <page-builder
    :sections="sections"
    :options="options"
  ></page-builder>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'

export default {
  name: 'Download',
  components: {
    PageBuilder
  },
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
      options: []
    }
  }
}
</script>

<style scoped>

</style>
