<template>
  <div class="addpage-step-two-warpper public-warpper">
    <div class="top">
      <span @click="back">新建页面</span>
      <span>-</span>
      <span>模板页面</span>
    </div>
    <div class="draggable-warpper gray-bg-warpper">
      <div class="draggable-content">
        <div class="template-components-warpper">
          <shop-component-library></shop-component-library>
        </div>
        <div class="template-page-warpper">
          <shop-template-page></shop-template-page>
        </div>
        <div class="template-components-data">
          <shop-component-form></shop-component-form>
        </div>
      </div>
      <div class="btn-warpper">
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { publicMixins } from "mixins/public-mixins";
import ShopComponentLibrary from "components/shop/shop-component-library.vue";
import ShopTemplatePage from "components/shop/shop-template-page.vue";
import ShopComponentForm from "components/shop/shop-component-form.vue";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //从第一步传过来的数据
      pageDataForm: {}
    };
  },
  created() {
    //获取第一步传过来的数据并且传到该data的表单里面
    this.pageDataForm = JSON.parse(this.decrypt(this.$route.query.data));
  },
  methods: {
    //回退上一页
    back() {
      this.$router.go(-1);
    },
    //确认自定义页面
    confirm() {}
  },
  components: {
    ShopComponentLibrary,
    ShopTemplatePage,
    ShopComponentForm
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.addpage-step-two-warpper {
  .top {
    display: flex;
    padding: 5px;
    padding-top: 20px;
    span {
      font-size: 14px;
      margin: 0px 5px;
    }
    span:nth-of-type(1) {
      cursor: pointer;
      &:hover {
        color: $theme-color;
      }
    }
    span:nth-of-type(3) {
      font-weight: bold;
    }
  }

  .draggable-warpper {
    .draggable-content {
      padding: 30px 20px;
      display: flex;
      justify-content: space-between;
      .template-components-warpper {
        width: 270px;
        flex-shrink: 0;
      }
      .template-page-warpper {
        width: 385px;
        flex-shrink: 0;
      }
      .template-components-data {
        width: 365px;
        flex-shrink: 0;
      }
    }
    .btn-warpper {
      margin-top: 20px;
    }
  }
}
</style>
