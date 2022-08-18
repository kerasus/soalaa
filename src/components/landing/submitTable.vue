<template>
  <div class="table-section">
    <div class="table-section-title">
      ثبت‌نام آزمون
    </div>
    <div class="submit-table">
      <div class="exams-box">
        <div class="tabs">
          <q-btn unelevated
                 v-for="exam in exams"
                 @click="activeTab = exam"
                 :key="exam.id" :name="exam"
                 class="exam-btn"
                 :class="{'active-exam-btn':activeTab.id === exam.id}"
          >
             <span class="btn-text">
               {{ exam.title }}
             </span>

          </q-btn>
        </div>
        <div class="q-select-mode-tabs">
          <q-select
            v-model="activeTab"
            :options="exams"
            dropdown-icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png"
            hide-bottom-space
            dense
            color="grey-10"
            outlined
            rounded
            option-label="title"
          >
          </q-select>
        </div>
        <div class="table-description">
          {{ activeTab.des }}
        </div>
      </div>
      <div class="table-box">
        <table class="table">
          <tr>
            <th colspan="4" class="top-of-table">
              <div class="drop-down-btn">
                <q-select v-model="model" borderless
                          dropdown-icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png" hide-bottom-space dense
                          :options="options" class="select-1 dropdown-btn q-mr-md">
                  <template v-slot:selected>
                    <span class="custom-label-prefix"> مقطع تحصیلی: </span>
                    <q-chip
                      v-if="model"
                      dense
                      square
                      color="white"
                      text-color="primary"
                      class="q-my-none q-ml-xs q-mr-none"
                    >
                      {{ model.label }}
                    </q-chip>
                  </template>
                </q-select>
                <q-select v-model="model" borderless
                          dropdown-icon="img:https://nodes.alaatv.com/upload/landing/3a/down.png" hide-bottom-space dense
                          :options="options" class="select-2 dropdown-btn">
                  <template v-slot:selected>
                    <span class="custom-label-prefix"> رشته تحصیلی: </span>
                    <q-chip
                      v-if="model"
                      dense
                      square
                      color="white"
                      text-color="primary"
                      class="q-my-none q-ml-xs q-mr-none"
                    >
                      {{ model.label }}
                    </q-chip>
                  </template>
                </q-select>
              </div>
            </th>
          </tr>
          <tr>
            <th class='table-title'>شماره</th>
            <th class='table-title'>تاریخ</th>
            <th class='table-title'>عنوان</th>
            <th class='table-title'>ثبت‌نام کامل</th>
          </tr>
          <tr v-for="item in data" :key="item">
            <td class="number custom-border">{{ item.number }}</td>
            <td class="date custom-border">{{ item.date }}</td>
            <td class="title custom-border">{{ item.title }}</td>
            <td class="submitStatus custom-border">
              <div class="flex items-center justify-center" v-if="item.submitStatus">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.5 20C16.0228 20 20.5 15.5228 20.5 10C20.5 4.47715 16.0228 0 10.5 0C4.97715 0 0.5 4.47715 0.5 10C0.5 15.5228 4.97715 20 10.5 20ZM16.0588 7.50027C16.3351 7.19167 16.3089 6.71752 16.0003 6.44123C15.6917 6.16493 15.2175 6.19113 14.9412 6.49973L11.5721 10.2629C10.8894 11.0254 10.4296 11.5363 10.0365 11.8667C9.66207 12.1814 9.44213 12.25 9.25 12.25C9.05787 12.25 8.83794 12.1814 8.46348 11.8667C8.0704 11.5363 7.61064 11.0254 6.92794 10.2629L6.05877 9.29209C5.78248 8.98349 5.30833 8.9573 4.99973 9.23359C4.69113 9.50988 4.66493 9.98403 4.94123 10.2926L5.84753 11.3049C6.48338 12.0152 7.01374 12.6076 7.49835 13.0149C8.01099 13.4458 8.56393 13.75 9.25 13.75C9.93607 13.75 10.489 13.4458 11.0016 13.0149C11.4863 12.6076 12.0166 12.0152 12.6525 11.3049L16.0588 7.50027Z"
                        fill="#2DBB33"/>
                </svg>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="3" class="table-footer-pic-box">
              <div class="table-footer-container">
                <div class="pic-container">
                  <q-img src="https://nodes.alaatv.com/upload/landing/3a/13.png" class="img">
                  </q-img>
                </div>
                <div class="download-box">
                  <div class="text-style">
                    برای دانلود برنامه آزمون روی دکمه زیر کلیک کنید.
                  </div>
                  <q-btn class="download-btn">
                    <div class="svg">
                      <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M9.75 1C9.75 0.585786 9.41421 0.25 9 0.25C8.58579 0.25 8.25 0.585786 8.25 1V7H6C5.07099 7 4.60649 7 4.21783 7.06156C2.07837 7.40042 0.400416 9.07837 0.0615583 11.2178C0 11.6065 0 12.071 0 13C0 13.929 0 14.3935 0.0615583 14.7822C0.400416 16.9216 2.07837 18.5996 4.21783 18.9384C4.60649 19 5.07099 19 6 19H12C12.929 19 13.3935 19 13.7822 18.9384C15.9216 18.5996 17.5996 16.9216 17.9384 14.7822C18 14.3935 18 13.929 18 13C18 12.071 18 11.6065 17.9384 11.2178C17.5996 9.07837 15.9216 7.40042 13.7822 7.06156C13.3935 7 12.929 7 12 7H9.75V1ZM9.75 7H8.25V13.8105C7.92734 13.483 7.54375 13.001 6.98553 12.297L5.58768 10.534C5.33034 10.2095 4.8586 10.155 4.53403 10.4123C4.20946 10.6697 4.15497 11.1414 4.41232 11.466L5.83857 13.2648C6.37175 13.9373 6.81172 14.4922 7.20551 14.8875C7.60963 15.2932 8.05816 15.6294 8.63133 15.7208C8.75344 15.7402 8.87661 15.75 9 15.75C9.12339 15.75 9.24656 15.7402 9.36867 15.7208C9.94184 15.6294 10.3904 15.2932 10.7945 14.8875C11.1883 14.4922 11.6283 13.9372 12.1614 13.2648L13.5877 11.466C13.845 11.1414 13.7905 10.6697 13.466 10.4123C13.1414 10.155 12.6697 10.2095 12.4123 10.534L11.0145 12.297C10.4563 13.001 10.0727 13.483 9.75 13.8105V7Z"
                              fill="#2A2A2A"/>
                      </svg>
                    </div>
                    <span>
