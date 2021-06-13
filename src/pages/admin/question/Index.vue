<template>
  <v-row>
    <v-col v-if="montaTree">
      <v-toolbar
        class="fixed-bar"
        src="https://picsum.photos/1920/1080?random"
        color="yellow"
        height="110"
        elevate-on-scroll
      >
        <v-row
          no-gutters
          class="justify-center"
        >
          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.majorId"
                  dense
                  :items="montaTree.major"
                  item-value="id"
                  item-text="name"
                  label="رشته"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.levelId"
                  dense
                  :items="montaTree.level"
                  item-value="id"
                  item-text="name"
                  label="مقطع"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.gradeId"
                  dense
                  :items="montaTree.grade"
                  item-value="id"
                  item-text="name"
                  label="پایه"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.majorGroupId"
                  dense
                  :items="montaTree.major"
                  item-value="id"
                  item-text="name"
                  label="گروه آموزشی"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.moduleGroupId"
                  dense
                  :items="montaTree.moduleGroup"
                  item-value="id"
                  item-text="name"
                  label="گروه درسی"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.moduleId"
                  dense
                  :items="montaTree.module"
                  item-value="id"
                  item-text="name"
                  label="درس"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.difficultyLevelId"
                  dense
                  :items="montaTree.difficultyLevels"
                  item-value="id"
                  item-text="name"
                  label="سختی"
                  clearable
                  rounded
                  solo
                />
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.originId"
                  dense
                  :items="montaTree.origins"
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
                        <v-img :src="data.item.pic" />
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item" />
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.pic">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <!-- eslint-disable vue/no-v-html -->
                        <v-list-item-title v-html="data.item.name" />
                        <!--eslint-enable-->
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col>
                <v-autocomplete
                  v-model="filterQuestions.publishYearId"
                  dense
                  :items="montaTree.publishYears"
                  item-value="id"
                  item-text="name"
                  label="سال انتشار"
                  clearable
                  rounded
                  solo
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            md="3"
            class="pt-1"
          >
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
        <v-card
          v-for="item in filteredQuestions"
          :key="item.id"
          elevation="3"
          class="mr-2 ml-2 mt-2 renderedPanel"
        >
          <v-card-text v-if="item">
            <v-card v-if="item.source_data.question">
              <v-card-text v-html="convertToMarkdownKatex(item.source_data.question)" />
            </v-card>
            <v-row>
              <v-col md="10">
                <v-list dense>
                  <v-list-item-group color="primary">
                    <v-list-item v-if="item.source_data.choiceDescription1">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>1)</span>' + convertToMarkdownKatex(item.source_data.choiceDescription1)"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.choiceDescription2">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>2)</span>' + convertToMarkdownKatex(item.source_data.choiceDescription2)"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.choiceDescription3">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>3)</span>' + convertToMarkdownKatex(item.source_data.choiceDescription3)"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item v-if="item.source_data.choiceDescription4">
                      <v-list-item-content>
                        <v-list-item-title>
                          <!-- eslint-disable vue/no-v-html -->
                          <div
                            class="renderedText"
                            v-html="'<span>4)</span>' + convertToMarkdownKatex(item.source_data.choiceDescription4)"
                          />
                          <!--eslint-enable-->
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col md="2">
                <v-list dense>
                  <v-list-item-group color="primary">
                    <v-list-item
                      v-for="(originItem, originIndex) in item.source_data.origins.questionOriginList"
                      :key="'originIndex_'+originIndex"
                    >
                      <v-list-item-content>
                        <v-list-item-title v-if="originItem.origin">
                          <v-avatar>
                            <img
                              :src="originItem.origin.pic"
                              alt="origin.pic"
                            >
                          </v-avatar>
                          {{ originItem.origin.name }}
                        </v-list-item-title>
                        <v-list-item-content
                          v-if="originItem.publishYear"
                          v-html="originItem.publishYear.title"
                        />
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
                            />
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
            <v-expansion-panels
              v-if="true"
              v-model="expanModel"
            >
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
          <v-card-actions
            v-if="item"
            color="deep-purple darken-1"
          >
            <v-list dense>
              <v-list-item
                v-for="(topic, i) in item.source_data.topicList"
                :key="i"
              >
                <v-list-item-content>
                  <span>
                    <v-chip
                      v-if="topic.module && topic.module.grade && topic.module.grade.level"
                      dark
                      color="purple darken-4"
                    >
                      {{ topic.module.grade.level.name }}
                    </v-chip>
                    <v-chip
                      v-if="topic.module && topic.module.grade"
                      dark
                      color="purple darken-4"
                    >
                      {{ topic.module.grade.name }}
                    </v-chip>
                    <v-chip
                      v-if="topic.module && topic.module.majors"
                      dark
                      color="purple darken-3"
                    >
                      <span
                        v-for="(major, j) in topic.module.majors"
                        :key="'item_'+item.id+'major_'+j"
                      >{{ major.name }}</span>
                    </v-chip>
                    <v-chip
                      v-if="topic.module && topic.module.moduleGroup"
                      dark
                      color="purple darken-2"
                    >
                      {{ topic.module.moduleGroup.name }}
                    </v-chip>
                    <v-chip
                      v-if="topic.module"
                      dark
                      color="purple darken-1"
                    >
                      {{ topic.module.name }}
                    </v-chip>
                    <topic :topic="topic" />
                  </span>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-actions>
        </v-card>
      </div>


      <scroll-loader
        :key="lastLoadTime"
        :loader-method="getQuestions"
        :loader-disable="disableLoadingList"
      >
        کمی صبر کنید...
      </scroll-loader>
      <v-overlay :value="loadingPage">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-overlay>
    </v-col>
  </v-row>
