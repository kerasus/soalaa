<template>
  <div class="download-exam row">
    <div class="col-3 form">
      <q-card class="exam-info q-col-gutter-y-sm row">
        <div class="col-12">
          <div class="header flex justify-between">
            <div class="title">اطلاعات آزمون </div>
            <div class="disable-all">غیرفعال کردن همه</div>
          </div></div>
        <div class="col-12">
          <div class="flex justify-between items-center">
            <q-checkbox v-model="pafConfig.hasTitle">
              عنوان آزمون
            </q-checkbox>
            <div class="value">
              gtgytr
            </div>
          </div></div>
        <div class="col-12">
          <div class="flex justify-between items-center">
            <q-checkbox v-model="pafConfig.hasMajor">
              رشته تحصیلی
            </q-checkbox>
            <div class="value">
              gtgytr
            </div>
          </div></div>
        <div class="col-12">
          <div class="flex justify-between items-center">
            <q-checkbox v-model="pafConfig.hasGrade">
              پایه تحصیلی
            </q-checkbox>
            <div class="value">
              gtgytr
            </div>
          </div></div>
        <div class="col-12">
          <q-checkbox v-model="pafConfig.hasCreator">
            منبع / طراح سوال
          </q-checkbox></div>
        <q-checkbox v-model="pafConfig.hasCreator">
          سال طراحی سوال
        </q-checkbox>
      </q-card>
      <q-card class="spaces">
        <div class="header flex justify-between">
          <div class="title">فاصله گذاری </div>
          <div class="disable-all"> حدف همه</div>
        </div>
        <div class="sub-title">حاشیه اطراف کاغذ</div>
        <div class="l-t flex justify-between">
          <q-input v-model="number"
                   filled
                   class="side-input"
                   prefix=" cm | "
          >
            <template v-slot:before>
              راست
            </template>
          </q-input>
          <q-input v-model="number"
                   filled
                   class="side-input"
                   prefix=" cm | "
          >
            <template v-slot:before>
              چـــــپ
            </template>
          </q-input>
        </div>
        <div class="u-p flex justify-between">
          <q-input v-model="number"
                   filled
                   class="side-input"
                   prefix=" cm | "
          >
            <template v-slot:before>
              بـــــــالا
            </template>
          </q-input>
          <q-input v-model="number"
                   filled
                   class="side-input"
                   prefix=" cm | "
          >
            <template v-slot:before>
              پاییـن
            </template>
          </q-input>
        </div>
        <div class="sub-sub-title">
          فاصله بین سوالات
        </div>
        <q-input v-model="number"
                 type="number"
                 filled
                 prefix=" cm | "
        />

      </q-card>
      <q-card class="question-info">
        <div class="header flex justify-between">
          <div class="title">شماره گذاری </div>
          <div class="disable-all"> حدف همه</div>
        </div>
        <div class="sub-title">
          شماره شروع سوالات
        </div>
        <q-input v-model="number"
                 type="number"
                 filled
                 prefix=" cm | "
        />
        <div class="sub-title">
          صفحه بندی سوالات
        </div>
        <q-input v-model="number"
                 type="number"
                 filled
                 prefix=" cm | "
        />
      </q-card>
    </div>
    <div class="col-9 pdf ">
      <q-card>
        fg
      </q-card>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DownloadExam',
  data: () => ({
    pafConfig: {
      hasTitle: false,
      hasMajor: true,
      hasGrade: true,
      hasCreator: true,
      space: 0
    }
  })
}
</script>

<style scoped lang="scss">
.download-exam{
  :deep(.q-col-gutter-y-sm){
    padding-top: 10px;
  }
  :deep(.q-card){
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    color: #434765;
    .header{
      .title{
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
      }
      .disable-all{
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        text-align: right;
        letter-spacing: -0.03em;
        color: #9690E4;
        cursor: pointer;
      }
    }
  }
  .form{
    padding-right: 15px;
    .value{
      width: 155px;
      padding: 9px 16px;
      background: #F2F5F9;
      border-radius: 8px;
      color: #6D708B;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
    }

    .exam-info{
      .header{
        margin-bottom: 16px;
      }
    }

    .spaces{
      .sub-title{
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        margin-top: 20px;
        margin-bottom: 8px;
      }

      .side-input{
        width: 124px;
        height: 40px;
        :deep(.q-field__prefix){
          padding: 9px ;
        }
        :deep(.q-field__before){
          font-size: 14px;
          line-height: 22px;
          height: 40px;
        }
        :deep(.q-field__inner){
          background-color: transparent;
          height: 40px
        }
        :deep(.q-field__native){
          padding: 3px;
        }
      }
      .l-t{
        margin-bottom: 10px;
      }
      .u-p{
        margin-bottom: 20.5px;
      }
      .sub-sub-title{
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 8px;
      }
    }

    .question-info{
        .sub-title{
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          margin-bottom: 8px;
          margin-top: 20px;
        }
    }
  }
  .pdf{
    padding-left: 15px;
  }
}
</style>
