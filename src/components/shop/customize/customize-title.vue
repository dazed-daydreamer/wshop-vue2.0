<template>
  <div class="customize-title-warpper">
    <div
      v-if="ordinaryTitleShow"
      :class="listClass"
      class="ordinary"
      :style="{'margin-top':`${form.margin}px`,'margin-bottom':`${form.margin}px`}"
    >
      <span class="line" :style="{'background-color':form.maintitle.color}"></span>
      <span :style="{color:form.maintitle.color}" class="title">{{form.maintitle.title}}</span>
      <span class="line" :style="{'background-color':form.maintitle.color}"></span>
      <div class="inner-line">
        <span :style="{'background-color':form.maintitle.color}"></span>
        <span :style="{'border-top': `8px solid ${form.maintitle.color}`}" class="triangle"></span>
        <div :style="{'border': `1px solid ${form.maintitle.color}`}" class="diamond"></div>
        <span :style="{'background-color':form.maintitle.color}"></span>
      </div>
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
  },
  computed: {
    //一般样式的显示
    ordinaryTitleShow() {
      return this.form.style >= 4;
    },
    //不同样式的class
    listClass() {
      return `listtyle-${this.form.style + 1}`;
    }
  }
};
</script>

<style lang="scss">
.customize-title-warpper {
  .ordinary {
    margin: 0px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 16px;
      margin: 0px 15px;
    }
    .inner-line {
      display: none;
      width: 100%;
      margin-top: 7px;
      flex-direction: column;
      align-items: center;
      .triangle {
        display: none;
      }
      .diamond {
        display: none;
      }
    }
    &.listtyle-5 {
      .line {
        width: 30px;
        height: 1px;
      }
    }

    &.listtyle-6 {
      justify-content: flex-start;
      .line:nth-of-type(1) {
        height: 19px;
        width: 2px;
      }
      .title {
        margin-left: 10px;
      }
    }

    &.listtyle-7 {
      flex-direction: column;
      .line {
        display: none;
      }
      .inner-line {
        display: flex;
        .triangle {
          display: block;
        }
        span:nth-of-type(1) {
          height: 1px;
          width: 100%;
        }
        .triangle {
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
        }
      }
    }

    &.listtyle-8 {
      flex-direction: column;
      .line {
        display: none;
      }
      .inner-line {
        width: 100%;
        display: flex;
        margin-top: 10px;
        flex-direction: column-reverse;
        span:nth-of-type(1) {
          height: 1px;
          width: 100%;
        }
        span:nth-of-type(3) {
          width: 160px;
          height: 3px;
        }
      }
    }

    &.listtyle-9 {
      flex-direction: column;
      .line {
        display: none;
      }
      .inner-line {
        display: flex;
        align-items: center;
        flex-direction: row;
        height: 17px;
        width: 100%;
        span:nth-of-type(1),
        span:nth-of-type(3) {
          height: 1px;
          flex: 1;
        }
        .diamond {
          width: 8px;
          height: 8px;
          display: block;
          margin: 0px 10px;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>
