<template>
  <div>
    <vue-ueditor-wrap
      :config="ueditorConfig"
      v-model="content"
    ></vue-ueditor-wrap>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  data() {
    return {
      //编辑器设置
      ueditorConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: this.ueditorHeight,
        // 初始容器宽度
        initialFrameWidth: "100%",
        //uditor文件地址
        UEDITOR_HOME_URL: "/uditor/"
      },
      //富文本内容
      content: ""
    };
  },
  props: {
    //编辑机高度
    ueditorHeight: {
      type: Number,
      default: 400
    },
    //已经存在的内容
    hasContent: {
      type: String,
      default: ""
    }
  },
  created() {
    this.content = this.hasContent;
  },
  components: {
    VueUeditorWrap
  },
  watch: {
    content() {
      this.$emit("editorChange", this.content);
    }
  }
};
</script>
