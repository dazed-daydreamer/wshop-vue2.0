<template>
  <div class="customize-search-warpper" :class="radiusClass">
    <div
      class="search-warpper"
      :class="{ center: form.placeholderStyle === 1 }"
    >
      <span class="el-icon-search" :style="{ color: form.iconColor }"></span>
      <span :style="{ color: form.titleColor }">{{ form.placeholder }}</span>
    </div>
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
    radiusClass() {
      return `radius-style-${this.form.radiusStyle}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.customize-search-warpper {
  padding: 5px 10px;
  &.radius-style-1 {
    .search-warpper {
      border-radius: 50px;
    }
  }
  &.radius-style-2 {
    .search-warpper {
      border-radius: 5px;
    }
  }
  .search-warpper {
    border: 1px solid #ededed;
    background: #f7f8fa;
    height: 32px;
    display: flex;
    align-items: center;
    &.center {
      justify-content: center;
    }
    span {
      margin-left: 10px;
    }
    span:nth-of-type(2) {
      font-size: 14px;
    }
  }
}
</style>
