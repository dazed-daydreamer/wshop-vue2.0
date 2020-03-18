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
        >
          <li
            v-for="(item,index) in componentsList"
            :key="index"
            class="cu-item"
            @click="itemChoose(index)"
            :class="{crrent:index === getCurrentComponentIndex}"
          >
            <div class="delete">
              <el-popconfirm title="是否删除组件吗" @onConfirm="delItem(item)">
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
import { shopMixins } from "mixins/shop-mixins";
import draggable from "vuedraggable";
import CustomizeProduct from "./customize/customize-product";
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
    //item  选择组件的信息
    delItem(item) {},
    //每当添加一个组件的时候触发
    //evt    新组件的信息
    addList(evt) {
      const index = evt.newIndex;
      const item = JSON.parse(JSON.stringify(this.componentsList[index]));
      let introduce;
      switch (item.component) {
        case "product":
          introduce = CustomizeProduct;
          break;
      }
      this.$set(item, "introduce", introduce);
      this.$set(item, "form", {});
      this.componentsList.splice(index, 1, item);
    }
  },
  components: {
    draggable,
    CustomizeProduct
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
              }
            }
            &.crrent {
              border: 1px solid $theme-color;
              .delete {
                display: block;
              }
            }
            &.sortable-ghost {
              display: flex;
              justify-content: center;
              align-items: center;
              &::before {
                content: "放这里";
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