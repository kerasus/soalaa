<template>
  <div class="flex justify-center text-center q-mb-lg">
    <div class="square justify-center"></div>
    <br/>
  </div>
</template>

<script>
// import API_ADDRESS from 'src/api/Addresses'
import { mixinTree } from 'src/mixin/Mixins'

export default {
  data: () => ({
    name: ''
  }),
  mixins: [mixinTree],
  created () {
    this.showTree('tree', this.getRootNode('test'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.square{
  background-color: red;
  width: 100px;
  height: 100px;
  position: relative;
  &:after{
     content: " ";
     position: absolute;
     width: 26px;
     height: 95px;
     background: transparent;
     top: -78px;
     box-shadow: -2px 30px 0px -3px var(--3a-Primary);
     border-radius: 0px 0 25px 0;
     left: -2px;
   }
}
</style>
