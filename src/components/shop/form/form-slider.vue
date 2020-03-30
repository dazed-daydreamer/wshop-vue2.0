<template>
  <div class="form-slider-warpper">
    <div class="dot-style">
      <div class="title">
        <span>轮播点样式</span>
      </div>
      <div class="dot-change">
        <ul>
          <li
            v-for="(item,index) in radiusArr"
            :key="index"
            :class="{active:index === localForm.dotStyle}"
            @click="radiusChange(index)"
          >
            <img :src="require(`assets/images/${item}`)" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="dot-position">
      <div class="title">轮播点位置</div>
      <div class="position-change">
        <ul>
          <li
            v-for="(item,index) in titleArr"
            :key="index"
            :class="{active:index === localForm.positionStyle}"
            @click="titleChange(index)"
          >
            <img :src="require(`assets/images/${item}`)" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="slidet-list">
      <div class="title">轮播图片</div>
      <div class="tips">建议图片宽度750，高度420。要求一组内图片高度必须完全一致</div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in localForm.slider" :key="index">
            <div class="img-warpper">
              <img :src="item.img" alt v-if="item.img" />
              <img src="../../../assets/images/default_banner.png" alt v-else />
              <span>替换</span>
            </div>
            <div class="link-warpper" :class="{'has-url':item.url}">
              <span class="el-icon-link"></span>
              <span v-if="item.url">{{item.url}}</span>
              <span v-else>请选择链接</span>
            </div>
            <el-popconfirm title="确定删除吗？" @onConfirm="delConfirm(index)">
              <span class="el-icon-close" slot="reference"></span>
            </el-popconfirm>
          </li>
        </ul>

        <div class="add-list" @click="addList">
          <span>+添加 {{localForm.slider.length}}/8</span>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { shopComponentsSliderInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsSliderInit)),
      //边角样式
      radiusArr: ["dot.png", "round.png", "square.png"],
      //文字位置
      titleArr: ["left.png", "center.png", "right.png"]
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
    //确认删除
    // index  删除的索引
    delConfirm(index) {
      setTimeout(() => {
        this.localForm.slider.splice(index, 1);
      }, 200);
    },
    //轮播点样式改变
    radiusChange(index) {
      this.localForm.dotStyle = index;
    },
    //轮播点位置改变
    titleChange(index) {
      this.localForm.positionStyle = index;
    },
    //添加新轮播图
    addList() {
      if (this.localForm.slider.length >= 8) {
        return;
      }
      this.localForm.slider.push({
        url: "",
        img: ""
      });
    }
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.form-slider-warpper {
  text-align: left;
  & > div:not(.dialog) {
    padding: 20px 20px;
    border-top: 5px solid #f6f7f9;
    & > .title {
      font-size: 13px;
      font-weight: bold;
      span:nth-of-type(2) {
        font-size: 12px;
        font-weight: 400;
        margin-left: 5px;
        color: $secondary-text-color;
      }
    }
  }
  .dot-style {
    .dot-change {
      margin-top: 10px;
      ul {
        margin: 0;
        display: flex;
        li {
          border: 1px solid transparent;
          margin: 0px 10px;
          cursor: pointer;
          border-radius: 5px;
          &.active {
            border-color: $theme-color;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .dot-position {
    .position-change {
      margin-top: 10px;
      ul {
        margin: 0;
        display: flex;
        li {
          border: 1px solid transparent;
          margin: 0px 10px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 5px;
          &.active {
            border-color: $theme-color;
          }
        }
      }
    }
  }

  .slidet-list {
    .tips {
      border: 1px solid #d8e8fc;
      background-color: #e5f0fe;
      padding: 12px 16px;
      border-radius: 6px;
      color: #666;
      font-size: 12px;
      margin-bottom: 20px;
      line-height: 20px;
      margin-top: 20px;
    }
    .list {
      ul {
        margin: 0px;
        li {
          background: #f6f7f9;
          padding: 10px 20px 10px 10px;
          border: 1px solid #eee;
          color: #999;
          position: relative;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          &:hover {
            .el-icon-close {
              display: block;
            }
          }
          .img-warpper {
            width: 50px;
            height: 50px;
            background-color: #fff;
            border: 1px dashed #ededed;
            display: flex;
            align-items: center;
            position: relative;
            cursor: pointer;
            &:hover {
              span {
                display: block;
              }
            }
            img {
              width: 100%;
            }
            span {
              display: none;
              position: absolute;
              bottom: 0px;
              left: 0px;
              background-color: rgba($color: #000000, $alpha: 0.5);
              color: #fff;
              width: 100%;
              font-size: 12px;
              text-align: center;
              padding: 2px 0px;
            }
          }

          .link-warpper {
            background-color: #e8effc;
            padding: 8px 10px;
            margin-left: 14px;
            border-radius: 4px;
            flex: 1;
            font-size: 13px;
            cursor: pointer;
            .el-icon-link {
              font-size: 15px;
              margin-right: 10px;
            }
            &.has-url {
              color: #333;
            }
          }

          .el-icon-close {
            position: absolute;
            right: 3px;
            top: 3px;
            font-size: 15px;
            display: none;
            cursor: pointer;
          }
        }
      }
      .add-list {
        cursor: pointer;
        display: flex;
        font-size: 13px;
        align-items: center;
        justify-content: center;
        border: 1px dashed #6b7685;
        padding: 7px;
        border-radius: 4px;
      }
    }
  }
}
</style>