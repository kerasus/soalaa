import { User } from 'src/models/User.js'

const UserLayoutHeader = {
  data () {
    return {
      user: new User(),
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
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    }
  }
}

export default UserLayoutHeader
