<template>
  <div class="customize-line-warpper">
    <div
      class="line"
      :style="{ margin: `${form.margin}px 0px`, borderTop: borderStyle }"
    ></div>
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
  },
  computed: {
    //线条样式
    borderStyle() {
      const style =
        this.form.style === 0
          ? "solid"
          : this.form.style === 1
          ? "dotted"
          : "dashed";
      return `1px ${style} ${this.form.color}`;
    }
  }
};
</script>
