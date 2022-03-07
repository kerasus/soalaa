<template>
  <div class="row multiple-choice-Answer">
    <div class="col-6 answer-box">
      <q-card class="col-6 default-questions-card">
      <q-card-section class="default-Qcard-title">
        <q-radio dense v-model="choice" val="choice1" label="گزینه 1" color="primary"/>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row justify-between default-Qcard-box">
          <div class="col-10 default-Qcard-txt">
            شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
          </div>
          <div class="col-2 default-Qcard-img">
            <q-img
              :src="url"
              spinner-color="primary"
              spinner-size="30px"
              style="height: 96px; width: 96px"
            >
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
    </div>
    <div class="col-6 answer-box">
      <q-card class="col-6 default-questions-card">
        <q-card-section class="default-Qcard-title">
          <q-radio dense v-model="choice" val="choice2" label="گزینه 2" color="primary"/>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="row justify-between default-Qcard-box">
            <div class="col-10 default-Qcard-txt">
              شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
            </div>
            <div class="col-2 default-Qcard-img">
              <q-img
                :src="url"
                spinner-color="primary"
                spinner-size="30px"
                style="height: 96px; width: 96px"
              >
              </q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6 answer-box">
      <q-card class="col-6 default-questions-card">
        <q-card-section class="default-Qcard-title">
          <q-radio dense v-model="choice" val="choice3" label="گزینه 3" color="primary"/>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="row justify-between default-Qcard-box">
            <div class="col-10 default-Qcard-txt">
              شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
            </div>
            <div class="col-2 default-Qcard-img">
              <q-img
                :src="url"
                spinner-color="primary"
                spinner-size="30px"
                style="height: 96px; width: 96px"
              >
              </q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6 answer-box">
      <q-card class="col-6 default-questions-card">
        <q-card-section class="default-Qcard-title">
          <q-radio dense v-model="choice" val="choice4" label="گزینه 4" color="primary"/>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="row justify-between default-Qcard-box">
            <div class="col-10 default-Qcard-txt">
              شناخت فراوان جامعه و متخصصان را می طلبد،لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
            </div>
            <div class="col-2 default-Qcard-img">
              <q-img
                :src="url"
                spinner-color="primary"
                spinner-size="30px"
                style="height: 96px; width: 96px"
              >
              </q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MultipleChAnswer',
  data () {
    return {
      url: 'https://placeimg.com/500/300/nature',
      choice: ''
    }
  }
}
</script>
<style scoped lang="scss">
.multiple-choice-Answer {
  :nth-child(2n){
    padding-right: 12px #{"/* rtl:ignore */"};
  }
  :nth-child(2n+1){
    padding-left: 12px #{"/* rtl:ignore */"};
  }
  .answer-box {
    padding-top: 12px;
    padding-bottom: 12px;
    :nth-child(2n){
      padding-right: 0px #{"/* rtl:ignore */"};
    }
    :nth-child(2n+1){
      padding-left: 0px #{"/* rtl:ignore */"};
    }
    .q-separator--horizontal-inset {
      margin-right: 16px #{"/* rtl:ignore */"} !important ;
    }

  }
}
</style>
<style lang="scss">
.multiple-choice-Answer {
  .answer-box {
    .q-radio__inner {
      margin-left: 7px #{"/* rtl:ignore */"} !important;
    }
  }
}
</style>
