<template>
  <div>
    <v-row>
      <v-col cols="3">
        <span v-if="question.id">
          سوال #
          {{ question.id }}
        </span>
      </v-col>
      <v-col cols="3">
        <p v-if="question.id">
          <span> سازنده سوال :</span> <span> فیلان دبیر</span>
        </p>
      </v-col>
      <v-col
        v-if="question.id === null"
        cols="4"
      >
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="green"
                  class="ml-2"
                  dark
                  width="120"
                  @click="btn_clicked('create')"
                >
                  <span color="green">
                    ذخیره
                  </span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="white"
                  width="130"
                  @click="btn_clicked('save')"
                >
                  <v-icon color="#666666">
                    mdi-square-edit-outline
                  </v-icon>
                  پیش نویس
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col> 
      <v-col v-if="question.id">
        <v-row>
          <v-col>
            <span> وضعیت : </span>
            <v-chip
              color="#44a3ff"
              dark
            >
              {{ question.status.display_title }}
            </v-chip>
          </v-col>
          <v-col>
            <v-row>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="green"
                  dark
                  class="ml-2"
                  width="100"
                  @click="btn_clicked('save')"
                >
                  <span color="#666666">
                    ذخیره
                  </span>
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  depressed
                  rounded
                  color="white"
                  width="100"
                  @click="btn_clicked('cancel')"
                >
                  لغو
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col v-if="!editStatus && status">
        <v-row>
          <v-col>
            <v-btn
              depressed
              rounded
              color="white"
              class="ml-2"
              width="110"
              @click="btn_clicked('edit')"
            >
              <v-icon color="#666666">
                mdi-square-edit-outline
              </v-icon>
              <span color="#666666">
                ویرایش
              </span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              depressed
              rounded
              color="white"
              width="100"
              @click="btn_clicked('remove')"
            >
              حذف
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {Question} from "@/models/Question";

export default {
  name: "NavBar",
  props: {
    question: {
      type: Question,
      default: new Question()
    },
    editStatus: {
      type: Boolean,
      default: false
    },
  },
  methods:{
    btn_clicked(name){
      this.$emit(name);
    },
  }
}
</script>
<style scoped>
</style>
