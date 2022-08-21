<template>
  <div class="question-card">
    <q-card>
      <q-card-section
        class="first-row"
        v-if="questionData.source_data.question"
      >
        <q-card class="title-card">
          <q-card-section
            v-html="questionData.source_data.question"
          />
        </q-card>
      </q-card-section>
      <q-card-section class="second-row">
        <div class="row">
          <div class="col-10">
            <q-list
              dense
              padding
              class="rounded-borders question-select-part"
            >
              <q-item
                clickable
                v-ripple
                v-if="questionData.source_data.choiceDescription1"

              >
                <q-item-section>
                  <div
                    class="renderedText"
                    v-html="'<span>1)</span>'+ questionData.source_data.choiceDescription1"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-if="questionData.source_data.choiceDescription2"
              >
                <q-item-section>
                  <div
                    class="renderedText"
                    v-html="'<span>2)</span>'+ questionData.source_data.choiceDescription2"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-if="questionData.source_data.choiceDescription3"
              >
                <q-item-section>
                  <div
                    class="renderedText"
                    v-html="'<span>3)</span>'+ questionData.source_data.choiceDescription3"
                  />
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-ripple
                v-if="questionData.source_data.choiceDescription4"
              >
                <q-item-section>
                  <div
                    class="renderedText"
                    v-html="'<span>4)</span>'+ questionData.source_data.choiceDescription4"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div class="col-2">
            <q-list
              dense
              padding
              class="rounded-borders"
            >
              <q-item
                v-for="(originItem, originIndex) in questionData.source_data.origins.questionOriginList"
                :key="'originIndex_'+originIndex"
                class="profile-part"
              >
                <q-item-section side>
                  <div
                    v-if="originItem.origin"
                    class="question-avatar"
                  >
                    <q-avatar>
                      <img
                        :src="originItem.origin.pic"
                        alt="origin.pic"
                      >
                    </q-avatar>
                    <span class="avatar-name">
                      {{ originItem.origin.name }}
                    </span>
                  </div>
                  <q-item-label
                    class="profile-publish-year"
                    v-if="originItem.publishYear"
                    v-html="originItem.publishYear.title"
                    caption
                  />
                  <q-item-label
                    v-if="originItem.questionOrder"
                    class="profile-question-order"
                    caption
                  >
                    شماره:
                    {{ originItem.questionOrder }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="questionData.source_data.difficultyLevel"
                class="question-rate"
              >
                <q-item-section>
                  <span>
                    <q-badge rounded>
                      {{questionData.source_data.difficultyLevel.name}}
                    </q-badge>
                  </span>
                  <q-rating
                    :model-value="questionData.source_data.difficultyLevel.value"
                    size="25px"
                    color="green"
                    icon="star_border"
                    icon-selected="star"
                    readonly
                  >
                  </q-rating>
                </q-item-section>
              </q-item>
              <q-item
                class="view-part"
              >
                <q-item-section>
                  <q-btn
                    class="view-btn"
                  >
                    مشاهده
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-expansion-item
          v-if="questionData.source_data.answer"
          class="shadow-1"
          expand-separator
          label="پاسخ"
        >
          <q-card>
            <q-card-section v-html="questionData.source_data.answer" />
          </q-card>
        </q-expansion-item>
      </q-card-section>
      <q-card-section>
        <q-list
          dense
          padding
          class="rounded-borders"
        >
          <q-item
            v-for="(topic, index) in questionData.source_data.topicList"
            :key="index"
          >
            <q-item-section side>
              <span class="question-chips">
                <q-chip
                  v-if="topic.module && topic.module.grade && topic.module.grade.level"
                  color="purple-10"
                  text-color="white"
                >
                  {{topic.module.grade.level.name}}
                </q-chip>
                <q-chip
                  v-if="topic.module && topic.module.grade"
                  color="purple-10"
                  text-color="white"
                >
                  {{topic.module.grade.name}}
                </q-chip>
                <q-chip
                  v-if="topic.module && topic.module.majors"
                  color="purple-9"
                  text-color="white"
                  :label="topic.module.grade.level.name"
                >
                  <span
                    v-for="(major, j) in topic.module.majors"
                    :key="'item_'+questionData.id+'major_'+j"
                  >
                    {{ major.name }}
                  </span>
                </q-chip>
                <q-chip
                  v-if="topic.module && topic.module.moduleGroup"
                  color="purple-8"
                  text-color="white"
                >
                  {{topic.module.moduleGroup.name}}
                </q-chip>
                <q-chip
                  v-if="topic.module"
                  color="purple-7"
                  text-color="white"
                >
                  {{topic.module.name}}
                </q-chip>
                <topic :topic="topic" />
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import topic from 'src/components/Question/topic'
export default {
  name: 'QuestionCard',
  components: {
    topic
  },
  props: {
    questionData: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed () {
    console.log(this.questionData)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.question-card{
  padding: 8px;
  .first-row{
    padding-bottom: 0;
    .title-card{
      opacity: 0.6;
    }
  }
  .second-row{
    padding-top: 0;
    .question-select-part{
      font-size: 0.8125rem;
      font-weight: 500;
      .renderedText{
        padding: 8px 0;
      }
    }
  }
  .profile-part{
    font-size: 0.8125rem;
    .question-avatar{
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar-name{
        margin-left: 4px;
        font-weight: 500;
        color: #000;
      }
    }
    .profile-publish-year{
      color: #000;
    }
    .profile-question-order{
      font-weight: 500;
    }
  }
  .question-rate{
    height: 75px;
  }
  .view-part{
    height: 60px;
    .view-btn{
      width:85px;
      height: 36px
    }
  }
  .question-chips{
    display: flex;
    flex-direction: row;
    .q-chip{
      margin: 0;
    }
  }
}
</style>
