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
                      name: 'Slider',
                      options: {
                        list: [
                          {
                            title: 'آزمون سه‌آ-21 مهر',
                            photo: {
                              src: 'https://nodes.alaatv.com/upload/images/slideShow/1665642162_5080.jpg?w=1280&h=500'
                            },
                            features: {
                              xl: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              lg: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              md: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              sm: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              xs: {
                                src: '',
                                width: '',
                                height: ''
                              }
                            },
                            link: 'https://soalaa.com/'
                          },
                          {
                            title: 'مدرسه آنلاین آلاء',
                            photo: {
                              src: 'https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1280&h=500'
                            },
                            features: {
                              xl: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              lg: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              md: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              sm: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              xs: {
                                src: '',
                                width: '',
                                height: ''
                              }
                            },
                            link: null
                          },
                          {
                            title: 'هدیه یلدایی 1401 - اسلایدر',
                            photo: {
                              src: 'https://nodes.alaatv.com/upload/images/slideShow/1671353744_7001.jpg?w=1280&h=500'
                            },
                            features: {
                              xl: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              lg: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              md: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              sm: {
                                src: '',
                                width: '',
                                height: ''
                              },
                              xs: {
                                src: '',
                                width: '',
                                height: ''
                              }
                            },
                            link: 'https://alaatv.com/shop'
                          }
                        ]
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
                      name: 'TextWidget',
                      options: {
                        text: 'چرا سوالا؟',
                        fontSize: '20px',
                        fontWeight: '400',
                        fontFamily: '',
                        fontStyle: 'normal',
                        color: '#6D708B',
                        customClass: 'text-center'
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
                      name: 'TextWidget',
                      options: {
                        text: 'متفاوت‌ترین پلتفرم آزمون آنلاین و بانک سوال ایران',
                        fontSize: '36px',
                        fontWeight: '700',
                        fontFamily: '',
                        fontStyle: 'normal',
                        color: '#434765',
                        customClass: 'text-center'
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
                      name: 'TabPanel',
                      options: {
                        icon: ''
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
                      name: 'FeatureBox',
                      options: {
                        responseKey: 'bank_soala',
                        title: 'بانک سوالا',
                        titleColor: '#8075DCFF'
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
                      name: 'FeatureBox',
                      options: {
                        responseKey: '3a_azmon',
                        title: 'آزمون‌های سه‌آ',
                        titleColor: '#FFC107FF'
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
