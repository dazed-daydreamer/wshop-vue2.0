<template>
  <div class="blacklist-dialog-warpper">
    <el-dialog :visible.sync="visible" width="600px" :before-close="hide">
      <div slot="title">
        <span>黑名单限制行为</span>
      </div>

      <div>
        <span>限制行为</span>
        <el-checkbox-group v-model="blacklistForm.behavior">
          <el-checkbox label="0">
            下单
          </el-checkbox>
          <el-checkbox label="1">
            评论
          </el-checkbox>
        </el-checkbox-group>
      </div>

      <div>
        <span>拉黑原因</span>
        <el-input
          type="textarea"
          placeholder="可以备注拉黑原因，比如：退货率为95%，最多50字"
          v-model="blacklistForm.remarks"
          resize="none"
          maxlength="50"
          show-word-limit
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //黑名单弹窗
      visible: false,
      //黑名单表单
      blacklistForm: {
        behavior: []
      }
    };
  },
  methods: {
    //黑名单弹窗显示
    //form      编辑的表单
    show(form) {
      if (form) {
        this.blacklistForm = form;
      }
      this.visible = true;
    },
    //黑名单弹窗隐藏
    hide() {
      this.visible = false;
      this.blacklistForm = {
        behavior: []
      };
    },
    //黑名单弹窗确认
    confirm() {
      this.$message({
        message: "处理成功",
        type: "success"
      });
      this.$emit("blacklistConfirm", this.blacklistForm);
      this.hide();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.blacklist-dialog-warpper {
  ::v-deep .el-dialog {
    .el-dialog__header {
      div {
        text-align: left;
        span:nth-of-type(1) {
          font-size: 13px;
          font-weight: bold;
        }
        span:nth-of-type(2) {
          font-size: 12px;
          color: $secondary-text-color;
        }
      }
    }
    .el-dialog__body {
      padding: 20px;
      text-align: left;
      & > div {
        &:nth-of-type(2) {
          margin-top: 20px;
        }
        & > span {
          display: inline-block;
          margin-bottom: 15px;
          font-size: 12px;
        }
      }
      .el-checkbox {
        .el-checkbox__label {
          font-size: 13px;
        }
      }
      .el-textarea {
        font-size: 13px;
        .el-textarea__inner {
          height: 200px;
        }
      }
    }
  }
}
</style>
