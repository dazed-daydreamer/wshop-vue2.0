<template>
  <div class="main-scroll-warpeer">
    <el-scrollbar>
      <slot></slot>
    </el-scrollbar>
    <div class="footer-btn-warpper">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-scroll-warpeer {
  width: 100%;
  height: 100%;
  position: relative;
  .el-scrollbar {
    width: 100%;
    height: 100%;
    ::v-deep .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .footer-btn-warpper {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 1000;
  }
}
</style>
