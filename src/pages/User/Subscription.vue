<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>

export default {
  name: 'Subscription',
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
                        name: 'SubscriptionPackagesSection'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false,
                  boxedWidth: 1362,
                  style: {}
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'SubscriptionBanner'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false,
                  style: {}
                }
              }
            ]
          },
          options: {}
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'FAQ'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false,
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
    pageBuilderEditable() {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    },
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style lang="scss">

</style>
