<template>
  <div class="form-notice-warpper">
    <div class="component-style">
      <div class="title">
        <span>选择风格</span>
      </div>
      <div class="style-warpper">
        <img :src="styleImg" alt />
        <div class="style-change" @click.stop="styleDialogShow">修改风格</div>
      </div>
    </div>
    <div class="notice-warpper">
      <div class="title">公告信息</div>
      <div class="notice-input">
        <el-input v-model="localForm.notice" ></el-input>
      </div>
    </div>
    <div class="padding-warpper">
      <div class="title">上下边距</div>
      <div class="change-padding">
        <el-slider v-model="localForm.padding" :max="50"></el-slider>
        <span>{{localForm.padding}}px</span>
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
import { shopComponentsNoticeInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LDialog from "../../public/l-dialog.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //风格图片
      styleImg: "",
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsNoticeInit)),
      //样式图片数组
      stypeImgArr: ["notice,style1.png", "notice,style2.png"],
      //当前风格
      styleIndex: 0
    };
  },
  methods: {
    //初始化表单
    _initForm() {
      this.getStyleImg();
    }
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  },
  components: {
    LDialog
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.form-notice-warpper {
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
  .component-style {
    .style-warpper {
      margin-top: 20px;
      border-radius: 5px;
      background: #f6f7f9;
      border: 1px solid #eee;
      text-align: center;
      position: relative;
      .style-change {
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
      }
    }
  }
  .notice-warpper {
    .notice-input {
      margin-top: 20px;
    }
  }

  .padding-warpper {
    .change-padding {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .el-slider {
        margin-left: 10px;
        width: 200px;
        flex-shrink: 0;
      }
      span {
        width: 56px;
        margin-left: 20px;
        background: #f6f7f9;
        text-align: center;
        height: 26px;
        line-height: 26px;
        border-radius: 5px;
        font-size: 12px;
      }
    }
  }

  .stype-dialog-warpper {
    padding: 16px;
    padding-bottom: 0px;
    .cu-list {
      display: flex;
      flex-wrap: wrap;
      .cu-item {
        cursor: pointer;
        width: 33%;
        text-align: center;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
        &.current {
          .img-warpper {
            border-color: $theme-color;
            .el-icon-success {
              display: block;
            }
          }
        }
        .img-warpper {
          border-radius: 5px;
          margin: 0px 20px;
          margin-bottom: 10px;
          border: 1px solid $border-color;
          background-color: #f7f8fa;
          position: relative;
          img {
            width: 100%;
          }
          .el-icon-success {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 17px;
            transform: translate(50%, 50%);
            color: $theme-color;
            display: none;
          }
        }
        & > span {
          font-size: 13px;
        }
      }
    }
  }
}
</style>