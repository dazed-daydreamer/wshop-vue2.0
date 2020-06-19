<template>
  <div class="form-search-warpper shop-template-form">
    <div class="color-style">
      <div class="title">
        <span>颜色选择</span>
      </div>
      <div class="color-select">
        <div>
          <span>图标</span>
          <el-color-picker
            v-model="localForm.iconColor"
            @change="colorChange($event, 'iconColor')"
          ></el-color-picker>
          <span>{{ localForm.iconColor }}</span>
        </div>
        <div>
          <span>文字</span>
          <el-color-picker
            v-model="localForm.titleColor"
            @change="colorChange($event, 'titleColor')"
          ></el-color-picker>
          <span>{{ localForm.titleColor }}</span>
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
            v-for="(item, index) in radiusArr"
            :key="index"
            :class="{ active: index === localForm.radiusStyle }"
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
            v-for="(item, index) in titleArr"
            :key="index"
            :class="{ active: index === localForm.placeholderStyle }"
            @click="titleChange(index)"
          >
            <img :src="require(`assets/images/${item}`)" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="title-placeholder">
      <div class="title">默认文字</div>
      <div class="input-placeholder">
        <el-input
          v-model="localForm.placeholder"
          maxlength="15"
          show-word-limit
        ></el-input>
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
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.form-search-warpper {
  .radius-style {
    .radius-change {
      margin-top: 20px;
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
      margin-top: 20px;
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

  .title-placeholder {
    .input-placeholder {
      margin-top: 20px;
    }
  }
}
</style>
