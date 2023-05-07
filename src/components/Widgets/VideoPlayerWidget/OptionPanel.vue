<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="input-container q-pt-md">
          <div class="outsideLabel">poster</div>
          <q-input v-model="localOptions.poster"
                   label="poster" />
        </div>
        <div class="input-container q-py-md">
          <div>نوع سورس ویدیو را انتخاب کنید:</div>
          <q-radio v-model="srcType"
                   val="hls"
                   class="q-mr-md"
                   label="hls" />
          <q-radio v-model="srcType"
                   val="singleQuality"
                   class="q-mr-md"
                   label="تک کیفیت" />
          <q-radio v-model="srcType"
                   val="multipleQuality"
                   class="q-mr-md"
                   label="چند کیفیت" />
        </div>
        <div class="input-container">
          <div v-if="srcType && srcType === 'hls'">
            <div class="outsideLabel">hls</div>
            <q-input v-model="localOptions.url"
                     label="poster" />
          </div>
          <div v-if="srcType && srcType === 'singleQuality'">
            <div class="outsideLabel">تک کیفیت</div>
            <q-input v-model="localOptions.url"
                     label="تک کیفیت" />
          </div>
          <div v-if="srcType && srcType === 'multipleQuality'">
            <div class="input-container q-pt-md">
              <div class="outsideLabel">سورس کیفیت عالی</div>
              <q-input v-model="localOptions.src[0]" />
            </div>
            <div class="input-container q-pt-md">
              <div class="outsideLabel">سورس کیفیت خوب</div>
              <q-input v-model="localOptions.src[1]" />
            </div>
            <div class="input-container q-pt-md">
              <div class="outsideLabel">سورس کیفیت متوسط</div>
              <q-input v-model="localOptions.src[2]" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      srcType: ''
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    },
    srcType (newVal) {
      if (newVal === 'multipleQuality') {
        this.localOptions.src = ['', '', '']
      }
    }
  }
})
</script>
