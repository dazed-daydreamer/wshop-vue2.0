<template>
  <div class="customize-slider-warpper">
    <div class="slider-list">
      <ul>
        <li v-for="(item, index) in form.slider" :key="index">
          <img :src="item.img" alt v-if="item.img" />
          <img src="../../../assets/images/default_banner.png" alt v-else />
        </li>
      </ul>
    </div>
    <div class="dot-list" :class="[dotClass, positionClass]">
      <div v-for="(item, index) in form.slider" :key="index"></div>
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
    dotClass() {
      return `dot-style-${this.form.dotStyle}`;
    },
    positionClass() {
      return `position-style-${this.form.positionStyle}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.customize-slider-warpper {
  .slider-list {
    ul {
      margin: 0;
      display: flex;
      overflow: hidden;
      li {
        width: 100%;
        flex-shrink: 0;
        position: relative;
        display: flex;
        img {
          width: 100%;
        }
      }
    }
  }
  .dot-list {
    position: absolute;
    bottom: 15px;
    display: flex;
    width: 100%;
    justify-content: center;
    box-sizing: border-box;
    & > div {
      width: 6px;
      height: 6px;
      background-color: #ccc;
      border-radius: 50%;
      &:nth-of-type(1) {
        background-color: #fff;
      }
      &:not(:nth-last-of-type(1)) {
        margin-right: 5px;
      }
    }
    &.dot-style-1 {
      & > div:nth-of-type(1) {
        width: 16px;
        border-radius: 6px;
      }
    }

    &.dot-style-2 {
      & > div {
        height: 3px;
        width: 16px;
        border-radius: 0px;
      }
    }

    &.position-style-0 {
      justify-content: flex-start;
      padding-left: 20px;
    }

    &.position-style-2 {
      justify-content: flex-end;
      padding-right: 20px;
    }
  }
}
</style>
