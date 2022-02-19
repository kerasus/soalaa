<template>
  <q-layout>
  <q-page>
    <q-tree
      :nodes="simple"
      node-key="uid"
      ref="tree"
      label-key="name"
      @lazy-load="onLazyLoadTree"

    >
      <template v-slot:default-header="prop">
        <!--        <q-icon :name="prop.node.icon"></q-icon>-->
        {{ prop.node.name }}
        <q-icon  @click.stop @keypress.stop class="edit-btn" name="edit" @click="openEditMenu(prop.node)" />
      </template>
    </q-tree>
    <q-dialog v-model="editDialog" persistent>
      <q-card class="q-pa-md">
        <q-btn flat icon="close" color="red" v-close-popup @click="editDialog = false"/>
        <q-tabs
          v-model="tab"
          narrow-indicator
          dense
          align="justify"
        >
          <q-tab class="text-purple" name="edit" icon="edit" label="ویرایش" />
          <q-tab class="text-orange" name="addNew" icon="add" label="اضافه کردن گره جدید" />
          <q-tab class="text-red" name="delete" icon="delete" label="حذف" />
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="edit">
            <q-input
              filled
              v-model="newName"
              label="نام جدید"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-btn
              text
              color="green"
              :loading="loading"
              @click="saveClicked()"
            >
              ثبت
            </q-btn>
          </q-tab-panel>

          <q-tab-panel name="addNew">
            <q-input
              filled
              v-model="newName"
              label="نام جدید"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
            />
            <q-btn
              text
              color="green"
              :loading="loading"
              @click="addClicked()"
            >
              اضافه شود
            </q-btn>
          </q-tab-panel>
          <q-tab-panel name="delete">
            <div class="text-subtitle1">آیا از حذف گرۀ " {{ selectedNode.name }}" اطمینان دارید؟</div>
            <q-btn
              color="red"
              :loading="loading"
              @click="deleteNode"
              class="q-mt-md"
            >
              حذف
            </q-btn>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-page>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import MontaData from 'assets/MontaData'

