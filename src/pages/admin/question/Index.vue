<template>
    <v-row>
        <v-col>
            <v-toolbar
                    class="fixed-bar"
                    src="https://picsum.photos/1920/1080?random"
                    color="yellow"
                    height="110"
                    elevate-on-scroll
            >
                <v-row no-gutters class="justify-center">
                    <v-col cols="12">
                        <v-row no-gutters>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.major"
                                        v-model="filterQuestions.majorId"
                                        item-value="id"
                                        item-text="name"
                                        label="رشته"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.level"
                                        v-model="filterQuestions.levelId"
                                        item-value="id"
                                        item-text="name"
                                        label="مقطع"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.grade"
                                        v-model="filterQuestions.gradeId"
                                        item-value="id"
                                        item-text="name"
                                        label="پایه"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.major"
                                        v-model="filterQuestions.majorGroupId"
                                        item-value="id"
                                        item-text="name"
                                        label="گروه آموزشی"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.moduleGroup"
                                        v-model="filterQuestions.moduleGroupId"
                                        item-value="id"
                                        item-text="name"
                                        label="گروه درسی"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.module"
                                        v-model="filterQuestions.moduleId"
                                        item-value="id"
                                        item-text="name"
                                        label="درس"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.difficultyLevels"
                                        v-model="filterQuestions.difficultyLevelId"
                                        item-value="id"
                                        item-text="name"
                                        label="سختی"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.origins"
                                        v-model="filterQuestions.originId"
                                        item-value="id"
                                        item-text="name"
                                        label="منبع"
                                        clearable
                                        rounded
                                        solo
                                >
                                    <template v-slot:selection="data">
                                        <v-chip>
                                            <v-avatar left>
                                                <v-img :src="data.item.pic"></v-img>
                                            </v-avatar>
                                            {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                        <template v-if="typeof data.item !== 'object'">
                                            <v-list-item-content v-text="data.item"></v-list-item-content>
                                        </template>
                                        <template v-else>
                                            <v-list-item-avatar>
                                                <img :src="data.item.pic">
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                            </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-autocomplete
                                        dense
                                        :items="montaTree.publishYears"
                                        v-model="filterQuestions.publishYearId"
                                        item-value="id"
                                        item-text="name"
                                        label="سال انتشار"
                                        clearable
                                        rounded
                                        solo
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col md="3" class="pt-1">
                        <v-card>
                            <v-row no-gutters>
                                <v-col>
                                    <v-chip
                                            dark
                                            class="ma-2"
                                            color="deep-purple accent-4"
                                    >
                                        {{ totalFilteredQuestions }}
                                    </v-chip>
                                </v-col>
                                <v-col class="d-flex align-center">
                                    <v-btn
                                            color="light-blue"
                                            fab
                                            small
                                            dark
                                            @click="sortQuestions"
                                    >
                                        <v-icon>mdi-sort-ascending</v-icon>
                                    </v-btn>
                                </v-col>
                                <v-col class="d-flex align-center">
                                    <v-btn
                                            color="light-blue"
                                            fab
                                            small
                                            dark
                                            @click="getQuestions(true)"
                                    >
                                        <v-icon>mdi-database-search</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-toolbar>

            <div :key="'questions-list-'+lastLoadTime">
                <v-card v-for="item in filteredQuestions" :key="item.id" elevation="3" class="mr-2 ml-2 mt-2">
                    <v-card-text v-if="item" class="renderedText">
                        <v-card v-if="item.source_data.question">
                            <v-card-text v-html="convertToMarkdownKatex(item.source_data.question)" />
                        </v-card>
                        <v-row>
                            <v-col md="10">
                                <v-list dense>
                                    <v-list-item-group color="primary">
                                        <v-list-item v-if="item.source_data.choiceDescription1">
                                            <v-list-item-content>
                                                <v-list-item-title v-html="'الف)' + convertToMarkdownKatex(item.source_data.choiceDescription1)"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item v-if="item.source_data.choiceDescription2">
                                            <v-list-item-content>
                                                <v-list-item-title v-html="'ب)' + convertToMarkdownKatex(item.source_data.choiceDescription2)"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item v-if="item.source_data.choiceDescription3">
                                            <v-list-item-content>
                                                <v-list-item-title v-html="'ج)' + convertToMarkdownKatex(item.source_data.choiceDescription3)"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item v-if="item.source_data.choiceDescription4">
                                            <v-list-item-content>
                                                <v-list-item-title v-html="'د)' + convertToMarkdownKatex(item.source_data.choiceDescription4)"></v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                            <v-col md="2">
                                <v-list dense>
                                    <v-list-item-group color="primary">
                                        <v-list-item v-for="(originItem, originIndex) in item.source_data.origins.questionOriginList" :key="'originIndex_'+originIndex">
                                            <v-list-item-content>
                                                <v-list-item-title v-if="originItem.origin">
                                                    <v-avatar>
                                                        <img :src="originItem.origin.pic" alt="origin.pic">
                                                    </v-avatar>
                                                    {{ originItem.origin.name }}
                                                </v-list-item-title>
                                                <v-list-item-content v-if="originItem.publishYear" v-html="originItem.publishYear.title" />
                                                <v-list-item-subtitle v-if="originItem.questionOrder">
                                                    شماره:
                                                    {{ originItem.questionOrder }}
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item v-if="item.source_data.difficultyLevel">
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <v-badge :content="item.source_data.difficultyLevel.name">
                                                        <v-rating
                                                                background-color="green lighten-2"
                                                                color="green"
                                                                length="6"
                                                                readonly
                                                                size="25"
                                                                :value="item.source_data.difficultyLevel.value"
                                                        ></v-rating>
                                                    </v-badge>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-action>
                                                <v-btn :to="{name: 'quest.edit', params: { id: (item.id) ? item.id : item._id }}">
                                                    مشاهده
                                                </v-btn>
                                            </v-list-item-action>
                                        </v-list-item>
                                    </v-list-item-group>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-expansion-panels v-if="true" v-model="expanModel">
                            <v-expansion-panel v-if="item.source_data.answer">
                                <v-expansion-panel-header>
                                    پاسخ
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div v-html="convertToMarkdownKatex(item.source_data.answer)" />
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-card-text>
                    <v-card-actions v-if="item" color="deep-purple darken-1">
                        <v-list dense>
                            <v-list-item
                                    v-for="(topic, i) in item.source_data.topicList"
                                    :key="i"
                            >
                                <v-list-item-content>
                                      <span>
                                        <v-chip v-if="topic.module && topic.module.grade && topic.module.grade.level" dark color="purple darken-4">
                                          {{ topic.module.grade.level.name }}
                                        </v-chip>
                                        <v-chip v-if="topic.module && topic.module.grade" dark color="purple darken-4">
                                          {{ topic.module.grade.name }}
                                        </v-chip>
                                        <v-chip v-if="topic.module && topic.module.majors" dark color="purple darken-3">
                                          <span v-for="(major, j) in topic.module.majors" :key="'item_'+item.id+'major_'+j" >{{ major.name }}</span>
                                        </v-chip>
                                        <v-chip v-if="topic.module && topic.module.moduleGroup" dark color="purple darken-2">
                                          {{ topic.module.moduleGroup.name }}
                                        </v-chip>
                                        <v-chip v-if="topic.module" dark color="purple darken-1">
                                          {{ topic.module.name }}
                                        </v-chip>
                                        <topic :topic="topic"/>
                                      </span>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card-actions>
                </v-card>
            </div>


            <scroll-loader :loader-method="getQuestions" :loader-disable="disableLoadingList" :key="lastLoadTime">
                کمی صبر کنید...
            </scroll-loader>
            <v-overlay :value="loadingPage">
                <v-progress-circular
                        indeterminate
                        size="64"
                ></v-progress-circular>
            </v-overlay>
        </v-col>
    </v-row>
</template>

<script>
  import Vue from 'vue'
  import ScrollLoader from 'vue-scroll-loader'
  import axios from 'axios'
    import montaTree from '@/assets/montaTree'
  import {mixinMarkdownAndKatex} from '@/mixin/Mixins'
  import TurndownService from 'turndown/lib/turndown.browser.umd'
  import topic from '@/components/Question/topic'
  import Assistant from "@/plugins/assistant";
  import API_ADDRESS from "@/api/Addresses";
  Vue.use(ScrollLoader);

  export default {
    name: 'Index',
    mixins: [mixinMarkdownAndKatex],
    computed: {
      montaTree() {
        return montaTree
      },
    },
    components: {
      // InfiniteLoading,
      topic
    },
    data() {
      return {
        disableLoadingList: false,
        totalFilteredQuestions: '...',
        lastLoadTime: Date.now(),
        nextPage: '',
        filteredQuestions: [],
        orderedQuestions: false,
        loadingPage: false,
        filterQuestions: {
          majorId: null,
          levelId: null,
          gradeId: null,
          moduleGroupId: null,
          majorGroupId: null,
          moduleId: null,
          originId: null,
          publishYearId: null,
          difficultyLevelId: null
        },
        expanModel: 0,
      }
    },
    methods: {
      sortQuestions () {
        function hasQuestionOrder (question, index) {
          if (typeof index === 'undefined') {
            index = 0
          }
          return (
                  question.source_data.origins &&
                  question.source_data.origins.questionOriginList &&
                  question.source_data.origins.questionOriginList[index] &&
                  question.source_data.origins.questionOriginList[index].questionOrder
          )
        }
        function getQuestionOrder (question, index) {
          if (typeof index === 'undefined') {
            index = 0
          }
          if (hasQuestionOrder(question, index)) {
            return question.source_data.origins.questionOriginList[index].questionOrder
          } else {
            return null
          }
        }
        let sortList = Array.prototype.sort.bind(this.filteredQuestions)
        sortList(function (a, b) {
          if (hasQuestionOrder(a) && hasQuestionOrder(b) && getQuestionOrder(a) < getQuestionOrder(b)) {
            return -1
          } else if (hasQuestionOrder(a) && hasQuestionOrder(b) && getQuestionOrder(a) > getQuestionOrder(b)) {
            return 1
          } else if (hasQuestionOrder(a, 1) && hasQuestionOrder(b, 1) && getQuestionOrder(a, 1) < getQuestionOrder(b, 1)) {
            return -1
          } else if (hasQuestionOrder(a, 1) && hasQuestionOrder(b, 1) && getQuestionOrder(a, 1) > getQuestionOrder(b, 1)) {
            return 1
          } else if (hasQuestionOrder(a, 2) && hasQuestionOrder(b, 2) && getQuestionOrder(a, 2) < getQuestionOrder(b, 2)) {
            return -1
          } else if (hasQuestionOrder(a, 2) && hasQuestionOrder(b, 2) && getQuestionOrder(a, 2) > getQuestionOrder(b, 2)) {
            return 1
          } else if (hasQuestionOrder(a, 3) && hasQuestionOrder(b, 3) && getQuestionOrder(a, 3) < getQuestionOrder(b, 3)) {
            return -1
          } else if (hasQuestionOrder(a, 3) && hasQuestionOrder(b, 3) && getQuestionOrder(a, 3) > getQuestionOrder(b, 3)) {
            return 1
          } else {
            return 1
          }
        })
        this.lastLoadTime = Date.now()
      },
      showLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: 'کمی صبر کنید...'})
      },
      hideLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: ''})
      },
      getQuestions (clear) {
        let that = this
        if (clear === true) {
          that.disableLoadingList = false
          that.nextPage = ''
          that.totalFilteredQuestions = '...'
        }
        that.showLoading()
        axios.get(API_ADDRESS.question.index + that.nextPage, {
          params: this.filterQuestions
        })
        .then( (response => {
          if (clear === true) {
            that.filteredQuestions = response.data.data
          } else {
            that.filteredQuestions = that.filteredQuestions.concat(response.data.data)
          }

          that.totalFilteredQuestions = response.data.meta.total
          that.hideLoading()
          that.lastLoadTime = Date.now()
          if(typeof response.data.links === 'undefined' || response.data.links.next === null) {
            that.nextPage = ''
            that.disableLoadingList = true
            return
          }
          that.nextPage = response.data.links.next.replace(response.data.meta.path, '')
        }))
        .catch((error) => {
          Assistant.handleAxiosError(this.$toasted, error)
          that.hideLoading()
          that.lastLoadTime = Date.now()
        })
      },
      convertToMarkdownKatex (string) {
        if (!string) {
          return string
        }
        string = string.replace(/\n/g,'<br>')
        TurndownService.prototype.escape = function (string) {
          let escapes = [
            [/\s\$/g, '$'],
            [/\$\s/g, '$'],
            [/\{align\*\}/g, '{cases}'],
            // [/\\/g, '\\\\'],
            // [/\*/g, '\\*'],
            // [/^-/g, '\\-'],
            // [/^\+ /g, '\\+ '],
            // [/^(=+)/g, '\\$1'],
            // [/^(#{1,6}) /g, '\\$1 '],
            // [/`/g, '\\`'],
            // [/^~~~/g, '\\~~~'],
            // [/\[/g, '\\['],
            // [/\]/g, '\\]'],
            // [/^>/g, '\\>'],
            // [/_/g, '\\_'],
            // [/^(\d+)\. /g, '$1\\. ']
          ];
          return escapes.reduce(function (accumulator, escape) {
            return accumulator.replace(escape[0], escape[1])
          }, string)
        }
        // create an instance of Turndown service
        const turndownService = new TurndownService({
          // rules: COMMONMARK_RULES,
          headingStyle: 'setext',
          hr: '* * *',
          bulletListMarker: '*',
          codeBlockStyle: 'indented',
          fence: '```',
          emDelimiter: '_',
          strongDelimiter: '**',
          linkStyle: 'inlined',
          linkReferenceStyle: 'full',
          br: '  ',
          blankReplacement: function (content, node) {
            return node.isBlock ? '\n\n' : ''
          },
          keepReplacement: function (content, node) {
            return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML
          },
          defaultReplacement: function (content, node) {
            return node.isBlock ? '\n\n' + content + '\n\n' : content
          }
        })
        // turndownService.keep(['$'])

        // convert HTML to Markdown
        const markdown = turndownService.turndown(string)
        // return string
        // return markdown

        // return this.markdown.render(string.replace('<div class="question" dir="rtl">', ''))
        return this.markdown.render(markdown, {strict: false})
      },
    }
  }
</script>

<style scoped>
    .fixed-bar {
        position: sticky;
        position: -webkit-sticky; /* for Safari */
        top: 64px;
        z-index: 2;
    }
</style>

<style>
    .v-toolbar .v-text-field__details {
        display: none;
    }
    .v-toolbar .v-select .v-input__slot {
        margin-bottom: 0;
    }
</style>
