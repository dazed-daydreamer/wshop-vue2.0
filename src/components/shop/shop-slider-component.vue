<template>
  <div class="shop-slider-component">
    <div class="style-warpper">
      <img :src="sliderPic" alt />
      <div>修改样式</div>
    </div>
    <div class="timer-waprrer">
      <span>轮播间隔(S)</span>
      <el-slider v-model="localForm.timer" :min="2" :max="10"></el-slider>
      <span>{{localForm.timer}}</span>
    </div>
    <div class="cu-list">
      <div class="cu-item" v-for="(item,index) in localForm.list" :key="index">
        <div class="item-title">
          <span>图片{{index}}</span>
        </div>
        <div class="item-image">
          <span class="title">选择图片</span>
        </div>
        <div class="item-url">
          <span class="title">图片链接</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //本地表单
      localForm: {
        sliderStyle: 1,
        timer: 5,
        list: [
          {
            image: "",
            url: "",
            urlTitle: ""
          }
        ]
      },
      //选择轮播样式的图片
      sliderPic: ""
    };
  },
  props: {
    //外部传过来的表单
    form: {
      type: Object,
      default: {}
    }
  },
  created() {
    //初始化轮播图
    this._initSlide();
  },
  methods: {
    //初始化轮播图
    _initSlide() {
      if (Object.keys(this.form).length) {
        this.localForm = this.form;
      }
      this._backPicture(this.localForm.sliderStyle);
    },
    //返回当前样式的图片
    //index 当前样式的index
    _backPicture(index) {
      switch (index) {
        case 1:
          this.sliderPic = require("@/assets/images/slider.style_1.png");
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
.shop-slider-component {
  .style-warpper {
    margin: 20px 0px;
    border: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    img {
      width: 100%;
      box-sizing: border-box;
      padding: 10px 5px;
    }
    div {
      cursor: pointer;
      width: 100%;
      border-top: 1px solid $border-color;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      &:hover {
        color: $theme-color;
      }
    }
  }
  .timer-waprrer {
    display: flex;
    align-items: center;
    padding: 10px 8px;
    border-radius: 5px;
    border: 1px solid $border-color;
    & > span {
      font-size: 12px;
    }
    .el-slider {
      margin: 0px 15px;
      flex: 1;
    }
  }
}
</style>