دانلود برنامه آزمون‌
                  </span>
                  </q-btn>
                </div>
              </div>
            </td>
            <td colspan="1" class="price-submit-box">
              <div class="price-submit-in-footer">
                <div class="price-box">
                  <div>
                     <span class="single-price">
                        قیمت تک مرحله
                     </span>
                    <br>
                    <span class="price">۱۸٫۹۰۰ </span>
                    <span class="price">تومان</span>
                  </div>
                </div>
                <div class="submit-box">
                <span class="exam-price">
                        قیمت آزمون کامل
                    </span>
                  <div class="exam-price-box">
                    <span class="discount-tag"> تخفیف٪</span>
                    <span class="main-price"> ۱۸۶٫۰۰۰ </span>
                    <span class="main-price"> تومان</span>
                  </div>
                  <div class="final-price-box">
                    <span>۱۱۰٫۰۰۰</span>
                    <span>تومان</span>
                  </div>
                  <q-btn unelevated class="sub-btn">
                  <span class="sub-btn-text">
                    ثبت‌نام
                  </span>
                  </q-btn>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'submitTable',

  data: () => ({
    data: [],
    activeTab: '',
    exams: [
      {
        title: 'آزمون سه‌آ ویژه کنکور ۱۴۰۲',
        id: 1,
        des: 'ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره. ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.'
      },
      {
        title: 'آزمون سه‌آ های دهم و یازدهم',
        id: 2,
        des: 'ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره. ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.'

      },
      {
        title: 'آزمون سه‌آ هفتم، هشتم و نهم',
        id: 3,
        des: 'ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره. ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.'

      },
      {
        title: 'آزمون سه‌آ ویژه قبولی تیزهوشان هفتم و دهم',
        id: 4,
        des: 'ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره. ده مرحله آزمون آزمایشی سه‌آ ویژه کنکور سراسری 1402 سه‌آ که دوربین مخفی هم داره.'

      }
    ],
    model: '',
    options: [{
      title: ''
    }]
  }),
  created () {
    this.initPageData()
    for (let i = 0; i < 10; i++) {
      this.data.push(
        {
          number: i,
          date: i + '/2',
          title: 'عنوان آزمون شماره yek',
          submitStatus: true
        }
      )
    }
  },
  methods: {
    initPageData () {
      this.setFirstExamActive()
    },
    setFirstExamActive () {
      this.activeTab = this.exams[0]
    }
  }

}
</script>

