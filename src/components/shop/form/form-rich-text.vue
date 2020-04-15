<template>
  <div class="form-rich-text-warpper shop-template-form">
    <div class="color-style">
      <div class="title">
        <span>颜色选择</span>
      </div>
      <div class="color-select">
        <div>
          <span>背景</span>
          <el-color-picker
            v-model="localForm.backgroundColor"
            @change="colorChange($event,'backgroundColor')"
          ></el-color-picker>
          <span>{{localForm.backgroundColor}}</span>
        </div>
      </div>
    </div>
    <div class="padding-warpper">
      <div class="title">上下边距</div>
      <div class="change-padding">
        <el-slider v-model="localForm.margin" :max="50"></el-slider>
        <span>{{localForm.margin}}px</span>
      </div>
    </div>
    <div class="text-warpper">
      <div class="ckeditor5-box">
        <ckeditor :editor="editor" v-model="localForm.content" :config="editorConfig"></ckeditor>
      </div>
    </div>
  </div>
</template>

<script>
import { shopComponentsRichTextInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsRichTextInit)),
      // 编辑器组件需要获取编辑器实例
      editor: ClassicEditor,
      //编辑器配置
      editorConfig: {
        language: "zh-cn",
        toolbar: [
          "heading", //段落
          "|", //分隔
          "alignment",
          "bold", //加粗
          "italic", //倾斜
          "bulletedList", //项目列表
          "numberedList", //编号列表
          "blockQuote", //块引用
          "undo", //撤销
          "redo", //重做
          "imageUpload" //插入图像
        ] //工具栏显示
      }
    };
  },
  props: {
    //父组件传过来的表单
    form: {
      type: Object,
      default: {}
    }
  },
  components: {
    ckeditor: CKEditor.component
  }
};
</script>


<style lang="scss">
.form-rich-text-warpper {
  .text-warpper {
    padding: 0px !important;
    .ckeditor5-box {
      overflow: hidden;
      .ck-toolbar {
        border: none;
      }
      .ck-editor__main {
        height: 500px;
        .ck-content {
          height: 100%;
          border: none;
        }
      }
    }
  }
}
</style>