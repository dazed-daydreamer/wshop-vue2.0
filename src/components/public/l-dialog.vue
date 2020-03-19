<template>
  <div class="l-dialog-warpper">
    <el-dialog :title="title" :visible.sync="dialogShow">
      <el-scrollbar>
        <slot></slot>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide" size="medium">取 消</el-button>
        <el-button type="primary" @click="hide" size="medium">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialogShow: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    show() {
      this.dialogShow = true;
    },
    hide() {
      this.dialogShow = false;
    }
  }
};
</script>


<style lang="scss">
@import "@/styles/theme.scss";
.l-dialog-warpper {
  .el-dialog {
    width: 908px;
    height: 713px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    .el-dialog__header {
      border-bottom: 1px solid $border-color;
      padding: 8px 20px;
      height: 40px;
      flex-shrink: 0;
      .el-dialog__title {
        line-height: 40px;
        font-size: 14px;
      }
    }
    .el-dialog__body {
      padding: 0px;
      height: 596px;
      flex-shrink: 0;
    }
    .el-dialog__footer {
      border-top: 1px solid $border-color;
      flex-shrink: 0;
      padding: 0px 20px;
      height: 60px;
      line-height: 60px;
    }
  }
}
</style>