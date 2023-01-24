<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
export default {
  name: 'HomePage',
  data: () => ({
    pageConfig: {},
    sections: [
      {
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'slider'
                    }
                  ]
                }
              ],
              options: {
                // boxed: true,
                // boxedWidth: 1362
              }
            },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'tabPanel'
                    }
                  ]
                }
              ],
              options: {
                // boxed: true,
                // boxedWidth: 1362
              }
            },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'feature-box',
                      data: {
                        responseKey: 'bank_soala',
                        title: 'بانک سوالا'
                      }
                    }
                  ]
                }
              ],
              options: {
                // boxed: true,
                // boxedWidth: 1362
              }
            },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'go-login'
                    }
                  ]
                }
              ],
              options: {
                // boxed: true,
                // boxedWidth: 1362
              }
            },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'feature-box',
                      data: {
                        responseKey: '3a_azmon',
                        title: 'آزمون‌های سه‌آ'
                      }
                    }
                  ],
                  options: {
                    className: 'yellow-title'
                  }
                }
              ],
              options: {
                // boxed: true,
                // boxedWidth: 1362
              }
            },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'Footer'
                    }
                  ],
                  options: {
                    className: 'yellow-title'
                  }
                }
              ],
              options: {
                boxed: false,
                style: {}
              }
            },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'BottomNavigation'
                    }
                  ],
                  options: {
                    className: 'bottom-nav-container'
                  }
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
      }
    ]
  }),
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>

<style lang="scss">
.bottom-nav-container {
  position: relative;
}
</style>
