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
      <div class="col-4"
           v-if="question.id === null"
      >
          <div class="row">
            <div class="col">
              <div class="row justify-end">
                <div class="col">
<!--                  color="#4caf50"  size="lg" width="100"-->
                  <q-btn
                    rounded
                    unelevated
                    v-ripple
                    color="green"
                    class="save-btn-default"
                    @click="btn_clicked('create')"
                  >
                    <span class="save-btn-text-default" >
                      ذخیره
                    </span>
                  </q-btn>
                </div>
                <div class="col">
                  <q-btn
                    rounded
                    unelevated
                    v-ripple
                    color="white"
                    text-color="grey-10"
                    class="draft-btn-default"
                    @click="btn_clicked('create')"
                  >
                  <q-icon class="draft-icon" name="mdi-square-edit-outline" />
<!--                    <span class="draft-btn-text-default" >-->
                      پیش نویس
<!--                    </span>-->
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
      </div>
      <!---------------------------------edit page-------------------------------->
      <div class="col"
           v-if="question.id && editStatus"
      >
        <div class="row">
          <div class="col">
            <span> وضعیت : </span>
            <q-chip color="#44a3ff" text-color="white">
              {{ question.status.display_title }}
            </q-chip>
          </div>
          <div class="col">
            <div class="row">
              <div class="col">
                <q-btn
                  rounded
                  color="#4caf50"
                  size="lg"
                  width="100"
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
                  size="lg"
                  width="100"
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
      <!--        data-text-align="left"
      -->
      <div class="col"
           v-if="!editStatus"
      >
        <div class="row justify-end">
          <div class="col-3">
            <q-btn
              rounded
              unelevated
              v-ripple
              color="white"
              text-color="grey-10"
              class="edit-btn-default"
              @click="btn_clicked('edit')"
            >
              <q-icon class="edit-icon" name="mdi-square-edit-outline" />
              ویرایش
            </q-btn>
          </div>
          <div class="col-3">
            <q-btn
              rounded
              unelevated
              v-ripple
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

}
</style>
