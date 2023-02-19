import { User } from 'src/models/User'

const UserLayoutHeader = {
  data () {
    return {
      headerItems: [
        {
          selected: 'exams',
          title: 'آزمون های سه‌آ',
          to: 'User.Exam.List',
          permission: 'all'
        },
        {
          selected: 'questionBank',
          title: 'بانک سوالا',
          to: 'User.Create.Exam',
          permission: 'all'
        },
        {
          selected: 'questionBank',
          title: 'پنل ادمین',
          to: 'Admin.Exam.Index',
          permission: 'examStore'
        }
        // {
        //   selected: 'soalaMag',
        //   title: 'سوالامگ',
        //   to: ''
        // },
        // {
        //   selected: 'askedQuestions',
        //   title: 'سوالات متداول',
        //   to: ''
        // },
        // {
        //   selected: 'contactUs',
        //   title: 'تماس با ما',
        //   to: ''
        // }
      ]
    }
  },
  computed: {
    user () {
      if (this.$store.getters['Auth/user']) {
        return this.$store.getters['Auth/user']
      }
      return new User()
    },
    showMenuItem () {
      return (item) => {
        return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    },
    isRouteSelected () {
      return (itemName) => {
        return (this.$route.name === itemName)
      }
    }
  }
}

export default UserLayoutHeader
