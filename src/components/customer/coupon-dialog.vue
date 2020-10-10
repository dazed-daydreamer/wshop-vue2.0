<template>
  <div class="coupon-dialog-warpper">
    <el-dialog :visible.sync="dialogVisible" width="900px" :before-close="hide">
      <div slot="title">
        <span>选择优惠券</span>
      </div>
      <div class="search-key-work">
        <el-select
          v-model="couponFilterForm.type"
          placeholder="全部类型"
          size="small"
          clearable
        >
          <el-option
            v-for="item in couponType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-input
          placeholder="请输入优惠卷标题"
          v-model="couponFilterForm.keyWork"
          size="small"
        >
          <el-button slot="append" type="text">搜索</el-button>
        </el-input>
      </div>
      <el-table
        :data="couponTableData"
        style="width: 100%"
        stripe
        class="coupon-table"
        max-height="400"
        @selection-change="couponHandleSelectionChange"
        ref="couponTable"
      >
        <el-table-column type="selection" width="55" fixed="left">
        </el-table-column>
        <el-table-column
          prop="name"
          label="优惠卷名称"
          min-width="180"
          fixed="left"
        >
        </el-table-column>
        <el-table-column prop="description" label="卷描述" min-width="180">
        </el-table-column>
        <el-table-column prop="date" label="优惠卷类型" width="180">
          <template slot-scope="scope">
            <span>{{ returnTableValue(couponType, scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="有限时间" width="180">
        </el-table-column>
        <el-table-column label="每人发放" width="200">
          <template slot-scope="scope">
            <el-input
              size="small"
              type="number"
              v-model="scope.row.receive"
              placeholder="请输入发放张数"
              @change="couponReceiveChange($event, scope.row)"
            >
              <template slot="append">张</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存数量" width="120">
        </el-table-column>
        <el-table-column prop="limit" label="每人限领" width="120">
        </el-table-column>
      </el-table>
      <div class="coupon-page">
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
        <el-button @click="hide" size="small">取 消</el-button>
        <el-button type="primary" @click="couponConfirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { publicMixins } from "@/mixins/public-mixins.js";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //优惠卷弹窗
      dialogVisible: false,
      //优惠卷搜索表单
      couponFilterForm: {},
      //优惠卷表格数据
      couponTableData: [],
      //已选优惠卷表格数据
      selectCouponTableData: [],
      //已选表格长度
      selectTableLength: 1,
      //优惠卷类型
      couponType: [
        {
          id: "0",
          name: "代金劵"
        },
        {
          id: "1",
          name: "折扣劵"
        },
        {
          id: "2",
          name: "兑换劵"
        }
      ]
    };
  },
  created() {
    this.getCouponList();
  },
  methods: {
    //优惠卷弹窗显示
    //len   需要满足的人数
    show(len = 1) {
      this.selectTableLength = len;
      this.dialogVisible = true;
    },
    //优惠卷弹窗隐藏
    hide() {
      this.$refs.couponTable.clearSelection();
      this.dialogVisible = false;
      this.couponFilterForm = {};
    },
    //优惠卷弹窗确认
    couponConfirm() {
      this.$emit("couponConfirm", this.selectCouponTableData);
      this.hide();
      this.$message({
        message: "处理成功",
        type: "success"
      });
    },
    //优惠卷表格选择
    //list      已选表格数组
    couponHandleSelectionChange(list) {
      this.selectCouponTableData = list;
    },
    //获取优惠卷列表
    getCouponList() {
      this.couponTableData = [
        {
          name: "满30减5",
          date: "2020.10.12 - 2021.11.02",
          type: "0",
          stock: "100",
          limit: "2",
          description: "描述描述描述米哦啊怙"
        },
        {
          name: "满30减5",
          date: "2020.10.12 - 2021.11.02",
          type: "0",
          stock: "10",
          limit: "100",
          description: "描述描述描述米哦啊怙"
        }
      ];
    },
    //优惠卷发放张数的改变
    //val    改变的值
    //item   改变优惠卷的具体值
    couponReceiveChange(val, item) {
      if (parseInt(val) > parseInt(item.limit)) {
        this.$set(item, "receive", "");
        this.$message({
          showClose: true,
          message: "发放优惠卷张数大于每人限领张数",
          type: "error"
        });
        return;
      }
      if (parseInt(val) * this.selectTableLength > parseInt(item.stock)) {
        this.$set(item, "receive", "");
        this.$message({
          showClose: true,
          message: "发放优惠卷张数大于优惠卷库存数",
          type: "error"
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.coupon-dialog-warpper {
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
      padding-bottom: 10px;
      .search-key-work {
        display: flex;
        justify-content: space-between;
        & > .el-input {
          width: 250px;
        }
        .el-select {
          width: 200px;
        }
      }
      .coupon-table {
        margin-top: 15px;
        font-size: 12px;
        border-radius: 5px;
        border: 1px solid #ebeef5;
        &::before {
          width: 0;
        }
        div {
          font-size: 13px;
        }
      }
      .coupon-page {
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
