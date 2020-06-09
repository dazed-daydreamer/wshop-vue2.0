<template>
  <div class="top-navigation-warpper">
    <div class="left"></div>
    <div class="right">
      <div class="notifier">
        <span class="el-icon-bell"></span>
        <span class="dot" :class="{ new: hasNew }"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //新消息
      hasNew: false
    };
  }
};
</script>

<style lang="scss" scoped>
.top-navigation-warpper {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    height: 100%;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    .ico {
      width: 50px;
    }
    .el-breadcrumb {
      a {
        &:hover {
          color: #409eff;
        }
      }
    }
  }
  .right {
    height: 100%;
    line-height: 50px;
    .notifier {
      width: 50px;
      text-align: center;
      position: relative;
      cursor: pointer;
      .el-icon-bell {
        font-size: 18px;
      }
      .dot {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: #f44336;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        display: none;
        &.new {
          display: block;
        }
      }
    }
  }
}
</style>
