<template>
  <div class="form-cube-warpper shop-template-form">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>

    <div class="cube-layout">
      <div class="title">
        <span>魔方布局</span>
      </div>
      <div class="setting-layout">
        <ul
          class="cube-row"
          v-for="(row, rowIndex) in this.cubeLayoutArr"
          :key="rowIndex"
        >
          <li
            class="cube-item"
            v-for="(item, itemIndex) in row"
            :key="itemIndex"
            @click="lockingCube(item)"
            @mouseenter="hoverCube(item)"
            :class="{ 'item-selected': item.select }"
            :style="{ width: `${cubeItemSize}px`, height: `${cubeItemSize}px` }"
          >
            <span>+</span>
          </li>
        </ul>

        <div
          class="locking-item"
          v-for="(item, index) in layoutArr"
          :key="`locking-${index}`"
          :style="{
            top: `${item.top * cubeItemSize}px`,
            left: `${item.left * cubeItemSize}px`,
            width: `${item.width * cubeItemSize}px`,
            height: `${item.height * cubeItemSize}px`
          }"
          @click.stop="layoutItemSelect(index)"
          :class="{ select: layoutItemSelectIndex === index }"
        >
          <el-image :src="item.img" fit="cover" v-if="item.img"></el-image>
          <div class="size" v-else>
            <span>{{ item.markWidth }}</span>
            <span>*</span>
            <span>{{ item.markHeight }}</span>
          </div>
          <div
            class="close"
            @click.stop="layoutItemDelete(index)"
            v-if="localForm.style === 0"
          >
            <span class="el-icon-close"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="cube-image" v-if="layoutItemSelectIndex != -1">
      <div class="image-warpper">
        <div>
          <span>图片</span>
          <div class="image-box">
            <el-image
              :src="layoutArr[layoutItemSelectIndex].img"
              fit="cover"
              v-if="
                layoutArr.length &&
                  layoutArr[layoutItemSelectIndex] &&
                  layoutArr[layoutItemSelectIndex].img
              "
            ></el-image>
            <div class="blank" @click="addPictures" v-else>
              <span class="el-icon-plus"></span>
            </div>
            <div
              class="close"
              v-if="
                layoutArr.length &&
                  layoutArr[layoutItemSelectIndex] &&
                  layoutArr[layoutItemSelectIndex].img
              "
              @click="delPictures"
            >
              <span class="el-icon-close"></span>
            </div>
          </div>
        </div>
        <div>
          <span>链接</span>
          <div class="link">
            <span class="el-icon-link"></span>
            <!-- <span v-if="item.url">{{item.url}}</span> -->
            <span>请选择链接</span>
          </div>
        </div>
      </div>
    </div>

    <div class="padding-warpper">
      <div class="title">图片间隔</div>
      <div class="change-padding">
        <el-slider v-model="localForm.clearance" :max="48"></el-slider>
        <span>{{ localForm.clearance }}px</span>
      </div>
    </div>

    <l-dialog
      ref="stypeDialog"
      title="风格选择器"
      @confirm="styleConfirm"
      class="dialog"
    >
      <div class="stype-dialog-warpper">
        <ul class="cu-list">
          <li
            v-for="(item, index) in stypeImgArr"
            :key="index"
            class="cu-item"
            :class="{ current: styleIndex === index }"
            @click="styleChange(index)"
          >
            <div class="img-warpper">
              <span class="el-icon-success"></span>
              <img :src="require(`assets/images/${item}`)" alt />
            </div>
            <span>风格{{ index + 1 }}</span>
          </li>
        </ul>
      </div>
    </l-dialog>
  </div>
</template>

