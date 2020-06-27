<template>
  <div class="l-dialog-warpper">
    <el-dialog
      :title="title"
      :visible.sync="dialogShow"
      :close-on-click-modal="false"
      append-to-body
      class="l-dialog"
    >
      <div class="dialog-body">
        <div class="dialog-category">
          <slot name="category"></slot>
        </div>
        <div class="dialog-scroll">
          <el-scrollbar>
            <slot></slot>
          </el-scrollbar>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" v-if="hasCustomFooter">
        <slot name="footer"></slot>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="hide" size="medium">取消</el-button>
        <el-button type="primary" @click="confirm" size="medium"
          >确定</el-button
        >
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
    //标题
    title: {
      type: String,
      default: ""
    },
    //是否自定义按钮
    hasCustomFooter: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //显示弹窗
    show() {
      this.dialogShow = true;
    },
    //隐藏弹窗
    hide() {
      this.dialogShow = false;
    },
    //确认
    confirm() {
      this.$emit("confirm");
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.l-dialog {
  ::v-deep .el-dialog {
    width: 908px;
    height: 590px;
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
      height: 473px;
      flex-shrink: 0;
      .dialog-body {
        display: flex;
        height: 100%;
        .dialog-category {
          flex-shrink: 0;
          height: 100%;
        }
        .dialog-scroll {
          flex: 1;
          .el-scrollbar {
            height: 100%;
            .el-scrollbar__wrap {
              height: 100%;
              overflow-x: hidden;
            }
          }
        }
      }
    }
    .el-dialog__footer {
      border-top: 1px solid $border-color;
      flex-shrink: 0;
      padding: 0px 20px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .dialog-footer {
        width: 100%;
      }
    }
  }
}
</style>
