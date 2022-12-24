<template>
  <q-card
    flat
    class="showImg-card"
    style="min-height: 100vh;"
  >
    <div class="q-pt-md">
      <div class="row justify-between items-center ">
        <div class="col box-titles">
          <span> فایل های بارگزاری شده</span>
        </div>
        <div class="col text-right"
             style="margin-left: 16px;">
          <q-btn
            flat
            round
            color="grey-8"
            icon="mdi-close"
            @click="closeImgPanel"
          >
          </q-btn>
        </div>
      </div>
    </div>
    <q-card
      flat
      class="q-ma-lg second-card"
    >
      <q-img
        :src="test"
      />
    </q-card>
  </q-card>
</template>

<script>
export default {
  name: 'ShowImg',
  props: {
    test: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      image: ''

    }
  },
  methods: {
    closeImgPanel () {
      this.$emit('closePanel')
    }
  }
}
</script>
<style scoped lang="scss">
.showImg-card{
  .box-titles {
    font-size: 1rem ;
    padding-left: 20px;
  }
}
</style>
