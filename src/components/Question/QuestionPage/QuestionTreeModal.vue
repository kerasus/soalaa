<template>
  <q-dialog
    v-model="modal"
  >
  <q-card class="tree-card">
    <div class="fit row wrap">
      <div class="choose-tree-box question-details col-6">
          <div class="details-container-2 default-details-container">
            <div class="detail-box" style="padding-right:0;">
              <div class="detail-box-title" style="padding-bottom: 9px;" >گروه درس</div>
              <q-select
                filled
                dense
                dropdown-icon="isax:arrow-down-1"
                v-model="group"
                option-label="title"
                :options="groupsList"
                @update:model-value="groupSelected"
              />
            </div>
            <div class="detail-box">
              <div class="detail-box-title">نام درس</div>
              <q-select
                filled
                dense
                dropdown-icon="isax:arrow-down-1"
                v-model="lesson"
                option-label="title"
                :options="lessonsList"
                :disable="!doesHaveLessons"
                @update:model-value="lessonSelected"
              />
            </div>
            <div class="question-tree">
              <tree
                @ticked="updateNodes"
                ref="tree"
                tick-strategy="strict"
                :get-node-by-id="getNodeById"
                @lazy-loaded="syncAllCheckedIds"
              />
            </div>
          </div>
        </div>
      <div class="tree-result-box question-details col-6 ">
        <div class="details-container-2 default-details-container ">
          <div class="detail-box" style="padding-right:0;">
            <div class="box-btn-title flex justify-between">
              <div class="detail-box-title">انتخاب ها</div>
              <q-btn
                class="delete-all-btn"
                flat
                label="حذف همه"
                color="primary"
                @click="deleteAllNodes"
              />
            </div>
            <div class="tree-chips-box">
              <q-chip
                v-for="item in currentTreeNode"
                :key="item"
                class="tree-chips"
                icon-remove="mdi-close"
                removable
                @remove="removeNode(item)"
              >
                {{ item.title }}
              </q-chip>
            </div>
          </div>
        </div>
        <div class="close-btn-box text-left" >
          <q-btn
            class="close-btn"
            label="بستن"
            color="primary"
            v-close-popup
          />
        </div>
      </div>
    </div>
  </q-card>
  </q-dialog>
</template>
<script>

import Tree from 'components/Tree/Tree'
import mixinTree from 'src/mixin/Tree'

