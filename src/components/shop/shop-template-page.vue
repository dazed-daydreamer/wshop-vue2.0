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
        >
          <li
            v-for="(item,index) in componentsList"
            :key="index"
            class="cu-item"
            @click="itemChoose(index)"
            :class="{crrent:index === getCurrentComponentIndex}"
          >
            <div class="top-warpper">
              <span>{{item.title}}</span>
              <span @click.stop="delItem(item)">删除</span>
            </div>
            <img :src="item.componentImage" alt />
          </li>
        </draggable>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { shopMixins } from "mixins/shop-mixins";
import draggable from "vuedraggable";
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
    delItem(item) {
      this.$confirm("确定要删除组件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components:{
    draggable,
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
        .cu-list {
          .cu-item {
            margin-right: 1px;
            list-style: none;
            cursor: pointer;
            position: relative;
            &:hover {
              border: 1px solid $theme-color;
              .top-warpper {
                display: flex;
              }
            }
            .top-warpper {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 30px;
              justify-content: space-between;
              align-items: center;
              background-color: #fff;
              display: none;
              span {
                margin: 0px 10px;
                color: $theme-color;
                font-size: 14px;
              }
            }
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
            &.crrent {
              border: 1px solid $theme-color;
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