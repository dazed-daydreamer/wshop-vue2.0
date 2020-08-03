<template>
  <main-scroll>
    <div class="order-affter-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="affter-filter">
          <div>
            <div>
              <el-select
                v-model="filterForm.dateType"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="item in dateType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>

              <el-date-picker
                v-model="filterForm.date"
                type="daterange"
                align="right"
                size="small"
                :clearable="false"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div>
              <el-select v-model="filterForm.keyWorkType" size="small">
                <el-option
                  v-for="item in orderKeyWorkType"
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
          </div>
          <div>
            <div>
              <span>订单状态</span>
              <el-select
                v-model="filterForm.status"
                placeholder="全部"
                size="small"
                clearable
              >
                <el-option
                  v-for="item in orderStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span>售后类型</span>
              <el-select
                v-model="filterForm.affterType"
                placeholder="请选择"
                size="small"
                clearable
              >
                <el-option
                  v-for="item in affterType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
            <div>
              <span>售后状态</span>
              <el-select
                v-model="filterForm.affterStatus"
                placeholder="请选择"
                size="small"
                clearable
              >
                <el-option
                  v-for="item in affterStatus"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <span>批量操作：</span>
            <el-button plain size="small">批量核销</el-button>
            <el-button plain size="small">批量备货</el-button>
            <el-button plain size="small">批量收货</el-button>
            <el-button plain size="small">批量打印配送单</el-button>
          </div>
        </div>

        <div class="affter-table">
          <el-table
            :data="tableData"
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="goods"
              label="商品信息"
              min-width="200"
            ></el-table-column>
            <el-table-column prop="price" label="实收货款" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="售后类型" width="90">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(affterType, scope.row.affterType)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="实收货款" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.price }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="客户信息" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
                <span style="margin:0px 5px">-</span>
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" width="120">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(affterStatus, scope.row.affterStatus)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" width="90">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(orderStatus, scope.row.status)
                }}</span>
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
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
export default {
  data() {
    return {
      //筛选时间类型
      dateType: [
        {
          id: "0",
          name: "下单时间"
        },
        {
          id: "1",
          name: "支付时间"
        },
        {
          id: "2",
          name: "配送时间"
        },
        {
          id: "3",
          name: "收货时间"
        },
        {
          id: "4",
          name: "售后时间"
        }
      ],
      //筛选关键字类型
      orderKeyWorkType: [
        {
          id: "0",
          name: "订单编号"
        },
        {
          id: "1",
          name: "商品名称"
        },
        {
          id: "2",
          name: "客户昵称"
        },
        {
          id: "3",
          name: "收货人姓名"
        },
        {
          id: "4",
          name: "收货人电话"
        },
        {
          id: "5",
          name: "支付单号"
        }
      ],
      //筛选表单
      filterForm: {
        dateType: "4",
        keyWorkType: "0"
      },
      //筛选时间配置
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
      //表单数据
      tableData: [],
      //表单选择列表
      tableSelete: [],
      //订单类型列表
      orderStatus: [
        {
          id: "0",
          name: "待处理"
        },
        {
          id: "1",
          name: "处理中"
        },
        {
          id: "2",
          name: "已完成"
        },
        {
          id: "3",
          name: "已取消"
        }
      ],
      //售后类型列表
      affterType: [
        {
          id: "0",
          name: "退款"
        },
        {
          id: "1",
          name: "退货退款"
        }
      ],
      //售后状态列表
      affterStatus: [
        {
          id: "0",
          name: "申请售后"
        },
        {
          id: "1",
          name: "等待买家退货"
        },
        {
          id: "2",
          name: "已退货，待收款"
        },
        {
          id: "3",
          name: "系统退款中"
        },
        {
          id: "4",
          name: "退款成功"
        },
        {
          id: "5",
          name: "已取消"
        },
        {
          id: "6",
          name: "商家退款中"
        },
        {
          id: "7",
          name: "退款失败"
        }
      ]
    };
  },
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    this.$set(this.filterForm, "date", [start, end]);
    this.getOrderList();
  },
  methods: {
    //搜索
    search() {},
    //根据不同的数组和不同的id返回不同的值
    //list    返回内容的数组
    //id      返回内容的id
    returnTableValue(list, id) {
      const matchItem = list.find(item => item.id === id);
      return matchItem.name;
    },
    //表单选择
    handleSelectionChange(arr) {
      this.tableSelete = arr;
    }, //获取订单列表
    getOrderList() {
      this.tableData = [
        {
          goods: "测试9测试9测试9测试9测试9测试9测试9",
          price: "1000.00",
          pay: "1",
          delivery: "1",
          status: "2",
          name: "梁先生",
          phone: "13211321132",
          remark: "备注3333333333333123131312",
          affterType: "0",
          affterStatus: "1"
        },
        {
          goods: "测试9测试9测试9测试9测试9测试9测试9",
          price: "1000.00",
          pay: "1",
          delivery: "1",
          status: "2",
          name: "梁先生",
          phone: "13211321132",
          remark: "备注3333333333333123131312",
          affterType: "0",
          affterStatus: "2"
        },
        {
          goods: "测试9测试9测试9测试9测试9测试9测试9",
          price: "1000.00",
          pay: "1",
          delivery: "1",
          status: "2",
          name: "梁先生",
          phone: "13211321132",
          remark: "备注3333333333333123131312",
          affterType: "0",
          affterStatus: "1"
        },
        {
          goods: "测试9测试9测试9测试9测试9测试9测试9",
          price: "1000.00",
          pay: "1",
          delivery: "1",
          status: "2",
          name: "梁先生",
          phone: "13211321132",
          remark: "备注3333333333333123131312",
          affterType: "1",
          affterStatus: "0"
        }
      ];
    }
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.order-affter-warpper {
  .gray-bg-warpper {
    .affter-filter {
      background-color: #fff;
      padding: 20px;
      & > div:nth-of-type(1) {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        & > div {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            .el-select {
              width: 110px;
              ::v-deep .el-input__inner {
                border-radius: 5px 0px 0px 5px;
              }
            }
            .el-range-editor.el-input__inner {
              width: 250px;
              border-radius: 0px 5px 5px 0px;
            }
          }
          &:nth-of-type(2) {
            .el-select {
              width: 120px;
              ::v-deep .el-input__inner {
                border-radius: 5px 0px 0px 5px;
              }
            }
            .el-input {
              width: 200px;
              ::v-deep .el-input__inner {
                border-radius: 0px;
              }
            }
          }
        }
      }
      & > div:nth-of-type(2) {
        display: flex;
        margin-top: 12px;
        & > div {
          display: flex;
          align-items: center;
          margin-right: 20px;
          & > span {
            margin-right: 10px;
            font-size: 12px;
          }
          .el-select {
            width: 120px;
          }
        }
      }
      & > div:nth-of-type(3) {
        display: flex;
        align-items: center;
        margin-top: 12px;
        & > span {
          margin-right: 10px;
          font-size: 12px;
        }
      }
    }

    .affter-table {
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
        ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li {
            cursor: pointer;
            &:not(:nth-of-type(1)) {
              margin-left: 10px;
            }
            .el-image {
              width: 40px;
              height: 40px;
              border: 1px solid #eee;
            }
          }
        }
      }
    }
  }
}
</style>
