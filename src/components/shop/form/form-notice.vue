<template>
  <div class="form-notice-warpper shop-template-form">
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
        <el-input v-model="localForm.notice"></el-input>
      </div>
    </div>
    <div class="padding-warpper">
      <div class="title">上下边距</div>
      <div class="change-padding">
        <el-slider v-model="localForm.padding" :max="50"></el-slider>
        <span>{{ localForm.padding }}px</span>
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
      default: () => {}
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
  .notice-warpper {
    .notice-input {
      margin-top: 20px;
    }
  }
}
</style>
