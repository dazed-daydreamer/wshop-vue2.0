<template>
  <div class="left-navigation-warpper">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical"
      text-color="#fff"
      background-color="#333"
      active-text-color="#fff"
      router
    >
      <div class="top-logo">
        <img src="https://s1.ax1x.com/2020/03/15/81p2Sf.jpg" alt />
      </div>
      <el-scrollbar>
        <div v-for="(item,index) in routers" :key="index" class="menu-warpper">
          <el-menu-item :index="item.path">
            <i :class="item.meta.icon" class="iconfont"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </div>
      </el-scrollbar>
    </el-menu>
  </div>
</template>


<script>
export default {
  computed: {
    //获取所有的一级路由
    routers() {
      return this.$router.options.routes;
    }
  }
};
</script>


<style lang="scss">
.left-navigation-warpper {
  height: 100%;
  .el-menu-vertical {
    display: flex;
    flex-direction: column;
    &:not(.el-menu--collapse) {
      width: 120px;
    }
    height: 100%;
    .top-logo {
      margin: 25px 0px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      img {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
    }
    .el-scrollbar {
      flex: 1;
      .el-scrollbar__wrap {
        overflow-x: hidden;
        .menu-warpper {
          flex: 1;
          & > li {
            text-align: left;
            display: flex;
            align-items: center;
            i:nth-of-type(1) {
              margin-right: 10px;
              width: 20px;
              height: 20px;
              line-height: 20px;
            }
            span {
              margin-top: 2px;
            }
          }
        }
      }
    }
  }
}
</style>