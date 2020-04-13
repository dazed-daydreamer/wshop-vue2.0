<template>
  <div class="customize-title-warpper">
    <div
      v-if="ordinaryTitleShow"
      class="ordinary"
      :style="{'margin-top':`${form.margin}px`,'margin-bottom':`${form.margin}px`}"
      :class="listClass"
    >
      <div :class="listClass" :style="{border:listBoder}">
        <span class="line" :style="{'background-color':form.maintitle.color}"></span>
        <span
          :style="{color:form.maintitle.color,border:listBoder}"
          class="title"
          v-if="(form.style + 1) != 12"
        >{{form.maintitle.title}}</span>
        <span
          :style="{'background-color':form.maintitle.color,border:listBoder}"
          class="title"
          v-else
        >{{form.maintitle.title}}</span>
        <span class="line" :style="{'background-color':form.maintitle.color}"></span>
        <div class="inner-line">
          <span :style="{'background-color':form.maintitle.color}"></span>
          <span :style="{'border-top': `8px solid ${form.maintitle.color}`}" class="triangle"></span>
          <div :style="{'border': `1px solid ${form.maintitle.color}`}" class="diamond"></div>
          <span :style="{'background-color':form.maintitle.color}"></span>
        </div>
      </div>
    </div>
    <div
      v-else
      :class="listClass"
      class="new"
      :style="{'margin-top':`${form.margin}px`,'margin-bottom':`${form.margin}px`}"
    >
      <div v-if="form.style === 0">
        <img src="../../../assets/images/bubble.png" alt />
        <span
          :style="{color:form.maintitle.color,fontSize:`${form.maintitle.fontSize}px`,fontWeight:boldStyle,fontStyle:tiltStyle}"
        >{{form.maintitle.title}}</span>
        <img src="../../../assets/images/bubble.png" alt />
      </div>

      <div v-else-if="form.style === 1">
        <div class="mainTitle">
          <img src="../../../assets/images/t1_bg.png" alt />
          <span
            :style="{color:form.maintitle.color,fontSize:`${form.maintitle.fontSize}px`,fontWeight:boldStyle,fontStyle:tiltStyle}"
          >{{form.maintitle.title}}</span>
          <img src="../../../assets/images/t1_bg2.png" alt />
        </div>
        <div class="subtitle" v-if="form.subtitle.show">
          <span
            :style="{color:form.subtitle.color,fontSize:`${form.subtitle.fontSize}px`}"
          >{{form.subtitle.title}}</span>
        </div>
        <div class="more" v-if="form.more.show">
          <span>{{form.more.title}}</span>
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>

      <div v-else-if="form.style === 2">
        <div class="mainTitle">
          <img src="../../../assets/images/t2_bg2.png" alt />
          <span
            :style="{color:form.maintitle.color,fontSize:`${form.maintitle.fontSize}px`,fontWeight:boldStyle,fontStyle:tiltStyle}"
          >{{form.maintitle.title}}</span>
          <img src="../../../assets/images/t2_bg3.png" alt />
          <img src="../../../assets/images/t2_bg1.png" alt class="bottom-pic" />
        </div>
        <div class="subtitle" v-if="form.subtitle.show">
          <span
            :style="{color:form.subtitle.color,fontSize:`${form.subtitle.fontSize}px`}"
          >{{form.subtitle.title}}</span>
        </div>
        <div class="more" v-if="form.more.show">
          <span>{{form.more.title}}</span>
          <span class="el-icon-arrow-right"></span>
        </div>
      </div>

      <div v-else-if="form.style === 3">
        <img src="../../../assets/images/t3_bg2.png" class="top-img" alt />
        <img src="../../../assets/images/t3_bg1.png" class="bottom-img" alt />
        <div class="mainTitle">
          <span
            :style="{color:form.maintitle.color,fontSize:`${form.maintitle.fontSize}px`,fontWeight:boldStyle,fontStyle:tiltStyle}"
          >{{form.maintitle.title}}</span>
        </div>
        <div class="subtitle" v-if="form.subtitle.show">
          <span
            :style="{color:form.subtitle.color,fontSize:`${form.subtitle.fontSize}px`}"
          >{{form.subtitle.title}}</span>
        </div>
        <div class="more" v-if="form.more.show">
          <span>{{form.more.title}}</span>
          <span class="el-icon-arrow-right"></span>
        </div>
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
    },
    //一般样式外部边框
    listBoder() {
      return this.form.style + 1 >= 10
        ? `1px solid ${this.form.maintitle.color}`
        : "none";
    },
    //加粗样式
    boldStyle() {
      return this.form.maintitle.bold ? "700" : "normal";
    },
    //倾斜样式
    tiltStyle() {
      return this.form.maintitle.tilt ? "Oblique" : "normal";
    }
  }
};
</script>

