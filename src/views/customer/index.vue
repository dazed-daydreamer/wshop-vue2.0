<template>
  <main-scroll>
    <div class="customer-all-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="all-filter">
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
                <el-button plain size="small" @click="labelDialogShow"
                  >添加</el-button
                >
              </li>
            </ul>
          </div>
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
      width="500px"
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
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="labelDialogHide" size="small">取 消</el-button>
        <el-button type="primary" @click="labelDialogHide" size="small"
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
      labelList: []
    };
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
    //客户标签弹窗关闭
    labelDialogShow() {
      this.labelDialogVisible = true;
    },
    //客户标签弹窗关闭
    labelDialogHide() {
      this.labelDialogVisible = false;
    }
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.customer-all-warpper {
  .gray-bg-warpper {
    .all-filter {
      font-size: 12px;
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
        margin-top: 10px;
        display: flex;
        align-items: center;
        & > span:nth-of-type(1) {
          width: 123px;
          text-align: left;
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
            .el-tag {
              width: 100%;
            }
            .el-button {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
.label-dialog {
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
          width: 200px;
        }
      }
      .search-list {
        margin-top: 15px;
        padding: 20px;
        font-size: 12px;
        border: 1px solid #e3e2e5;
        border-radius: 5px;
      }
    }
  }
}
</style>