export default {
  name: 'QuestionTreeModal',
  components: {
    Tree
  },
  mixins: [
    mixinTree
  ],
  props: {
    lessonsList: {
      type: Array,
      default () {
        return []
      }
    },
    groupsList: {
      type: Array,
      default () {
        return []
      }
    },
    dialogValue: {
      type: Boolean
    },
    subjectsField: {
      type: Object
    }
  },
  emits: [
    'groupSelected',
    'lessonSelected',
    'update:dialogValue',
    'update:subjectsField'
  ],
  data () {
    return {
      lesson: '',
      group: '',
      allNodes: [],
      allNodesIds: [],
      selectedNodesIDs: [],
      loading: false,
      newName: '',
      newOrder: 1,
      selectedNode: {},
      editDialog: false,
      newNode: {},
      currentTreeNode: [],
      treeHasChanged: false
    }
  },
  created () {},
  updated () {},
  computed: {
    doesHaveLessons () {
      return !!(this.lessonsList && this.lessonsList.length > 0)
    },
    modal: {
      get () {
        return this.dialogValue
      },
      set (value) {
        this.$emit('update:dialogValue', value)
      }
    },
    chosenSubjects: {
      get () {
        return this.subjectsField
      },
      set (value) {
        this.$emit('update:subjectsField', value)
      }
    }
  },
  mounted () {
  },
  methods: {
    updateNodes (values) {
      this.currentTreeNode = values
      this.selectedNodesIDs = values.map(item => item.id)
    },
    removeNode (item) {
      this.setTickedMode('tree', item.id, false)
    },
    removeAllNodes () {
      this.setTickedMode('tree', this.selectedNodesIDs, false)
    },
    deleteAllNodes () {
      this.removeAllNodes()
    },
    groupSelected (item) {
      this.updateChosenSubjects()
      this.$emit('groupSelected', item)
      this.lesson = ''
    },
    lessonSelected (lesson) {
      this.selectWantedTree(lesson)
      this.$emit('lessonSelected', lesson)
      this.showTreeModalNode(lesson)
    },
    showTreeModalNode (item) {
      this.showTree('tree', this.getNode(item.id))
        .then(() => {})
        .catch(err => {
          console.log(err)
        })
    },
    selectWantedTree (lesson) {
      if (this.chosenSubjects[lesson.id] && this.chosenSubjects[lesson.id].nodes) {
        this.switchToSelectedTree(lesson.id)
        return
      }
      this.createNewDataTree(lesson.id)
    },
    createNewDataTree (lessonId) {
      this.chosenSubjects[lessonId] = {}
      this.chosenSubjects[lessonId].nodes = []
    },
    switchToSelectedTree (lessonId) {
      this.currentTreeNode = this.chosenSubjects[lessonId].nodes
    },
    updateChosenSubjects () {
      if (this.lesson) {
        this.chosenSubjects[this.lesson.id].nodes = this.currentTreeNode
      }
    },
    syncAllCheckedIds () {
      if (this.lesson) {
        const selectedNodesIds = this.chosenSubjects[this.lesson.id].nodes.map(item => item.id)
        // this.chosenSubjects.forEach(item => {
        //   selectedNodesIds.push(item.id)
        // })
        if (selectedNodesIds.length > 0) {
          this.$refs.tree.setNodesTicked(selectedNodesIds, true)
        }
      }
    }
  },
  watch: {
    modal (newVal) {
      if (!newVal) {
        this.updateChosenSubjects()
        this.treeHasChanged = false
        return
      }
      if (this.lesson) {
        this.showTreeModalNode(this.lesson)
      }
    },
    lesson (newVal) {
      if (newVal && newVal !== '') {
        this.treeHasChanged = true
        this.updateChosenSubjects()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.close-btn-box {
  padding-top: 30px;
  .close-btn {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    background: #9690E4;
    border-radius: 10px;
    width: 96px;
    height: 40px;
    margin: auto 0 auto auto;
  }
}
.q-card {
  min-width: 830px;
  height: 580px;
  background: #FFFFFF;
  border-radius: 15px;
  padding: 30px;
}
.question-details {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
  .tree-chips-box {
    height: 412px;
    background: #F4F5F6;
    border-radius: 10px;
    padding: 16px;
    .tree-chips {
      background: #FFFFFF;
      margin-right: 10px;
    }
  }
  .question-tree {
    height: 296px;
    overflow-x: scroll;
    margin-top: 2px;
  }
  .default-details-container {
    .detail-box {
      margin-top: 10px;
      .detail-box-title, .delete-all-btn {
        margin-bottom: 5px;
      }
    }
  }
  .details-container-1 {
    .detail-box {
      padding-right: 12px #{"/* rtl:ignore */"};
      padding-left: 12px #{"/* rtl:ignore */"};
    }
    .detail-box-first {
      padding-right: 0px #{"/* rtl:ignore */"};
    }
    .detail-box-last {
      padding-left: 0px #{"/* rtl:ignore */"};
    }
  }
  .default-detail-btn {
    color: #65677F;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
  .details-container-2 {
    .detail-box {
      .input-container {
        .input-box {
          width: 91%;
        }
        .icon-box {
          width: 40px;
          height: 40px;
          background: #FFFFFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 16px  ;
          .question-details-subject-img {
            height: 24px;
            max-width: 24px;
          }
        }
      }
    }
    .detail-box-first {
      padding-right: 0px #{"/* rtl:ignore */"};
    }
    .detail-box-last {
      padding-right: 0px #{"/* rtl:ignore */"};
      width: 200px;
      //margin-right: 132px #{"/* rtl:ignore */"};
    }
    .detail-box-last-of-row {
      padding-left: 0px #{"/* rtl:ignore */"};
      margin-top: 43px;
      text-align: end;
      display: flex;
      align-items: center;
      justify-content: center;
      .draft-btn {
        background: #FFFFFF;
        margin-left: 16px #{"/* rtl:ignore */"};
        font-weight: normal;
        color: #23263B;
      }
      .save-btn {
        background: #9690E4;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
@media screen and (min-width: 1240px) {
  .choose-tree-box {
    padding-right: 15px;
  }
  .tree-result-box {
    padding-left: 15px;
  }
}
</style>
<style lang="scss">
.q-dialog {
  .q-dialog__inner--minimized > div {
    max-width: none;
  }
}
.tree-card {
  .question-details {
    .default-details-container {
      .detail-box {
        .q-field {
          background: #FFFFFF;
          border-radius: 10px;
          line-height: 24px;
          height: 40px;
          min-height: 40px;
          .q-field__marginal {
            height: 40px;
          }
          .q-field__inner {
            padding-right: 0 !important;
            padding-left: 0 !important;
          }
        }
        .q-field--auto-height .q-field__native {
          min-height: 40px;
          color: #65677F;
        }
        .q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
          min-height: 40px;
          color: #65677F;
        }
        .q-field__control::before, .q-field__control::after {
          display: none;
        }
        .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
          color: #65677F;
        }
      }
    }
  }
}
.q-menu {
  // I'm in charge of this one and did this on purpose, if you need to change this please let me know.TU
  background: #FFFFFF;
  border-radius: 10px;
}
</style>
