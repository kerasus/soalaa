<template>
  <div class="profile-page">
    <q-page-builder v-model:sections="sections"
                    v-model:options="pageConfig"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
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
                        name: 'Profile'
                      }
                    ]
                  }
                ]
                // options: {
                //   boxed: true,
                //   boxedWidth: 1362,
                //   style: {}
                // }
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