<script>
import { shopComponentsCubeInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsCubeInit)),
      //风格图片
      styleImg: "",
      //样式图片数组
      stypeImgArr: [
        "cube,custom.png",
        "cube,style1.png",
        "cube,style2.png",
        "cube,style3.png",
        "cube,style4.png",
        "cube,style5.png",
        "cube,style6.png",
        "cube,style7.png",
        "cube,style8.png",
        "cube,style9.png",
        "cube,style10.png"
      ],
      //当前风格
      styleIndex: 0,
      //点击状态
      clickState: false,
      //魔方布局多维数组
      cubeLayoutArr: [],
      //开始坐标
      startCoordinate: {},
      //布局数组
      layoutArr: [],
      //布局模块被点击
      layoutItemSelectIndex: -1
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    //初始化表单
    _initForm() {
      this.getStyleImg();
      this._initCubeLayoutArr();
      if (this.localForm.chunks) {
        this.layoutArr = JSON.parse(JSON.stringify(this.localForm.chunks));
        this.layoutItemSelectIndex = 0;
      }
    },
    //方块被点击
    lockingCube(item) {
      this.clickState = !this.clickState;
      if (this.clickState) {
        this.$set(item, "select", true);
        this.startCoordinate = JSON.parse(JSON.stringify(item));
      } else {
        let topCoordinate = {};
        let bottomCoordinate = {};
        this.cubeLayoutArr.forEach(rowItem => {
          rowItem.forEach(cubeItem => {
            if (cubeItem.select) {
              this.$set(cubeItem, "lock", true);
              if (Object.values(bottomCoordinate).length) {
                if (cubeItem.x > bottomCoordinate.x) {
                  bottomCoordinate = {
                    x: cubeItem.x,
                    y: cubeItem.y
                  };
                }
                if (
                  cubeItem.x === bottomCoordinate.x &&
                  cubeItem.y > bottomCoordinate.y
                ) {
                  bottomCoordinate = {
                    x: cubeItem.x,
                    y: cubeItem.y
                  };
                }
              } else {
                bottomCoordinate = {
                  x: cubeItem.x,
                  y: cubeItem.y
                };
              }

              if (Object.values(topCoordinate).length) {
                if (cubeItem.x < bottomCoordinate.x) {
                  bottomCoordinate = {
                    x: cubeItem.x,
                    y: cubeItem.y
                  };
                }
                if (
                  cubeItem.x === bottomCoordinate.x &&
                  cubeItem.y < bottomCoordinate.y
                ) {
                  bottomCoordinate = {
                    x: cubeItem.x,
                    y: cubeItem.y
                  };
                }
              } else {
                topCoordinate = {
                  x: cubeItem.x,
                  y: cubeItem.y
                };
              }
            }
            this.$set(cubeItem, "select", false);
          });
        });
        const x = Math.abs(bottomCoordinate.x - topCoordinate.x) + 1;
        const y = Math.abs(bottomCoordinate.y - topCoordinate.y) + 1;
        const markWidth = x * 174;
        const markHeight = y * 174;
        const top = topCoordinate.y;
        const left = topCoordinate.x;
        this.layoutArr.push({
          height: y,
          width: x,
          top: top,
          left: left,
          markHeight,
          markWidth
        });
        const len = this.layoutArr.length;
        this.layoutItemSelectIndex = len - 1;
      }
    },
    //鼠标移入方块
    hoverCube(cubeItem) {
      if (!this.clickState) {
        return;
      }
      const current = this.checkHasLayou(this.startCoordinate, cubeItem);
      if (current) {
        this.cubeLayoutArr.forEach(rowItem => {
          rowItem.forEach(item => {
            const inside = this.checkIntervalInside(
              item.x,
              item.y,
              this.startCoordinate,
              cubeItem
            );
            if (inside) {
              this.$set(item, "select", true);
            } else {
              this.$set(item, "select", false);
            }
          });
        });
      }
    },
    //初始化魔方布局多维数组
    _initCubeLayoutArr() {
      let cubeArr = [];
      for (let i = 0; i < this.localForm.share; i++) {
        let arr = [];
        for (let j = 0; j < this.localForm.share; j++) {
          let item = {
            x: i,
            y: j,
            select: false,
            lock: false
          };
          arr.push(item);
        }
        cubeArr.push(arr);
      }
      this.cubeLayoutArr = cubeArr;
    },
    //布局模块点击
    layoutItemSelect(index) {
      this.layoutItemSelectIndex = index;
    },
    //布局模块删除
    layoutItemDelete(index) {
      this.layoutArr.splice(index, 1);
      this.layoutItemSelectIndex = index - 1;
    },
    //判断是否在该区间里面
    checkIntervalInside(x, y, start, last) {
      const minX = start.x >= last.x ? last.x : start.x;
      const maxX = minX === start.x ? last.x : start.x;
      const minY = start.y >= last.y ? last.y : start.y;
      const maxY = minY === start.y ? last.y : start.y;
      if (minX <= x && maxX >= x && minY <= y && maxY >= y) {
        return true;
      } else {
        return false;
      }
    },
    //判断将要形成的魔方是否可以通行
    checkHasLayou(start, last) {
      const minX = start.x >= last.x ? last.x : start.x;
      const maxX = minX === start.x ? last.x : start.x;
      const minY = start.y >= last.y ? last.y : start.y;
      const maxY = minY === start.y ? last.y : start.y;
      let current = true;
      this.cubeLayoutArr.forEach(rowItem => {
        rowItem.forEach(item => {
          if (
            minX <= item.x &&
            maxX >= item.x &&
            minY <= item.y &&
            maxY >= item.y &&
            item.lock
          ) {
            current = false;
          }
        });
      });
      return current;
    },
    //根据不用风格初始化布局模块
    checkstyleIndex() {
      this.layoutArr = [];
      if (this.localForm.style === 0) {
        this.layoutItemSelectIndex = -1;
      } else {
        this.layoutItemSelectIndex = 0;
      }
      if (this.localForm.style === 3 || this.localForm.style === 9) {
        if (this.localForm.share != 6) {
          this.localForm.share = 6;
          this._initCubeLayoutArr();
        }
      } else {
        if (this.localForm.share != 4) {
          this.localForm.share = 4;
          this._initCubeLayoutArr();
        }
      }
      switch (this.localForm.style) {
        case 1:
          this.layoutArr = [
            {
              markHeight: 351,
              markWidth: 700,
              width: 4,
              height: 2,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 700,
              width: 4,
              height: 2,
              top: 2,
              left: 0
            }
          ];
          break;
        case 2:
          this.layoutArr = [
            {
              markHeight: 700,
              markWidth: 351,
              width: 2,
              height: 4,
              top: 0,
              left: 0
            },
            {
              markHeight: 700,
              markWidth: 351,
              width: 2,
              height: 4,
              top: 0,
              left: 2
            }
          ];
          break;
        case 3:
          this.layoutArr = [
            {
              markHeight: 702,
              markWidth: 234,
              width: 2,
              height: 6,
              top: 0,
              left: 0
            },
            {
              markHeight: 702,
              markWidth: 234,
              width: 2,
              height: 6,
              top: 0,
              left: 2
            },
            {
              markHeight: 702,
              markWidth: 234,
              width: 2,
              height: 6,
              top: 0,
              left: 4
            }
          ];
          break;
        case 4:
          this.layoutArr = [
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 700,
              width: 4,
              height: 2,
              top: 2,
              left: 0
            }
          ];
          break;
        case 5:
          this.layoutArr = [
            {
              markHeight: 351,
              markWidth: 700,
              width: 4,
              height: 2,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 2,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 2,
              left: 2
            }
          ];
          break;
        case 6:
          this.layoutArr = [
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 0
            },
            {
              markHeight: 700,
              markWidth: 351,
              width: 2,
              height: 4,
              top: 0,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 2,
              left: 0
            }
          ];
          break;

        case 7:
          this.layoutArr = [
            {
              markHeight: 700,
              markWidth: 351,
              width: 2,
              height: 4,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 2,
              left: 2
            }
          ];
          break;

        case 8:
          this.layoutArr = [
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 2,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 2,
              left: 2
            }
          ];
          break;

        case 9:
          this.layoutArr = [
            {
              markHeight: 351,
              markWidth: 351,
              width: 3,
              height: 3,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 3,
              height: 3,
              top: 0,
              left: 3
            },
            {
              markHeight: 351,
              markWidth: 234,
              width: 2,
              height: 3,
              top: 3,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 234,
              width: 2,
              height: 3,
              top: 3,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 234,
              width: 2,
              height: 3,
              top: 3,
              left: 4
            }
          ];
          break;

        case 10:
          this.layoutArr = [
            {
              markHeight: 702,
              markWidth: 351,
              width: 2,
              height: 4,
              top: 0,
              left: 0
            },
            {
              markHeight: 351,
              markWidth: 351,
              width: 2,
              height: 2,
              top: 0,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 176,
              width: 1,
              height: 2,
              top: 2,
              left: 2
            },
            {
              markHeight: 351,
              markWidth: 176,
              width: 1,
              height: 2,
              top: 2,
              left: 3
            }
          ];
          break;
      }
    },
    //确认风格
    styleConfirm() {
      this.localForm.style = this.styleIndex;
      this.getStyleImg();
      this.checkstyleIndex();
    },
    //模块添加图片
    addPictures() {
      const img = require("@/assets/images/picture,style1.png");
      this.$set(this.layoutArr[this.layoutItemSelectIndex], "img", img);
    },
    //模块删除图片
    delPictures() {
      this.$set(this.layoutArr[this.layoutItemSelectIndex], "img", "");
    }
  },
  components: {
    LDialog
  },
  computed: {
    cubeItemSize() {
      return this.localForm.share === 4 ? 77 : 51;
    }
  },
  watch: {
    layoutArr: {
      deep: true,
      handler(val) {
        const arr = [];
        val.forEach(item => {
          arr.push({
            height: item.height,
            width: item.width,
            top: item.top,
            left: item.left,
            link: item.link ? item.link : "",
            img: item.img ? item.img : ""
          });
        });
        this.localForm.chunks = arr;
      }
    }
  }
};
</script>

