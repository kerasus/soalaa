<template>
  <q-card
    class="infoCard infoText align-content-center"
    flat
  >
    <div class="row infoHeight">
      <div class="col infoCols">
        نام و نام خانوادگی :
        {{ user.first_name }}
        {{ user.last_name }}
      </div>
      <div class="col infoCols">
        رشته :
        {{ user.major.title }}
      </div>
      <div class="col infoCols">
        مقطع :
        {{ user.grade.title }}
      </div>
      <div
        v-if="user.province"
        class="col infoCols"
      >
        استان :
        {{ user.province.title }}
      </div>
      <div
        v-if="user.city"
        class="col infoCols"
      >
        شهر :
        {{ user.city.title }}
      </div>
      <div
        v-if="user.school"
        class="col infoCols"
      >
        مدرسه :
        {{ user.school }}
      </div>
    </div>
  </q-card>
</template>

<script>
import { mixinAuth } from 'src/mixin/Mixins'

export default {
  name: 'Info',
  mixins: [mixinAuth]
}
</script>

<style lang="scss" scoped>
    .infoCard {
        border-radius: 15px;
    }
    .infoCols {
        text-align: center ;
        padding: 12px;
    }
    .infoHeight{
        height: 50%;
        margin: inherit;
    }
    .infoText{
        white-space: nowrap;
        line-height: 34px;
        margin-top: -9px;
        text-align: right #{"/* rtl:ignore */"};
        font-family: IRANSans,sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);
    }
</style>
