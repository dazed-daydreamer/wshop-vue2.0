<template>
  <div
    class="customize-notice-warpper"
    :style="{
      'padding-top': `${form.padding}px`,
      'padding-bottom': `${form.padding}px`
    }"
  >
    <div>
      <span class="icon-gonggao1 iconfont" v-if="form.style === 0"></span>
      <span class="sign" v-else>公告</span>
      <span>{{ form.notice }}</span>
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.customize-notice-warpper {
  margin: 0px 10px;
  & > div {
    background-color: #f2f2f2;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px;
    span.iconfont {
      margin-right: 10px;
      background-color: #fd4a4a;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: #fff;
      line-height: 20px;
    }
    span.sign {
      background: #ffe1e1;
      color: #ff4f4f;
      border-radius: 10px;
      padding: 1px 6px;
      line-height: 18px;
      text-align: center;
      font-size: 14px;
      margin-right: 10px;
    }
    span:nth-of-type(2) {
      color: #767676;
    }
    span {
      font-size: 13px;
    }
  }
}
</style>
