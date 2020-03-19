<template>
  <div class="shop-component-form">
    <el-scrollbar>
      <div class="top-title">
        <span class="iconfont" :class="icon"></span>
        <span>{{title}}</span>
      </div>
      <div class="empty-component" v-if="getCurrentComponentIndex === -1">请先选择组件</div>
      <div class="has-component" v-else>
        <component
          v-bind:is="hasComponent"
          :form="getCurrentComponentItem.form ?getCurrentComponentItem.form :{}"
        ></component>
      </div>
    </el-scrollbar>
  </div>
</template>


<script>
import { shopMixins } from "@/mixins/shop-mixins.js";
import FormProduct from "./form/form-product.vue";
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
  components: {
    FormProduct
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



<style lang="scss">
@import "@/styles/theme.scss";
.shop-component-form {
  box-shadow: $shadow;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  padding: 5px 0px;
  height: 700px;
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
</style>