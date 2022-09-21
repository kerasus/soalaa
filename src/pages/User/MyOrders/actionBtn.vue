<template>
  <q-btn icon="isax:rotate-left"
         class="reload-icon bg-white"
         unelevated
         @click="resetData" />
  <q-btn unelevated
         class="filter-btn"
         color="primary"
         padding="1px 23px"
         label="اعمال"
         @click="filterTable" />
</template>

<script>
export default {
  name: 'actionBtn'
}
</script>

<style scoped lang="scss">
.filter-btn{
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.03em;
  color: #FFFFFF;
}
.reload-icon{
  color: #6D708B;
  margin-right: 16px;
}
</style>
