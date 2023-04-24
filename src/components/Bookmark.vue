<template>
  <q-btn class="bookmark-btn"
         rounded
         :flat="!color"
         :color="color"
         :loading="loading"
         :icon="isFavored ? 'isax:bookmark5' : 'isax:bookmark4'"
         @click="bookmark">
    <q-tooltip anchor="top middle"
               self="bottom middle"
               :offset="[10, 10]">
      نشان کردن
    </q-tooltip>
    <!--    <svg :class="isFavored ? 'hide' : ''"-->
    <!--         class="btnFavorite-off"-->
    <!--         width="24"-->
    <!--         height="24"-->
    <!--         viewBox="0 0 24 24"-->
    <!--         fill="none"-->
    <!--         xmlns="http://www.w3.org/2000/svg">-->
    <!--      <path d="M15.4162 2C18.678 2 20.3089 3.6472 20.3089 6.94159V18.4394C20.3089 21.6848 18.0093 22.9406 15.1879 21.2445L13.0351 19.9398C12.5459 19.6462 11.763 19.6462 11.2738 19.9398L9.12099 21.2445C6.29955 22.9406 4 21.6848 4 18.4394V6.94159C4 3.6472 5.63089 2 8.89267 2H15.4162Z"-->
    <!--            stroke="#292D32"-->
    <!--            stroke-width="1.5"-->
    <!--            stroke-linecap="round"-->
    <!--            stroke-linejoin="round" />-->
    <!--    </svg>-->
    <!--    <svg class="btnFavorite-on"-->
    <!--         :class="isFavored ? '' : 'hide'"-->
    <!--         width="24"-->
    <!--         height="24"-->
    <!--         viewBox="0 0 24 24"-->
    <!--         fill="none"-->
    <!--         xmlns="http://www.w3.org/2000/svg">-->
    <!--      <path d="M15.4162 2C18.678 2 20.3089 3.6472 20.3089 6.94159V18.4394C20.3089 21.6848 18.0093 22.9406 15.1879 21.2445L13.0351 19.9398C12.5459 19.6462 11.763 19.6462 11.2738 19.9398L9.12099 21.2445C6.29955 22.9406 4 21.6848 4 18.4394V6.94159C4 3.6472 5.63089 2 8.89267 2H15.4162Z"-->
    <!--            fill="#292D32"-->
    <!--            stroke="#292D32"-->
    <!--            stroke-width="1.5"-->
    <!--            stroke-linecap="round"-->
    <!--            stroke-linejoin="round" />-->
    <!--    </svg>-->
    <template v-slot:loading>
      <q-spinner color="primary" />
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'Bookmark',
  props: {
    isFavored: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    color: {
      default: undefined,
      type: String
    }
  },
  emits: [
    'update:value',
    'clicked'
  ],
  data () {
    return {}
  },
  computed: {
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    bookmark () {
      this.$emit('clicked')
      if (!this.isUserLogin) {
        this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params })
        this.$store.commit('AppLayout/updateLoginDialog', true)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.bookmark-btn {
  z-index: 1000;
  padding: 5px;
  margin: 5px;
}
.hide{
  display: none;
}
.btnFavorite-off {
  width: 20px;
  height: 20px;
}

</style>
<style lang="scss"></style>
