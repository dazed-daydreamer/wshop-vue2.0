<template>
  <div class="form-hot-warpper shop-template-form">
    <div class="hot-warpper">
      <div class="tips">建议图片宽度750，高度200-950，支持jpg、png。</div>
      <div class="hot-img">
        <img :src="localForm.img" alt v-if="localForm.img" />
        <img src="../../../assets/images/default_banner.png" alt v-else />
        <div class="hot-change">替换</div>
      </div>
      <div class="set-hot" @click="setHot">设置热区</div>
    </div>

    <l-dialog ref="hotDialog" title="热区编辑器" class="dialog" :hasCustomFooter="true">
      <div class="hot-dialog-warpper">
        <div class="introduce">
          <ul>
            <li v-for="(item,index) in introduceArr" :key="index">
              <span>{{index + 1}}</span>
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
        <div class="operation" ref="operation">
          <img :src="localForm.img" alt v-if="localForm.img" />
          <img src="../../../assets/images/default_banner.png" alt v-else />
          <div class="draggable-warpper">
            <vue-draggable-resizable
              :w="100"
              :h="100"
              @dragging="onDrag"
              @resizing="onResize"
              @activated="onActivated(index)"
              :parent="true"
              v-for="(item,index) in localForm.list"
              :key="index"
            >222</vue-draggable-resizable>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" size="medium" @click="addHot">添加热区</el-button>
        <el-button size="medium" @click="saveHot">保存</el-button>
      </div>
    </l-dialog>
  </div>
</template>


<script>
import { shopComponentsHotInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsHotInit)),
      //编辑介绍
      introduceArr: ["添加热区", "调整热区大小", "设置热区链接", "保存设置"],
      //正在被调整的热区
      activeIndex: 0
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  },
  methods: {
    //设置热区
    setHot() {
      this.$refs.hotDialog.show();
    },
    //保存热区
    saveHot() {
      const width = this.$refs.operation.clientWidth;
      const height = this.$refs.operation.clientHeight;
      // console.log(width, height);
      console.log(this.localForm.list);
      // this.$refs.hotDialog.hide();
    },
    //添加热区
    addHot() {
      this.localForm.list.push({
        url: "",
        x: "",
        y: "",
        width: 100,
        height: 100
      });
    },
    //热区放大缩小
    onResize(x, y, width, height) {
      const item = JSON.parse(
        JSON.stringify(this.localForm.list[this.activeIndex])
      );
      item.x = x;
      item.y = y;
      item.width = width;
      item.height = height;
      this.localForm.list.splice(this.activeIndex, 1, item);
    },
    //热区拖拽
    onDrag(x, y) {
      const item = JSON.parse(
        JSON.stringify(this.localForm.list[this.activeIndex])
      );
      item.x = x;
      item.y = y;
      this.localForm.list.splice(this.activeIndex, 1, item);
    },
    //拖拽或点击的时候触发
    onActivated(index) {
      this.activeIndex = index;
    }
  },
  components: {
    LDialog,
    VueDraggableResizable
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.form-hot-warpper {
  .hot-warpper {
    .hot-img {
      position: relative;
      img {
        width: 100%;
      }

      .hot-change {
        position: absolute;
        cursor: pointer;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 35px;
        line-height: 35px;
        background-color: rgba($color: #000000, $alpha: 0.4);
        color: #fff;
        font-size: 14px;
        text-align: center;
      }
    }

    .set-hot {
      cursor: pointer;
      display: flex;
      font-size: 13px;
      align-items: center;
      justify-content: center;
      border: 1px dashed #6b7685;
      padding: 7px;
      border-radius: 4px;
      margin-top: 20px;
    }
  }

  .hot-dialog-warpper {
    padding: 15px 20px;
    .introduce {
      ul {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          display: flex;
          align-items: center;
          font-size: 13px;
          span:nth-of-type(1) {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: rgb(217, 236, 255);
            color: $theme-color;
            text-align: center;
            margin: 0 10px;
            line-height: 26px;
          }
          span:nth-of-type(2) {
            margin-right: 10px;
          }
          &:not(:nth-last-of-type(1)) {
            margin-right: 20px;
          }
        }
      }
    }

    .operation {
      margin-top: 20px;
      border: 1px solid #e5e5e5;
      display: flex;
      position: relative;
      img {
        width: 100%;
      }
      .draggable-warpper {
        position: absolute;
        width: 100%;
        height: 100%;
        .draggable {
          background-color: rgb(217, 236, 255);
        }
      }
    }
  }
}
</style>