<style lang="scss">
.customize-title-warpper {
  .ordinary {
    margin: 0px 15px;
    div {
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
    &.listtyle-10 {
      div {
        width: 90px;
        margin: 0px auto;
        position: relative;
        .line {
          width: 40px;
          height: 4px;
          position: absolute;
          top: 50%;
        }
        .line:nth-of-type(1) {
          left: -10px;
          transform: translate(-50%, -50%);
        }
        .line:nth-of-type(3) {
          right: -10px;
          transform: translate(50%, -50%);
        }
        .title {
          width: 100%;
          margin: 3px;
          height: 25px;
        }
      }
    }

    &.listtyle-11 {
      height: 35px;
      display: flex;
      align-items: center;
      div {
        width: 90px;
        height: 25px;
        margin: 0px auto;
        position: relative;
        margin-top: 3px;
        .title {
          margin: 0px;
          width: 90px;
          height: 25px;
          position: absolute;
          top: -5px;
          left: -5px;
          background-color: #fff;
        }
      }
    }

    &.listtyle-12 {
      height: 35px;
      display: flex;
      align-items: center;
      div {
        width: 90px;
        height: 25px;
        margin: 0px auto;
        position: relative;
        margin-top: 3px;
        .title {
          margin: 0px;
          width: 90px;
          height: 25px;
          position: absolute;
          top: -5px;
          left: -5px;
          color: #fff;
        }
      }
    }
  }
  .new {
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      display: flex;
      align-items: center;
    }
    &.listtyle-1 {
      height: 60px;
      img {
        width: 39px;
      }
      span {
        margin: 0px 15px;
      }
      img:nth-of-type(2) {
        transform: scaleX(-1);
      }
    }
    &.listtyle-2,
    &.listtyle-3 {
      height: 60px;
      & > div {
        flex-direction: column;
        position: relative;
        width: 100%;
        .mainTitle {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          img {
            width: 20px;
          }
          span {
            margin: 0px 15px;
          }
        }
        .subtitle {
          letter-spacing: 8px;
        }
        .more {
          position: absolute;
          top: 0;
          right: 10px;
          span {
            font-size: 13px;
            color: #b0b3bf;
          }
          .el-icon-arrow-right {
            font-size: 14px;
            margin-left: 3px;
          }
        }
      }
    }

    &.listtyle-3 {
      .mainTitle {
        position: relative;
        padding-bottom: 2px;
        span {
          z-index: 10;
        }
        .bottom-pic {
          width: 99px;
          position: absolute;
          bottom: 0px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    &.listtyle-4 {
      height: 60px;
      & > div {
        position: relative;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        img {
          position: absolute;
        }
        .top-img {
          width: 17.5px;
          top: -7px;
          left: 95px;
        }
        .bottom-img {
          width: 30.5px;
          bottom: -9px;
          left: 4px;
        }
        .mainTitle {
          margin-left: 25px;
          z-index: 10;
        }
        .subtitle {
          margin-left: 25px;
          margin-top: 5px;
          z-index: 10;
        }
        .more {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          span {
            font-size: 13px;
            color: #b0b3bf;
          }
          .el-icon-arrow-right {
            font-size: 14px;
            margin-left: 3px;
          }
        }
      }
    }
  }
}
</style>
