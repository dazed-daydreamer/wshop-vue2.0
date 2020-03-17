<template>
  <div class="shop-component-form">
    <div class="top-title">
      <span>组件设置</span>
      <span>{{title}}</span>
    </div>
    <div class="empty-component" v-if="getCurrentComponentIndex === -1">请先选择组件</div>
    <div class="has-component">
      <component
        v-bind:is="hasComponent"
        :form="getCurrentComponentItem.form ?getCurrentComponentItem.form :{}"
      ></component>
    </div>
  </div>
</template>


<script>
import { shopMixins } from "@/mixins/shop-mixins.js";
export default {
  mixins: [shopMixins],
  data() {
    return {
      //动态引入的组件
      hasComponent: null,
      //动态引入组件的名称
      title: ""
    };
  },
  components: {
  },
  watch: {
    //当监测到选择的组件改变的时候，动态引入组件表单
    getCurrentComponentIndex() {
      this.title = this.getCurrentComponentItem.title;
      switch (this.getCurrentComponentItem.component) {
        case "slider":
          this.hasComponent = ShopSliderComponent;
          break;
      }
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
  padding: 5px 20px;
  .top-title {
    height: 50px;
    text-align: left;
    line-height: 50px;
    font-size: 13px;
    font-weight: bold;
    span:nth-of-type(2) {
      font-weight: 400;
      margin-left: 20px;
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