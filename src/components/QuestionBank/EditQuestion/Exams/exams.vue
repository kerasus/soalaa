<template>
  <div class="exam mb-10">
<!--    <p-->
<!--      v-if="status"-->
<!--      class="font-weight-medium"-->
<!--    >-->
<!--      آزمون ها-->
<!--    </p>-->
<!--    <v-form ref="form">-->
<!--      <v-row-->
<!--        v-if="status"-->
<!--        class="exam-section mt-2"-->
<!--      >-->
<!--        <v-col-->
<!--          class="choose-exam"-->
<!--          cols="5"-->
<!--        >-->
<!--          <v-autocomplete-->
<!--            v-model="chooseExam"-->
<!--            :items="examList.list"-->
<!--            :rules="selectorRules"-->
<!--            item-text="title"-->
<!--            item-value="id"-->
<!--            label="انتخاب آزمون"-->
<!--            dense-->
<!--            rounded-->
<!--            solo-->
<!--            flat-->
<!--          />-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          class="choose-lesson"-->
<!--          cols="4"-->
<!--        >-->
<!--          <v-autocomplete-->
<!--            v-model="chooseLesson"-->
<!--            :rules="selectorRules"-->
<!--            :items="subCategories.list"-->
<!--            item-text="title"-->
<!--            item-value="id"-->
<!--            label="انتخاب درس"-->
<!--            dense-->
<!--            rounded-->
<!--            solo-->
<!--            flat-->
<!--          />-->
<!--        </v-col>-->

<!--        <v-col-->
<!--          class="exam-order"-->
<!--          cols="2"-->
<!--        >-->
<!--          <v-text-field-->
<!--            v-model="examOrder"-->
<!--            height="36"-->
<!--            :rules="numberRules"-->
<!--            label="ترتیب"-->
<!--            solo-->
<!--            dense-->
<!--            flat-->
<!--          />-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          class="attach-or-dettach"-->
<!--          cols="1"-->
<!--        >-->
<!--          <v-btn-->
<!--            height="36"-->
<!--            width="100%"-->
<!--            class="text-center white"-->
<!--            text-->
<!--            :loading="loading"-->
<!--            :disabled="loading"-->
<!--            @click="attach"-->
<!--          >-->
<!--            <v-icon>mdi-plus</v-icon>-->
<!--          </v-btn>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      <v-row v-if="!status && attaches.length>0">-->
<!--        <v-col cols="5">-->
<!--          <v-card-->
<!--            flat-->
<!--            class="transparent px-4 font-weight-medium"-->
<!--          >-->
<!--            آزمون-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--        <v-col cols="4 px-4 font-weight-medium">-->
<!--          <v-card-->
<!--            flat-->
<!--            class="transparent"-->
<!--          >-->
<!--            درس-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--        <v-col cols="2 px-4 font-weight-medium">-->
<!--          <v-card-->
<!--            flat-->
<!--            class="transparent"-->
<!--          >-->
<!--            ترتیب-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      <v-row-->
<!--        v-for="(item, index) in attaches"-->
<!--        :key="index"-->
<!--        class="exam-section"-->
<!--      >-->
<!--        <v-col-->
<!--          class="choose-exam"-->
<!--          cols="5"-->
<!--        >-->
<!--          <v-card-->
<!--            flat-->
<!--            height="36"-->
<!--          >-->
<!--            <v-card-text class="text-center">-->
<!--              {{ item.exam.title }}-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          class="choose-lesson"-->
<!--          cols="4"-->
<!--        >-->
<!--          <v-card-->
<!--            flat-->
<!--            height="36"-->
<!--          >-->
<!--            <v-card-text class="text-center">-->
<!--              {{ item.sub_category.title }}-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          class="exam-order"-->
<!--          cols="2"-->
<!--        >-->
<!--          <v-card-->
<!--            flat-->
<!--            height="36"-->
<!--          >-->
<!--            <v-card-text class="text-center">-->
<!--              {{ item.order }}-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          v-if="status"-->
<!--          class="attach-or-detach"-->
<!--        >-->
<!--          <v-btn-->
<!--            small-->
<!--            height="36"-->
<!--            width="100%"-->
<!--            text-->
<!--            class="text-center white"-->
<!--            :loading="loading"-->
<!--            :disabled="loading"-->
<!--            @click="detach(item)"-->
<!--          >-->
<!--            <v-icon>mdi-trash-can-outline</v-icon>-->
<!--          </v-btn>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-form>-->
  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Exams',
  props: {
    attaches: {
      default: () => {
        return []
      },
      type: Array
    },
    examList: {
      default: () => {
        // return [] ToDo
        return {}
      },
      type: Object
    },
    subCategories: {
      default: () => {
        // return [] ToDo
        return {}
      },
      type: Object
    },
    loading: {
      default: () => {
        return false
      },
      type: Boolean
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      chooseExam: '',
      chooseLesson: '',
      examOrder: '',
      numberRules: [
        v => v.length > 0 || 'پر کردن این فیلد الزامی است.',
        v => Number.isInteger(Number(v)) || 'یک عدد وارد کنید.'
      ],
      selectorRules: [
        v => v.length > 0 || 'پر کردن این فیلد الزامی است.'
      ]
    }
  },
  methods: {
    attachQuestionOnEditMode () {
      this.attachLoading = true
      axios.post(API_ADDRESS.question.attach, {
        order: this.attachOrder,
        exam_id: this.attachExamID,
        question_id: this.$route.params.id,
        sub_category_id: this.attachSubcategoryID
      })
        .then(response => {
          this.updateAttachList(response.data.data.exams)
          // console.log('response', response)
          this.attachLoading = false
          this.dialog = false
        })
        .catch(() => {
          this.attachLoading = false
          this.dialog = false
        })
    },
    detach (item) {
      this.$emit('detach', item)
    },
    attach () {
      if (this.$refs.form.validate()) {
        const exam = this.examList.list.find(examItem => examItem.id === this.chooseExam)
        // ToDo
        // eslint-disable-next-line camelcase
        const sub_category = this.subCategories.list.find(subCategoryItem => subCategoryItem.id === this.chooseLesson)
        const emitData = {
          exam,
          sub_category,
          order: this.examOrder
        }
        this.$emit('attach', emitData)
      }
    }
  }
}
</script>

<style>
.v-input__control .v-text-field__details {
  top: -62px;
  position: relative;
  left: 9px;
}

.exam .exam-order .v-input__control .v-text-field__details {
  position: relative;
  top: -62px;
  left: 9px;
}

.exam .exam-order .v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {
  border-radius: 10px;
}
</style>
<style scoped>
.v-text-field.v-text-field--enclosed {
  height: 40px;

}

.row + .row {
  margin-top: 0px;
}

.v-card__subtitle, .v-card__text, .v-card__title {
  padding: 7px;
}

.v-btn:not(.v-btn--round).v-size--small {
  height: 24px;
  min-width: 0px;
  padding: 0 0px;
}

</style>
