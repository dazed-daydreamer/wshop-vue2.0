<template>
  <div class="customize-search-warpper">
    <div class="search-warpper" :class="{center:form.placeholderStyle === 1}">
      <span class="el-icon-search" :style="{color:form.iconColor}"></span>
      <span :style="{color:form.titleColor}">{{form.placeholder}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  }
};
</script>


<style lang="scss">
.customize-search-warpper {
  padding: 5px 10px;
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