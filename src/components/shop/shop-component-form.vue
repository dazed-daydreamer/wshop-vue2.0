<template>
  <div class="shop-component-form">
    <el-scrollbar>
      <div class="top-title">
        <span class="iconfont" :class="icon"></span>
        <span>{{ title }}</span>
      </div>
      <div class="empty-component" v-if="getCurrentComponentIndex === -1">
        请先选择组件
      </div>
      <div class="has-component" v-else>
        <component
          v-bind:is="hasComponent"
          :form="
            getCurrentComponentItem.form ? getCurrentComponentItem.form : {}
          "
        ></component>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { shopMixins } from "@/mixins/shop-mixins.js";
import FormProduct from "./form/form-product.vue";
import FormTab from "./form/form-tab.vue";
import FormLike from "./form/form-like.vue";
import FormRanking from "./form/form-ranking.vue";
import FormNotice from "./form/form-notice.vue";
import FormSearch from "./form/form-search.vue";
import FromSlider from "./form/form-slider.vue";
import FormPicture from "./form/form-picture.vue";
import FormHot from "./form/form-hot.vue";
import FormPictures from "./form/form-pictures.vue";
import FormCube from "./form/form-cube.vue";
import FormListNav from "./form/form-list-nav.vue";
import FormLine from "./form/form-line.vue";
import FormTitle from "./form/form-title.vue";
import FormRichText from "./form/form-rich-text.vue";
export default {
  mixins: [shopMixins],
  data() {
    return {
      //动态引入的组件
      hasComponent: null,
      //动态引入组件的名称
      title: "",
      //动态引入组件的标签
      icon: ""
    };
  },
  watch: {
    //当监测到选择的组件改变的时候，动态引入组件表单
    getCurrentComponentIndex() {
      this.title = this.getCurrentComponentItem.title;
      this.icon = this.getCurrentComponentItem.icon;
      let hasComponent = null;
      switch (this.getCurrentComponentItem.component) {
        case "product":
          hasComponent = FormProduct;
          break;
        case "tab":
          hasComponent = FormTab;
          break;
        case "like":
          hasComponent = FormLike;
          break;
        case "ranking":
          hasComponent = FormRanking;
          break;
        case "notice":
          hasComponent = FormNotice;
          break;
        case "search":
          hasComponent = FormSearch;
          break;
        case "slider":
          hasComponent = FromSlider;
          break;
        case "picture":
          hasComponent = FormPicture;
          break;
        case "hot":
          hasComponent = FormHot;
          break;
        case "pictures":
          hasComponent = FormPictures;
          break;
        case "cube":
          hasComponent = FormCube;
          break;
        case "listNav":
          hasComponent = FormListNav;
          break;
        case "line":
          hasComponent = FormLine;
          break;
        case "title":
          hasComponent = FormTitle;
          break;
        case "richText":
          hasComponent = FormRichText;
          break;
        default:
          hasComponent = null;
          break;
      }
      if (this.hasComponent == hasComponent) {
        this.hasComponent = null;
      }
      this.$nextTick(() => {
        this.hasComponent = hasComponent;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-component-form {
  box-shadow: $shadow;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  padding: 5px 0px;
  height: 100%;
  .el-scrollbar {
    height: 100%;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
      .top-title {
        padding: 0px 20px;
        height: 50px;
        text-align: left;
        line-height: 50px;
        font-size: 13px;
        span:nth-of-type(2) {
          font-weight: bold;
          margin-left: 20px;
          font-size: 15px;
        }
        & > .iconfont {
          font-size: 25px;
          color: $theme-color;
        }
      }
      .empty-component {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
    }
  }
}
</style>
