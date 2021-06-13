<template>
  <div>
    <log-item v-for="(item, index) in logs" :key="index" :log-data="item"></log-item>
  </div>
</template>

<script>
import LogItem from "@/components/QuestionBank/EditQuestion/Log/LogItem/LogItem";
export default {
  components: {
    LogItem
  },
  props : {
    logs:{
      default(){
        return [
          {
            editor: 'شهاب عبادی',
            date: '11/9/2020',
            previousStatus: 'نمونه خوانی',
            currentStatus: 'نیازمند ویرایش',
            commnets: [
              {
                author: 'شهاب عبادی',
                text: 'توی صورت سوال غلط املایی وجود داره لطفا اصلاح شه',
                date: '11/9/2020'
              },
              {
                author: 'مصطفی عبادی',
                text: 'موردی دیده نشد، متن سوال مطابق عکس دبیره',
                date: '11/9/2020'
              },
            ]
          },
          {
            editor: 'مصطفی عبادی',
            date: '11/9/2020',
            previousStatus: 'ویرایش خوانی',
            currentStatus: 'نمونه ویرایش',
            commnets: [
              {
                author: 'شهاب عبادی',
                text: 'توی صورت سوال',
                date: '11/9/2020'
              },
              {
                author: 'مصطفی عبادی',
                text: 'توی صورت سوال',
                date: '11/9/2020'
              },
            ]
          }
        ]
      }
    }
  },
  name : "log",
  data (){
    return {}
  }
}

</script>

<style scoped></style>