<style scoped lang="scss">
.table-section{
  padding-bottom: 64px;
  .table-section-title {
    font-style: normal;
    font-weight: 900;
    font-size: 32px;
    line-height: 42px;
    color: #232323;
    text-align: center;
    margin-bottom: 28px;
  }

  .submit-table {
    .q-select-mode-tabs{
      display: none;
    }
    .tabs {
      padding: 15px;
      margin-bottom: 31px;
      box-shadow: 0 4px 16px rgba(224, 224, 224, 0.25);
      display: flex;
      justify-content: space-between;
      .exam-btn {
        border-radius: 24px;
        height: 38px;
        padding: 0 10px;

        .btn-text {
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #232323;
          opacity: 0.7;
        }
      }

      .active-exam-btn {
        background: #FFBD07;
        border-radius: 24px;

        .btn-text {
          font-weight: 900;
        }
      }
    }

    .table-description {
      padding: 0 27px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #232323;
      margin-bottom: 30px;
    }
    background: #FFFFFF;
    box-shadow: 0 4px 16px 2px rgba(40, 40, 40, 0.08);
    border-radius: 24px;

    &:deep(.q-btn) {
      .q-btn__content {
        margin: 0;
      }
    }
    .table-box{
      padding: 0 24px 24px 24px;
      .table {
        width: 100%;
        background: #fafafa;
        color: #232323 !important;
        border-width: 2px;
        border-style: hidden;
        box-shadow: 0 0 0 2px #DBDBDB;
        border-collapse: collapse;
        border-radius: 22px;
        td {
          padding: 8px 0;
          background: #FAFAFA;
          text-align: center;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
        }

        th {
          padding-top: 8px;
        }

        tr {

          .top-of-table {
            padding: 0;
            .drop-down-btn {
              display: flex;
              border-bottom: none;
              padding: 16px;

              .dropdown-btn {
                &:deep(.q-icon ) {
                  width: 15px;
                  height: 10px;
                }

                &:deep(.q-field__control) {
                  background: #E9E9E9;
                  border-radius: 24px;
                }

                &:deep(.q-field__native ) {
                  padding: 0 12.5px;
                }

                &:deep(.q-field__append ) {
                  padding-right: 20px;
                }

                .custom-label-prefix {
                  font-style: normal;
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 24px;
                  color: #232323;
                }
              }

              .select-1 {
                &:deep(.q-field__inner) {
                  width: 231px;
                }
              }

              .select-2 {
                &:deep(.q-field__inner) {
                  width: 173px;
                }
              }
            }
          }

          .table-title {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 24px;
            color: #232323;
            border-top: 1px solid #DBDBDB;
            border-left: 1px solid #DBDBDB;
          }

          .custom-border {
            border-bottom: 1px solid #DBDBDB;
            border-left: 1px solid #DBDBDB;
          }

          .number {
            width: 97px;

          }

          .date {
            width: 95px;
          }

          .title {
            width: 509px;
          }

          .submitStatus {
            width: 357px;
          }

          .table-footer-pic-box {
            height: 235px;
            background: #FFF2CB;
            border-radius: 0 0 0 22px;
            padding: 0;
            border-left: 1px solid #DBDBDB;
            border-left: 1px solid;

            .table-footer-container {
              display: grid;
              grid-template-columns: 1fr 2fr;
              height: 100%;

              .pic-container {
                width: 200px;
                align-self: end;

                .img {
                  width: 100%;
                  border-radius: 0 0 0 22px;

                }

              }

              .download-box {
                align-self: center;

                .text-style {
                  font-style: normal;
                  font-weight: 700;
                  font-size: 18px;
                  line-height: 24px;
                  text-align: center;
                  color: #232323;
                  margin-bottom: 16px;
                }

                .download-btn {
                  width: 150px;
                  height: 40px;
                  background: #FFF2CB;
                  border: 2px solid #2A2A2A;
                  border-radius: 24px;
                }

              }
            }
          }

          .price-submit-box {
            padding: 0;
            border-radius: 22px;

            .price-submit-in-footer {

              .price-box {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 75px;
                border-bottom: 1px solid #DBDBDB;
                background: #F7F7F7;

                .single-price {
                  font-weight: 500;
                  font-size: 11px;
                  line-height: 16px;
                  font-style: normal;
                  padding-bottom: 8px;
                }

                .price {
                  font-style: normal;
                  font-weight: 700;
                  font-size: 16px;
                  line-height: 16px;
                }
              }

              .submit-box {
                padding-top: 12px;
                height: 163px;

                .exam-price {
                  font-style: normal;
                  font-weight: 500;
                  font-size: 12px;
                  line-height: 16px;
                  color: #232323;
                  margin-bottom: 12px;
                }

                .exam-price-box {
                  margin-bottom: 7px;

                  .discount-tag {
                    padding: 4px 8px;
                    color: #DB1F1F;
                    background: #FFDEDE;
                    border-radius: 8px;
                    margin-right: 4px;
                  }

                  .main-price {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 16px;
                    text-decoration-line: line-through;
                    color: #DB1F1F;
                  }
                }

                .final-price-box {
                  font-style: normal;
                  font-weight: 900;
                  font-size: 20px;
                  line-height: 16px;
                  color: #232323;
                  margin-bottom: 12px;
                }

                .sub-btn {
                  width: 324px;
                  height: 48px;
                  background: #FFBD07;
                  border-radius: 24px;

                  .sub-btn-text {
                    font-style: normal;
                    font-weight: 700;
                    font-size: 16px;
                    line-height: 16px;
                    color: #2B2B2B;
                  }
                }
              }
            }
          }

        }
      }
    }
  }
}