export default defineComponent({
  name: 'PageIndex',
  created () {
    this.changeTreeDate()
  },
  data: () => {
    return {
      simple: [],
      tab: 'edit',
      loading: false,
      vModelSelected: [],
      newName: '',
      selectedNode: {},
      editDialog: false
    }
  },
  methods: {
    openEditMenu (node) {
      this.newName = ''
      this.selectedNode = {
        uid: node.uid,
        name: node.name
      }
      this.editDialog = true
    },
    async deleteNode () {
      const nodeUid = this.selectedNode.uid
      const arr = nodeUid.split('-')
      await arr.pop()
      if (arr.length > 0) {
        const parentUid = arr.join('-')
        const getParentNode = await this.$refs.tree.getNodeByKey(parentUid)
        console.log('main', this.simple, nodeUid)
        console.log('parentUid :', parentUid)
        console.log('nodeUid :', nodeUid)
        console.log('getParentNode :', getParentNode)
        if (getParentNode) {
          getParentNode.children = getParentNode.children.filter(node => node.uid !== nodeUid)
        }
        this.editDialog = false
      } else {
        console.log(this.simple, nodeUid)
        this.simple.filter(node => node.uid !== nodeUid)
      }
      this.editDialog = false
    },
    async addClicked () {
      const uid = this.selectedNode.uid
      const getNode = this.$refs.tree.getNodeByKey(uid)
      // console.log('get node :', getNode)
      const arr = uid.split(':')
      await arr.pop()
      const newId = Date.now()
      arr.push(newId)
      const newUid = arr.join(':')
      await getNode.children.unshift({
        id: newId,
        uid: newUid,
        type: 'level',
        icon: 'school',
        name: this.newName,
        children: []
      })
      this.editDialog = false
    },
    async saveClicked () {
      this.loading = true
      await this.fakeReq()
      const node = this.$refs.tree.getNodeByKey(this.selectedNode.uid)
      node.name = this.newName
      this.loading = false
      this.editDialog = false
    },
    fakeReq () {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    },
    async changeTreeDate () {
      this.simple = []
      // level -> grade -> major -> moduleGroup -> subModuleGroup -> module -> topic
      await this.setLevel(this.simple)
      await this.setGrade()
      await this.setMajor()
      await this.setModule()
      console.log('finish')
      // this.setAllTopics()
    },
    setLevel (levelLevel) {
      MontaData.level.forEach(item => {
        levelLevel.push({
          id: item.id,
          uid: this.getUid(item.id),
          type: 'level',
          icon: 'school',
          name: item.name,
          children: []
        })
      })
    },
    setGrade () {
      this.simple.forEach(level => {
        MontaData.grade.forEach(grade => {
          if (grade.levelId === level.id) {
            level.children.push({
              id: grade.id,
              uid: this.getUid(level.id, grade.id),
              type: 'grade',
              icon: 'square_foot',
              name: grade.name,
              levelId: grade.levelId,
              children: []
            })
          }
        })
      })
    },
    setMajor () {
      const majors = [
        {
          id: 60,
          name: 'رياضي'
        },
        {
          id: 61,
          name: 'تجربي'
        },
        {
          id: 62,
          name: 'انساني'
        }
      ]
      const dabestan1Majors = [{
        id: 52,
        name: 'دبستان سه سال اول'
      }]
      const dabestan2Majors = [{
        id: 53,
        name: 'دبستان سه سال دوم'
      }]
      const dabirestanMajors = [{
        id: 56,
        name: 'دبيرستان سه سال اول'
      }]

      const dabestan1Index = this.simple.findIndex(level => level.id === 10)
      const dabestan2Index = this.simple.findIndex(level => level.id === 20)
      const dabirestanIndex = this.simple.findIndex(level => level.id === 50)
      const levelIndex = this.simple.findIndex(level => level.id === 60)
      const pishdaneshgahiIndex = this.simple.findIndex(level => level.id === 70)

      // دبستان سه سال اول
      const dabestan1Grade1Index = this.simple[dabestan1Index].children.findIndex(grade => grade.id === 1)
      this.simple[dabestan1Index].children[dabestan1Grade1Index].children = this.getMajorsUid(dabestan1Majors, this.simple[dabestan2Index].id, 1)
      const dabestan1Grade2Index = this.simple[dabestan1Index].children.findIndex(grade => grade.id === 2)
      this.simple[dabestan1Index].children[dabestan1Grade2Index].children = this.getMajorsUid(dabestan1Majors, this.simple[dabestan2Index].id, 2)

      // دبستان سه سال دوم
      const dabestan2Grade3Index = this.simple[dabestan2Index].children.findIndex(grade => grade.id === 3)
      this.simple[dabestan2Index].children[dabestan2Grade3Index].children = this.getMajorsUid(dabestan2Majors, this.simple[dabestan2Index].id, 3)
      const dabestan1Grade5Index = this.simple[dabestan2Index].children.findIndex(grade => grade.id === 5)
      this.simple[dabestan2Index].children[dabestan1Grade5Index].children = this.getMajorsUid(dabestan2Majors, this.simple[dabestan2Index].id, 5)
      const dabestan1Grade6Index = this.simple[dabestan2Index].children.findIndex(grade => grade.id === 6)
      this.simple[dabestan2Index].children[dabestan1Grade6Index].children = this.getMajorsUid(dabestan2Majors, this.simple[dabestan2Index].id, 6)

      // دبيرستان سه سال اول
      const dabirestan1Grade7Index = this.simple[dabirestanIndex].children.findIndex(grade => grade.id === 7)
      this.simple[dabirestanIndex].children[dabirestan1Grade7Index].children = this.getMajorsUid(dabirestanMajors, this.simple[dabirestanIndex].id, 7)
      const dabirestan1Grade8Index = this.simple[dabirestanIndex].children.findIndex(grade => grade.id === 8)
      this.simple[dabirestanIndex].children[dabirestan1Grade8Index].children = this.getMajorsUid(dabirestanMajors, this.simple[dabirestanIndex].id, 8)
      const dabirestan1Grade9Index = this.simple[dabirestanIndex].children.findIndex(grade => grade.id === 9)
      this.simple[dabirestanIndex].children[dabirestan1Grade9Index].children = this.getMajorsUid(dabirestanMajors, this.simple[dabirestanIndex].id, 9)

      // // پیش دانشگاهی
      const pishdaneshgahiGrade4Index = this.simple[pishdaneshgahiIndex].children.findIndex(grade => grade.id === 4)
      this.simple[pishdaneshgahiIndex].children[pishdaneshgahiGrade4Index].children = this.getMajorsUid(majors, this.simple[pishdaneshgahiIndex].id, 4)

      // 10
      const dahomIndex = this.simple[levelIndex].children.findIndex(grade => grade.id === 10)
      this.simple[levelIndex].children[dahomIndex].children = this.getMajorsUid(majors, this.simple[levelIndex].id, 10)
      // 11
      const yazdahomIndex = this.simple[levelIndex].children.findIndex(grade => grade.id === 11)
      this.simple[levelIndex].children[yazdahomIndex].children = this.getMajorsUid(majors, this.simple[levelIndex].id, 11)
      // 12
      const davazdahomIndex = this.simple[levelIndex].children.findIndex(grade => grade.id === 12)
      this.simple[levelIndex].children[davazdahomIndex].children = this.getMajorsUid(majors, this.simple[levelIndex].id, 12)
    },
    getMajorsUid (majors, levelId, gradeId) {
      const newMajors = JSON.parse(JSON.stringify(majors))
      newMajors.forEach(major => {
        major.uid = this.getUid(levelId, gradeId, major.id)
        major.type = 'major'
        major.icon = 'history_edu'
        major.children = []
      })

      return newMajors
    },
    setModule () {
      this.simple.forEach(level => {
        level.children.forEach(grade => {
          grade.children.forEach(major => {
            const majorModuleGradeList = this.getMajorModuleGradeList(major.id, grade.id)
            majorModuleGradeList.forEach(majorModuleGrade => {
              const module = this.getModule(majorModuleGrade.moduleId)
              if (module) {
                let moduleGroupOfMajorChildren = this.getModuleGroupFromMajorChildren(major.children, module.moduleGroupId)
                const majorHasModuleGroup = !!moduleGroupOfMajorChildren
                if (!majorHasModuleGroup) {
                  const moduleGroup = this.getModuleGroup(module.moduleGroupId)
                  const uid = this.getUid(level.id, grade.id, major.id, moduleGroup.id)
                  const moduleGroupNode = {
                    id: moduleGroup.id,
                    uid: uid,
                    type: 'moduleGroup',
                    icon: 'category',
                    name: moduleGroup.name,
                    children: []
                  }
                  major.children.push(moduleGroupNode)
                  moduleGroupOfMajorChildren = moduleGroupNode
                }
                const subModuleGroupList = this.getSubModuleGroupList(module.moduleGroupId)
                subModuleGroupList.forEach(subModuleGroup => {
                  let subModuleGroupOfModuleGroupChildren = this.getSubModuleGroupFromModuleGroupChildren(moduleGroupOfMajorChildren.children, subModuleGroup.id)
                  const ModuleGroupHasSubModuleGroup = !!subModuleGroupOfModuleGroupChildren
                  if (!ModuleGroupHasSubModuleGroup) {
                    const uid = this.getUid(level.id, grade.id, major.id, moduleGroupOfMajorChildren.id, subModuleGroup.id)
                    const subModuleGroupNode = {
                      id: subModuleGroup.id,
                      uid: uid,
                      type: 'subModuleGroup',
                      icon: 'subdirectory_arrow_left',
                      name: subModuleGroup.name,
                      moduleGroupId: subModuleGroup.moduleGroupId,
                      children: []
                    }
                    moduleGroupOfMajorChildren.children.push(subModuleGroupNode)
                    subModuleGroupOfModuleGroupChildren = subModuleGroupNode
                  }

                  const hasModule = !!subModuleGroupOfModuleGroupChildren.children.find(moduleItem => moduleItem.id === module.id)
                  if (!hasModule) {
                    const uid = this.getUid(level.id, grade.id, major.id, moduleGroupOfMajorChildren.id, subModuleGroup.id, module.id)
                    subModuleGroupOfModuleGroupChildren.children.push({
                      id: module.id,
                      uid: uid,
                      lazy: true,
                      type: 'module',
                      icon: 'menu_book',
                      name: module.name,
                      moduleGroupId: module.moduleGroupId,
                      subModuleGroupId: module.subModuleGroupId,
                      isCommon: module.isCommon,
                      isDisabled: module.isDisabled,
                      hasOnlineContents: module.hasOnlineContents,
                      children: []
                    })
                  }
                })
                // let indexOfModuleGroupOfMajorChildren = this.getIndexOfModuleGroupFromMajorChildren(major.children, module.moduleGroupId)
                // major.children[indexOfModuleGroupOfMajorChildren] = moduleGroupOfMajorChildren
              } else {
                // ToDo: save failed list
              }
            })
          })
        })
      })
    },
    getUid (levelId, gradeId, majorId, moduleGroupId, subModuleGroupId, moduleId) {
      let uid = ''
      if (levelId) {
        uid += 'l:' + levelId
      }
      if (gradeId) {
        uid += '-g:' + gradeId
      }
      if (majorId) {
        uid += '-mj:' + majorId
      }
      if (moduleGroupId) {
        uid += '-mg:' + moduleGroupId
      }
      if (subModuleGroupId) {
        uid += '-sm:' + subModuleGroupId
      }
      if (moduleId) {
        uid += '-mo:' + moduleId
      }

      return uid
    },
    getModuleGroupFromMajorChildren (majorChildren, moduleGroupId) {
      return majorChildren.find(moduleGroup => moduleGroup.id === moduleGroupId)
    },
    getSubModuleGroupFromModuleGroupChildren (moduleGroupChildren, subModuleGroupId) {
      return moduleGroupChildren.find(subModuleGroup => subModuleGroup.id === subModuleGroupId)
    },
    getMajorModuleGradeList (majorId, gradeId) {
      return MontaData.majorModuleGrade.filter(item => item.majorId === majorId && item.grade === gradeId)
    },
    getModule (moduleId) {
      return MontaData.module.find(item => item.id === moduleId)
    },
    getModuleGroup (moduleGroupId) {
      return MontaData.moduleGroup.find(item => item.id === moduleGroupId)
    },
    getSubModuleGroupList (moduleGroupId) {
      return MontaData.subModuleGroup.filter(item => item.moduleGroupId === moduleGroupId)
    },
    setAllTopics () {
      this.simple.forEach(level => {
        level.children.forEach(grade => {
          grade.children.forEach(major => {
            major.children.forEach(moduleGroup => {
              moduleGroup.children.forEach(subModuleGroup => {
                subModuleGroup.children.forEach(module => {
                  const topicList = this.getTopicList(module.id)
                  const tree = this.getTreeFromTopicList(topicList)
                  module.children = tree
                })
              })
            })
          })
        })
      })
    },
    getTopicList (moduleId) {
      return MontaData.topic.filter(item => item.moduleId === moduleId)
    },
    getTreeFromTopicList (topicList, parentUid) {
      const tree = []
      // console.log('topicList getTreeFromTopicList:',topicList)
      topicList.forEach((topic, topicIndex) => {
        if (!topic.parentTopicId) {
          // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1')
          topic.uid = parentUid + '-' + 'topic:' + topic.id
          topic.type = 'topic'
          topic.children = []
          tree.push(topic)
        } else {
          this.addTopicToParent(tree, topic)
        }
      })

      return tree
    },
    addTopicToParent (tree, childTopic) {
      // console.log('addTopicToParent *************************************8', tree)
      tree.forEach(topicNode => {
        if (topicNode.id === childTopic.parentTopicId) {
          if (!topicNode.children) {
            topicNode.children = []
          }
          childTopic.uid = topicNode.uid + '-' + 'topic:' + childTopic.id
          childTopic.type = 'topic'
          childTopic.children = []
          topicNode.children.push(childTopic)
          return true
        } else {
          if (topicNode.children && topicNode.children.length > 0) {
            const result = this.addTopicToParent(topicNode.children, childTopic)
            if (result) {
              return true
            }
          }
        }
      })
      return false
    },
    onLazyLoadTree ({ node, key, done, fail }) {
      // console.log('onLazyLoadTree node :', node)
      const topicList = this.getTopicList(node.id)
      const tree = this.getTreeFromTopicList(topicList, node.uid)
      done(tree)
    }
  }
})
</script>
<style scoped lang="scss">
.edit-btn{
  color: transparent;
  &:hover{
    color: #f18305;
  }
}
.active {
  display: block;
}

.hide {
  display: none;
}
</style>
