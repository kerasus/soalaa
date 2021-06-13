<template>
  <!-- ------------------------- question -------------------------------  -->
  <div>
    <div>
      <Question v-for="(item, index) in fakeData" :key="index" v-model="item.value" :edit-status="item.editStatus" :data="item"></Question>
<!--      <Question-->
<!--        v-model="fakeData[0].value"-->
<!--        :edit-status="fakeData[0].editStatus"-->
<!--        :line="fakeData[0].line"-->
<!--        :label="fakeData[0].label"-->
<!--        :title="'تایپ سوال'"-->
<!--      />-->
<!--      <Question-->
<!--        v-model="fakeData[1].value"-->
<!--        :edit-status="fakeData[1].editStatus"-->
<!--        :line="fakeData[1].line"-->
<!--        :label="fakeData[1].label"-->
<!--      />-->
<!--      <Question-->
<!--        v-model="fakeData[2].value"-->
<!--        :edit-status="fakeData[2].editStatus"-->
<!--        :line="fakeData[2].line"-->
<!--        :label="fakeData[2].label"-->
<!--      />-->
<!--      <Question-->
<!--        v-model="fakeData[0].value"-->
<!--        :edit-status="fakeData[3].editStatus"-->
<!--        :line="fakeData[3].line"-->
<!--        :label="fakeData[3].label"-->
<!--      />-->
<!--      <Question-->
<!--        v-model="fakeData[0].value"-->
<!--        :edit-status="fakeData[4].editStatus"-->
<!--        :line="fakeData[4].line"-->
<!--        :label="fakeData[4].label"-->
<!--      />-->
<!--      <Question-->
<!--        v-model="fakeData[0].value"-->
<!--        :edit-status="fakeData[5].editStatus"-->
<!--        :line="fakeData[5].line"-->
<!--        :label="fakeData[5].label"-->
<!--        :data="fakeData[5]"-->
<!--      />-->
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
  }
}
</script>

<style scoped>

</style>