<template>
  <div class="shop-template-page-warpper">
    <div class="top-title">
      <img src="../../assets/images/phone-top.png" alt />
    </div>
    <div class="component-library-list">
      <el-scrollbar ref="scrollbar">
        <draggable
          v-model="componentsList"
          :options="draggableOptions"
          class="cu-list"
          :scrollSensitivity="300"
          @add="addList"
          @sort="sortChange"
        >
          <li
            v-for="(item,index) in componentsList"
            :key="index"
            class="cu-item"
            @click="itemChoose(index)"
            :class="{crrent:index === getCurrentComponentIndex}"
          >
            <div class="delete">
              <el-popconfirm title="是否删除组件吗" @onConfirm="delItem(index)">
                <span class="el-icon-close" slot="reference"></span>
              </el-popconfirm>
            </div>
            <component v-bind:is="item.introduce" :form="item.form"></component>
          </li>
        </draggable>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { shopMixins } from "mixins/shop-mixins.js";
import draggable from "vuedraggable";
import CustomizeProduct from "./customize/customize-product.vue";
import CustomizeTab from "./customize/customize-tab.vue";
import CustomizeLike from "./customize/customize-like.vue";
import CustomizeRanking from "./customize/customize-ranking.vue";
import {
  shopComponentsProductInit,
  shopComponentsTabInit,
  shopComponentsLikeInit,
  shopComponentsRankingInit
} from "@/config/shop.js";
export default {
  mixins: [shopMixins],
  data() {
    return {
      //页面组态列表
      componentsList: [],
      //vuedraggable 配置
      draggableOptions: {
        group: {
          name: "description",
          pull: false
        }
      }
    };
  },
  created() {
    //初始化vuex被选择组件
    this._initCurrentComponentData();
    //监听自定义页面表单改变
    this.bus.$on("formChange", res => {
      const item = this.componentsList[this.getCurrentComponentIndex];
      if (item) {
        item.form = JSON.parse(JSON.stringify(res));
      }
    });
  },
  methods: {
    //初始化vuex被选择组件
    _initCurrentComponentData() {
      this.setCurrentComponentIndex(-1);
      this.setCurrentComponentItem({});
    },
    //组件被选中
    //index  被选择组件在list中的index
    itemChoose(index) {
      this.setCurrentComponentIndex(index);
      this.setCurrentComponentItem(this.componentsList[index]);
    },
    //删除选中组件
    //index  选择组件的索引
    delItem(index) {
      this.componentsList.splice(index, 1);
      if (index === this.getCurrentComponentIndex) {
        this.setCurrentComponentIndex(-1);
        this.setCurrentComponentItem({});
      }
    },
    //每当添加一个组件的时候触发
    //evt    新组件的信息
    addList(evt) {
      const index = evt.newIndex;
      const item = JSON.parse(JSON.stringify(this.componentsList[index]));
      let form = {};
      let introduce;
      switch (item.component) {
        case "product":
          introduce = CustomizeProduct;
          form = shopComponentsProductInit;
          break;
        case "tab":
          introduce = CustomizeTab;
          form = shopComponentsTabInit;
          break;
        case "like":
          introduce = CustomizeLike;
          form = shopComponentsLikeInit;
        case "ranking":
          introduce = CustomizeRanking;
          form = shopComponentsRankingInit;
          break;
      }
      this.$set(item, "introduce", introduce);
      this.$set(item, "form", JSON.parse(JSON.stringify(form)));
      this.componentsList.splice(index, 1, item);
    },
    //当拖拽排序时候触发
    sortChange(evt) {
      const oldIndex = evt.oldIndex;
      const newIndex = evt.newIndex;
      if (
        (oldIndex === this.getCurrentComponentIndex ||
          newIndex === this.getCurrentComponentIndex) &&
        evt.pullMode != "clone"
      ) {
        const index =
          this.getCurrentComponentIndex === oldIndex ? newIndex : oldIndex;
        this.setCurrentComponentIndex(index);
        this.setCurrentComponentItem(this.componentsList[index]);
      }
    }
  },
  components: {
    draggable
  }
};
</script>



<style lang="scss">
@import "@/styles/theme.scss";
.shop-template-page-warpper {
  width: 385px;
  height: 665px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .top-title {
    height: 67px;
    flex-shrink: 0;
    img {
      width: 100%;
    }
  }
  .component-library-list {
    flex: 1;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      .el-scrollbar__view {
        & > .cu-list {
          & > .cu-item {
            margin-right: 1px;
            list-style: none;
            cursor: pointer;
            position: relative;
            border: 1px solid transparent;
            &:hover {
              border-color: $theme-color;
            }
            & > .delete {
              position: absolute;
              top: 0;
              z-index: 10;
              right: 0;
              width: 20px;
              height: 20px;
              border-radius: 0px 0px 0px 100%;
              background-color: $theme-color;
              font-size: 12px;
              display: none;
              span {
                margin-top: 2px;
                margin-left: 2px;
                color: #fff;
                width: 100%;
                height: 100%;
              }
            }
            &.crrent {
              border: 1px solid $theme-color;
              .delete {
                display: block;
              }
            }
            &.sortable-ghost {
              position: relative;
              &::before {
                content: "放这里";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              height: 80px;
              width: 100%;
              line-height: 60px;
              border: 1px dashed $theme-color;
              box-sizing: border-box;
              color: $theme-color;
              background-color: rgba(37, 137, 255, 0.3);
              span {
                display: none;
              }
              img {
                display: none;
              }
            }
          }
          height: 598px;
          margin: 0;
        }
      }
    }
  }
}
</style>