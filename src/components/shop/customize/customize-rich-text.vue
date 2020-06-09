<template>
  <div
    class="customize-rich-text-warpper"
    :style="{
      marginTop: `${form.margin}px`,
      marginBottom: `${form.margin}px`,
      backgroundColor: form.backgroundColor
    }"
  >
    <div v-html="form.content"></div>
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
.customize-rich-text-warpper {
  text-align: left;
  p {
    margin: 0px;
  }
  ul {
    margin: 0;
  }
}
</style>
