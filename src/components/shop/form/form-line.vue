<template>
  <div class="form-line-warpper shop-template-form">
    <div class="color-style">
      <div class="title">
        <span>颜色选择</span>
      </div>
      <div class="color-select">
        <div>
          <span>线条</span>
          <el-color-picker
            v-model="localForm.color"
            @change="colorChange($event, 'color')"
          ></el-color-picker>
          <span>{{ localForm.color }}</span>
        </div>
      </div>
    </div>
    <div class="padding-warpper">
      <div class="title">上下边距</div>
      <div class="change-padding">
        <el-slider v-model="localForm.margin" :max="50"></el-slider>
        <span>{{ localForm.margin }}px</span>
      </div>
    </div>
    <div class="line-style">
      <div class="title">风格</div>
      <div class="style-warpper">
        <ul>
          <li
            v-for="(item, index) in 3"
            :key="index"
            :class="{ active: localForm.style === index }"
            @click="styleChange(index)"
          >
            <div class="line-warpper">
              <div class="line"></div>
            </div>
            <span>风格{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { shopComponentsLineInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsLineInit))
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    //线条风格改变
    styleChange(index) {
      this.localForm.style = index;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
.form-line-warpper {
  .line-style {
    .style-warpper {
      ul {
        margin: 0;
        margin-top: 20px;
        li {
          margin-bottom: 10px;
          cursor: pointer;
          &.active {
            .line-warpper {
              border: 1px solid $theme-color;
            }
          }
          .line-warpper {
            height: 30px;
            display: flex;
            align-items: center;
            border: 1px solid transparent;
            border-radius: 5px;
            .line {
              margin: 0px 20px;
              width: 100%;
            }
          }
          span {
            margin-top: 10px;
            font-size: 12px;
            text-align: center;
            display: block;
          }
          &:nth-of-type(1) {
            .line {
              border-top: 1px solid #000;
            }
          }
          &:nth-of-type(2) {
            .line {
              border-top: 1px dotted #000;
            }
          }
          &:nth-of-type(3) {
            .line {
              border-top: 1px dashed #000;
            }
          }
        }
      }
    }
  }
}
</style>
