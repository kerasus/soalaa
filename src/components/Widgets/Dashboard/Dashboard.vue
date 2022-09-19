<template>
  <dashboard-header />
  <next-exam />
  <div class="board-container row">
    <upcoming-exams-calender class="col-12 col-md-8" />
    <subscription-status class="col-12 col-md-4" />
  </div>
</template>

<script>
import DashboardHeader from 'components/Widgets/Dashboard/SideComponent/DashboardHeader'
import SubscriptionStatus from 'components/Widgets/Dashboard/SideComponent/SubscriptionStatus'
import UpcomingExamsCalender from 'components/Widgets/Dashboard/SideComponent/UpcomingExamsCalender'
import NextExam from 'components/Widgets/Dashboard/SideComponent/NextExam'
export default {
  name: 'Dashboard',
  components: { NextExam, UpcomingExamsCalender, SubscriptionStatus, DashboardHeader }
}
</script>

<style scoped lang="scss">
.board-container {
margin-top: 30px;
  @media screen and (max-width: 1023px) {
    margin-top: 20px;
    //margin-bottom: 20px;
  }
}
</style>
