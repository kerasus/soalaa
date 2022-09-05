<template>
  <div class="full-width new-question-navbar">
    <div class="fit row wrap justify-center">
      <div class="col-3">
        <span v-if="question.id">
          سوال #
          {{ question.id }}
        </span>
      </div>
      <div class="col-3">
        <p v-if="question.id">
          <span> سازنده سوال :</span> <span> فیلان دبیر</span>
        </p>
      </div>
      <div v-if="question.id === null"
           class="col-4"
      >
        <div class="row">
          <div class="col">
            <div class="row justify-end">
              <div class="col">
                <q-btn
                  v-ripple
                  rounded
                  unelevated
                  color="green"
                  class="save-btn-default"
                  @click="btn_clicked('create')"
                >
                  <span class="save-btn-text-default">
                    ذخیره
                  </span>
                </q-btn>
              </div>
              <div class="col">
                <q-btn
                  v-ripple
                  rounded
                  unelevated
                  color="white"
                  text-color="grey-10"
                  class="draft-btn-default"
                  @click="btn_clicked('create')"
                >
                  <q-icon class="draft-icon"
                          name="mdi-square-edit-outline" />
                  پیش نویس
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!---------------------------------edit page-------------------------------->
      <div v-if="question.id && editStatus"
           class="col"
      >
        <div class="row">
          <div class="col">
            <span> وضعیت : </span>
            <q-chip
              color="chip-color"
              text-color="white"
            >
              {{ question.status.display_title }}
            </q-chip>
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <q-btn
                  rounded
                  unelevated
                  color="green"
                  padding="2px 25px"
                  text-color="white"
                  @click="btn_clicked('save')"

                >
                  <span>
                    ذخیره
                  </span>
                </q-btn>
              </div>
              <div class="col">
                <q-btn
                  rounded
                  color="white"
                  text-color="grey-10"
                  padding="2px 30px"
                  unelevated
                  @click="btn_clicked('cancel')"
                >
                  لغو
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-------------------------------show page--------------------------------->
      <div v-if="!editStatus"
           class="col"
      >
        <div class="row justify-end">
          <div class="col-3">
            <q-btn
              v-ripple
              rounded
              unelevated
              color="white"
              text-color="grey-10"
              class="edit-btn-default"
              @click="btn_clicked('edit')"
            >
              <q-icon class="edit-icon"
                      name="mdi-square-edit-outline" />
              ویرایش
            </q-btn>
          </div>
          <div class="col-3">
            <q-btn
              v-ripple
              rounded
              unelevated
              color="white"
              text-color="grey-10"
              class="edit-btn-default"
              @click="btn_clicked('remove')"
            >
              حذف
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from 'src/models/Question'
export default {
  name: 'NavBar',
  props: {
    question: {
      type: Question,
      default: new Question()
    },
    // for test
    // question: {
    //   type: Question,
    //   default: new Question({
    //     id: '5ffdd0d35590063ba07fad39',
    //     statement: '<p>«إذا أرَدتَ أن تفوز في عملک فَقُم به وحیداً و لا تـتوکّل علی النّاس!»</p>\n',
    //     choices: [
    //       {
    //         title: '<p>هرگاه خواستی که در کارَت موفق شوی به تنهایی به آن بپرداز و بر مردم تکیه نکن!</p>\n',
    //         order: 1,
    //         answer: true,
    //         id: 1
    //       },
    //       {
    //         title: '<p>اگر اراده‌ات بر موفق شدن در کارهایت است به تنهایی آنها را انجام بده و به مردم اعتماد نکن!</p>\n',
    //         order: 2,
    //         answer: false,
    //         id: 2
    //       },
    //       {
    //         title: '<p>چنانچه قصد داری که در کار خویش به نتیجه برسی به تنهایی به پاخیز و به مردم توکّل نکن!</p>\n',
    //         order: 3,
    //         answer: false,
    //         id: 3
    //       },
    //       {
    //         title: '<p>هر زمان که خواستی در کار خود موفق باشی باید به تنهایی انجامش دهی و به مردم تکیه نکنی!</p>\n',
    //         order: 4,
    //         answer: false,
    //         id: 4
    //       }
    //     ],
    //     exams: [],
    //     level: 1,
    //     photos: [
    //       'https://nodes.alaatv.com/aaa/questionPhotos/Screenshot%20from%202021-06-24%2016-21-18-3532494.png'
    //     ],
    //     author: [],
    //     confirmers: [],
    //     confirmed: false,
    //     descriptive_answer: null,
    //     statement_photo: null,
    //     answer_photos: [],
    //     status: {
    //       id: '60c7102418e65826bc7da378',
    //       title: 'typed',
    //       display_title: 'تایپ شده',
    //       updated_at: '2021-06-14 12:45:32',
    //       created_at: '2021-06-14 12:45:32'
    //     },
    //     type: {
    //       value: 'konkur'
    //     },
    //     updated_at: '2021-11-17 11:17:36',
    //     created_at: '2021-01-12 20:09:47'
    //   })
    // },
    editStatus: {
      type: Boolean,
      default: false
    },
    pageName: {
      type: String,
      default: ''
    }
  },
  methods: {
    btn_clicked (name) {
      this.$emit(name)
    }
  }
}
</script>
<style scoped lang="scss">
.new-question-navbar {
  .save-btn-default{
    width: 100px;
    height: 36px;
  }
  .btn-text-default{
    font-size: 14px;
    font-weight: 500;
  }
  .draft-btn-default{
    width: 130px;
    height: 36px;
  }
  .edit-btn-default{
    width: 100px;
    height: 36px;
  }
  .draft-icon{
    font-size: 24px;
    padding-right: 7px;
    color: #666666;
  }
  .draft-btn-text-default{
    color: #2d2d2d;
  }
  .edit-icon{
    font-size: 24px;
    color: #666666;
  }
.bg-chip-color{
  background : #44a3ff !important;
}
}
</style>
