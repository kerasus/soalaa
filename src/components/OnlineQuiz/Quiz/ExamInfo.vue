<template>
  <div class="exam-info-body">
    <q-input
      v-model="text"
      label-color="grey-8"
      label="عنوان"
    />
    <br>
    <q-select
      v-model="text"
      :options="options"
      label="انتخاب نوع آزمون"
    />
    <br>
    <div>
      <p>زمان شروع</p>
      <q-input
        filled
        v-model="date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <br>
    <div>
      <p>زمان پایان</p>
      <q-input
        filled
        v-model="date"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="date">
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <br>
    <q-input
      v-model="text"
      label-color="grey-8"
      label="زمان تاخیر (دقیقه)"
    />
    <br>
    <div>
      <q-checkbox
        class="options-check-box"
        v-model="text"
        label="فعال"
      />
      <q-checkbox
        class="options-check-box"
        v-model="text"
        label="رایگان"
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="text"
        label="ثبت نام باز است."
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="text"
        label="شرکت در آزمون باز است."
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="text"
        label="تولید خودکار کارنامه"
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="text"
        label="تولید خودکار سوال"
      />
    </div>
    <br>
    <div>
      <q-separator inset />
      <br>
      <div class="row">
       <div class="col-6">
         <q-select
           class="create-mode-category"
           v-model="text"
           :options="options"
           label="cateqory"
         />
       </div>
        <div class="col-6">
          <q-input
            class="create-mode-category"
            v-model="text"
            type="number"
            label-color="grey-8"
            label="زمان"
          />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-6">
          <q-input
            class="create-mode-category"
            v-model="text"
            type="number"
            label-color="grey-8"
            label="ترتیب"
          />
        </div>
        <div class="col-6 category-btn-parent">
          <q-btn
            class="category-btn"
            label="اضافه کردن category"
          />
        </div>
      </div>
      <br>
      <br>
      <br>
      <q-separator inset />
    </div>
    <br>
    <div class="bottom-btn">
      <q-btn label="حذف"/>
      <q-btn label="ثبت"/>
    </div>
  </div>

</template>

<script>
import { Exam } from 'src/models/Exam'
export default {
  name: 'ExamInfo',
  props: {
    exam: {
      type: Object,
      default: new Exam()
    }
  },
  data () {
    return {
      date: '1397/08/12',
      text: ''
    }
  },
  created () {
    this.test()
  },
  methods: {
    test () {
      console.log('m', this.exam)
    }
  }
}
</script>

<style lang="scss" scoped>
.exam-info-body{
  width: 100%;
  max-width: 600px;
  margin: auto !important;
  padding: 50px 0 200px 0;
  .options-check-box{
    margin-right: 150px;
  }
  .category-btn-parent{
    justify-content: center;
    align-items: center;
    display: flex;
    .category-btn{
      height: 40px ;
    }
  }
  .bottom-btn{
    justify-content: center;
    display: flex;
  }
  .create-mode-category{
    margin-right: 20px;
  }
}
</style>
