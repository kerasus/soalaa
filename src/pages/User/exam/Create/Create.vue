<template>
  <div class="create-exam-page">
    <tab-panel
      :exam-info-inputs="examInfoInputs"
    />
  </div>
</template>

<script>
import TabPanel from 'components/CommonComponents/Exam/Create/TabPanel/TabPanel'

export default {
  name: 'Create',
  components: {
    TabPanel
  },
  data () {
    return {
      examInfoInputs: [
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12',
          value: [
            { type: 'separator', label: 'نوع آزمون', separatorType: 'none', col: 'exam-type-separator' },
            {
              type: 'toggleButton',
              name: 'exam_type',
              responseKey: 'data.exam_type',
              col: 'exam-type-toggle-button',
              value: '6225f4828044517f52500c02',
              ripple: false,
              color: 'white',
              toggleColor: 'primary',
              toggleTextColor: 'white',
              textColor: 'black',
              options: [{ label: 'عادی', value: '6225f4828044517f52500c02' }, { label: 'جامع' }]
            },
            { type: 'hidden', name: 'space', col: 'col-md-9 col-sm-6' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'عنوان آزمون', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'input', name: 'title', responseKey: 'data.title', label: '', col: 'col-12', placeholder: ' ' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'نوع سوالات', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'question_type', responseKey: 'data.question_type', options: [{ label: 'konkur', value: '6225f4828044517f52500c04' }, { label: 'psychometric', value: '6225f4828044517f52500c05' }, { label: 'descriptive', value: '6225f4828044517f52500c06' }], col: 'col-12', icon: 'isax:arrow-right-3' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'رشته تحصیلی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'major_type', responseKey: 'data.major_type', col: 'col-12' }
          ]
        },
        {
          type: 'formBuilder',
          name: 'formBuilderCol',
          col: 'col-12 col-md-3 col-sm-6',
          value: [
            { type: 'separator', label: 'پایه تحصیلی', size: '0', separatorType: 'none', col: 'col-12' },
            { type: 'select', name: 'grade_type', responseKey: 'data.grade_type', col: 'col-12' }
          ]
        }
      ]

    }
  }

}
</script>

<style scoped>

</style>
