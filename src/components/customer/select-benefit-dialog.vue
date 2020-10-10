<template>
  <div class="select-benefit-dialog-warpper">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="close"
    >
      <div slot="title">
        <span>选择权益</span>
      </div>
      <div class="content">
        <ul>
          <li>
            <div>
              <span>权益规则名称</span>
            </div>
            <div>
              <span>操作</span>
            </div>
          </li>
          <div v-if="benefitList.length > 0">
            <li
              v-for="(item, index) in benefitList"
              :key="index"
              class="benefit-item"
            >
              <div>
                <span>{{ item.name }}</span>
              </div>
              <div>
                <el-button type="text" size="small">选择</el-button>
              </div>
            </li>
          </div>
          <li v-else class="empty">
            <div>
              <span>暂无数据</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="page">
        <span>已选0条,共2条,当前为第1页</span>
        <el-pagination
          background
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small"
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
      dialogVisible: false,
      benefitList: []
    };
  },
  created() {
    this.getBenefitList();
  },
  methods: {
    //弹窗显示
    show() {
      this.dialogVisible = true;
    },
    //弹窗关闭
    close() {
      this.dialogVisible = false;
    },
    //获取权益列表
    getBenefitList() {
      this.benefitList = [
        {
          name: "优先发货",
          id: 0
        },
        {
          name: "急速售后",
          id: 1
        },
        {
          name: "商品折扣",
          id: 2
        },
        {
          name: "急速客服",
          id: 3
        },
        {
          name: "消费折扣",
          id: 4
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.select-benefit-dialog-warpper {
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
      .content {
        width: 100%;
        border-radius: 4px;
        border: 1px solid #e3e2e5;
        ul {
          li {
            height: 40px;
            display: flex;
            align-items: center;
            span {
              font-size: 12px;
            }
            & > div:nth-of-type(1) {
              padding: 0px 20px;
              flex: 1;
            }
            & > div:nth-of-type(2) {
              width: 80px;
              flex-shrink: 0;
            }
            &.benefit-item {
              border-top: 1px solid #e3e2e5;
            }
            &.empty {
              border-top: 1px solid #e3e2e5;
              text-align: center;
            }
          }
        }
      }
      .page {
        display: flex;
        padding: 0px 10px;
        justify-content: space-between;
        align-items: center;
        margin-top: 25px;
        & > span {
          font-size: 13px;
          color: #909399;
        }
        .el-pagination {
          display: flex;
          align-items: center;
          ul {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
