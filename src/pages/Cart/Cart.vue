<template>
  <div class="cart-page">
    <q-page-builder v-model:sections="sections"
                    v-model:options="pageConfig"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>

export default {
  name: 'Cart',
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
                        name: 'Cart'
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
  created() {},
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

<style lang="scss" scoped>
</style>
