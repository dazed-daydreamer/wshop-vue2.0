<template>
  <div class="customize-hot-warpper">
    <img :src="form.img" alt v-if="form.img" />
    <img src="../../../assets/images/default_banner.png" alt v-else />
  </div>
</template>

<script>
export default {
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
.customize-hot-warpper {
  position: relative;
  display: flex;
  img {
    width: 100%;
  }
}
</style>
