<!--<template>-->
<!--<div>-->
<!--  test question factory-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  name: 'test'-->
<!--}-->
<!--</script>-->

<template>
  <div class="row">
    <div class="col">
      <p
        class="font-weight-medium"
      >
        کارخانه سوال
      </p>
      <!--  -------------------- nav bar ----------------------------------------------------------------- -->
      <div class="row">
        <div class="col">
          <q-btn
            flat
          >
            جدید ترین
          </q-btn>
        </div>
        <div class="col-6">
          <div class="q-gutter-y-md" style="max-width:400px">
            <q-tabs
              v-model="tab"
              inline-label
            >
              <q-tab
                v-for="(item, index) in questionStatusList.list"
                :key="index"

                @click="filter(item.id)"
              >
                {{ item.display_title }}
              </q-tab>
            </q-tabs>
          </div>

        </div>
        <div class="col">
          <q-btn
            flat
          >
            سوال جدید
          </q-btn>
        </div>
      </div>
      <!--  -------------------- pagination ------------------------------------------------------------ -->
      <div class="row justify-center">
        <q-pagination
          v-model="page"
          :max="pageCount"
          :max-pages="10"
          direction-links
          @update="filter(selectedStatusId, page)"
        />
      </div>
      <!--  -------------------- table title ------------------------------------------------------------ -->
      <div class="row">
        <div class="col-2">
           <span class="q-pa-1 q-mr-4">
              #
            </span>
        </div>
        <div class="col-3">
           <span class="q-pa-2">
              سوال
            </span>
        </div>
        <div class="col-2">
           <span class="q-pa-2">
              تاریخ ایجاد
            </span>
        </div>
        <div class="col-3">
           <span class="q-pa-2">
              وضعیت
            </span>
        </div>
        <div class="col-2">
             <span class="q-pa-2">
              عملیات
            </span>
        </div>
      </div>
      <!--  -------------------- table content ------------------------------------------------------------ -->
      <div class="row q-mx-7">
        <q-card
          v-for="(item, index) in questions.list"
          :key="index"
          flat
          class="col-12 card-style"
        >
          <div class="row items-center">
            <div class="col-2">
              <div>
                {{ item.id }}
              </div>
            </div>
            <div class="col-3">
              <p class="column-statement-text">
                {{ item.statement }}
              </p>
            </div>
            <div class="col-2">
          <span>
            {{ item.shamsiDate('created_at').dateTime }}
          </span>
            </div>
            <div class="col-3">
              <q-btn
                dark
              >
                {{ item.status.display_title }}
              </q-btn>
            </div>
            <div class="col-2">
              <q-btn
                :to="{ name:'question.show', params: { question_id: item.id }}"
              >
                show
              </q-btn>
              <q-btn
                :to="{ name:'question.edit', params: { question_id: item.id }}"
              >
                edit
              </q-btn>
              <q-btn
              >
                ...
              </q-btn>
              <!--               <span>-->
              <!--                  <router-link-->
              <!--                    :to="{ name:'question.show', params: { question_id: item.id }}"-->
              <!--                    class="link-text-decoration"-->
              <!--                  >-->
              <!--                    show-->
              <!--                    &lt;!&ndash;                    <v-icon class="ml-4">&ndash;&gt;-->
              <!--                    &lt;!&ndash;                      mdi-eye-outline&ndash;&gt;-->
              <!--                    &lt;!&ndash;                    </v-icon>&ndash;&gt;-->
              <!--                  </router-link>-->
              <!--                  <router-link-->
              <!--                    :to="{ name:'question.edit', params: { question_id: item.id }}"-->
              <!--                    class="link-text-decoration"-->
              <!--                  >-->
              <!--                    edit-->
              <!--                    &lt;!&ndash;                    <v-icon class="ml-4">&ndash;&gt;-->
              <!--                    &lt;!&ndash;                      mdi-pencil-outline&ndash;&gt;-->
              <!--                    &lt;!&ndash;                    </v-icon>&ndash;&gt;-->
              <!--                  </router-link>-->
              <!--                 ...-->
              <!--                 &lt;!&ndash;                  <v-icon class="ml-4">&ndash;&gt;-->
              <!--                 &lt;!&ndash;                    mdi-dots-horizontal&ndash;&gt;-->
              <!--                 &lt;!&ndash;                  </v-icon>&ndash;&gt;-->
              <!--                </span>-->
            </div>
          </div>
        </q-card>
      </div>
      <!--  -------------------- pagination ------------------------------------------------------------ -->
      <div class="row justify-center">
        <q-pagination
          v-model="page"
          :max="pageCount"
          :max-pages="10"
          direction-links
          @update="filter(selectedStatusId, page)"
        />
      </div>
    </div>
  </div>
