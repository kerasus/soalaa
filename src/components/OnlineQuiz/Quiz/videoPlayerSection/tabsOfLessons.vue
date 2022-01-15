<template>
  <div>
    <div class="q-pa-md">
    <q-card>
      <q-tabs
        v-if="report"
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="Lessons" style="display: none"></q-tab>
      </q-tabs>

      <q-separator></q-separator>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="Lessons" class="q-pa-none">

          <q-splitter
            v-model="splitterModel"
          >

            <template v-slot:before>
              <q-tabs
                v-model="innerTab"
                vertical
                class="text-primary"
              >
                <q-tab
                  v-for="(item, index) in report.sub_category"
                  :key="index"
                  :name="item.sub_category_id"
                  :label="item.sub_category"
                ></q-tab>
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="innerTab"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel
                  v-for="(item, index) in report.sub_category"
                  :key="index"
                  :name="item.sub_category_id"
                >
                  <div class="text-h4 q-mb-md">{{ item.sub_category }}</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div></div>
</template>
<script>
export default {
  name: 'tabsOfLessons',
  props: {
    report: {
      // type : Array,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      tab: 'Lessons',
      innerTab: this.report.sub_category[0],
      splitterModel: 20
    }
  },
  created () {
    console.log('this.report.sub_category', this.report.sub_category[0])
    // this.report.sub_category[0].video_url: Array
  },
  methods: {
    log (n) {
      console.log('this.report', n)
    }
  }
}
</script>
