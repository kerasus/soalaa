<template>
  <div class="row">
    <div class="col">
      <p
        class="page-title q-mx-xl"
      >
        کارخانه سوال
      </p>
      <!--  -------------------- nav bar ----------------------------------------------------------------- -->
      <div class="row justify-center q-mx-xl" style="margin-bottom: 50px">
        <div class="col">
          <q-btn
            unelevated
            icon-right="expand_more"
            color="white"
            padding="10px 20px"
            text-color="black"
            class="custom-btn-radius"
          >
            جدید ترین
          </q-btn>
        </div>
        <div class="col-6 text-center">
          <div class="q-gutter-y-md tabs-style text-center">
            <q-tabs
              dir="ltr"
              v-model="tab"
              inline-label
              indicator-color="transparent"
              active-color="primary"
            >
              <q-tab
                v-for="(item, index) in questionStatusList.list"
                :key="index"
                :label="item.display_title"
                @click="filter(item.id)"
              />
            </q-tabs>
          </div>
        </div>
        <div class="col text-right">
          <q-btn
            unelevated
            color="white"
            padding="10px 20px"
            text-color="black"
            class="custom-btn-radius"
            icon="add"
          >
            سوال جدید
          </q-btn>
        </div>
      </div>
      <!--  -------------------- pagination ------------------------------------------------------------ -->
      <div class="row justify-center q-mb-lg q-mx-xl">
        <q-pagination
          v-model="page"
          :max="pageCount"
          color="blue"
          :max-pages="8"
          size="16px"
          direction-links
          @click="filter(selectedStatusId, page)"
        />
      </div>
      <!--  -------------------- table title ------------------------------------------------------------ -->
      <div class="row q-mx-xl q-mb-lg">
        <div class="col-2">
           <span class=" q-ml-lg table-title-style">
              #
            </span>
        </div>
        <div class="col-3">
           <span class="table-title-style">
              سوال
            </span>
        </div>
        <div class="col-2">
           <span class="table-title-style">
              تاریخ ایجاد
            </span>
        </div>
        <div class="col-3">
           <span class=" table-title-style">
              وضعیت
            </span>
        </div>
        <div class="col-2">
             <span class=" table-title-style">
              عملیات
            </span>
        </div>
      </div>
      <!--  -------------------- table content ------------------------------------------------------------ -->
      <div class="row q-mx-xl">
        <q-card
          v-for="(item, index) in questions.list"
          :key="index"
          flat
          class="col-12 card-style items-center"
        >
          <div class="row items-center card-content">
            <div class="col-2">
              <div class="q-mx-lg table-title-style column-statement-text">
                {{ item.id }}
              </div>
            </div>
            <div class="col-3">
              <span class="column-statement-text table-title-style">
                <span
                  v-html="item.statement"
                />
              </span>
            </div>
            <div class="col-2">
          <span class="table-title-style column-statement-text">
            {{ item.shamsiDate('created_at').dateTime }}
          </span>
            </div>
            <div class="col-3">
              <q-btn
                color="red-6"
                unelevated
                rounded
              >
                {{ item.status.display_title }}
              </q-btn>
            </div>
            <div class="col-2">
              <q-btn
                color="grey-8"
                flat
                :to="{ name:'question.show', params: { question_id: item.id }}"
                icon="mdi-eye-outline"
                class="btn-style"
              />
              <q-btn
                color="grey-8"
                flat
                :to="{ name:'question.edit', params: { question_id: item.id }}"
                icon="mdi-pencil-outline"
                class="btn-style"
              />
              <q-btn
                color="grey-8"
                flat
                icon="mdi-dots-horizontal"
                class="btn-style"
              />
            </div>
          </div>
        </q-card>
      </div>
      <!--  -------------------- pagination ------------------------------------------------------------ -->
      <div class="row justify-center q-mb-lg q-mx-xl">
        <q-pagination
          v-model="page"
          :max="pageCount"
          color="blue"
          :max-pages="8"
          size="16px"
          direction-links
          @click="filter(selectedStatusId, page)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
import { QuestionStatusList } from 'src/models/QuestionStatus'
import { QuestionList } from 'src/models/Question'
// import VueKatex from '@/components/VueKatex'

export default {
  name: 'NewQuestionFactory',
  components: {
    // VueKatex
  },
  data () {
    return {
      questionStatusList: new QuestionStatusList(),
      questions: new QuestionList(),
      page: 1,
      pageCount: 0,
      tab: '',
      selectedStatusId: null
    }
  },
  created () {
    this.getNavBarItems()
  },
  methods: {
    getNavBarItems () {
      const that = this
      that.questionStatusList.fetch()
        .then(response => {
          that.questionStatusList = new QuestionStatusList(response.data.data)
          that.filter()
        })
    },
    filter (itemId, page) {
      if (itemId) {
        this.selectedStatusId = itemId
      }
      const that = this
      // that.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: 'کمی صبر کنید...' })
      that.$store.dispatch('loading/overlayLoading', true)
      const statusesId = (!itemId) ? [] : [itemId]
      axios.get(API_ADDRESS.question.index(statusesId, page))
        .then(response => {
          console.log('filter respob=nse :', response)
          that.questions = new QuestionList(response.data.data)
          that.page = response.data.meta.current_page
          that.pageCount = Math.ceil(response.data.meta.total / response.data.meta.per_page)
          that.$store.dispatch('loading/overlayLoading', false)
          // that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
        }).catch(e => {
        })
    }
  }
}
</script>

<style scoped>
.card-style {
  border-radius: 15px;
  margin-bottom: 15px;
}

.card-style .card-content {
  height: 80px;
}

.link-text-decoration {
  text-decoration: none;
}

.tabs-style {
  /*width: 600px;*/
  background-color: white;
  border-radius: 10px;
}
.table-content-card {
  display: flex;
  align-items: center;
}
.page-title{
  margin-bottom: 20px;
  font-size: 16px;
}
.column-statement {
  display: flex;
  align-items: center;
}
.table-title-style {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
}
.custom-btn-radius {
  border-radius: 10px;
}

.column-statement-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-wrap: break-word
}

p {
  margin-bottom: 0;
}

.btn-style {
  width: 15px;
  margin-right: 10px;
}

.column-statement :first-child {
  margin: 0;
}
</style>