<!--  <v-row class="mx-4">-->
<!--    <v-col>-->
<!--      <p-->
<!--        class="font-weight-medium"-->
<!--      >-->
<!--        کارخانه سوال-->
<!--      </p>-->
<!--      &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; nav bar -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--      <v-row-->
<!--        justify="space-between"-->
<!--        class=""-->
<!--        align="center"-->
<!--      >-->
<!--        <v-col-->
<!--          cols="2"-->
<!--          data-text-align="left"-->
<!--        >-->
<!--          <v-btn-->
<!--            elevation="0"-->
<!--            class="white py-5 custom-border-radius"-->
<!--          >-->
<!--            جدید ترین-->
<!--            <v-icon class="mr-4">-->
<!--              mdi-chevron-down-->
<!--            </v-icon>-->
<!--          </v-btn>-->
<!--        </v-col>-->
<!--        <v-col cols="6">-->
<!--          <v-sheet-->
<!--            class="custom-border-radius"-->
<!--            flat-->
<!--          >-->
<!--            <v-chip-group class="transparent">-->
<!--              <v-row justify="space-between">-->
<!--                <v-col-->
<!--                  v-for="(item, index) in questionStatusList.list"-->
<!--                  :key="index"-->
<!--                >-->
<!--                  <v-chip-->
<!--                    :class="{'amber lighten-3': (selectedStatusId === item.id), 'transparent': (selectedStatusId !== item.id), }"-->
<!--                    @click="filter(item.id)"-->
<!--                    v-text="item.display_title"-->
<!--                  />-->
<!--                </v-col>-->
<!--              </v-row>-->
<!--            </v-chip-group>-->
<!--          </v-sheet>-->
<!--        </v-col>-->
<!--        <v-col-->
<!--          cols="2"-->
<!--          class="text-left"-->
<!--        >-->
<!--          <v-btn-->
<!--            rounded-->
<!--            elevation="0"-->
<!--            class="white py-5 custom-border-radius"-->
<!--            :to="{name: 'question.create'}"-->
<!--          >-->
<!--            <v-icon class="ml-4">-->
<!--              mdi-plus-->
<!--            </v-icon>-->
<!--            سوال جدید-->
<!--          </v-btn>-->
<!--        </v-col>-->
<!--      </v-row>-->

<!--      &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; pagination &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--      <v-row>-->
<!--        <v-col>-->
<!--          <v-pagination-->
<!--            v-model="page"-->
<!--            class="my-4"-->
<!--            :length="pageCount"-->
<!--            :total-visible="7"-->
<!--            @input="filter(selectedStatusId, page)"-->
<!--          />-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--      &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; table title &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--      <v-card-->
<!--        class="py-2 transparent mb-5"-->
<!--        flat-->
<!--      >-->
<!--        <v-row class="">-->
<!--          <v-col-->
<!--            no-gutters-->
<!--            cols="2"-->
<!--          >-->
<!--            <span class="pa-1 mr-4">-->
<!--              #-->
<!--            </span>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--            no-gutters-->
<!--            cols="3"-->
<!--          >-->
<!--            <span class="pa-2">-->
<!--              سوال-->
<!--            </span>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--            no-gutters-->
<!--            cols="2"-->
<!--          >-->
<!--            <span class="pa-2">-->
<!--              تاریخ ایجاد-->
<!--            </span>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--            no-gutters-->
<!--            cols="3"-->
<!--          >-->
<!--            <span class="pa-2">-->
<!--              وضعیت-->
<!--            </span>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--            no-gutters-->
<!--            cols="2"-->
<!--          >-->
<!--            <span class="pa-2">-->
<!--              عملیات-->
<!--            </span>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-card>-->
<!--      &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; table content &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--      <v-row align="center">-->
<!--        <v-col>-->
<!--          <v-card-->
<!--            v-for="(item, index) in questions.list"-->
<!--            :key="index"-->
<!--            class="mb-7 custom-border-radius table-content-card"-->
<!--            flat-->
<!--            height="80"-->
<!--          >-->
<!--            <v-row-->
<!--              align="center"-->
<!--            >-->
<!--              &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; column id &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--              <v-col-->
<!--                no-gutters-->
<!--                cols="2"-->
<!--              >-->
<!--                <div-->
<!--                  class="mr-4"-->
<!--                  v-text="item.id"-->
<!--                />-->
<!--              </v-col>-->
<!--              &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; column statement &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--              <v-col-->
<!--                no-gutters-->
<!--                cols="3"-->
<!--              >-->
<!--                <div class="column-statement">-->
<!--                  &lt;!&ndash;ToDo: remove p&ndash;&gt;-->
<!--                  <p-->
<!--                    class="column-statement-text"-->
<!--                  >-->
<!--                    <vue-katex :input="item.statement"/>-->
<!--                  </p>-->
<!--                </div>-->
<!--              </v-col>-->
<!--              &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; column created_at &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--              <v-col-->
<!--                no-gutters-->
<!--                cols="2"-->
<!--              >-->
<!--                <span-->

