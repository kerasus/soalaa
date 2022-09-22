<template>
  <dashboard-header />
  <next-exam />
  <div class="board-container row q-col-gutter-sm">
    <div class="col-12 col-lg-8">
      <upcoming-exams-calender :calendarTitle="'آزمون های پیش‌رو'"
                               :calendarIcon="'isax:calendar-1'" />
    </div>
    <div class="col-12 col-lg-4">
      <subscription-status />
    </div>
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
margin: 30px 0;
  @media screen and (max-width: 1023px) {
    margin: 20px 0;
    //margin-bottom: 20px;
  }
}
</style>
