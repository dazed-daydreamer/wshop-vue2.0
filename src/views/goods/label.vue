<template>
  <main-scroll>
    <div class="product-label-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="label-header">
          <div>
            <el-button plain size="small" @click="labelFormShow"
              >新增标签</el-button
            >
            <el-button plain size="small" @click="batchDlete"
              >批量删除</el-button
            >
          </div>
          <div>
            <el-input
              placeholder="请输入标签名称"
              size="small"
              v-model="keywork"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="label-table">
          <el-table
            :data="tableData"
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="name" label="标签名称"> </el-table-column>
            <el-table-column prop="goods" label="标签绑定商品书">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="labelFormShow(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="删除后无法恢复，确认将这些标签删除？"
                  @onConfirm="labelItemDelete(scope.row)"
                >
                  <el-button slot="reference" type="text" size="small"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <span>已选0条,共2条,当前为第1页</span>
        <el-pagination
          background
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      class="label-dialog"
      :before-close="labelFormClose"
      append-to-body
    >
      <div slot="title">
        <span>商品类目</span>
      </div>
      <el-form :rules="rules" :model="form" label-width="100px" ref="form">
        <el-form-item label="标签名称" prop="name">
          <el-input
            v-model="form.name"
            size="small"
            placeholder="最多5个字或10个字"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="labelFormClose" size="small">取 消</el-button>
        <el-button type="primary" @click="labelFormConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
export default {
  data() {
    return {
      //搜索关键词
      keywork: "",
      //表格数据
      tableData: [],
      //已选标签列表
      tableSelect: [],
      //弹窗状态
      dialogVisible: false,
      //表单验证规则
      rules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      },
      //添加修改标签表单
      form: {}
    };
  },
  created() {
    this.getLabelList();
  },
  methods: {
    //搜索
    search() {},
    //获取标签列表
    getLabelList() {
      this.tableData = [
        {
          id: 0,
          name: "最新",
          goods: "10"
        },
        {
          id: 1,
          name: "最热",
          goods: "0"
        },
        {
          id: 2,
          name: "清仓",
          goods: "20"
        },
        {
          id: 3,
          name: "特价",
          goods: "0"
        }
      ];
    },
    //多选标签操作
    handleSelectionChange(list) {
      this.tableSelect = list;
    },
    //标签弹窗显示
    //item   编辑标签的时候赋予已存在的具体值
    labelFormShow(item) {
      if (item) {
        this.form = item;
      } else {
        this.form = {};
      }

      this.dialogVisible = true;
    },
    //标签弹窗关闭
    labelFormClose() {
      this.$refs.form.clearValidate();
      this.dialogVisible = false;
    },
    //标签弹窗确认
    labelFormConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //标签删除
    //item    删除标签的具体值
    labelItemDelete(item) {
      console.log(item);
    },
    //批量删除
    batchDlete() {}
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.product-label-warpper {
  .gray-bg-warpper {
    padding-bottom: 50px;
    .label-header {
      height: 50px;
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 20px;
      & > div:nth-of-type(1) {
        & > .el-button:nth-of-type(1) {
          color: $theme-color;
          border-color: $theme-color;
        }
      }
      .el-input {
        width: 230px;
      }
    }
    .label-table {
      width: 100%;
      margin-top: 10px;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #e3e2e5;
      .el-table {
        width: 100%;
        font-size: 12px;
        span {
          & > .el-button {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.footer-btn {
  & > div {
    display: flex;
    padding: 0px 10px;
    justify-content: space-between;
    align-items: center;
    & > span {
      font-size: 13px;
      color: $secondary-text-color;
    }
    ::v-deep {
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
.label-dialog {
  .el-dialog__header {
    span {
      font-size: 14px;
      font-weight: bold;
    }
  }
  .el-dialog__body {
    .el-form {
      ::v-deep .el-form-item {
        .el-form-item__label {
          font-size: 13px;
        }
      }
    }
  }
}
</style>
