<template>
  <!-- ------------------------- question -------------------------------  -->
  <div>
    <div v-if="status == ''">
      <Question
        v-for="(item, index) in fakeData"
        :key="index"
        v-model="item.value"
        :edit-status="item.editStatus"
        :data="item"
      />
    </div>
    <div>
      <Question
        v-model="fakeData2[0].value"
        :edit-status="fakeData2[0].editStatus"
        :line="fakeData2[0].line"
        :label="fakeData2[0].label"
        :title="'تایپ سوال'"
      />
    </div>
  </div>
</template>

<script>
import Question from '@/components/Question/questionField'
export default {
  name: "Questions",
components:{
  Question,
},
  props:{
    status
  },
  data() {
    return {
      fakeData: [
        {
          editStatus: true,
          line: 5,
          label:'صورت سوال',
        },
        {
          editStatus: true,
          line:3,
          label:'گزینه 1',
        },
        {
          editStatus: true,
          line: 3,
          label:'گزینه 2',
        },
        {
          editStatus: true,
          line: 3,
          label:'گزینه 3',
        },
        {
          editStatus: true,
          line: 3,
          label:'گزینه 4',
        }
        ,
        {
          editStatus: true,
          line: 5,
          label: 'پاسخ تشریحی',
        }
      ],
      fakeData2: [
        {
          value:'پيوندهايى كه منشأ تشكيل ساختار دوم در پروتئین هموگلوبین هستند، ممكن  ..................',
          editStatus: false,
          line: 5,
          label:'صورت سوال',
        },
        {
          editStatus: false,
          line:3,
          label:'گزینه 1',
        },
        {
          editStatus: false,
          line: 3,
          label:'گزینه 2',
        },
        {
          editStatus: false,
          line: 3,
          label:'گزینه 3',
        },
        {
          editStatus: false,
          line: 3,
          label:'گزینه 4',
        }
        ,
        {
          editStatus:false,
          line: 5,
          label: 'پاسخ تشریحی',
        }
      ]

    }
  },

}
</script>

<style scoped>

</style>