<template>
  <q-dialog
    modal-value=""
    @update:model-value="$emit('hi')"
  >
  <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>

export default {
  name: 'QuestionTreeModal',
  data () {
    return {
    }
  },
  created () {
  },
  computed: {

  },
  mounted () {
  },
  methods: {}
  // props: {
  //   questionTreeDialog: {
  //     type: Boolean,
  //     default () {
  //       return false
  //     }
  //   },
  //   modelValue: {
  //     type: Boolean,
  //     default () {
  //       return false
  //     }
  //   }
  // }
}
</script>
<style scoped lang="scss">
</style>
