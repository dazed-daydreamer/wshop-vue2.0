<template>
  <div class="addpage-step-two-warpper public-warpper">
    <div class="draggable-warpper gray-bg-warpper">
      <div class="top">
        <span>个性化装修</span>
        <el-button type="primary" @click="confirm" size="small">确定</el-button>
      </div>
      <div class="draggable-content">
        <div class="template-components-warpper">
          <shop-component-library></shop-component-library>
        </div>
        <div class="template-page-warpper">
          <el-scrollbar>
            <shop-template-page></shop-template-page>
          </el-scrollbar>
        </div>
        <div class="template-components-data">
          <shop-component-form></shop-component-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicMixins } from "mixins/public-mixins.js";
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
    confirm() {
      this.$router.push({ name: "shopPage" });
    }
  },
  components: {
    ShopComponentLibrary,
    ShopTemplatePage,
    ShopComponentForm
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.addpage-step-two-warpper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  .draggable-warpper {
    display: flex;
    flex-direction: column;
    .top {
      background-color: #1e222b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      flex-shrink: 0;
      & > span {
        margin-left: 20px;
        color: #fff;
        font-size: 14px;
      }
      button {
        margin-right: 20px;
        width: 70px;
        height: 30px;
      }
    }
    .draggable-content {
      margin: 30px 20px;
      display: flex;
      height: calc(100% - 120px);
      justify-content: space-between;
      .template-components-warpper {
        width: 270px;
        flex-shrink: 0;
      }
      .template-page-warpper {
        flex: 1;
        .el-scrollbar {
          width: 100%;
          height: 100%;
          ::v-deep .el-scrollbar__wrap {
            overflow-x: hidden;
            .el-scrollbar__view {
              display: flex;
              justify-content: center;
            }
          }
        }
      }
      .template-components-data {
        width: 365px;
        flex-shrink: 0;
      }
    }
  }
  .gray-bg-warpper {
    margin: 0px;
    border-radius: 0px;
    padding: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