<style lang="scss">
.form-cube-warpper {
  .cube-layout {
    .setting-layout {
      display: flex;
      align-items: center;
      position: relative;
      margin-top: 20px;
      .cube-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        &:nth-last-of-type(1) {
          .cube-item {
            border-right: 1px solid #e5e5e5;
          }
        }
        .cube-item {
          background: #f8f8f8;
          border-left: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          cursor: pointer;
          &.item-selected {
            background-color: #e8f7fd;
            & > span {
              display: none;
            }
          }
          &:nth-of-type(1) {
            border-top: 1px solid #e5e5e5;
          }
          span {
            font-size: 20px;
            color: #bbb;
          }
        }
      }
      .locking-item {
        position: absolute;
        border: 1px solid #bdf;
        z-index: 2;
        background-color: #e8f7fd;
        color: #88c4dc;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        &.select {
          z-index: 10;
          border: 1px solid #38f;
          .close {
            display: block;
          }
        }
        .el-image {
          width: 100%;
          height: 100%;
        }
        .close {
          z-index: 10;
          display: none;
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: rgba($color: #000000, $alpha: 0.5);
          border-radius: 50%;
          line-height: 20px;
          text-align: center;
          top: 0;
          right: 0;
          transform: translate(50%, -50%);
          cursor: pointer;
          span {
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
  }

  .cube-image {
    .image-warpper {
      margin-top: 20px;
      background: #f6f7f9;
      padding: 15px 20px;
      border: 1px solid #eee;
      color: #999;
      position: relative;
      div {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        span {
          font-size: 12px;
        }
        .link {
          border-radius: 4px;
          background-color: #e8effc;
          cursor: pointer;
          padding: 8px 12px;
          width: 210px;
          margin-left: 20px;
          span:nth-of-type(1) {
            margin-right: 10px;
          }
        }
        .image-box {
          margin-left: 20px;
          width: 50px;
          height: 50px;
          position: relative;
          border: 1px dashed #ededed;
          .el-image {
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }
          .blank {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            background-color: #fff;
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: center;
            span {
              font-size: 17px;
            }
          }
          &:hover {
            .close {
              display: block;
            }
          }
          .close {
            z-index: 10;
            display: none;
            position: absolute;
            width: 15px;
            height: 15px;
            background-color: rgba($color: #000000, $alpha: 0.5);
            border-radius: 50%;
            line-height: 15px;
            text-align: center;
            top: 0;
            right: 0;
            cursor: pointer;
            transform: scale(0.9) translate(60%, -60%);
            span {
              color: #fff;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
