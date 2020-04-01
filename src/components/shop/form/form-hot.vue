<template>
  <div class="form-hot-warpper shop-template-form">
    <div class="hot-warpper">
      <div class="tips">建议图片宽度750，高度200-950，支持jpg、png。</div>
      <div class="hot-img" ref="listWarpper">
        <img :src="localForm.img" alt v-if="localForm.img" @load="loadEnd" />
        <img src="../../../assets/images/default_banner.png" alt v-else @load="loadEnd" />
        <div class="hot-change">替换</div>
        <ul v-if="listWarpper">
          <li
            v-for="(item,index) in localForm.list"
            :key="index"
            :style="{height:`${getFormHeight(item.height)}px`,width:`${getFormWidth(item.width)}px`,top:`${getFormHeight(item.y)}px`,left:`${getFormWidth(item.x)}px`}"
          >双击选择链接</li>
        </ul>
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
              @dragging="onDrag"
              @resizing="onResize"
              @activated="onActivated(index)"
              :parent="true"
              v-for="(item,index) in temporaryList"
              :key="index"
              :w="item.width"
              :h="item.height"
              :x="item.x"
              :y="item.y"
            >
              <div class="draggable-item" @dblclick="lineShow">
                <el-popconfirm title="确定删除吗？" @onConfirm="delHot(index)">
                  <div slot="reference" class="popconfirm-warpper">
                    <span class="el-icon-close"></span>
                  </div>
                </el-popconfirm>
                <span>双击添加链接</span>
              </div>
            </vue-draggable-resizable>
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
      activeIndex: -1,
      //临时热区列表
      temporaryList: [],
      //表单图片是否显示
      listWarpper: false
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
      this.$nextTick(() => {
        if (this.localForm.list.length) {
          const clientWidth = this.$refs.operation.clientWidth;
          const clientHeight = this.$refs.operation.clientHeight;
          const arr = [];
          this.localForm.list.forEach(item => {
            const x = clientWidth * item.x;
            const y = clientHeight * item.y;
            const width = clientWidth * item.width;
            const height = clientHeight * item.height;
            const obj = {
              x,
              y,
              width,
              height
            };
            arr.push(obj);
          });
          this.temporaryList = arr;
        }
      });
    },
    //保存热区
    saveHot() {
      const clientWidth = this.$refs.operation.clientWidth;
      const clientHeight = this.$refs.operation.clientHeight;
      const arr = [];
      this.temporaryList.forEach(item => {
        const x = item.x / clientWidth;
        const y = item.y / clientHeight;
        const width = item.width / clientWidth;
        const height = item.height / clientHeight;
        const obj = {
          x,
          y,
          width,
          height
        };
        arr.push(obj);
      });
      this.localForm.list = arr;
      this.$refs.hotDialog.hide();
      this.temporaryList = [];
    },
    //添加热区
    addHot() {
      this.temporaryList.push({
        url: "",
        x: 0,
        y: 0,
        width: 200,
        height: 200
      });
    },
    //热区放大缩小
    onResize(x, y, width, height) {
      const item = JSON.parse(
        JSON.stringify(this.temporaryList[this.activeIndex])
      );
      item.x = x;
      item.y = y;
      item.width = width;
      item.height = height;
      this.temporaryList.splice(this.activeIndex, 1, item);
    },
    //热区拖拽
    onDrag(x, y) {
      const item = JSON.parse(
        JSON.stringify(this.temporaryList[this.activeIndex])
      );
      item.x = x;
      item.y = y;
      this.temporaryList.splice(this.activeIndex, 1, item);
    },
    //拖拽或点击的时候触发
    onActivated(index) {
      this.activeIndex = index;
    },
    //选择链接
    lineShow() {
      console.log(2);
    },
    //删除热区
    delHot(index) {
      this.temporaryList.splice(index, 1);
    },
    //获取form表单上与宽度相关的尺寸
    getFormWidth(proportion) {
      const width = this.$refs.listWarpper.clientWidth;
      return width * proportion;
    },
    //获取form表单上与高度相关的尺寸
    getFormHeight(proportion) {
      const height = this.$refs.listWarpper.clientHeight;
      return height * proportion;
    },
    //图片加载完毕
    loadEnd() {
      this.listWarpper = true;
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
      display: flex;
      img {
        width: 100%;
      }

      ul {
        position: absolute;
        width: 100%;
        height: 100%;
        margin: 0;
        li {
          background-color: rgba(217, 236, 255, 0.6);
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
        }
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
        z-index: 10;
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
          background-color: rgba(217, 236, 255, 0.6);
          .draggable-item {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            & > span:nth-of-type(1) {
              position: absolute;
              top: 0px;
              right: 0px;
              .popconfirm-warpper {
                background-color: $theme-color;
                color: #fff;
                width: 20px;
                height: 20px;
                border-radius: 0px 0px 0px 100%;
                line-height: 19px;
                text-align: center;
                font-size: 12px;
                cursor: pointer;
                span {
                  margin-left: 4px;
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