@media screen and (max-width: 1439px) {
  .table-section{
    .submit-table {

      .drop-down-btn {
        display: flex;
      }

      .table {
        width: 100%;

        tr {
          .number {
          }

          .date {

          }

          .title {
            width: 390px;
          }

          .submitStatus {
            width: 297px;
          }
        }
      }
    }
  }

}

@media screen and (max-width: 1023px) {
  .table-section{
    .submit-table {
      .table-description {
        font-size: 14px;
        line-height: 20px;
      }
      .table-box{
        .table {
          width: 100%;

          tr {
            .number {
            }

            .date {

            }

            .title {
              width: 272px;
            }

            .submitStatus {
              width: 177px;
            }
            .table-footer-pic-box {
              height: 184px;
              .table-footer-container {

                .pic-container {
                  width: 160px;
                  align-self: end;

                  .img {
                    width: 100%;
                    border-radius: 0 0 0 22px;

                  }

                }

                .download-box {

                  .text-style {
                    font-size: 16px;
                    line-height: 24px;
                    margin-bottom: 15px;
                  }

                  .download-btn {
                    width: 142px;
                    height: 32px;
                  }

                }
              }
            }

            .price-submit-box {

              .price-submit-in-footer {

                .price-box {
                  height: 64px;
                }

                .submit-box {
                  padding-top:3px ;
                  height: 123px;
                  .exam-price {
                    font-size: 11px;
                    margin-bottom: 6px;
                  }

                  .exam-price-box {
                    margin-bottom: 3px;

                    .discount-tag {
                      padding: 0 8px;
                      font-size: 10px;
                      line-height: 16px;
                    }

                    .main-price {
                      font-size: 12px;
                    }
                  }

                  .final-price-box {
                    font-size: 18px;
                    line-height: 16px;
                    margin-bottom: 7px;
                  }

                  .sub-btn {
                    width: 145px;
                    height: 32px;

                    .sub-btn-text {
                      font-size: 13px;
                    }
                  }
                }
              }
            }
          }
        }
      }

    }
  }

}

@media screen and (max-width: 765px) {
  .table-section{
    padding-bottom: 56px;
    .table-section-title {
      font-size: 24px;
      line-height: 42px;
    }

    .submit-table {
      padding: 24px;
      .table-description {
        padding: 0;
        line-height: 18px;
      }
      .tabs {
        display: none;
      }
      .q-select-mode-tabs{
        display: block;
        margin-bottom: 16px;
        &:deep(.q-icon ) {
          width: 15px;
          height: 10px;
        }
        &:deep(.q-field__native ) {
          padding: 0 12.5px;
          font-weight: 900;
          font-size: 14px;
          line-height: 24px;
          color: #2B2B2B;
        }
        &:deep(.q-field__control) {
          background: #FFBD07;
          border-radius: 24px;
          border: 1px solid black;
        }
        &:deep(.q-field__append ) {
          padding-right: 20px;
        }
      }
      .drop-down-btn {
        display: flex;
      }

      .table-box{
        padding: 0;
        .table {
          width: 100%;

          tr {
            .number {
              width: 60px;
            }

            .date {
              width: 60px;
            }

            .title {
              width: 164px;
            }

            .submitStatus {
              width: 181px;
            }
          }
        }
      }

    }
  }

}

@media screen and (max-width: 599px) {
  .table-section{
    padding-bottom: 40px;
    .table-section-title {
      font-size: 20px;
    }
  }

}
</style>
