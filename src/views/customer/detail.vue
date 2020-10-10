<template>
  <main-scroll>
    <div class="customer-detail-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="user-info-warpper">
          <div class="avatar">
            <el-image
              :src="detail.avatar"
              fit="cover"
              v-if="detail.avatar"
            ></el-image>
            <img src="@/assets/images/avatar.png" v-else alt="" />
          </div>
          <div class="info">
            <div>
              <ul>
                <li>
                  <span>昵称:</span>
                  <span>
                    暂未授权
                  </span>
                </li>
                <li>
                  <span>客户编号:</span>
                  <span>
                    {{ detail.id }}
                  </span>
                </li>
                <li>
                  <span> 成为客户时间:</span>
                  <span>{{ detail.addDate }}</span>
                </li>
                <li>
                  <span>客户渠道:</span>
                  <span>
                    公众号
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <el-button plain size="mini" @click="couponDialogShow"
                >送优惠卷</el-button
              >
              <el-button plain size="mini" @click="freezePrompt"
                >冻结</el-button
              >
              <el-button plain size="mini" @click="labelDialogShow"
                >打标签</el-button
              >
            </div>
          </div>
        </div>
        <div class="label-warpper">
          <span>标签:</span>
          <ul>
            <li v-for="(item, index) in labelListName" :key="index">
              <span>{{ item }}</span>
              <el-popconfirm
                title="确认删除标签吗？"
                @onConfirm="deleteLabelNameItem(index)"
              >
                <span class="el-icon-close" slot="reference"></span>
              </el-popconfirm>
            </li>
          </ul>
        </div>
        <div class="consumption-and-assets-warpper">
          <div>
            <div class="title">
              消费信息
            </div>
            <div>
              <ul>
                <li>
                  <div class="title">最近消费</div>
                  <div>
                    <span>最近消费时间：</span>
                    <span>--</span>
                  </div>
                  <div>
                    <span>最近消费金额：</span>
                    <span>¥0.00</span>
                  </div>
                </li>
                <li>
                  <div class="title">累计消费&售后</div>
                  <div>
                    <span>总消费金额：</span>
                    <span>¥0.00</span>
                  </div>
                  <div>
                    <span>总消费次数：</span>
                    <span>0</span>
                  </div>
                  <div>
                    <span>总售后金额：</span>
                    <span>¥0.00</span>
                  </div>
                  <div>
                    <span>总售后次数：</span>
                    <span>0</span>
                  </div>
                </li>
                <li>
                  <div class="title">消费分析</div>
                  <div>
                    <span>消费力：</span>
                    <span>0.00</span>
                  </div>
                  <div>
                    <span>连带率：</span>
                    <span>0.00</span>
                  </div>
                  <div>
                    <span>平均折扣：</span>
                    <span>0.00</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div class="title">
              账户资产
            </div>
            <div>
              <ul>
                <li>
                  <div class="title">积分</div>
                  <div>
                    <span>当前积分：</span>
                    <span>0</span>
                  </div>
                  <div>
                    <span>冻结积分：</span>
                    <span>0</span>
                  </div>
                  <div>
                    <span>累计积分：</span>
                    <span>0</span>
                  </div>
                </li>
                <li>
                  <div class="title">优惠卷</div>
                  <div>
                    <span>未使用：</span>
                    <span>0张</span>
                  </div>
                  <div>
                    <span>已使用：</span>
                    <span>0张</span>
                  </div>
                  <div>
                    <span>已过期：</span>
                    <span>0张</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        :visible.sync="couponDialogVisible"
        width="900px"
        class="coupon-dialog"
        :before-close="couponDialogHide"
      >
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
          <el-button @click="couponDialogHide" size="small">取 消</el-button>
          <el-button type="primary" @click="couponDialogConfirm" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <el-dialog
        :visible.sync="labelDialogVisible"
        width="600px"
        class="label-dialog"
        :before-close="labelDialogHide"
      >
        <div slot="title">
          <span>选择标签</span>
          <span>（最多可选择20个标签，请在客户-客户标签中添加标签）</span>
        </div>
        <div class="search-key-work">
          <el-input
            placeholder="请输入标签名关键字"
            v-model="labelKeyWork"
            size="small"
          >
            <el-button slot="append" type="text">搜索</el-button>
          </el-input>
        </div>
        <div class="search-list">
          <div v-if="labelList.length === 0">
            暂无数据
          </div>
          <div v-else>
            <ul>
              <li
                v-for="(item, index) in labelList"
                :key="index"
                @click="changeLabelActive(item.id)"
              >
                <el-tag
                  effect="plain"
                  :type="checkIsActive(item.id) ? '' : 'info'"
                >
                  {{ item.name }}
                </el-tag>
              </li>
            </ul>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="labelDialogHide" size="small">取 消</el-button>
          <el-button type="primary" @click="labelDialogConfirm" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </main-scroll>
</template>

