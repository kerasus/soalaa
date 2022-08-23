<template>
  <div class="cart-page">
    <page-builder
      :sections="sections"
      :options="options"
      :containerFullHeight="calculateHeightStyle"
    ></page-builder>
  </div>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'Cart',
  components: { pageBuilder },
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
                        name: 'CartView'
                      }
                    ],
                    options: {
                      className: 'col-md-8 col-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'CartInvoice'
                      }
                    ],
                    options: {
                      className: 'col-md-4 col-12 invoice-container'
                    }
                  },

                  {
                    widgets: [
                      {
                        name: 'CartEmpty'
                      }
                    ],
                    options: {
                      className: 'col-12'
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
      options: []
    }
  },
  created() {
    this.$store.commit('AppLayout/updateLayoutHeaderVisible', false)
    this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
  },
  computed: {
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  &:deep(.boxed) {
    max-width: 1362px !important;
    width: 100% !important;
    margin-bottom: 72px;
  }
}
:deep(.invoice-container){
margin-top: 22px;
}
</style>
