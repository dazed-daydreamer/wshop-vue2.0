<template>
  <div class="l-ckeditor-warpper">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import EssentialsPlugin from "@ckeditor/ckeditor5-essentials/src/essentials";
import BoldPlugin from "@ckeditor/ckeditor5-basic-styles/src/bold";
import ItalicPlugin from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import LinkPlugin from "@ckeditor/ckeditor5-link/src/link";
import ParagraphPlugin from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor";
import List from "@ckeditor/ckeditor5-list/src/list";
import Table from "@ckeditor/ckeditor5-table/src/table";
export default {
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        language: "zh-cn",
        plugins: [
          EssentialsPlugin,
          ParagraphPlugin,
          Heading,

          BoldPlugin,
          ItalicPlugin,
          Underline,
          Strikethrough,

          LinkPlugin,

          FontFamily,
          FontSize,
          FontColor,
          FontBackgroundColor,

          List,

          Alignment,

          Image,
          ImageCaption,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          ImageResize,
          Table
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "link",
            "|",
            "fontfamily",
            "fontsize",
            "fontcolor",
            "fontbackgroundcolor",
            "|",
            this.listShow ? "bulletedList" : "",
            this.listShow ? "numberedList" : "",
            "alignment",
            "|",
            "imageUpload",
            "insertTable"
          ]
        }
      }
    };
  },
  props: {
    listShow: {
      type: Boolean,
      default: true
    },
    content: {
      type: String,
      default: ""
    }
  },
  components: {
    ckeditor: CKEditor.component
  }
};
</script>


<style lang="scss">
</style>