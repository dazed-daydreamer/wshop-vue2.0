<template>
  <div class="global-layout">
    <el-container>
      <el-aside width="auto">
        <left-navigation ref="leftNavigation"></left-navigation>
      </el-aside>
      <el-container>
        <el-header>
          <top-navigation></top-navigation>
        </el-header>
        <el-main>
          <div class="nav-second" v-show="navSecondShow">
            <secondary-directory
              @routeChange="routeChange"
            ></secondary-directory>
          </div>
          <div class="main-content">
            <el-scrollbar>
              <router-view />
            </el-scrollbar>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftNavigation from "components/navigation/left-navigation.vue";
import TopNavigation from "components/navigation/top-navigation.vue";
import SecondaryDirectory from "components/navigation/secondary-directory.vue";
export default {
  data() {
    return {
      //二级路由是否显示
      navSecondShow: false
    };
  },
  methods: {
    //路由改变，判断二级路由显示
    //len   二级路由的长度
    routeChange(len) {
      if (len > 1) {
        this.navSecondShow = true;
      } else {
        this.navSecondShow = false;
      }
    }
  },
  components: {
    LeftNavigation,
    TopNavigation,
    SecondaryDirectory
  }
};
</script>

<style lang="scss">
@import "@/styles/transition.scss";
@import "@/styles/theme.scss";
.el-container {
  height: 100vh;
  .el-header {
    height: 50px !important;
    background-color: #ffffff;
    box-shadow: 0px 0px 2px rgba(26, 26, 26, 0.2);
  }
  .el-main {
    padding: 0;
    display: flex;
    & > .nav-second {
      width: 130px;
      flex-shrink: 0;
    }
    & > .main-content {
      height: 100%;
      flex: 1;
      box-sizing: border-box;
      .el-scrollbar {
        height: 100%;
        .el-scrollbar__wrap {
          overflow-x: hidden;
        }
      }
    }
  }
}
</style>
