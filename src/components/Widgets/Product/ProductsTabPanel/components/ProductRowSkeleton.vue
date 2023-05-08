<template>
  <div v-for="item in skeletons"
       :key="item"
       class="col-md-4"
       style="max-width: 300px">
    <q-skeleton height="270px"
                square
                animation="fade" />
    <q-skeleton type="text"
                animation="fade" />
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar"
                    animation="fade" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text"
                      animation="fade" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text"
                      animation="fade" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <div class="row items-start no-wrap q-mt-sm">
      <div class="col q-pr-sm">
        <q-skeleton type="text"
                    square
                    width="30%"
                    animation="fade" />
        <q-skeleton type="text"
                    square
                    height="12px"
                    animation="fade" />
        <q-skeleton type="text"
                    square
                    height="12px"
                    width="75%"
                    animation="fade" />
      </div>
      <q-skeleton width="56px"
                  height="20px"
                  square
                  animation="fade" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'productRowSkeleton',
  props: {
    skeletons: {
      type: Number,
      default: 1
    }
  }
}
</script>
