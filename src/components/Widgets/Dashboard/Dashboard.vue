<template>
  <div class="dashboard-container">
    <div v-if="lastSubscribeLoading"
         class="loading">
      <div class="row">
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="150px" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="150px" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="150px" />
        </div>
      </div>
      <div class="row q-my-lg">
        <div class="col-12">
          <q-skeleton width="100%"
                      height="70px" />
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8 q-pa-sm">
          <q-skeleton width="100%"
                      height="480px" />
        </div>
        <div class="col-12 col-md-4 q-pa-sm">
          <q-skeleton width="100%"
                      height="480px" />
        </div>
      </div>
    </div>
    <div v-else
         class="content-wrapper">
      <div>
        <dashboard-header />
        <next-exam />
        <div class="board-container row">
          <div class="col-12 col-lg-8"
               style="padding-left: 15px;">
            <upcoming-exams-calender :calendarTitle="'آزمون های پیش‌رو'"
                                     :calendarIcon="'isax:calendar-1'" />
          </div>
          <div class="col-12 col-lg-4"
               style="padding-right: 15px;">
            <subscription-status :subscribe="lastSubscribeDate" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardHeader from 'components/Widgets/Dashboard/SideComponent/DashboardHeader'
import SubscriptionStatus from 'components/Widgets/Dashboard/SideComponent/SubscriptionStatus'
import UpcomingExamsCalender from 'components/Widgets/Dashboard/SideComponent/UpcomingExamsCalender'
import NextExam from 'components/Widgets/Dashboard/SideComponent/NextExam'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'Dashboard',
  components: { NextExam, UpcomingExamsCalender, SubscriptionStatus, DashboardHeader },
  data () {
    return {
      lastSubscribeLoading: false,
      lastSubscribeDate: null
    }
  },
  created() {
    this.getLastSubscribe()
  },
  methods: {
    getLastSubscribe () {
      this.lastSubscribeLoading = true
      this.$axios.get(API_ADDRESS.subscription.last)
        .then((response) => {
          this.lastSubscribeLoading = false
          this.lastSubscribeDate = response.data.data.subscribe
        })
        .then(() => {
          this.lastSubscribeLoading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.board-container {
margin: 30px 0;
  @media screen and (max-width: 1023px) {
    margin: 20px 0;
    //margin-bottom: 20px;
  }
}
</style>
