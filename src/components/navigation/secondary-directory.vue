<template>
  <div class="secondary-directory" v-if="listLength > 1">
    <el-scrollbar>
      <ul class="cu-list">
        <li class="cu-item" v-for="(item, index) in secondaryList" :key="index">
          <div class="group-title">{{ item.title }}</div>
          <ul class="cu-list">
            <li
              v-for="(listItem, listIndex) in item.list"
              :class="{ active: listItem.path === activeRoute }"
              @click="jumpRoute(listItem.path)"
              :key="listIndex"
              class="cu-item"
            >
              <span class="title">{{ listItem.meta.title }}</span>
              <span
                :class="{
                  'el-icon-caret-right': listItem.path === activeRoute
                }"
                class="right-icon"
              ></span>
            </li>
          </ul>
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //二级路由
      secondaryList: [],
      //当前所在路由
      activeRoute: "",
      //路由列表的长度
      listLength: 0
    };
  },
  created() {
    //初始化路由
    this._initRoute();
  },
  methods: {
    //初始化路由
    _initRoute() {
      this._matchSecondRoute(this.$router.currentRoute.path);
    },
    //获取当前路由父级路由下的所有子路由
    //router 路由地址
    _matchSecondRoute(router) {
      let arr = [];
      this.activeRoute = router;
      const firstName = router.split("/")[1];
      const firstRouter = this.$router.options.routes.filter(
        item => item.name === firstName
      )[0];
      firstRouter.children.forEach(item => {
        if (item.meta) {
          const hasGroup = arr.findIndex(
            groupItem => groupItem.title === item.meta.group
          );
          if (hasGroup === -1) {
            const groupItem = {
              title: item.meta.group,
              list: [item]
            };
            arr.push(groupItem);
          } else {
            arr[hasGroup].list.push(item);
          }
        }
      });
      this.secondaryList = arr;
      this.listLength = firstRouter.children.length;
      this.$emit("routeChange", this.listLength);
    },
    //跳转路由
    //router 路由地址
    jumpRoute(router) {
      this.$router.push(router);
    }
  },
  watch: {
    //当路由改变的时候重新获取二级路由
    // to 跳转到的路由
    $route(to) {
      if (Object.keys(to.meta).length) {
        this._matchSecondRoute(to.path);
      }
    }
  }
};
</script>

<style lang="scss">
.secondary-directory {
  height: 100%;
  .el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      .el-scrollbar__view {
        & > .cu-list {
          padding: 0px 10px;
          & > .cu-item {
            padding: 12px 0px;
            border-bottom: 1px solid #e3e2e5;
            .group-title {
              font-size: 13px;
              width: 100%;
              height: 40px;
              line-height: 40px;
              text-align: left;
              margin-left: 10px;
              font-weight: bold;
            }
            .cu-list {
              .cu-item {
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                margin: 2px 0px;
                &:hover {
                  background-color: #e9eaf0;
                }
                &.active {
                  background-color: #e9eaf0;
                }
                .title {
                  font-size: 13px;
                  margin-left: 10px;
                }
                .right-icon {
                  margin-right: 7px;
                  margin-top: -2px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
