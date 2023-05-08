<template>
  <q-virtual-scroll v-if="localOptions.sliderItems"
                    ref="virtualScroll"
                    v-slot="{ item, index }"
                    :items="localOptions.sliderItems"
                    class="student-scroll-bar"
                    virtual-scroll-horizontal>
    <q-card :key="index"
            class="scroll-item-card">
      <q-img :src="`https://nodes.alaatv.com/upload/landing/110/Rotbeh/${item.code}.png`"
             width="160px"
             height="160px"
             spinner-color="primary"
             class="student-img"
             spinner-size="82px">
        <div class="student-major"
             :class="{'riazi': item.major === 'ریاضی', 'tajrobi': item.major === 'تجربی'}">
          {{ item.major }}
        </div>
      </q-img>
      <q-card-section class="person-name-card-section">
        <div class="student-name ellipsis-2-lines">{{ item.first_name + ' ' + item.last_name }}</div>
      </q-card-section>
      <q-card-section class="person-info-card-section">
        <div class="student-info">
          <div class="rank">
            {{ item.rank }}
          </div>
          <div class="region">
            {{ item.distraction === '1' ? 'منطقه یک' : item.distraction === '2' ? 'منطقه دو' : item.distraction === '3' ? 'منطقه سه' : item.distraction}}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-virtual-scroll>
  <div v-else
       class="loading">
    ...
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'PersonSlider',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        sliderItems: []
      },
      scrollIndex: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$refs.virtualScroll) {
        setInterval(() => {
          this.scrollIndex += 1
          if (this.scrollIndex > this.localOptions.sliderItems.length) {
            this.scrollIndex = 0
          }
          this.$refs.virtualScroll?.scrollTo(this.scrollIndex)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
.scroll-item-card {
  width: 200px;
  height: 320px;
  max-height: 350px;
  border-radius: 20px;
  margin: 0 10px 90px;
  padding: 20px 20px 8px;
  box-shadow: 0 20px 20px 0 rgb(0 0 0 / 5%);
  background-color: #fff;

  .student-img {
    position: relative;
    border-radius: 10px;

    .student-major {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 2;
      color: white;
      font-size: 16px;
      font-weight: bold;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.riazi {
        background: rgba($color: #75b9ea, $alpha: .5);
      }
      &.tajrobi {
        background: rgba($color: #63a869, $alpha: .5);
      }
    }
  }

  .person-name-card-section {
    padding-bottom: 0;
    .student-name {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
      min-height: 40px;
    }
  }

 .person-info-card-section{
  padding-top: 0;
  .student-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .rank {
      font-size: 28px;
      font-weight: 800;
      color: #35427a;
      text-align: center;
    }

    .region {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
  }
 }
}
</style>
