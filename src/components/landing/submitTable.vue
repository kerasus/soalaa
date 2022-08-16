<template>
  <div class="submit-table ">
    <div class="drop-down-btn">
      <q-btn-dropdown label="Dropdown Button">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Photos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Videos</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick">
            <q-item-section>
              <q-item-label>Articles</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div class="table-container">
      <table class="table">
        <tr>
          <th class='table-title'>شماره</th>
          <th class='table-title'>تاریخ</th>
          <th class='table-title'>عنوان</th>
          <th class='table-title'>ثبت‌نام کامل</th>
        </tr>
        <tr v-for="item in data" :key="item">
          <td class="number">{{ item.number }}</td>
          <td class="date">{{ item.date }}</td>
          <td class="title">{{ item.title }}</td>
          <td class="submitStatus">{{ item.submitStatus }}</td>
        </tr>
        <tr>
          <td colspan="3" class="table-footer-pic-box">
            <div class="table-footer-container">
              <div class="pic-container">
                <q-img  src="https://nodes.alaatv.com/upload/landing/3a/13.png" class="img">
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
                  <span class="final-price"> تومان</span>
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
</template>

<script>
export default {
  name: 'submitTable',

  data: () => ({
    data: []
  }),
  created () {
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
  }

}
</script>
<style>
.q-btn .q-btn__content {
  margin: 0;
}
</style>
<style scoped lang="scss">
.submit-table {
  padding: 24px;

  .drop-down-btn {
    display: flex;
  }
  .table, th, td {
    padding: 12px 0;
    background: #FAFAFA;
    border: 1px solid #DBDBDB;
    border-collapse: collapse;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }

  .table {
    width: 100%;
    border-radius: 22px;
    color: #232323 !important;
    background: #FAFAFA;
    border: 1px solid #DBDBDB;
    tr {
      .table-title {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        color: #232323;
        border: 1px solid #DBDBDB;
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

        .table-footer-container {
          display: grid;
          grid-template-columns: 1fr 2fr;
          height: 100%;
          .pic-container{
            width: 200px;
            align-self: end;
            .img{
              width: 100% ;

            }

          }
          .download-box{
            align-self: center;
            .text-style{
              font-style: normal;
              font-weight: 700;
              font-size: 18px;
              line-height: 24px;
              text-align: center;
              color: #232323;
              margin-bottom: 16px;
            }
            .download-btn{
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

@media screen and (max-width: 1439px) {
  .submit-table {
    padding: 24px;

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

@media screen and (max-width: 1023px) {
  .submit-table {
    padding: 24px;

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
          width: 272px;
        }

        .submitStatus {
          width: 177px;
        }
      }
    }
  }
}

@media screen and (max-width: 765px) {
  .submit-table {
    padding: 24px;

    .drop-down-btn {
      display: flex;
    }

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

@media screen and (max-width: 599px) {
}

</style>
