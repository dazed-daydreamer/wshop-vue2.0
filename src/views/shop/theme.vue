<template>
  <div class="shop-theme-warpper public-warpper">
    <div class="gray-bg-warpper"></div>
    <div class="footer-btn">
      <div>
        <el-button size="medium" @click="saveTheme" type="primary"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    //保存色系
    saveSearch() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-theme-warpper {
  .gray-bg-warpper {
  }
  .footer-btn {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    z-index: 999;
    & > div {
      border-radius: 10px 10px 0px 0px;
      box-shadow: $shadow;
      overflow: hidden;
      background-color: #fff;
      margin: 0px 10px;
      height: 100%;
    }
  }
}
</style>
