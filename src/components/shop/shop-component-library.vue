<template>
  <div class="shop-component-library-warpper">
    <div class="top-title">
      <span>组件库</span>
      <span>拖拽使用</span>
    </div>
    <div class="component-library-list">
      <el-scrollbar>
        <ul class="group-list">
          <li v-for="(item,index) in shopComponentsList" :key="index" class="group-item">
            <div class="group-title">{{item.group}}</div>
            <draggable v-model="item.list" :options="draggableOptions" class="cu-list">
              <li v-for="(listItem,listIndex) in item.list" :key="listIndex" class="cu-item">
                <span class="iconfont" :class="listItem.icon"></span>
                <span>{{listItem.title}}</span>
              </li>
            </draggable>
          </li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { shopComponentsList } from "@/config/shop.js";
export default {
  data() {
    return {
      //组件列表
      shopComponentsList: [],
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
    //初始化组件列表
    this._initShopComponentsList();
  },
  methods: {
    //初始化组件列表
    _initShopComponentsList() {
      shopComponentsList.forEach(item => {
        const index = this.shopComponentsList.findIndex(
          listItem => listItem.group === item.group
        );
        if (index === -1) {
          this.shopComponentsList.push({
            group: item.group,
            list: [item]
          });
        } else {
          this.shopComponentsList[index].list.push(item);
        }
      });
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
  .el-scrollbar {
    height: 700px !important;
    .el-scrollbar__view {
      .group-list {
        .group-item {
          .group-title {
            text-align: left;
            font-size: 13px;
            margin-bottom: 20px;
          }
          & > .cu-list {
            display: flex;
            flex-wrap: wrap;
            & > .cu-item {
              margin-right: 10px;
              width: 76px;
              height: 76px;
              box-sizing: border-box;
              display: inline-block;
              border: 1px solid #e3e2e5;
              padding: 5px;
              border-radius: 4px;
              text-align: center;
              background-color: #ffffff;
              margin-bottom: 20px;
              display: flex;
              cursor: pointer;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              &:hover {
                border: 1px solid $theme-color;
              }
              & > .iconfont {
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: 400;
                color: $theme-color;
              }
              & > span {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>