<script>
import { publicMixins } from "@/mixins/public-mixins.js";
import MainScroll from "components/public/main-scroll.vue";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //客户详情
      detail: {},
      //优惠卷列表
      couponTableData: [],
      //弹窗是否显示
      couponDialogVisible: false,
      //优惠卷筛选列表
      couponFilterForm: {},
      //已选优惠卷表格数据
      selectCouponTableData: [],
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
      ],
      //客户标签弹窗
      labelDialogVisible: false,
      //客户标签列表搜索关键词
      labelKeyWork: "",
      //客户标签列表
      labelList: [],
      //客户标签弹窗类型
      labelType: "0",
      //当前已选的客户标签列表
      activeLabelList: [],
      //标签名数组
      labelListName: []
    };
  },
  created() {
    this.detail = JSON.parse(this.decrypt(this.$route.query.detail));
    this.getCouponList();
    this.getLabelList();
    this.getLabelListName();
  },
  methods: {
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
      if (parseInt(val) > parseInt(item.stock)) {
        this.$set(item, "receive", "");
        this.$message({
          showClose: true,
          message: "发放优惠卷张数大于优惠卷库存数",
          type: "error"
        });
        return;
      }
    },
    //优惠卷弹窗显示
    couponDialogShow() {
      // this.couponDialogVisible = true;
    },
    //优惠卷弹窗关闭
    couponDialogHide() {
      this.$refs.couponTable.clearSelection();
      this.couponDialogVisible = false;
      this.couponFilterForm = {};
    },
    //优惠卷弹窗确认
    couponDialogConfirm() {},
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
    //客户标签弹窗显示
    labelDialogShow() {
      this.activeLabelList = [].concat(this.detail.lebal);
      this.labelDialogVisible = true;
    },
    //客户标签弹窗关闭
    labelDialogHide() {
      this.labelDialogVisible = false;
      this.activeLabelList = [];
      this.labelType = "0";
    },
    //获取标签列表
    getLabelList() {
      this.labelList = [
        {
          id: "0",
          name: "沉默客户"
        },
        {
          id: "1",
          name: "发展客户"
        },
        {
          id: "2",
          name: "成熟客户"
        },
        {
          id: "3",
          name: "重要客户"
        }
      ];
    },
    //客户标签弹窗确认
    labelDialogConfirm() {
      this.$message({
        message: "处理成功",
        type: "success"
      });
      this.$set(this.detail, "lebal", [].concat(this.activeLabelList));
      this.getLabelListName();
      this.labelDialogHide();
    },
    //删除客户标签
    //index   标签的索引
    deleteLabelNameItem(index) {
      this.labelListName.splice(index, 1);
    },
    //返回标签名数组
    getLabelListName() {
      let temList = [];
      this.detail.lebal.forEach(item => {
        const index = this.labelList.findIndex(
          labelItem => labelItem.id === item
        );
        if (index != -1) {
          temList.push(this.labelList[index].name);
        }
      });
      this.labelListName = temList;
    },
    //查看是否已被选择
    //id      查看的id
    checkIsActive(id) {
      const index = this.activeLabelList.findIndex(item => item === id);
      return index === -1 ? false : true;
    },
    //改变选项当前是否已被选中
    //id      选项id
    changeLabelActive(id) {
      const index = this.activeLabelList.findIndex(item => item === id);
      if (index === -1) {
        if (this.activeLabelList.length < 20) {
          this.activeLabelList.push(id);
        }
      } else {
        this.activeLabelList.splice(index, 1);
      }
    },
    //冻结提示
    freezePrompt() {
      this.$confirm("冻结后将无法使用积分, 是否继续?", "冻结客户", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "冻结成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消冻结"
          });
        });
    }
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.customer-detail-warpper {
  margin-bottom: 20px;
  .gray-bg-warpper {
    .user-info-warpper {
      min-height: 140px;
      padding: 10px;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
      align-items: center;
      .avatar {
        width: 120px;
        height: 120px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        padding-right: 20px;
        padding-left: 30px;
        & > div:nth-of-type(1) {
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              display: flex;
              width: 33%;
              font-size: 12px;
              margin-bottom: 17px;
              align-items: center;
              span:nth-of-type(1) {
                font-weight: bold;
              }
              span:nth-of-type(2) {
                margin-left: 5px;
              }
            }
          }
        }
        & > div:nth-of-type(2) {
          display: flex;
          .el-button {
            border-color: #2589ff !important;
            color: #2589ff !important;
          }
        }
      }
    }
    .label-warpper {
      margin-top: 10px;
      padding: 20px 30px 10px 30px;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
      font-size: 12px;
      & > span {
        line-height: 26px;
        margin-bottom: 10px;
      }
      ul {
        margin-left: 10px;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        li {
          border: 1px solid #e3e2e5;
          margin-right: 10px;
          margin-bottom: 10px;
          padding-left: 12px;
          padding-right: 5px;
          border-radius: 5px;
          line-height: 24px;
          display: flex;
          align-items: center;
          .el-icon-close {
            width: 24px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
    .consumption-and-assets-warpper {
      display: flex;
      margin-top: 10px;
      border-radius: 4px;
      overflow: hidden;
      & > div {
        flex: 1;
        padding: 20px;
        background-color: #fff;
        text-align: left;
        &:nth-of-type(1) {
          margin-right: 10px;
        }
        & > div {
          &.title {
            font-size: 16px;
            font-weight: bold;
            text-align: center;
          }
          ul {
            li {
              padding-top: 10px;
              padding-bottom: 8px;
              & > div {
                &.title {
                  font-weight: bold;
                  font-size: 14px;
                }
                span {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
  ::v-deep .coupon-dialog {
    .el-dialog {
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

  ::v-deep .label-dialog {
    .el-dialog {
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
        .search-key-work {
          display: flex;
          justify-content: flex-end;
          .el-input {
            width: 250px;
          }
        }
        .search-list {
          margin-top: 15px;
          padding: 20px;
          font-size: 12px;
          border: 1px solid #e3e2e5;
          border-radius: 5px;
          ul {
            display: flex;
            align-items: center;
            li {
              min-width: 80px;
              margin-right: 10px;
              margin-bottom: 10px;
              cursor: pointer;
              .el-tag {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
