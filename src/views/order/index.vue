<template>
  <main-scroll>
    <div class="order-all-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="order-filter">
          <div>
            <div>
              <span>筛选条件</span>
              <el-switch v-model="filterShow"></el-switch>

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
            <el-button plain size="small">订单导出</el-button>
          </div>
          <div v-show="filterShow">
            <ul>
              <li v-for="(item, index) in moreFilterList" :key="index">
                <div class="title">{{ item.title }}</div>
                <div class="list">
                  <ul>
                    <li
                      :class="{ active: filterForm[item.key] === '' }"
                      @click="moreFilterChange(item.key, '')"
                    >
                      <span> 不限</span>
                    </li>
                    <li
                      v-for="lItem in item.list"
                      :key="lItem.id"
                      :class="{ active: filterForm[item.key] === lItem.id }"
                      @click="moreFilterChange(item.key, lItem.id)"
                    >
                      <span>{{ lItem.name }}</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div>
              <el-button type="primary" size="small" @click="search"
                >搜索</el-button
              >
              <el-button plain size="small" @click="initFilterForm"
                >清空</el-button
              >
            </div>
          </div>
        </div>
        <div class="order-table">
          <el-table :data="tableData" stripe>
            <el-table-column
              prop="goods"
              label="商品信息"
              min-width="200"
            ></el-table-column>
            <el-table-column label="实收货款" width="120">
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
            <el-table-column label="配送和支付方式" width="200">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(moreFilterList[3].list, scope.row.pay)
                }}</span>
                <span style="margin:0px 5px">-</span>
                <span>{{
                  returnTableValue(moreFilterList[2].list, scope.row.delivery)
                }}</span>
              </template>
            </el-table-column>

            <el-table-column label="订单状态" width="90">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(moreFilterList[1].list, scope.row.status)
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
      //更多筛选显示
      filterShow: false,
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
          name: "发货时间"
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
      filterForm: {},
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
      //更多筛选列表
      moreFilterList: [
        {
          title: "营销类型",
          list: [
            {
              id: "0",
              name: "拼团"
            },
            {
              id: "1",
              name: "砍价"
            },
            {
              id: "2",
              name: "限时折扣"
            }
          ],
          key: "market"
        },
        {
          title: "订单状态",
          list: [
            {
              id: "0",
              name: "已取消"
            },
            {
              id: "1",
              name: "待支付"
            },
            {
              id: "2",
              name: "待发货"
            },
            {
              id: "3",
              name: "已发货"
            },
            {
              id: "4",
              name: "已完成"
            }
          ],
          key: "status"
        },
        {
          title: "支付方式",
          list: [
            {
              id: "0",
              name: "微信支付"
            },
            {
              id: "1",
              name: "线下支付"
            }
          ],
          key: "pay"
        },
        {
          title: "配送方式",
          list: [
            {
              id: "0",
              name: "商家配送"
            },
            {
              id: "1",
              name: "到店自提"
            },
            {
              id: "2",
              name: "无需配送"
            }
          ],
          key: "delivery"
        }
      ],
      //表单数据
      tableData: []
    };
  },
  created() {
    this.initFilterForm();
    this.getOrderList();
  },
  methods: {
    //根据不同的数组和不同的id返回不同的值
    //list    返回内容的数组
    //id      返回内容的id
    returnTableValue(list, id) {
      const matchItem = list.find(item => item.id === id);
      return matchItem.name;
    },
    //搜索
    search() {},
    //初始化搜索表单
    initFilterForm() {
      let tem = {
        dateType: "0",
        keyWorkType: "0"
      };
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      this.$set(tem, "date", [start, end]);
      this.moreFilterList.forEach(item => {
        this.$set(tem, item.key, "");
      });
      this.filterForm = JSON.parse(JSON.stringify(tem));
    },
    //更多筛选改变时触发
    //key       筛选的key值
    //id        选中筛选值的id值
    moreFilterChange(key, id) {
      this.$set(this.filterForm, key, id);
    },
    //获取订单列表
    getOrderList() {
      this.tableData = [
        {
          goods: "测试9测试9测试9测试9测试9测试9测试9",
          price: "1000.00",
          pay: "1",
          delivery: "1",
          status: "2",
          name: "梁先生",
          phone: "13211321132"
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
.order-all-warpper {
  .gray-bg-warpper {
    .order-filter {
      display: flex;
      font-size: 12px;
      align-items: center;
      padding: 20px;
      background-color: #fff;
      flex-direction: column;
      & > div:nth-of-type(1) {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        & > div {
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            & > span:nth-of-type(1) {
              margin-right: 10px;
            }
            .el-select {
              margin-left: 20px;
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
        width: 100%;
        text-align: left;
        margin-top: 5px;
      }
      & > div:nth-of-type(3) {
        width: 100%;
        & > ul {
          & > li {
            margin-top: 20px;
            display: flex;
            .title {
              width: 100px;
            }
            .list {
              flex: 1;
              ul {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                li {
                  width: 80px;
                  margin-right: 10px;
                  border: 1px solid #e3e2e5;
                  border-radius: 5px;
                  padding: 6px 0px;
                  cursor: pointer;
                  &:hover,
                  &.active {
                    background-color: white !important;
                    border-color: #2589ff !important;
                    span {
                      color: #2589ff !important;
                    }
                  }
                  span {
                    color: #595961;
                  }
                }
              }
            }
          }
        }
        & > div {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .order-table {
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