<!--                  v-text="item.shamsiDate('created_at').dateTime"-->
<!--                />-->
<!--              </v-col>-->
<!--              &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; column status &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--              <v-col-->
<!--                no-gutters-->
<!--                cols="3"-->
<!--              >-->
<!--                <span>-->
<!--                  <v-chip-->
<!--                    class="red darken-1 px-4 ml-4"-->
<!--                    dark-->
<!--                    v-text="item.status.display_title"-->
<!--                  />-->
<!--                </span>-->
<!--              </v-col>-->
<!--              &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; column actions &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--              <v-col-->
<!--                no-gutters-->
<!--                cols="2"-->
<!--              >-->
<!--                <span>-->
<!--                  <router-link-->
<!--                    :to="{ name:'question.show', params: { question_id: item.id }}"-->
<!--                    class="link-text-decoration"-->
<!--                  >-->
<!--                    <v-icon class="ml-4">-->
<!--                      mdi-eye-outline-->
<!--                    </v-icon>-->
<!--                  </router-link>-->
<!--                  <router-link-->
<!--                    :to="{ name:'question.edit', params: { question_id: item.id }}"-->
<!--                    class="link-text-decoration"-->
<!--                  >-->
<!--                    <v-icon class="ml-4">-->
<!--                      mdi-pencil-outline-->
<!--                    </v-icon>-->
<!--                  </router-link>-->
<!--                  <v-icon class="ml-4">-->
<!--                    mdi-dots-horizontal-->
<!--                  </v-icon>-->
<!--                </span>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->

<!--      &lt;!&ndash;  &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; pagination &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;-->
<!--      <v-row>-->
<!--        <v-col>-->
<!--          <v-pagination-->
<!--            v-model="page"-->
<!--            class="my-2"-->
<!--            :length="pageCount"-->
<!--            :total-visible="7"-->
<!--            @input="filter(selectedStatusId, page)"-->
<!--          />-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-col>-->
<!--  </v-row>-->
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
      console.log('in filter :itemId :', itemId, 'page :', page)
      if (itemId) {
        this.selectedStatusId = itemId
      }
      const that = this
      that.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: 'کمی صبر کنید...' })
      const statusesId = (!itemId) ? [] : [itemId]
      axios.get(API_ADDRESS.question.index(statusesId, page))
        .then(response => {
          console.log('filter respob=nse :', response)
          that.questions = new QuestionList(response.data.data)
          that.page = response.data.meta.current_page
          that.pageCount = Math.ceil(response.data.meta.total / response.data.meta.per_page)
          that.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: '' })
        }).catch(e => {
          console.log('err in fiter catch :', e)
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

.link-text-decoration {
  text-decoration: none;
}

.table-content-card {
  display: flex;
  align-items: center;
}

.column-statement {
  display: flex;
  align-items: center;
}

.column-statement-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.column-statement :first-child {
  margin: 0;
}
</style>
