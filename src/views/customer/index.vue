<template>
  <main-scroll>
    <div class="customer-all-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="all-filter-warpper">
          <div>
            <span>高级筛选</span>
            <el-switch v-model="filterShow"></el-switch>

            <el-select v-model="filterForm.customerKeyWorkType" size="small">
              <el-option
                v-for="item in customerKeyWorkType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-input v-model="filterForm.keyWork" size="small">
              <el-button
                slot="append"
                icon="el-icon-search"
                size="small"
                @click="search"
              ></el-button>
            </el-input>
          </div>
          <div>
            <span>客户标签</span>
            <ul>
              <li @click="removeAllLabelFilterList">
                <el-tag
                  size="medium"
                  :type="labelFilterList.length === 0 ? '' : 'info'"
                  >不限</el-tag
                >
              </li>
              <li v-for="(item, index) in labelFilterList" :key="index">
                <el-tag closable @close="deleTelabelFilterItem(index)">
                  {{ item.label }}
                </el-tag>
              </li>
              <li>
                <el-button plain size="small" @click="labelDialogShow('0')"
                  >添加</el-button
                >
              </li>
            </ul>
          </div>
          <div v-show="filterShow">
            <span>交易信息</span>
            <ul>
              <li>
                <span>最近消费时间</span>
                <div>
                  <el-date-picker
                    v-model="filterForm.consumeDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    size="small"
                  >
                  </el-date-picker>
                </div>
              </li>
              <li>
                <span>消费金额</span>
                <div>
                  <el-input
                    size="small"
                    v-model="filterForm.consumeAmountMin"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    size="small"
                    v-model="filterForm.consumeAmountMax"
                  ></el-input>
                </div>
              </li>
              <li>
                <span>消费次数</span>
                <div>
                  <el-input
                    size="small"
                    v-model="filterForm.consumeNumberMin"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    size="small"
                    v-model="filterForm.consumeNumberMax"
                  ></el-input>
                </div>
              </li>
              <li>
                <span>订单均价</span>
                <div>
                  <el-input
                    size="small"
                    v-model="filterForm.orderAveragePriceMin"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    size="small"
                    v-model="filterForm.orderAveragePriceMax"
                  ></el-input>
                </div>
              </li>
              <li>
                <span>平均折扣</span>
                <div>
                  <el-input
                    size="small"
                    v-model="filterForm.averageDiscountMin"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    size="small"
                    v-model="filterForm.averageDiscountMax"
                  ></el-input>
                </div>
              </li>
              <li>
                <span>连带率</span>
                <div>
                  <el-input
                    size="small"
                    v-model="filterForm.jointRateMin"
                  ></el-input>
                  <span>-</span>
                  <el-input
                    size="small"
                    v-model="filterForm.jointRateMax"
                  ></el-input>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <span>批量操作</span>
            <div>
              <el-button
                plain
                size="small"
                @click="labelDialogShow('1')"
                :disabled="selectTableData.length === 0"
                >打标签</el-button
              >
              <el-button
                plain
                size="small"
                :disabled="selectTableData.length === 0"
                @click="couponDialogShow"
                >送优惠卷</el-button
              >
              <el-button
                plain
                size="small"
                :disabled="selectTableData.length === 0"
                @click="blacklistDialogShow"
                >加入黑名单</el-button
              >
            </div>
          </div>
        </div>
        <div class="all-table-warpper">
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            @selection-change="handleSelectionChange"
            ref="customerTable"
          >
            <el-table-column type="selection" width="55" fixed="left">
            </el-table-column>
            <el-table-column label="客户信息" min-width="200" fixed="left">
              <template slot-scope="scope">
                <div class="customer-info">
                  <img :src="scope.row.avatar" alt="" v-if="scope.row.avatar" />
                  <img src="../../assets/images/avatar.png" alt="" v-else />
                  <div>
                    <span>编号:</span>
                    <span>{{ scope.row.id }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="addDate" label="成为客户日期" width="100">
            </el-table-column>
            <el-table-column label="最近消费时间" width="140" sortable>
              <template slot-scope="scope">
                <span>{{
                  scope.row.consumeDate ? scope.row.consumeDate : "--"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="消费金额" width="140" sortable>
              <template slot-scope="scope">
                <span>{{ scope.row.consumePrice }}元</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="consumeCount"
              label="消费次数"
              width="120"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="currentIntegral"
              label="当前积分"
              width="120"
              sortable
            >
            </el-table-column>
            <el-table-column
              prop="accumulativeIntegral"
              label="累计积分"
              width="120"
              sortable
            >
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="checkCustomerDetail(scope.row)"
                  type="text"
                  >详细</el-button
                >
                <el-popconfirm
                  title="冻结后将无法使用积分"
                  @onConfirm="freezeCustomer(scope.row)"
                >
                  <el-button slot="reference" size="mini" type="text"
                    >冻结</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="footer-btn footer-page" slot="footer">
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

    <blacklist-dialog
      ref="blacklist"
      @blacklistConfirm="blacklistDialogConfirm"
    ></blacklist-dialog>

    <coupon-dialog
      ref="coupon"
      @couponConfirm="couponDialogConfirm"
    ></coupon-dialog>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import { publicMixins } from "@/mixins/public-mixins.js";
import BlacklistDialog from "@/components/customer/blacklist-dialog.vue";
import CouponDialog from "@/components/customer/coupon-dialog.vue";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //更多筛选显示
      filterShow: false,
      //筛选关键字类型
      customerKeyWorkType: [
        {
          id: "0",
          name: "姓名"
        },
        {
          id: "1",
          name: "微信昵称"
        },
        {
          id: "2",
          name: "手机号"
        },
        {
          id: "3",
          name: "会员卡号"
        },
        {
          id: "4",
          name: "客户编号"
        },
        {
          id: "5",
          name: "邀请人手机号"
        }
      ],
      //筛选表单
      filterForm: {
        customerKeyWorkType: "2"
      },
      //筛选客户标签列表
      labelFilterList: [],
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
      //时间选择器配置
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //客户表格数据
      tableData: [],
      //已选的表单数据
      selectTableData: []
    };
  },
  created() {
    this.getLabelList();
    this.getCustomerList();
  },
  methods: {
    //搜索
    search() {},
    //关闭某个标签
    //index  标签的索引值
    deleTelabelFilterItem(index) {
      this.labelFilterList.splice(index, 1);
    },
    //清除所有客户标签搜索
    removeAllLabelFilterList() {
      this.labelFilterList = [];
    },
    //客户标签弹窗显示
    //确定客户弹窗的类型
    labelDialogShow(type) {
      this.labelType = type;
      if (this.labelType === "0") {
        let temList = [];
        this.labelFilterList.forEach(item => {
          temList.push(item.id);
        });
        this.activeLabelList = temList;
      }
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
    //客户标签弹窗确认
    labelDialogConfirm() {
      if (this.labelType === "0") {
        let temList = [];
        this.labelList.forEach(item => {
          const index = this.activeLabelList.findIndex(
            activeItem => activeItem === item.id
          );
          if (index != -1) {
            temList.push({
              id: item.id,
              label: item.name
            });
          }
        });
        this.labelFilterList = temList;
      } else {
        this.$refs.customerTable.clearSelection();
        this.$message({
          message: "处理成功",
          type: "success"
        });
      }
      this.labelDialogHide();
    },
    //获取客户数据
    getCustomerList() {
      this.tableData = [
        {
          addDate: "2020/03/11",
          consumePrice: "0",
          consumeCount: "0",
          currentIntegral: "0",
          accumulativeIntegral: "0",
          id: "33322131",
          lebal: ["0"]
        }
      ];
    },
    //选中表单数据
    //list   选中的表单数组
    handleSelectionChange(list) {
      this.selectTableData = list;
    },
    //查看客户详细
    //item    客户具体值
    checkCustomerDetail(item) {
      this.$router.push({
        name: "customerDetail",
        query: {
          detail: this.encryption(JSON.stringify(item))
        }
      });
    },
    //冻结客户
    //item   冻结的客户具体值
    freezeCustomer(item) {
      console.log(item);
    },
    //优惠卷弹窗显示
    couponDialogShow() {
      this.$refs.coupon.show(this.selectTableData.length);
    },
    //优惠卷弹窗确认
    // list   已选优惠卷列表
    couponDialogConfirm(list) {
      console.log(list);
      this.$refs.customerTable.clearSelection();
    },
    //黑名单弹窗显示
    blacklistDialogShow() {
      this.$refs.blacklist.show();
    },
    //黑名单弹窗确认
    blacklistDialogConfirm() {
      this.$refs.customerTable.clearSelection();
    }
  },
  components: {
    MainScroll,
    BlacklistDialog,
    CouponDialog
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.customer-all-warpper {
  .gray-bg-warpper {
    .all-filter-warpper {
      padding: 20px;
      font-size: 12px;
      background-color: #fff;
      & > div:nth-of-type(1) {
        display: flex;
        align-items: center;
        & > span:nth-of-type(1) {
          margin-right: 10px;
        }
        .el-select {
          width: 120px;
          margin-left: 20px;
          ::v-deep .el-input__inner {
            border-radius: 5px 0px 0px 5px;
          }
        }
        .el-input {
          width: 250px;
          ::v-deep .el-input__inner {
            border-radius: 0px;
          }
        }
      }
      & > div:nth-of-type(2) {
        margin-top: 15px;
        display: flex;
        align-items: center;
        & > span:nth-of-type(1) {
          width: 118px;
          text-align: left;
          margin-bottom: 10px;
        }
        ul {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li {
            margin-right: 10px;
            min-width: 80px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            &:nth-of-type(1) {
              cursor: pointer;
            }
            .el-tag {
              width: 100%;
              height: 100%;
              line-height: 30px;
            }
            .el-button {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      & > div:nth-of-type(3) {
        display: flex;
        margin-top: 5px;
        align-items: flex-start;
        & > span {
          width: 118px;
          flex-shrink: 0;
          text-align: left;
          height: 32px;
          line-height: 32px;
        }
        ul {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          flex: 1;
          justify-content: space-between;
          li {
            width: 48%;
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            & > span {
              width: 80px;
              flex-shrink: 0;
              text-align: left;
            }
            & > div {
              flex: 1;
              margin-left: 20px;
              display: flex;
              align-items: center;
              & > span {
                margin: 0px 10px;
              }
            }
          }
        }
      }
      & > div:nth-of-type(4) {
        display: flex;
        margin-top: 10px;
        border-top: 1px solid #eee;
        padding-top: 20px;
        & > span {
          width: 118px;
          flex-shrink: 0;
          text-align: left;
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .all-table-warpper {
      margin-top: 20px;
      border-radius: 5px;
      overflow: hidden;
      width: 100%;
      div {
        font-size: 13px;
      }
      .customer-info {
        display: flex;
        align-items: center;
        img {
          width: 37px;
          height: 37px;
        }
        & > div {
          margin-left: 15px;
        }
      }
      .el-switch {
        width: 35px;
        height: 20px;
        margin-left: 10px;
      }
      span {
        & > .el-button {
          margin-left: 10px;
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
</style>