</template>

<script>
  import Vue from 'vue'
  import ScrollLoader from 'vue-scroll-loader'
  import axios from 'axios'
  import {mixinMarkdownAndKatex} from '@/mixin/Mixins'
  import TurndownService from 'turndown/lib/turndown.browser.umd'
  import topic from '@/components/Question/topic'
  import Assistant from "@/plugins/assistant";
  import API_ADDRESS from "@/api/Addresses";
  import $ from "jquery";
  Vue.use(ScrollLoader);

  export default {
    name: 'Index',
    components: {
      // InfiniteLoading,
      topic
    },
    mixins: [mixinMarkdownAndKatex],
    data() {
      return {
          montaTree: null,
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
    computed: {

    },
      created() {
      let that = this
          // axios.get('https://cdn.alaatv.com/upload/knowledgeTree.json')
          // .then((response) => {
          //     console.Log(response.data, 'respones')
          //     this.montaTree = response.data
          // })

          $.ajax({
                  type: 'GET',
                  url: 'https://cdn.alaatv.com/upload/knowledgeTree.json',
                  accept: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (response) {
                        console.log('respones', response)
                    that.montaTree = response
                  },
                  error: function () {
                      // Assistant.reportErrors({location: 'GetQuestionsOfExam', message: "can't get exam file", data: {jqXHR, textStatus, errorThrown}})
                      // Assistant.handleAxiosError("can't get exam file")
                      // reject({jqXHR, textStatus, errorThrown})
                  }
              }
          );
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

      convertPoem(htmlString) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString;
        // var doc = new DOMParser().parseFromString(htmlString, "text/xml");
        // this.innerHTML = doc.innerHTML
        // let tables = doc.querySelectorAll('table')
        let tables = wrapper.querySelectorAll('table.layoutPoem')
        // let tables = this.$refs.table.querySelectorAll('table')
        tables.forEach((item) => {
          let markdownTable = ''
          let rows = item.querySelectorAll('tr')

          // table head
          rows.forEach(row => {
            let poemCellLeft = row.querySelectorAll('td.poemCellLeft')[0]
            let poemCellRight = row.querySelectorAll('td.poemCellRight')[0]
            markdownTable += '::: beit ' + poemCellLeft.innerHTML.replace(/<br>/g,'') + '--*mesra*--' + poemCellRight.innerHTML.replace(/<br>/g,'') + ' \n' +
                '::: \n'
          })

          var tableWrapper = document.createElement('div');
          tableWrapper.innerHTML = markdownTable;

          item.outerHTML = tableWrapper.innerHTML
        })

        return wrapper.innerHTML
      },
      convertTables(htmlString) {
        htmlString = this.convertPoem(htmlString)
        var wrapper = document.createElement('div');
        wrapper.innerHTML = htmlString;
        // var doc = new DOMParser().parseFromString(htmlString, "text/xml");
        // this.innerHTML = doc.innerHTML
        // let tables = doc.querySelectorAll('table')
        let tables = wrapper.querySelectorAll('table')
        // let tables = this.$refs.table.querySelectorAll('table')
        tables.forEach(item => {
          let markdownTable = ''
          let headRows = []
          if (item.tHead)
          {
            headRows = item.tHead.rows
            // headRows = item.querySelectorAll('thead tr')
          } else if (item.querySelectorAll('tr th').length > 0)
          {
            let rows = item.querySelectorAll('tr')
            rows.forEach(row => {
              if (row.querySelectorAll('th').length > 0)
              {
                headRows.push(row)
              }
            })
            // headRows = item.querySelectorAll('tr th')[0].parentNode.cells
          }
          let bodyRows = []
          // if (item.tBodies && item.tBodies[0]) {
          //   bodyRows = item.tBodies[0].rows
          //   // bodyRows = item.querySelectorAll('tbody tr')
          // } else
          if (item.querySelectorAll('tr td').length > 0)
          {
            let rows = item.querySelectorAll('tr')
            rows.forEach(row => {
              if (row.querySelectorAll('td').length > 0)
              {
                bodyRows.push(row)
              }
            })
            // headRows = item.querySelectorAll('tr th')[0].parentNode.cells
          }

          // table head
          let maxTheadCellCount = 0
          headRows.forEach(row => {
            let theadCellCount = 0
            let cells = row.querySelectorAll('th')
            cells.forEach(cell => {
              markdownTable += '|' + this.htmlToMarkdown(cell.innerHTML)
              theadCellCount++
            })
            if (theadCellCount > maxTheadCellCount)
            {
              maxTheadCellCount = theadCellCount
            }
            markdownTable += '|' + '<br>'
          })
          for (let i = 0; i < maxTheadCellCount; i++)
          {
            markdownTable += '|:-------------:'
          }
          markdownTable += '|' + '<br>'
          // table body
          bodyRows.forEach(row => {
            let cells = row.cells
            cells.forEach(cell => {
              markdownTable += '|' + this.htmlToMarkdown(cell.innerHTML)
            })
            markdownTable += '|' + '<br>'
          })

          var tableWrapper = document.createElement('div');
          tableWrapper.innerHTML = markdownTable;

          item.outerHTML = tableWrapper.innerHTML
        })

        return wrapper.innerHTML
      },
      htmlToMarkdown(htmlString) {
        TurndownService.prototype.escape = function (string) {
          let escapes = [
            [
              /\s\$/g,
              '$'
            ],
            [
              /\$\s/g,
              '$'
            ],
            [
              /\{align\*\}/g,
              '{cases}'
            ],
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

        function repeat (character, count) {
          return Array(count + 1).join(character)
        }

        function cleanAttribute (attribute) {
          return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : ''
        }

        var rules = {};

        rules.paragraph = {
          filter: 'p',

          replacement: function (content) {
            return '\n\n' + content + '\n\n'
          }
        };

        rules.lineBreak = {
          filter: 'br',

          replacement: function (content, node, options) {
            return options.br + '\n'
          }
        };

        rules.heading = {
          filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

          replacement: function (content, node, options) {
            var hLevel = Number(node.nodeName.charAt(1));

            if (options.headingStyle === 'setext' && hLevel < 3) {
              var underline = repeat((hLevel === 1 ? '=' : '-'), content.length);
              return (
                  '\n\n' + content + '\n' + underline + '\n\n'
              )
            } else {
              return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
            }
          }
        };

        rules.blockquote = {
          filter: 'blockquote',

          replacement: function (content) {
            content = content.replace(/^\n+|\n+$/g, '');
            content = content.replace(/^/gm, '> ');
            return '\n\n' + content + '\n\n'
          }
        };

        rules.list = {
          filter: ['ul', 'ol'],

          replacement: function (content, node) {
            var parent = node.parentNode;
            if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
              return '\n' + content
            } else {
              return '\n\n' + content + '\n\n'
            }
          }
        };

        rules.listItem = {
          filter: 'li',

          replacement: function (content, node, options) {
            content = content
                .replace(/^\n+/, '') // remove leading newlines
                .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
                .replace(/\n/gm, '\n    '); // indent
            var prefix = options.bulletListMarker + '   ';
            var parent = node.parentNode;
            if (parent.nodeName === 'OL') {
              var start = parent.getAttribute('start');
              var index = Array.prototype.indexOf.call(parent.children, node);
              prefix = (start ? Number(start) + index : index + 1) + '.  ';
            }
            return (
                prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
            )
          }
        };

        rules.indentedCodeBlock = {
          filter: function (node, options) {
            return (
                options.codeBlockStyle === 'indented' &&
                node.nodeName === 'PRE' &&
                node.firstChild &&
                node.firstChild.nodeName === 'CODE'
            )
          },

          replacement: function (content, node) {
            return (
                '\n\n    ' +
                node.firstChild.textContent.replace(/\n/g, '\n    ') +
                '\n\n'
            )
          }
        };

        rules.fencedCodeBlock = {
          filter: function (node, options) {
            return (
                options.codeBlockStyle === 'fenced' &&
                node.nodeName === 'PRE' &&
                node.firstChild &&
                node.firstChild.nodeName === 'CODE'
            )
          },

          replacement: function (content, node, options) {
            var className = node.firstChild.getAttribute('class') || '';
            var language = (className.match(/language-(\S+)/) || [null, ''])[1];
            var code = node.firstChild.textContent;

            var fenceChar = options.fence.charAt(0);
            var fenceSize = 3;
            var fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm');

            var match;
            while ((match = fenceInCodeRegex.exec(code))) {
              if (match[0].length >= fenceSize) {
                fenceSize = match[0].length + 1;
              }
            }

            var fence = repeat(fenceChar, fenceSize);

            return (
                '\n\n' + fence + language + '\n' +
                code.replace(/\n$/, '') +
                '\n' + fence + '\n\n'
            )
          }
        };

        rules.horizontalRule = {
          filter: 'hr',

          replacement: function (content, node, options) {
            return '\n\n' + options.hr + '\n\n'
          }
        };

        rules.inlineLink = {
          filter: function (node, options) {
            return (
                options.linkStyle === 'inlined' &&
                node.nodeName === 'A' &&
                node.getAttribute('href')
            )
          },

          replacement: function (content, node) {
            var href = node.getAttribute('href');
            var title = cleanAttribute(node.getAttribute('title'));
            if (title) title = ' "' + title + '"';
            return '[' + content + '](' + href + title + ')'
          }
        };

        rules.referenceLink = {
          filter: function (node, options) {
            return (
                options.linkStyle === 'referenced' &&
                node.nodeName === 'A' &&
                node.getAttribute('href')
            )
          },

          replacement: function (content, node, options) {
            var href = node.getAttribute('href');
            var title = cleanAttribute(node.getAttribute('title'));
            if (title) title = ' "' + title + '"';
            var replacement;
            var reference;

            switch (options.linkReferenceStyle) {
              case 'collapsed':
                replacement = '[' + content + '][]';
                reference = '[' + content + ']: ' + href + title;
                break
              case 'shortcut':
                replacement = '[' + content + ']';
                reference = '[' + content + ']: ' + href + title;
                break
              default:
                var id = this.references.length + 1;
                replacement = '[' + content + '][' + id + ']';
                reference = '[' + id + ']: ' + href + title;
            }

            this.references.push(reference);
            return replacement
          },

          references: [],

          append: function () {
            var references = '';
            if (this.references.length) {
              references = '\n\n' + this.references.join('\n') + '\n\n';
              this.references = []; // Reset references
            }
            return references
          }
        };

        rules.emphasis = {
          filter: ['em', 'i'],

          replacement: function (content, node, options) {
            if (!content.trim()) return ''
            return options.emDelimiter + content + options.emDelimiter
          }
        };

        rules.strong = {
          filter: ['strong', 'b'],

          replacement: function (content, node, options) {
            if (!content.trim()) return ''
            return options.strongDelimiter + content + options.strongDelimiter
          }
        };

        rules.code = {
          filter: function (node) {
            var hasSiblings = node.previousSibling || node.nextSibling;
            var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;

            return node.nodeName === 'CODE' && !isCodeBlock
          },

          replacement: function (content) {
            if (!content.trim()) return ''

            var delimiter = '`';
            var leadingSpace = '';
            var trailingSpace = '';
            var matches = content.match(/`+/gm);
            if (matches) {
              if (/^`/.test(content)) leadingSpace = ' ';
              if (/`$/.test(content)) trailingSpace = ' ';
              while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
            }

            return delimiter + leadingSpace + content + trailingSpace + delimiter
          }
        };

        rules.image = {
          filter: 'img',

          replacement: function (content, node) {
            var alt = cleanAttribute(node.getAttribute('alt'));
            var src = node.getAttribute('src') || '';
            var title = cleanAttribute(node.getAttribute('title'));
            var titlePart = title ? ' "' + title + '"' : '';
            return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
          }
        };

        // create an instance of Turndown service
        const turndownService = new TurndownService({
          rules: rules,
          headingStyle: 'setext',
          hr: '* * *',
          bulletListMarker: '*',
          codeBlockStyle: 'indented',
          fence: '```',
          emDelimiter: '_',
          strongDelimiter: '**',
          linkStyle: 'inlined',
          linkReferenceStyle: 'full',
          br: '',
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
        return turndownService.turndown(htmlString)
      },
      convertToMarkdownKatex (string) {
        if (!string) {
          return string
        }
        string = this.convertTables(string)

        string = string.replace(/\n/g,'<br>')
        const markdown = this.htmlToMarkdown(string)
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
