<template>
<div class="question-card">
  <q-card>
    <q-card-section v-if="questionData.source_data.question">
      <q-card class="title-card">
        <q-card-section
          v-html="questionData.source_data.question"
        />
      </q-card>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-10">
          <q-list
            dense
            padding
            class="rounded-borders"
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
              clickable
              v-ripple
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
                  v-if="originItem.publishYear"
                  v-html="originItem.publishYear.title"
                  caption
                />

                <q-item-label
                  v-if="originItem.questionOrder"
                  caption
                >
                  شماره:
                  {{ originItem.questionOrder }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              v-if="questionData.source_data.difficultyLevel"
              clickable
              v-ripple
              class="question-rate"
            >
              <q-item-section>
                <q-rating
                    :model-value="questionData.source_data.difficultyLevel.value"
                    size="25px"
                    color="green"
                    icon="star_border"
                    icon-selected="star"
                    readonly
                  >
                  <q-badge :label="questionData.source_data.difficultyLevel.name"/>
                </q-rating>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              class="view-part"
            >
              <q-item-section>
                <q-btn class="view-btn">
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
        expand-separator
        label="پاسخ"
      >
        <q-card>
          <q-card-section>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    questionData: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    console.log(this.questionData)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.question-card{
  padding: 8px;
  .profile-part{
    .question-avatar{
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar-name{
        margin-left: 4px;
      }
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
}
</style>
