<template>
  <div
    class="infoCard infoText"
  >
    <div class="infoHeight">
      <div class="infoCols">
        نام و نام خانوادگی :
        {{ user.first_name }}
        {{ user.last_name }}
      </div>
      <div class="infoCols">
        رشته :
        {{ user.major.title }}
      </div>
      <div class="infoCols">
        مقطع :
        {{ user.grade.title }}
      </div>
      <div
        v-if="user.province"
        class="infoCols"
      >
        استان :
        {{ user.province.title }}
      </div>
      <div
        v-if="user.city"
        class=" infoCols"
      >
        شهر :
        {{ user.city.title }}
      </div>
      <div
        v-if="user.school"
        class=" infoCols"
      >
        مدرسه :
        {{ user.school }}
      </div>
    </div>
  </div>
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
        display: flex;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        padding-right: 12px;
        padding-left: 12px;
    }
    .infoText{
        white-space: nowrap;
        line-height: 34px;
        margin-top: -9px;
        //text-align: right #{"/* rtl:ignore */"};
        font-family: IRANSans,sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102,102,102,1);
        background-color: #fff;
    }
</style>
