<template>
  <v-row class="mx-4">
    <v-col>
      <p
        class="font-weight-medium"
      >
        کارخانه سوال
      </p>
      <!--  -------------------- nav bar ----------------------------------------------------------------- -->
      <v-row
        justify="space-between"
        class=""
        align="center"
      >
        <v-col
          cols="2"
          data-text-align="left"
        >
          <v-btn
            elevation="0"
            class="white py-5 custom-border-radius"
          >
            جدید ترین
            <v-icon class="mr-4">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-sheet
            class="custom-border-radius"
            flat
          >
            <v-chip-group class="transparent">
              <v-row justify="space-between">
                <v-col
                  v-for="(item, index) in questionStatusList.list"
                  :key="index"
                >
                  <v-chip
                    :class="{'amber lighten-3': (selectedStatusId === item.id), 'transparent': (selectedStatusId !== item.id), }"
                    @click="filter(item.id)"
                    v-text="item.display_title"
                  />
                </v-col>
              </v-row>
            </v-chip-group>
          </v-sheet>
        </v-col>
        <v-col
          cols="2"
          class="text-left"
        >
          <v-btn
            rounded
            elevation="0"
            class="white py-5 custom-border-radius"
            :to="{name: 'question.create'}"
          >
            <v-icon class="ml-4">
              mdi-plus
            </v-icon>
            سوال جدید
          </v-btn>
        </v-col>
      </v-row>

      <!--  -------------------- pagination ------------------------------------------------------------ -->
      <v-row>
        <v-col>
          <v-pagination
            v-model="page"
            class="my-4"
            :length="pageCount"
            :total-visible="7"
            @input="filter(selectedStatusId, page)"
          />
        </v-col>
      </v-row>
      <!--  -------------------- table title ------------------------------------------------------------ -->
      <v-card
        class="py-2 transparent mb-5"
        flat
      >
        <v-row class="">
          <v-col
            no-gutters
            cols="2"
          >
            <span class="pa-1 mr-4">
              #
            </span>
          </v-col>
          <v-col
            no-gutters
            cols="3"
          >
            <span class="pa-2">
              سوال
            </span>
          </v-col>
          <v-col
            no-gutters
            cols="2"
          >
            <span class="pa-2">
              تاریخ ایجاد
            </span>
          </v-col>
          <v-col
            no-gutters
            cols="3"
          >
            <span class="pa-2">
              وضعیت
            </span>
          </v-col>
          <v-col
            no-gutters
            cols="2"
          >
            <span class="pa-2">
              عملیات
            </span>
          </v-col>
        </v-row>
      </v-card>
      <!--  -------------------- table content ------------------------------------------------------------ -->
      <v-row align="center">
        <v-col>
          <v-card
            v-for="(item, index) in questions.list"
            :key="index"
            class="mb-7 custom-border-radius table-content-card"
            flat
            height="80"
          >
            <v-row
              align="center"
            >
              <!--  -------------------- column id ------------------------------------------------------------ -->
              <v-col
                no-gutters
                cols="2"
              >
                <div
                  class="mr-4"
                  v-text="item.id"
                />
              </v-col>
              <!--  -------------------- column statement ------------------------------------------------------------ -->
              <v-col
                no-gutters
                cols="3"
              >
                <div class="column-statement">
                  <p
                    class="column-statement-text"
                    v-html="item.rendered_statement"
                  />
                </div>
              </v-col>
              <!--  -------------------- column created_at ------------------------------------------------------------ -->
              <v-col
                no-gutters
                cols="2"
              >
                <span

                  v-text="item.shamsiDate('created_at').dateTime"
                />
              </v-col>
              <!--  -------------------- column status ------------------------------------------------------------ -->
              <v-col
                no-gutters
                cols="3"
              >
                <span>
                  <v-chip
                    class="red darken-1 px-4 ml-4"
                    dark
                    v-text="item.status.display_title"
                  />
                </span>
              </v-col>
              <!--  -------------------- column actions ------------------------------------------------------------ -->
              <v-col
                no-gutters
                cols="2"
              >
                <span>
                  <router-link
                    :to="{ name:'question.show', params: { question_id: item.id }}"
                    class="link-text-decoration"
                  >
                    <v-icon class="ml-4">
                      mdi-eye-outline
                    </v-icon>
                  </router-link>
                  <router-link
                    :to="{ name:'question.edit', params: { question_id: item.id }}"
                    class="link-text-decoration"
                  >
                    <v-icon class="ml-4">
                      mdi-pencil-outline
                    </v-icon>
                  </router-link>
                  <v-icon class="ml-4">
                    mdi-dots-horizontal
                  </v-icon>
                </span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!--  -------------------- pagination ------------------------------------------------------------ -->
      <v-row>
        <v-col>
          <v-pagination
            v-model="page"
            class="my-2"
            :length="pageCount"
            :total-visible="7"
            @input="filter(selectedStatusId, page)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from "@/api/Addresses";
import {QuestionStatusList} from "@/models/QuestionStatus";
import {QuestionList} from "@/models/Question";

export default {
  name: "NewQuestionFactory",
  data () {
    return {
      questionStatusList: new QuestionStatusList(),
      questions: new QuestionList(),
      page: 1,
      pageCount: 0,
      selectedStatusId: null
    }
  },
  created() {
    let that = this
    that.questionStatusList.fetch()
    .then(response => {
      that.questionStatusList = new QuestionStatusList(response.data.data)
      that.filter()
    })

  },
  methods: {
    filter (itemId, page) {
      if (itemId) {
        this.selectedStatusId = itemId
      }
      let that = this
      that.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: 'کمی صبر کنید...'})
      const statusesId = (!itemId) ? [] : [itemId]
      axios.get(API_ADDRESS.question.index(statusesId, page))
           .then( response => {
             that.questions = new QuestionList(response.data.data)
             that.page = response.data.meta.current_page
             that.pageCount = Math.ceil(response.data.meta.total / response.data.meta.per_page)
             that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
           })
    }
  }
}
</script>

<style scoped>
.custom-border-radius{
  border-radius: 15px;
}
.link-text-decoration{
  text-decoration: none;
}
.table-content-card{
  display: flex;
  align-items: center;
}
.column-statement{
  display: flex;
  align-items: center;
}
.column-statement-text{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.column-statement :first-child{
  margin: 0;
}
</style>
