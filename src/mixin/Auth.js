import { User } from 'src/models/User'

const mixinAuth = {
  data: () => {
    return {
      user: new User(),
      isUserLogin: false
    }
  },
  computed: {
    // user: {
    //   get () {
    //     return this.$store.getters['Auth/user']
    //   },
    // ToDo: check for setter
    //   set (newInfo) {
    //     this.$store.commit('Auth/updateUser', newInfo)
    //   }
    // }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    async getUserData () {
      const response = await this.$apiGateway.user.showUser()
      this.$store.commit('Auth/updateUser', response.data.data)
    }
  }
}

export default mixinAuth
