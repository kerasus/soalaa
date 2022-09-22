<template>
  <div class="profile-page">
    <page-builder :sections="sections"></page-builder>
  </div>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'
export default {
  name: 'profile',
  components: { pageBuilder },
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
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
