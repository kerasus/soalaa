<template>
  <v-row class="mx-4">
    <v-col>
      <!--  -------------------- nav bar ----------------------------------------------------------------- -->
      <v-row
        justify="space-between"
        class="my-10"
      >
        <v-col
          cols="2"
          data-text-align="left"
        >
          <v-btn
            elevation="0"
            class="white"
          >
            جدید ترین
            <v-icon class="mr-4">
              mdi-plus
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-row>
            <v-col>
              <v-chip-group class="white px-6 rounded">
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
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="2"
          class="text-left"
        >
          <v-btn
            rounded
            elevation="0"
            class="white"
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
        class="rounded py-2 transparent"
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
      <v-card
        v-for="(item, index) in questions.list"
        :key="index"
        class="mb-4 rounded py-2"
        flat
      >
        <v-row
          class="ma-auto"
          align="center"
        >
          <!--  -------------------- column id ------------------------------------------------------------ -->
          <v-col
            no-gutters
            cols="2"
          >
            <div
              class="pa-2 mr-4"
              v-text="item.id"
            />
          </v-col>
          <!--  -------------------- column statement ------------------------------------------------------------ -->
          <v-col
            no-gutters
            cols="3"
          >
            <span
              class="pa-2"
              v-html="item.rendered_statement"
            />
          </v-col>
          <!--  -------------------- column created_at ------------------------------------------------------------ -->
          <v-col
            no-gutters
            cols="2"
          >
            <span
              class="pa-2"
              v-text="item.shamsiDate('created_at').dateTime"
            />
          </v-col>
          <!--  -------------------- column status ------------------------------------------------------------ -->
          <v-col
            no-gutters
            cols="3"
          >
            <span class="pa-2">
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
            <span class="pa-2">
              <router-link :to="{ name:'question.show', params: { question_id: item.id }}">
                <v-icon class="ml-4">
                  mdi-eye-outline
                </v-icon>
              </router-link>
              <router-link :to="{ name:'question.edit', params: { question_id: item.id }}">
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

</style>
