<template>
  <div class="shop-component-library-warpper">
    <div class="top-title">
      <span>组件库</span>
      <span>拖拽使用</span>
    </div>
    <div class="component-library-list">
      <div class="nav">
        <span
          v-for="(item,index) in navArr"
          :key="index"
          @click="navChange(index)"
          :class="{current:currentList === index}"
        >{{item}}</span>
      </div>
      <el-scrollbar>
        <draggable
          v-model="basicComponents"
          :options="draggableOptions"
          class="cu-list"
          v-if="currentList === 0"
        >
          <li v-for="(item,index) in basicComponents" :key="index" class="cu-item">
            <img :src="item.image" alt />
            <span>{{item.title}}</span>
          </li>
        </draggable>

        <draggable v-model="marketComponents" :options="draggableOptions" class="cu-list" v-else>
          <li v-for="(item,index) in marketComponents" :key="index" class="cu-item">
            <img :src="item.image" alt />
            <span>{{item.title}}</span>
          </li>
        </draggable>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { getShopComponentsList } from "api/http";
export default {
  data() {
    return {
      //营销组件
      marketComponents: [],
      //基础组件
      basicComponents: [],
      //顶部导航
      navArr: ["基础组件", "营销组件"],
      //当前选择导航的index
      currentList: 0,
      //vuedraggable 配置
      draggableOptions: {
        sort: false,
        group: {
          name: "description",
          put: false,
          pull: "clone"
        }
      }
    };
  },
  created() {
    //获取组件列表
    this._getShopComponentsList();
  },
  methods: {
    //获取组件列表
    async _getShopComponentsList() {
      const res = await getShopComponentsList();
      if (res.data.array && res.data.array.length) {
        res.data.array.forEach(item => {
          if (item.group == 1) {
            this.basicComponents.push(item);
          } else {
            this.marketComponents.push(item);
          }
        });
      }
    },

    //组件导航改变
    //index 选中的导航的index
    navChange(index) {
      this.currentList = index;
    }
  },
  components: {
    draggable
  }
};
</script>




<style lang="scss">
@import "@/styles/theme.scss";
.shop-component-library-warpper {
  .top-title {
    text-align: left;
    span:nth-of-type(1) {
      font-weight: bold;
      font-size: 15px;
    }
    span:nth-of-type(2) {
      color: $secondary-text-color;
      font-size: 13px;
      margin-left: 10px;
    }
  }
  .component-library-list {
    text-align: left;
    .nav {
      padding-right: 20px;
      margin-top: 25px;
      margin-bottom: 10px;
      padding-left: 6px;
      display: flex;
      text-align: center;
      span {
        flex: 1;
        font-size: 13px;
        border-bottom: 2px solid transparent;
        padding: 10px;
        margin: 0px 15px;
        cursor: pointer;
        &.current {
          border-color: $theme-color;
        }
      }
    }
  }
  .el-scrollbar {
    height: 500px !important;
    .el-scrollbar__view {
      .cu-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0px 10px;
        padding-right: 20px;
        .cu-item {
          width: 100px;
          height: 85px;
          box-sizing: border-box;
          display: inline-block;
          border: 1px solid #e3e2e5;
          padding: 5px;
          border-radius: 4px;
          text-align: center;
          background-color: #ffffff;
          margin-bottom: 20px;
          cursor: pointer;
          &:hover {
            border: 1px solid $theme-color;
          }
          img {
            width: 88px;
            height: 50px;
          }
          span {
            font-size: 12px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>