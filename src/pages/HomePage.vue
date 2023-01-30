<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageBuilder } from 'src/mixin/Mixins.js'
export default {
  name: 'HomePage',
  mixins: [mixinPageBuilder],
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
                        color: '#6D708B',
                        customClass: 'text-center',
                        fontFamily: '',
                        xs: {
                          fontSize: '14px',
                          fontWeight: '400',
                          fontStyle: 'normal'
                        },
                        sm: {
                          fontSize: '16px',
                          fontWeight: '400',
                          fontStyle: 'normal'
                        },
                        md: {
                          fontSize: '20px',
                          fontWeight: '400',
                          fontStyle: 'normal'
                        },
                        lg: {
                          fontSize: '20px',
                          fontWeight: '400',
                          fontStyle: 'normal'
                        },
                        xl: {
                          fontSize: '20px',
                          fontWeight: '400',
                          fontStyle: 'normal'
                        },
                        style: {
                          padding: '20px 0 16px 0'
                        }
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
                        fontFamily: '',
                        color: '#434765',
                        customClass: 'text-center',
                        xs: {
                          fontSize: '20px',
                          fontWeight: '700',
                          fontStyle: 'normal'
                        },
                        sm: {
                          fontSize: '24px',
                          fontWeight: '700',
                          fontStyle: 'normal'
                        },
                        md: {
                          fontSize: '36px',
                          fontWeight: '700',
                          fontStyle: 'normal'
                        },
                        lg: {
                          fontSize: '36px',
                          fontWeight: '700',
                          fontStyle: 'normal'
                        },
                        xl: {
                          fontSize: '36px',
                          fontWeight: '700',
                          fontStyle: 'normal'
                        },
                        style: {
                          marginBottom: '40px'
                        }
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
            // {
            //   cols: [
            //     {
            //       widgets: [
            //         {
            //           name: 'Tabs'
            //         }
            //       ]
            //     }
            //   ],
            //   options: {
            //     // boxed: true,
            //     // boxedWidth: 1362
            //   }
            // },
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'TabPanel',
                      options: {
                        tabs: [
                          {
                            id: 1,
                            title: 'آزمون های متنوع',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">آزمون های سه آ رو از سال 1399 استارت زدیم چون ما همیشه یاد گرفتیم توی تمام جنبه های آموزش آنلاین باید اول باشیم. مگه میشه ی مدرسه معلم داشتنه باشه ولی آزمون نگیره؟! خب آلاء چند سالی بود که تبدیل شده بود به بزرگترین مدرسه آنلاین کشور و حالا وقتش بود بیاد ببینه بچه‌هاش چقدر درس رو یاد گرفتن؟ برای همین جهادی کار رو شروع کردیم. سال 99 فقط برای پایه دوازدهم آزمون داشتیم ولی الان برای تمام پایه های هفتم تا دوازدهم و حتی تیزهوشان ششم و نهم هم آزمون آنلاین برگزار می کنیم.</span><br></div>',
                            value: 'آزمون های سه آ رو از سال 1399 استارت زدیم چون ما همیشه یاد گرفتیم توی تمام جنبه های آموزش آنلاین باید اول باشیم. مگه میشه ی مدرسه معلم داشتنه باشه ولی آزمون نگیره؟! خب آلاء چند سالی بود که تبدیل شده بود به بزرگترین مدرسه آنلاین کشور و حالا وقتش بود بیاد ببینه بچه‌هاش چقدر درس رو یاد گرفتن؟\n                                    برای همین جهادی کار رو شروع کردیم. سال 99 فقط برای پایه دوازدهم آزمون داشتیم ولی الان برای تمام پایه های هفتم تا دوازدهم و حتی تیزهوشان ششم و نهم هم آزمون آنلاین برگزار می کنیم.',
                            image: 'https://picsum.photos/seed/picsum/200/300',
                            icon: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/1_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/1.png',
                            button: {
                              bgColor: '',
                              color: '#8075DC',
                              text: 'اطلاعات بیشتر',
                              url: '/landing/3a_exams'
                            }
                          },
                          {
                            id: 2,
                            title: 'صفحه آزمون پیشرفته',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">\n' +
                              'از ویژگی های خفن آزمون های سوالا، صفحه آزمون پیشرفته و حرفه ای اونه؛ یعنی یه آزمون داری با کلی قابلیت خفن و بدرد بخور که کمکت میکنن آزمونتو بدون دردسر و دغدغه‌های الکی با موفقیت بگذرونی. زمان سنج، دسترسی راحت به دفترچه سوالات، وجود دو حالت نمایش تک سوالی و پاسخنامه کنکوری، امکان نشان کردن سوالات و ... از ویژگی های اصلی و خفن این صفحه آزمون هستن.</span><br></div>',
                            value: 'از ویژگی های خفن آزمون های سوالا، صفحه آزمون پیشرفته و حرفه ای اونه؛ یعنی یه آزمون داری با کلی قابلیت خفن و بدرد بخور که کمکت میکنن آزمونتو بدون دردسر و دغدغه‌های الکی با موفقیت بگذرونی.\n                                    زمان سنج، دسترسی راحت به دفترچه سوالات، وجود دو حالت نمایش تک سوالی و پاسخنامه کنکوری، امکان نشان کردن سوالات و ... از ویژگی های اصلی و خفن این صفحه آزمون هستن.',
                            image: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/pic2.png',
                            icon: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/2_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/2.png',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '',
                              color: '#8075DC',
                              url: null
                            }
                          },
                          {
                            id: 3,
                            title: 'کارنامه جامع و تحلیلی',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">یکی از مهم ترین ویژگی هایی که آزمون آنلاین داره و آزمون حضوری نداره اینه که در لحظه کارنامه رو صادر می کنیم و بلافاصله بعد از اتمام آزمون میتونی اطلاعات جامع و کاملی دریافت کنی. خب این پایان کار نیست. مگه میشه پای آلاء جایی باز بشه و از فیلم خبری نباشه؟! تمام سوالات آزمون های سه آ فیلم دارن و میتونی ببینی سرگروه درس چجوری سوال رو حل میکنه...</span><br></div>',
                            value: 'یکی از مهم ترین ویژگی هایی که آزمون آنلاین داره و آزمون حضوری نداره اینه که در لحظه کارنامه رو صادر می کنیم و بلافاصله بعد از اتمام آزمون میتونی اطلاعات جامع و کاملی دریافت کنی.\n                                    خب این پایان کار نیست. مگه میشه پای آلاء جایی باز بشه و از فیلم خبری نباشه؟!\n                                    تمام سوالات آزمون های سه آ فیلم دارن و میتونی ببینی سرگروه درس چجوری سوال رو حل میکنه...',
                            image: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/pic3.png',
                            icon: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/3_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/3.png',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '',
                              color: '#8075DC',
                              url: null
                            }
                          },
                          {
                            id: 4,
                            title: 'بانک سوال ارزشمند',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">ما توی سوالا یک مجموعه تست های بدرد بخور رو گردآوری کردیم و یه بانک سوالی ساختیم که میتونی بری بگردی توش و کلی آزمون بسازی و تمرین کنی یا از خودت آزمون بگیری. حتی میتونی سوالات رو به صورت PDF برای خودت دانلود کنید حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی</span><br></div>',
                            value: 'ما توی سوالا یک مجموعه تست های بدرد بخور رو گردآوری کردیم و یه بانک سوالی ساختیم که میتونی بری بگردی توش و کلی آزمون بسازی و تمرین کنی یا از خودت آزمون بگیری. حتی میتونی سوالات رو به صورت PDF برای خودت دانلود کنید\n                                    حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی',
                            image: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/pic4.png',
                            icon: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/4_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/4.png',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '',
                              color: '#8075DC',
                              url: '/subscription'
                            }
                          },
                          {
                            id: 5,
                            title: 'هیئت علمی حرفه ای',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">بازم بگیم سوالا بچه بزرگه آلاء است یا خودتون فهمیدید؟ تمام برنامه ریزی، ساختار، تولید محتوا و ... تحت نظارت بهترین اساتید از هیئت علمی آلاء انجام میشه. آدمایی که مسیر رو چشم بسته هم میرن، کافیه بهشون اعتماد کنی و پابه پا شون راه بیای، بعضی وقت ها هم بدویی! PDF برای خودت دانلود کنید حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی</span><br></div>',
                            value: 'بازم بگیم سوالا بچه بزرگه آلاء است یا خودتون فهمیدید؟\n                                    تمام برنامه ریزی، ساختار، تولید محتوا و ... تحت نظارت بهترین اساتید از هیئت علمی آلاء انجام میشه. آدمایی که مسیر رو چشم بسته هم میرن، کافیه بهشون اعتماد کنی و پابه پا شون راه بیای، بعضی وقت ها هم بدویی!',
                            image: 'https://picsum.photos/seed/picsum/200/300',
                            icon: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/5_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/attr/5.png',
                            button: {
                              text: 'اطلاعات بیشتر',
                              color: '#8075DC',
                              url: null
                            }
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
                      name: 'FeatureBox',
                      options: {
                        responseKey: 'bank_soala',
                        titleColor: '#8075DC',
                        data:
                          {
                            head: 'بانک سوالا',
                            title: 'بیش از 40 هزار پرسش چهارگزینه‌ای در مقاطع مختلف با امکانات ویژه',
                            editor: '<div style="text-align: right;"><b><font size="4">بیش از 40 هزار پرسش چهارگزینه‌ای در مقاطع مختلف با امکانات ویژه</font></b></div><div style="text-align: right;"><ul><li><font size="3">شامل سوالات کنکور سراسری و سوالات برگزیده کتاب های کمک آموزشی</font></li><li><font size="3">شامل سوالات آزمون های سه‌آ</font></li><li><font size="3">شامل سوالات تالیفی دبیران برتر کشور</font></li><li><font size="3">امکان ساخت آزمون، دریافت فایل سوال و پاسخ، برگزاری آنلاین آزمون و صدور کارنامه</font></li><li><font size="3">نمایش پاسخ ویدیویی و تحلیل سوالات</font></li></ul></div>',
                            value: [
                              'شامل سوالات کنکور سراسری و سوالات برگزیده کتاب های کمک آموزشی ',
                              'شامل سوالات آزمون های سه‌آ',
                              'شامل سوالات تالیفی دبیران برتر کشور',
                              'امکان ساخت آزمون، دریافت فایل سوال و پاسخ، برگزاری آنلاین آزمون و صدور کارنامه',
                              'نمایش پاسخ ویدیویی و تحلیل سوالات'
                            ],
                            image: {
                              link: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/bank_soal.png',
                              url: '/subscription'
                            },
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '#8075DC',
                              textColor: '#FFFFFF',
                              url: '/subscription'
                            }
                          }
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
                        titleColor: '#FFC107',
                        data:
                          {
                            head: 'آزمون‌های سه‌آ',
                            title: 'آزمون آنلاین آلاء، ارزیابی در حد کنکور',
                            editor: '<div style="text-align: right;"><b><font size="4">آزمون آنلاین آلاء، ارزیابی در حد کنکور</font></b></div><div style="text-align: right;"><ul><li><font size="3">آزمون های مرحله ای برای دانش آموزان متوسطه اول، متوسطه دوم، تیزهوشان و کنکور</font></li><li><font size="3">پوشش هر سه رشته ریاضی، تجربی و انسانی</font></li><li><font size="3">طراحی سوالات توسط دبیران حرفه ای و با سابقه کشور</font></li><li><font size="3">شرکت آنلاین در آزمون با استفاده از دستگاه های متنوع (موبایل، تبلت و کامپیوتر)</font></li><li><font size="3">پاسخنامه تشریحی و ویدیویی آزمون، کارنامه جامع و تحلیلی و صدور آنی آن</font></li></ul></div>',
                            value: [
                              'آزمون های مرحله ای برای دانش آموزان متوسطه اول، متوسطه دوم، تیزهوشان و کنکور',
                              'پوشش هر سه رشته ریاضی، تجربی و انسانی',
                              'طراحی سوالات توسط دبیران حرفه ای و با سابقه کشور',
                              'شرکت آنلاین در آزمون با استفاده از دستگاه های متنوع (موبایل، تبلت و کامپیوتر)',
                              'پاسخنامه تشریحی و ویدیویی آزمون، کارنامه جامع و تحلیلی و صدور آنی آن'
                            ],
                            image: {
                              link: 'https://nodes.alaatv.com/aaa/landing/Soalaa/HomePage/3a.png',
                              url: '/landing/3a_exams'
                            },
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '#8075DC',
                              textColor: '#FFFFFF',
                              url: '/landing/3a_exams'
                            }
                          }
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
  created() {
    // this.currenSections = this.sections
    this.$store.dispatch('AppLayout/getPageWidget')
    // this.$store.commit('AppLayout/updateInitialSections', this.sections)
  },
  methods: {
    saveTempData() {
      this.$axios.post('3a/api/v1/setting', {
        key: 'homePage',
        value: JSON.stringify(this.sections)
      })
        .then(r => {
          console.log(r)
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="scss">
.bottom-nav-container {
  position: relative;
}
</style>
