<template>
  <transition v-if="!pageLoading"
              appear
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
  >
    <q-page-builder v-model:sections="currenSections"
                    v-model:options="pageConfig"
                    :editable="pageBuilderEditable" />
  </transition>
  <q-inner-loading :showing="pageLoading"
                   label="کمی صبر کنید ...."
                   label-class="text-teal"
                   label-style="font-size: 1.1em"
  />
</template>

<script>
import { mixinPageBuilder } from 'src/mixin/Mixins.js'

export default {
  name: 'HomePage',
  mixins: [mixinPageBuilder],
  data: () => ({
    pageLoading: false,
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
                        photo: {
                          src: ''
                        },
                        title: '',
                        ratio: 1,
                        link: '',
                        list: [
                          {
                            crud: {
                              headers: {}
                            },
                            apiResource: null,
                            inputData: {
                              crud: {
                                headers: {}
                              },
                              apiResource: null,
                              warn: {
                                mode: false,
                                keys: []
                              },
                              editMode: false,
                              loading: false,
                              props: [
                                {
                                  key: 'id'
                                },
                                {
                                  key: 'title'
                                },
                                {
                                  key: 'body'
                                },
                                {
                                  key: 'photo'
                                },
                                {
                                  key: 'features',
                                  default: {
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
                                  }
                                },
                                {
                                  key: 'link'
                                },
                                {
                                  key: 'order'
                                },
                                {
                                  key: 'ratio'
                                }
                              ],
                              id: null,
                              title: 'تستی',
                              body: null,
                              photo: {
                                src: 'https://nodes.alaatv.com/aaa/pages/homepage/slider01.jpg'
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
                              link: 'https://alaatv.com/shop',
                              order: null,
                              ratio: null
                            },
                            warn: {
                              mode: false,
                              keys: []
                            },
                            editMode: false,
                            loading: false,
                            props: [
                              {
                                key: 'id'
                              },
                              {
                                key: 'title'
                              },
                              {
                                key: 'body'
                              },
                              {
                                key: 'photo'
                              },
                              {
                                key: 'features',
                                default: {
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
                                }
                              },
                              {
                                key: 'link'
                              },
                              {
                                key: 'order'
                              },
                              {
                                key: 'ratio'
                              }
                            ],
                            id: null,
                            title: 'تستی',
                            body: null,
                            photo: {
                              src: 'https://nodes.alaatv.com/aaa/pages/homepage/slider01.jpg'
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
                            link: 'http://office.alaa.tv:3003/subscription',
                            order: null,
                            ratio: null
                          }
                        ],
                        style: {},
                        className: ''
                      }
                    },
                    {
                      name: 'TextWidget',
                      options: {
                        className: '',
                        height: 'auto',
                        boxed: false,
                        boxedWidth: 1200,
                        style: {
                          padding: '20px 0 16px 0',
                          marginTop: ''
                        },
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
                        }
                      }
                    },
                    {
                      name: 'TextWidget',
                      options: {
                        className: '',
                        height: 'auto',
                        boxed: false,
                        boxedWidth: 1200,
                        style: {
                          marginBottom: '40px'
                        },
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
                        }
                      }
                    },
                    {
                      name: 'TabPanel',
                      options: {
                        className: '',
                        height: 'auto',
                        boxed: false,
                        boxedWidth: 1200,
                        style: {},
                        tabs: [
                          {
                            crud: {
                              headers: {}
                            },
                            apiResource: null,
                            inputData: {
                              crud: {
                                headers: {}
                              },
                              apiResource: null,
                              warn: {
                                mode: false,
                                keys: []
                              },
                              editMode: false,
                              loading: false,
                              props: [
                                {
                                  key: 'id'
                                },
                                {
                                  key: 'title'
                                },
                                {
                                  key: 'value'
                                },
                                {
                                  key: 'image'
                                },
                                {
                                  key: 'editor'
                                },
                                {
                                  key: 'button'
                                },
                                {
                                  key: 'icon'
                                },
                                {
                                  key: 'icon2'
                                }
                              ],
                              id: 1,
                              title: 'آزمون های متنوع',
                              value: 'آزمون های سه آ رو از سال 1399 استارت زدیم چون ما همیشه یاد گرفتیم توی تمام جنبه های آموزش آنلاین باید اول باشیم. مگه میشه ی مدرسه معلم داشتنه باشه ولی آزمون نگیره؟! خب آلاء چند سالی بود که تبدیل شده بود به بزرگترین مدرسه آنلاین کشور و حالا وقتش بود بیاد ببینه بچه‌هاش چقدر درس رو یاد گرفتن؟\n                                    برای همین جهادی کار رو شروع کردیم. سال 99 فقط برای پایه دوازدهم آزمون داشتیم ولی الان برای تمام پایه های هفتم تا دوازدهم و حتی تیزهوشان ششم و نهم هم آزمون آنلاین برگزار می کنیم.',
                              image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic5.png',
                              editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">آزمون های سه آ رو از سال 1399 استارت زدیم چون ما همیشه یاد گرفتیم توی تمام جنبه های آموزش آنلاین باید اول باشیم. مگه میشه ی مدرسه معلم داشتنه باشه ولی آزمون نگیره؟! خب آلاء چند سالی بود که تبدیل شده بود به بزرگترین مدرسه آنلاین کشور و حالا وقتش بود بیاد ببینه بچه‌هاش چقدر درس رو یاد گرفتن؟ برای همین جهادی کار رو شروع کردیم. سال 99 فقط برای پایه دوازدهم آزمون داشتیم ولی الان برای تمام پایه های هفتم تا دوازدهم و حتی تیزهوشان ششم و نهم هم آزمون آنلاین برگزار می کنیم.</span><br></div>',
                              button: {
                                bgColor: '#00000000',
                                color: '#8075DCFF',
                                text: 'اطلاعات بیشتر',
                                url: '/landing/3a_exams'
                              },
                              icon: 'https://nodes.alaatv.com/aaa/pages/homepage/1_on.png',
                              icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/1.png'
                            },
                            warn: {
                              mode: false,
                              keys: []
                            },
                            editMode: false,
                            loading: false,
                            props: [
                              {
                                key: 'id'
                              },
                              {
                                key: 'title'
                              },
                              {
                                key: 'value'
                              },
                              {
                                key: 'image'
                              },
                              {
                                key: 'editor'
                              },
                              {
                                key: 'button'
                              },
                              {
                                key: 'icon'
                              },
                              {
                                key: 'icon2'
                              }
                            ],
                            id: 1,
                            title: 'آزمون های متنوع',
                            value: 'آزمون های سه آ رو از سال 1399 استارت زدیم چون ما همیشه یاد گرفتیم توی تمام جنبه های آموزش آنلاین باید اول باشیم. مگه میشه ی مدرسه معلم داشتنه باشه ولی آزمون نگیره؟! خب آلاء چند سالی بود که تبدیل شده بود به بزرگترین مدرسه آنلاین کشور و حالا وقتش بود بیاد ببینه بچه‌هاش چقدر درس رو یاد گرفتن؟\n                                    برای همین جهادی کار رو شروع کردیم. سال 99 فقط برای پایه دوازدهم آزمون داشتیم ولی الان برای تمام پایه های هفتم تا دوازدهم و حتی تیزهوشان ششم و نهم هم آزمون آنلاین برگزار می کنیم.',
                            image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic5.png',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">آزمون های سه آ رو از سال 1399 استارت زدیم چون ما همیشه یاد گرفتیم توی تمام جنبه های آموزش آنلاین باید اول باشیم. مگه میشه ی مدرسه معلم داشتنه باشه ولی آزمون نگیره؟! خب آلاء چند سالی بود که تبدیل شده بود به بزرگترین مدرسه آنلاین کشور و حالا وقتش بود بیاد ببینه بچه‌هاش چقدر درس رو یاد گرفتن؟ برای همین جهادی کار رو شروع کردیم. سال 99 فقط برای پایه دوازدهم آزمون داشتیم ولی الان برای تمام پایه های هفتم تا دوازدهم و حتی تیزهوشان ششم و نهم هم آزمون آنلاین برگزار می کنیم.</span><br></div>',
                            button: {
                              bgColor: '#00000000',
                              color: '#8075DCFF',
                              text: 'اطلاعات بیشتر',
                              url: '/landing/3a_exams'
                            },
                            icon: 'https://nodes.alaatv.com/aaa/pages/homepage/1_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/1.png'
                          },
                          {
                            crud: {
                              headers: {}
                            },
                            apiResource: null,
                            inputData: {
                              crud: {
                                headers: {}
                              },
                              apiResource: null,
                              warn: {
                                mode: false,
                                keys: []
                              },
                              editMode: false,
                              loading: false,
                              props: [
                                {
                                  key: 'id'
                                },
                                {
                                  key: 'title'
                                },
                                {
                                  key: 'value'
                                },
                                {
                                  key: 'image'
                                },
                                {
                                  key: 'editor'
                                },
                                {
                                  key: 'button'
                                },
                                {
                                  key: 'icon'
                                },
                                {
                                  key: 'icon2'
                                }
                              ],
                              id: 2,
                              title: 'صفحه آزمون پیشرفته',
                              value: 'از ویژگی های خفن آزمون های سوالا، صفحه آزمون پیشرفته و حرفه ای اونه؛ یعنی یه آزمون داری با کلی قابلیت خفن و بدرد بخور که کمکت میکنن آزمونتو بدون دردسر و دغدغه‌های الکی با موفقیت بگذرونی.\n                                    زمان سنج، دسترسی راحت به دفترچه سوالات، وجود دو حالت نمایش تک سوالی و پاسخنامه کنکوری، امکان نشان کردن سوالات و ... از ویژگی های اصلی و خفن این صفحه آزمون هستن.',
                              image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic2.png',
                              editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">\nاز ویژگی های خفن آزمون های سوالا، صفحه آزمون پیشرفته و حرفه ای اونه؛ یعنی یه آزمون داری با کلی قابلیت خفن و بدرد بخور که کمکت میکنن آزمونتو بدون دردسر و دغدغه‌های الکی با موفقیت بگذرونی. زمان سنج، دسترسی راحت به دفترچه سوالات، وجود دو حالت نمایش تک سوالی و پاسخنامه کنکوری، امکان نشان کردن سوالات و ... از ویژگی های اصلی و خفن این صفحه آزمون هستن.</span><br></div>',
                              button: {
                                text: 'اطلاعات بیشتر',
                                bgColor: '#00000000',
                                color: '#8075DCFF',
                                url: null
                              },
                              icon: 'https://nodes.alaatv.com/aaa/pages/homepage/2_on.png',
                              icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/2.png'
                            },
                            warn: {
                              mode: false,
                              keys: []
                            },
                            editMode: false,
                            loading: false,
                            props: [
                              {
                                key: 'id'
                              },
                              {
                                key: 'title'
                              },
                              {
                                key: 'value'
                              },
                              {
                                key: 'image'
                              },
                              {
                                key: 'editor'
                              },
                              {
                                key: 'button'
                              },
                              {
                                key: 'icon'
                              },
                              {
                                key: 'icon2'
                              }
                            ],
                            id: 2,
                            title: 'صفحه آزمون پیشرفته',
                            value: 'از ویژگی های خفن آزمون های سوالا، صفحه آزمون پیشرفته و حرفه ای اونه؛ یعنی یه آزمون داری با کلی قابلیت خفن و بدرد بخور که کمکت میکنن آزمونتو بدون دردسر و دغدغه‌های الکی با موفقیت بگذرونی.\n                                    زمان سنج، دسترسی راحت به دفترچه سوالات، وجود دو حالت نمایش تک سوالی و پاسخنامه کنکوری، امکان نشان کردن سوالات و ... از ویژگی های اصلی و خفن این صفحه آزمون هستن.',
                            image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic2.png',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">\nاز ویژگی های خفن آزمون های سوالا، صفحه آزمون پیشرفته و حرفه ای اونه؛ یعنی یه آزمون داری با کلی قابلیت خفن و بدرد بخور که کمکت میکنن آزمونتو بدون دردسر و دغدغه‌های الکی با موفقیت بگذرونی. زمان سنج، دسترسی راحت به دفترچه سوالات، وجود دو حالت نمایش تک سوالی و پاسخنامه کنکوری، امکان نشان کردن سوالات و ... از ویژگی های اصلی و خفن این صفحه آزمون هستن.</span><br></div>',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '#00000000',
                              color: '#8075DCFF',
                              url: null
                            },
                            icon: 'https://nodes.alaatv.com/aaa/pages/homepage/2_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/2.png'
                          },
                          {
                            crud: {
                              headers: {}
                            },
                            apiResource: null,
                            inputData: {
                              crud: {
                                headers: {}
                              },
                              apiResource: null,
                              warn: {
                                mode: false,
                                keys: []
                              },
                              editMode: false,
                              loading: false,
                              props: [
                                {
                                  key: 'id'
                                },
                                {
                                  key: 'title'
                                },
                                {
                                  key: 'value'
                                },
                                {
                                  key: 'image'
                                },
                                {
                                  key: 'editor'
                                },
                                {
                                  key: 'button'
                                },
                                {
                                  key: 'icon'
                                },
                                {
                                  key: 'icon2'
                                }
                              ],
                              id: 3,
                              title: 'کارنامه جامع و تحلیلی',
                              value: 'یکی از مهم ترین ویژگی هایی که آزمون آنلاین داره و آزمون حضوری نداره اینه که در لحظه کارنامه رو صادر می کنیم و بلافاصله بعد از اتمام آزمون میتونی اطلاعات جامع و کاملی دریافت کنی.\n                                    خب این پایان کار نیست. مگه میشه پای آلاء جایی باز بشه و از فیلم خبری نباشه؟!\n                                    تمام سوالات آزمون های سه آ فیلم دارن و میتونی ببینی سرگروه درس چجوری سوال رو حل میکنه...',
                              image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic3.png',
                              editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">یکی از مهم ترین ویژگی هایی که آزمون آنلاین داره و آزمون حضوری نداره اینه که در لحظه کارنامه رو صادر می کنیم و بلافاصله بعد از اتمام آزمون میتونی اطلاعات جامع و کاملی دریافت کنی. خب این پایان کار نیست. مگه میشه پای آلاء جایی باز بشه و از فیلم خبری نباشه؟! تمام سوالات آزمون های سه آ فیلم دارن و میتونی ببینی سرگروه درس چجوری سوال رو حل میکنه...</span><br></div>',
                              button: {
                                text: 'اطلاعات بیشتر',
                                bgColor: '#00000000',
                                color: '#8075DCFF',
                                url: null
                              },
                              icon: 'https://nodes.alaatv.com/aaa/pages/homepage/3_on.png',
                              icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/3.png'
                            },
                            warn: {
                              mode: false,
                              keys: []
                            },
                            editMode: false,
                            loading: false,
                            props: [
                              {
                                key: 'id'
                              },
                              {
                                key: 'title'
                              },
                              {
                                key: 'value'
                              },
                              {
                                key: 'image'
                              },
                              {
                                key: 'editor'
                              },
                              {
                                key: 'button'
                              },
                              {
                                key: 'icon'
                              },
                              {
                                key: 'icon2'
                              }
                            ],
                            id: 3,
                            title: 'کارنامه جامع و تحلیلی',
                            value: 'یکی از مهم ترین ویژگی هایی که آزمون آنلاین داره و آزمون حضوری نداره اینه که در لحظه کارنامه رو صادر می کنیم و بلافاصله بعد از اتمام آزمون میتونی اطلاعات جامع و کاملی دریافت کنی.\n                                    خب این پایان کار نیست. مگه میشه پای آلاء جایی باز بشه و از فیلم خبری نباشه؟!\n                                    تمام سوالات آزمون های سه آ فیلم دارن و میتونی ببینی سرگروه درس چجوری سوال رو حل میکنه...',
                            image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic3.png',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">یکی از مهم ترین ویژگی هایی که آزمون آنلاین داره و آزمون حضوری نداره اینه که در لحظه کارنامه رو صادر می کنیم و بلافاصله بعد از اتمام آزمون میتونی اطلاعات جامع و کاملی دریافت کنی. خب این پایان کار نیست. مگه میشه پای آلاء جایی باز بشه و از فیلم خبری نباشه؟! تمام سوالات آزمون های سه آ فیلم دارن و میتونی ببینی سرگروه درس چجوری سوال رو حل میکنه...</span><br></div>',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '#00000000',
                              color: '#8075DCFF',
                              url: null
                            },
                            icon: 'https://nodes.alaatv.com/aaa/pages/homepage/3_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/3.png'
                          },
                          {
                            crud: {
                              headers: {}
                            },
                            apiResource: null,
                            inputData: {
                              crud: {
                                headers: {}
                              },
                              apiResource: null,
                              warn: {
                                mode: false,
                                keys: []
                              },
                              editMode: false,
                              loading: false,
                              props: [
                                {
                                  key: 'id'
                                },
                                {
                                  key: 'title'
                                },
                                {
                                  key: 'value'
                                },
                                {
                                  key: 'image'
                                },
                                {
                                  key: 'editor'
                                },
                                {
                                  key: 'button'
                                },
                                {
                                  key: 'icon'
                                },
                                {
                                  key: 'icon2'
                                }
                              ],
                              id: 4,
                              title: 'بانک سوال ارزشمند',
                              value: 'ما توی سوالا یک مجموعه تست های بدرد بخور رو گردآوری کردیم و یه بانک سوالی ساختیم که میتونی بری بگردی توش و کلی آزمون بسازی و تمرین کنی یا از خودت آزمون بگیری. حتی میتونی سوالات رو به صورت PDF برای خودت دانلود کنید\n                                    حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی',
                              image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic4.png',
                              editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">ما توی سوالا یک مجموعه تست های بدرد بخور رو گردآوری کردیم و یه بانک سوالی ساختیم که میتونی بری بگردی توش و کلی آزمون بسازی و تمرین کنی یا از خودت آزمون بگیری. حتی میتونی سوالات رو به صورت PDF برای خودت دانلود کنید حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی</span><br></div>',
                              button: {
                                text: 'اطلاعات بیشتر',
                                bgColor: '#00000000',
                                color: '#8075DCFF',
                                url: '/subscription'
                              },
                              icon: 'https://nodes.alaatv.com/aaa/pages/homepage/4_on.png',
                              icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/4.png'
                            },
                            warn: {
                              mode: false,
                              keys: []
                            },
                            editMode: false,
                            loading: false,
                            props: [
                              {
                                key: 'id'
                              },
                              {
                                key: 'title'
                              },
                              {
                                key: 'value'
                              },
                              {
                                key: 'image'
                              },
                              {
                                key: 'editor'
                              },
                              {
                                key: 'button'
                              },
                              {
                                key: 'icon'
                              },
                              {
                                key: 'icon2'
                              }
                            ],
                            id: 4,
                            title: 'بانک سوال ارزشمند',
                            value: 'ما توی سوالا یک مجموعه تست های بدرد بخور رو گردآوری کردیم و یه بانک سوالی ساختیم که میتونی بری بگردی توش و کلی آزمون بسازی و تمرین کنی یا از خودت آزمون بگیری. حتی میتونی سوالات رو به صورت PDF برای خودت دانلود کنید\n                                    حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی',
                            image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic4.png',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">ما توی سوالا یک مجموعه تست های بدرد بخور رو گردآوری کردیم و یه بانک سوالی ساختیم که میتونی بری بگردی توش و کلی آزمون بسازی و تمرین کنی یا از خودت آزمون بگیری. حتی میتونی سوالات رو به صورت PDF برای خودت دانلود کنید حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی</span><br></div>',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '#00000000',
                              color: '#8075DCFF',
                              url: '/subscription'
                            },
                            icon: 'https://nodes.alaatv.com/aaa/pages/homepage/4_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/4.png'
                          },
                          {
                            crud: {
                              headers: {}
                            },
                            apiResource: null,
                            inputData: {
                              crud: {
                                headers: {}
                              },
                              apiResource: null,
                              warn: {
                                mode: false,
                                keys: []
                              },
                              editMode: false,
                              loading: false,
                              props: [
                                {
                                  key: 'id'
                                },
                                {
                                  key: 'title'
                                },
                                {
                                  key: 'value'
                                },
                                {
                                  key: 'image'
                                },
                                {
                                  key: 'editor'
                                },
                                {
                                  key: 'button'
                                },
                                {
                                  key: 'icon'
                                },
                                {
                                  key: 'icon2'
                                }
                              ],
                              id: 5,
                              title: 'هیئت علمی حرفه ای',
                              value: 'بازم بگیم سوالا بچه بزرگه آلاء است یا خودتون فهمیدید؟\n                                    تمام برنامه ریزی، ساختار، تولید محتوا و ... تحت نظارت بهترین اساتید از هیئت علمی آلاء انجام میشه. آدمایی که مسیر رو چشم بسته هم میرن، کافیه بهشون اعتماد کنی و پابه پا شون راه بیای، بعضی وقت ها هم بدویی!',
                              image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic1.png',
                              editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">بازم بگیم سوالا بچه بزرگه آلاء است یا خودتون فهمیدید؟ تمام برنامه ریزی، ساختار، تولید محتوا و ... تحت نظارت بهترین اساتید از هیئت علمی آلاء انجام میشه. آدمایی که مسیر رو چشم بسته هم میرن، کافیه بهشون اعتماد کنی و پابه پا شون راه بیای، بعضی وقت ها هم بدویی! PDF برای خودت دانلود کنید حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی</span><br></div>',
                              button: {
                                text: 'اطلاعات بیشتر',
                                bgColor: '#00000000',
                                color: '#8075DCFF',
                                url: null
                              },
                              icon: 'https://nodes.alaatv.com/aaa/pages/homepage/5_on.png',
                              icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/5.png'
                            },
                            warn: {
                              mode: false,
                              keys: []
                            },
                            editMode: false,
                            loading: false,
                            props: [
                              {
                                key: 'id'
                              },
                              {
                                key: 'title'
                              },
                              {
                                key: 'value'
                              },
                              {
                                key: 'image'
                              },
                              {
                                key: 'editor'
                              },
                              {
                                key: 'button'
                              },
                              {
                                key: 'icon'
                              },
                              {
                                key: 'icon2'
                              }
                            ],
                            id: 5,
                            title: 'هیئت علمی حرفه ای',
                            value: 'بازم بگیم سوالا بچه بزرگه آلاء است یا خودتون فهمیدید؟\n                                    تمام برنامه ریزی، ساختار، تولید محتوا و ... تحت نظارت بهترین اساتید از هیئت علمی آلاء انجام میشه. آدمایی که مسیر رو چشم بسته هم میرن، کافیه بهشون اعتماد کنی و پابه پا شون راه بیای، بعضی وقت ها هم بدویی!',
                            image: 'https://nodes.alaatv.com/aaa/pages/homepage/pic1.png',
                            editor: '<div><span style="color: rgb(67, 71, 101); font-size: 18px; letter-spacing: -0.54px; text-align: justify; background-color: rgba(228, 232, 239, 0.6);">بازم بگیم سوالا بچه بزرگه آلاء است یا خودتون فهمیدید؟ تمام برنامه ریزی، ساختار، تولید محتوا و ... تحت نظارت بهترین اساتید از هیئت علمی آلاء انجام میشه. آدمایی که مسیر رو چشم بسته هم میرن، کافیه بهشون اعتماد کنی و پابه پا شون راه بیای، بعضی وقت ها هم بدویی! PDF برای خودت دانلود کنید حالا وقتشه بگیم حدود 4000 تا تست از کجا اومده: 1- تست های آزمون های سه آ، 2- تست های کنکورهای نظام جدید رشته های ریاضی، تجربی و انسانی، 3- گلچینی از بهترین تست های کتاب های کمک درسی، 4- تست های آزمون های تیزهوشان و مدارس نمونه دولتی</span><br></div>',
                            button: {
                              text: 'اطلاعات بیشتر',
                              bgColor: '#00000000',
                              color: '#8075DCFF',
                              url: null
                            },
                            icon: 'https://nodes.alaatv.com/aaa/pages/homepage/5_on.png',
                            icon2: 'https://nodes.alaatv.com/aaa/pages/homepage/5.png'
                          }
                        ]
                      }
                    },
                    {
                      name: 'FeatureBox',
                      options: {
                        className: '',
                        height: 'auto',
                        boxed: false,
                        boxedWidth: 1200,
                        style: {},
                        responseKey: 'bank_soala',
                        titleColor: '#8075DCFF',
                        data: {
                          head: 'بانک سوآلا',
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
                            link: 'https://nodes.alaatv.com/aaa/pages/homepage/bank_soal.png',
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
                    },
                    {
                      name: 'GoLogin',
                      options: {
                        text: 'با ورود و یا ثبت نام در سوالا میتوانید محتوای شخصی سازی شده و مربوط به خود را دنبال کنید'
                      }
                    },
                    {
                      name: 'FeatureBox',
                      options: {
                        className: '',
                        height: 'auto',
                        boxed: false,
                        boxedWidth: 1200,
                        style: {},
                        responseKey: '3a_azmon',
                        title: 'آزمون‌های سه‌آ',
                        titleColor: '#FFC107FF',
                        data: {
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
                            link: 'https://nodes.alaatv.com/aaa/pages/homepage/3a.png',
                            url: '/landing/3a_exams'
                          },
                          button: {
                            text: 'اطلاعات بیشتر',
                            bgColor: '#8075DCFF',
                            textColor: '#FFFFFFFF',
                            url: '/landing/3a_exams'
                          }
                        }
                      }
                    }
                  ],
                  options: {
                    style: {},
                    colNumber: ''
                  }
                }
              ],
              options: {
                className: '',
                height: 'auto',
                boxed: true,
                boxedWidth: 1380,
                style: {
                  width: '1380px',
                  maxWidth: '1380px'
                }
              }
            }
          ]
        },
        options: {
          fullHeight: true,
          verticalAlign: 'center'
        }
      }
    ]
  }),
  created () {
    this.pageLoading = true
    // this.$store.dispatch('PageBuilder/getPageWidget', this.$route.name)
    this.$store.dispatch('PageBuilder/getPageWidget', 'homePage')
      .then(() => {
        this.pageLoading = false
      })
      .catch(() => {
        this.pageLoading = false
      })
  }
}
</script>

<style lang="scss">
.bottom-nav-container {
  position: relative;
}
</style>
