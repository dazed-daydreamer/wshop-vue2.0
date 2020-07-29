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
            @change="colorChange($event, 'backgroundColor')"
          ></el-color-picker>
          <span>{{ localForm.backgroundColor }}</span>
        </div>
      </div>
    </div>
    <div class="padding-warpper">
      <div class="title">上下边距</div>
      <div class="change-padding">
        <el-slider v-model="localForm.margin" :max="50"></el-slider>
        <span>{{ localForm.margin }}px</span>
      </div>
    </div>
    <div class="text-warpper">
      <div class="ckeditor5-box">
        <l-ueditor
          :content="localForm.content"
          @editorChange="editorChange"
        ></l-ueditor>
      </div>
    </div>
  </div>
</template>

<script>
import { shopComponentsRichTextInit } from "@/config/shop.js";
import { shopFormMixins } from "mixins/shop-form-mixins.js";
import LUeditor from "components/public/l-ueditor.vue";
export default {
  mixins: [shopFormMixins],
  data() {
    return {
      //本地表单
      localForm: JSON.parse(JSON.stringify(shopComponentsRichTextInit))
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
    //富文本内容改变
    //content  富文本内容
    editorChange(content) {
      this.localForm.content = content;
    }
  },
  components: {
    LUeditor
  }
};
</script>

<style lang="scss" scoped>
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
