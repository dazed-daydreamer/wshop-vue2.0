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
        <ul class="cube-row" v-for="(row,rowIndex) in this.cubeLayoutArr" :key="rowIndex">
          <li
            class="cube-item"
            v-for="(item,itemIndex) in row"
            :key="itemIndex"
            @click="lockingCube(item)"
            @mouseenter="hoverCube(item)"
            :class="{'item-selected':item.select}"
          >
            <span>+</span>
          </li>
        </ul>

        <div class="locking-item" v-for="(item,index) in layoutArr" :key="index">{{item}}</div>
      </div>
    </div>

    <l-dialog ref="stypeDialog" title="风格选择器" @confirm="styleConfirm" class="dialog">
      <div class="stype-dialog-warpper">
        <ul class="cu-list">
          <li
            v-for="(item,index) in stypeImgArr"
            :key="index"
            class="cu-item"
            :class="{current:styleIndex === index}"
            @click="styleChange(index)"
          >
            <div class="img-warpper">
              <span class="el-icon-success"></span>
              <img :src="require(`assets/images/${
              item
      }`)" alt />
            </div>
            <span>风格{{index+1}}</span>
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
      //开始坐标
      startCoordinate: {},
      //布局数组
      layoutArr: [],
      //魔方布局多维数组
      cubeLayoutArr: []
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
    //初始化表单
    _initForm() {
      this.getStyleImg();
      this._initCubeLayoutArr();
    },
    //方块被点击
    lockingCube(item) {
      this.clickState = !this.clickState;
      if (this.clickState) {
        this.$set(item, "select", true);
        this.startCoordinate = JSON.parse(JSON.stringify(item));
      } else {
        this.cubeLayoutArr.forEach(rowItem => {
          rowItem.forEach(cubeItem => {
            this.$set(cubeItem, "select", false);
          });
        });
        console.log(this.startCoordinate, item);
      }
    },
    //鼠标移入方块
    hoverCube(cubeItem) {
      if (!this.clickState) {
        return;
      }
      if (cubeItem.x === this.startCoordinate.x) {
        this.cubeLayoutArr.forEach((rowItem, rowIndex) => {
          if (rowIndex == cubeItem.x) {
            rowItem.forEach(item => {
              if (item.y <= cubeItem.y && item.y >= this.startCoordinate.y) {
                this.$set(item, "select", true);
              } else {
                this.$set(item, "select", false);
              }
            });
          } else {
            rowItem.forEach(item => {
              this.$set(item, "select", false);
            });
          }
        });
      } else {
        this.cubeLayoutArr.forEach((rowItem, rowIndex) => {
          if (rowIndex <= cubeItem.x && rowIndex >= this.startCoordinate.x) {
            rowItem.forEach(item => {
              if (item.y <= cubeItem.y && item.y >= this.startCoordinate.y) {
                this.$set(item, "select", true);
              } else {
                this.$set(item, "select", false);
              }
            });
          } else {
            rowItem.forEach(item => {
              this.$set(item, "select", false);
            });
          }
        });
      }
    },
    //初始化魔方布局多维数组
    _initCubeLayoutArr() {
      for (let i = 0; i < 4; i++) {
        let arr = [];
        for (let j = 0; j < 4; j++) {
          let item = {
            x: i,
            y: j,
            select: false
          };
          arr.push(item);
        }
        this.cubeLayoutArr.push(arr);
      }
    }
  },
  components: {
    LDialog
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
      .cube-row {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
        margin-top: 20px;
        &:nth-last-of-type(1) {
          .cube-item {
            border-right: 1px solid #e5e5e5;
          }
        }
        .cube-item {
          width: 77px;
          height: 77px;
          background: #f8f8f8;
          border-left: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          line-height: 77px;
          text-align: center;
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
    }
  }
}
</style>