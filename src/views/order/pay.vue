<template>
  <main-scroll>
    <div class="order-pay-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="pay-filter">
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
        }
      ],
      //筛选表单
      filterForm: {
        dateType: "0"
      }
    };
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.order-pay-warpper {
  .gray-bg-warpper {
    .pay-filter {
      background-color: #fff;
      padding: 20px;
      display: flex;
      & > div:nth-of-type(1) {
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
    }
  }
}
</style>
