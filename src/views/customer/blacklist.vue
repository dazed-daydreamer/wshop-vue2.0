<template>
  <main-scroll>
    <div class="customer-blacklist-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="blacklist-search-warpper">
          <div>
            <el-select
              v-model="filterForm.behavior"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in behaviorList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>

            <el-button plain size="small">批量移除</el-button>
          </div>
          <div>
            <el-select v-model="filterForm.keyWorkType" size="small">
              <el-option
                v-for="item in blacklistKeyWorkType"
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
        <div class="blacklist-table-warpper">
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
            <el-table-column
              prop="consumptionCount"
              label="消费次数"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="consumptionAmount"
              label="消费金额"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="afterSaleAmount"
              label="售后金额"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="afterSaleCount" label="售后次数" width="100">
            </el-table-column>
            <el-table-column prop="integral" label="当前积分" width="100">
            </el-table-column>
            <el-table-column prop="behaviorName" label="限制行为" width="100">
            </el-table-column>
            <el-table-column prop="remarks" label="原因" min-width="350">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="blacklistDialogShow(scope.row)"
                  type="text"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="确定要移除黑名单，将同时移除所有限制行为"
                  @onConfirm="removeBlacklist(scope.row)"
                >
                  <el-button slot="reference" size="mini" type="text"
                    >移除</el-button
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
    <blacklist-dialog ref="blacklist"></blacklist-dialog>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import { publicMixins } from "@/mixins/public-mixins.js";
import BlacklistDialog from "@/components/customer/blacklist-dialog.vue";
export default {
  mixins: [publicMixins],
  components: {
    MainScroll,
    BlacklistDialog
  },
  data() {
    return {
      //黑名单行为列表
      behaviorList: [
        {
          id: 0,
          name: "全部行为"
        },
        {
          id: 1,
          name: "评论"
        },
        {
          id: 2,
          name: "下单"
        }
      ],
      //黑名单关键词类型
      blacklistKeyWorkType: [
        {
          id: 0,
          name: "手机号"
        },
        {
          id: 1,
          name: "姓名"
        },
        {
          id: 2,
          name: "微信昵称"
        },
        {
          id: 3,
          name: "会员卡号"
        },
        {
          id: 4,
          name: "客户编号"
        }
      ],
      //表单过滤
      filterForm: {
        behavior: 0,
        keyWorkType: 0
      },
      //黑名单表格数据
      tableData: [],
      //已选的表单数据
      selectTableData: []
    };
  },
  created() {
    this.getBlacklist();
  },
  methods: {
    //搜索黑名单
    search() {},
    //选中表单数据
    //list   选中的表单数组
    handleSelectionChange(list) {
      this.selectTableData = list;
    },
    //获取黑名单列表
    getBlacklist() {
      this.tableData = [
        {
          id: "33322131",
          consumptionCount: "0",
          consumptionAmount: "0.0",
          afterSaleAmount: "0.0",
          afterSaleCount: "0",
          integral: "0",
          remarks: "多次无理评论",
          behaviorName: "评论",
          behavior: ["0"]
        }
      ];
    },
    //移除黑名单
    //item   被移除的人信息
    removeBlacklist(item) {
      console.log(item);
    },
    //黑名单弹窗显示
    //item    黑名单的表单
    blacklistDialogShow(item) {
      this.$refs.blacklist.show(item);
    },
    //黑名单弹窗确认
    blacklistDialogConfirm() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.customer-blacklist-warpper {
  .gray-bg-warpper {
    .blacklist-search-warpper {
      padding: 10px;
      border-radius: 4px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        &:nth-of-type(1) {
          .el-select {
            margin-right: 10px;
          }
        }
        &:nth-of-type(2) {
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
      }
    }
    .blacklist-table-warpper {
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
      span {
        & > .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
