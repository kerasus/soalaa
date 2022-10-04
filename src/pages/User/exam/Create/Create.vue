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
          type: 'toggleButton',
          name: 'type_id',
          responseKey: 'data.exam_type',
          col: 'col-12 exam-type-toggle-button',
          value: '6225f4828044517f52500c02',
          ripple: false,
          color: 'white',
          toggleColor: 'primary',
          toggleTextColor: 'white',
          textColor: 'black',
          label: 'نوع آزمون',
          disable: true,
          options: [{ label: 'عادی', value: '6225f4828044517f52500c02' }, { label: 'جامع', value: 'test' }]
        },
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          label: 'عنوان آزمون',
          placeholder: ' ',
          col: 'col-12 col-md-3 col-sm-6'
        },
        {
          type: 'select',
          name: 'question_type',
          responseKey: 'data.question_type',
          label: 'نوع سوالات',
          placeholder: ' ',
          options: [],
          disable: true,
          col: 'col-12 col-md-3 col-sm-6',
          icon: 'isax:arrow-right-3',
          dropdownIcon: 'isax:arrow-down-1'
        },
        {
          type: 'select',
          name: 'temp.major',
          responseKey: 'data.temp.major',
          label: 'رشته تحصیلی',
          placeholder: ' ',
          col: 'col-12 col-md-3 col-sm-6',
          dropdownIcon: 'isax:arrow-down-1'
        },
        {
          type: 'select',
          name: 'temp.grade',
          responseKey: 'data.temp.grade',
          label: 'پایه تحصیلی',
          placeholder: ' ',
          col: 'col-12 col-md-3 col-sm-6',
          dropdownIcon: 'isax:arrow-down-1'
        }
      ]

    }
  }

}
</script>

<style scoped>

</style>
