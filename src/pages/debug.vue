<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
export default {
  name: 'debug',
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
                        name: 'test-component1-widget'
                      }
                    ],
                    options: {
                      className: 'col-md-3 q-pr-md '
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'test-component2-widget'
                      }
                    ],
                    options: {
                      className: 'col-md-9 q-pl-md'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  style: {
                    marginTop: '30px'
                  }
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
    },
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style scoped></style>
