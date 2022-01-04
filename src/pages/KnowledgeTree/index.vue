<template>
  <q-page>
    <q-tree
      :nodes="simple"
      node-key="uid"
      label-key="name"
      @lazy-load="onLazyLoadTree"
    />
  </q-page>
</template>

<script>
import MontaData from 'assets/MontaData'
export default {
  name: 'index',
  data: () => ({
    simple: []
  }),
  created () {
    this.changeTreeDate()
  },
  methods: {
    changeTreeDate () {
      this.simple = []
      // level -> grade -> major -> moduleGroup -> subModuleGroup -> module -> topic
      this.setLevel(this.simple)
      this.setGrade()
      this.setMajor()
      this.setModule()
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
    getTreeFromTopicList (topicList) {
      const tree = []
      topicList.forEach((topic, topicIndex) => {
        if (!topic.parentTopicId) {
          topic.uid = 'topic:' + topic.id
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
      tree.forEach(topicNode => {
        if (topicNode.id === childTopic.parentTopicId) {
          if (!topicNode.children) {
            topicNode.children = []
          }
          childTopic.uid = 'topic:' + childTopic.id
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
      const topicList = this.getTopicList(node.id)
      const tree = this.getTreeFromTopicList(topicList)
      done(tree)
    }
  }
}
</script>

<style scoped>

</style>
