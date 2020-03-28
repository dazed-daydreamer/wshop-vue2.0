<template>
  <div class="form-search-warpper">
    <div class="color-style">
      <div class="title">
        <span>颜色选择</span>
      </div>
      <div class="color-select">
        <div>
          <span>图标</span>
          <el-color-picker v-model="localForm.iconColor" @change="colorChange($event,'iconColor')"></el-color-picker>
          <span>{{localForm.iconColor}}</span>
        </div>
        <div>
          <span>文字</span>
          <el-color-picker
            v-model="localForm.titleColor"
            @change="colorChange($event,'titleColor')"
          ></el-color-picker>
          <span>{{localForm.titleColor}}</span>
        </div>
      </div>
    </div>
    <div class="radius-style">
      <div class="title">
        <span>边角样式</span>
      </div>
      <div class="radius-change">
        <ul>
          <li
            v-for="(item,index) in radiusArr"
            :key="index"
            :class="{active:index === localForm.radiusStyle}"
            @click="radiusChange(index)"
          >
            <img :src="require(`assets/images/${item}`)" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="title-style">
      <div class="title">文字位置</div>
      <div class="title-change">
        <ul>
          <li
            v-for="(item,index) in titleArr"
            :key="index"
            :class="{active:index === localForm.placeholderStyle}"
            @click="titleChange(index)"
          >
            <img :src="require(`assets/images/${item}`)" alt />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import { shopComponentsSearchInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsSearchInit)),
      //边角样式
      radiusArr: ["arc.png", "round.png", "square.png"],
      //文字位置
      titleArr: ["left.png", "center.png"]
    };
  },
  methods: {
    //颜色改变的时候，清空变白色
    colorChange(evt, key) {
      if (evt == null) {
        this.localForm[key] = "#FFFFFF";
      }
    },
    //边角样式改变
    radiusChange(index) {
      this.localForm.radiusStyle = index;
    },
    //文字位置改变
    titleChange(index) {
      this.localForm.placeholderStyle = index;
    }
  },
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
@import "@/styles/theme.scss";
.form-search-warpper {
  text-align: left;
  & > div:not(.dialog) {
    padding: 20px 20px;
    border-top: 5px solid #f6f7f9;
    & > .title {
      font-size: 13px;
      font-weight: bold;
      span:nth-of-type(2) {
        font-size: 12px;
        font-weight: 400;
        margin-left: 5px;
        color: $secondary-text-color;
      }
    }
  }
  .color-style {
    .color-select {
      & > div {
        display: flex;
        align-items: center;
        margin-top: 10px;
        & > span:nth-of-type(1) {
          font-size: 13px;
          width: 50px;
          text-align: center;
          margin-left: 20px;
        }
        & > .el-color-picker {
          height: 30px;
          .el-color-picker__trigger {
            height: 30px;
            width: 56px;
          }
        }
        & > span:nth-of-type(2) {
          font-size: 13px;
          width: 70px;
          text-align: center;
        }
      }
    }
  }
  .radius-style {
    .radius-change {
      margin-top: 10px;
      ul {
        margin: 0;
        display: flex;
        li {
          border: 1px solid transparent;
          margin: 0px 10px;
          cursor: pointer;
          border-radius: 5px;
          &.active {
            border-color: $theme-color;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .title-style {
    .title-change {
      margin-top: 10px;
      ul {
        margin: 0;
        display: flex;
        li {
          border: 1px solid transparent;
          margin: 0px 10px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 5px;
          &.active {
            border-color: $theme-color;
          }
        }
      }
    }
  }
}
</style>