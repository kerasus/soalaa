<template>
  <div class="page-container">
    <div class="row">
      <div class="col flex justify-between">
        <span>
          برای ثبت سوال جدید میتوانید تصویر صورت سوال را در این صفحه آپلود کنید یا به صورت مستقیم آن ها را تایپ کنید
          <q-btn
            icon-right="isax:info-circle"
            label="بیشتر بخوانید"
            flat
            rounded
            color="primary"
          />
        </span>
        <q-btn
          label="تایپ سوال"
          color="primary"
          class="change-type"
          unelevated
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateText'
}
</script>

<style scoped lang="scss">
.page-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;

  .change-type {
    width: 144px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
