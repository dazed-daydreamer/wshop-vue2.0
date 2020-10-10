<template>
  <main-scroll>
    <div class="label-form-warpper public-warpper">
      <div class="gray-bg-warpper">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="标签名称" prop="title">
            <el-input
              v-model="form.title"
              size="small"
              class="title"
              maxlength="10"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item label="标签类型" prop="type">
            <el-radio v-model="form.type" label="0">条件标签</el-radio>
            <el-radio v-model="form.type" label="1">手动标签</el-radio>
          </el-form-item>

          <div v-show="form.type === '0'">
            <div class="condition-setting-header">
              <span>条件设置</span>
              <span>选择多个条件时，需全部满足</span>
            </div>

            <el-form-item label="基础条件">
              <ul>
                <li>
                  <div>
                    <el-checkbox v-model="form.hasCreateDate"
                      >成为客户时间</el-checkbox
                    >
                  </div>
                  <div>
                    <el-date-picker
                      :disabled="!form.hasCreateDate"
                      v-model="form.createDate"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      size="small"
                      :clearable="false"
                    >
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <div>
                    <el-checkbox v-model="form.hasAttentionDate"
                      >关注店铺时间</el-checkbox
                    >
                  </div>
                  <div>
                    <el-date-picker
                      :disabled="!form.hasAttentionDate"
                      v-model="form.attentionDate"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      size="small"
                      :clearable="false"
                    >
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <div>
                    <el-checkbox v-model="form.hasMemberDate"
                      >成为会员时间</el-checkbox
                    >
                  </div>
                  <div>
                    <el-date-picker
                      :disabled="!form.hasMemberDate"
                      v-model="form.memberDate"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions"
                      size="small"
                      :clearable="false"
                    >
                    </el-date-picker>
                  </div>
                </li>
              </ul>
            </el-form-item>

            <el-form-item label="交易条件">
              <ul>
                <li>
                  <div>
                    <el-checkbox v-model="form.hasConsumptionDate"
                      >最近消费时间</el-checkbox
                    >
                  </div>
                  <div>
                    <el-select
                      v-model="form.consumptionDate"
                      placeholder="请选择"
                      size="small"
                      :disabled="!form.hasConsumptionDate"
                    >
                      <el-option
                        v-for="item in transactionDate"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </li>
                <li>
                  <div>
                    <el-checkbox v-model="form.hasConsumptionCount"
                      >消费次数</el-checkbox
                    >
                  </div>
                  <div>
                    <el-select
                      v-model="form.consumptionCountDate"
                      placeholder="请选择"
                      size="small"
                      :disabled="!form.hasConsumptionCount"
                    >
                      <el-option
                        v-for="item in transactionDate"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <el-input
                      v-model="form.consumptionCountMin"
                      size="small"
                      class="count-input"
                      :disabled="!form.hasConsumptionCount"
                    >
                      <template slot="append">次</template>
                    </el-input>
                    <span class="line">-</span>
                    <el-input
                      v-model="form.consumptionCountMax"
                      size="small"
                      class="count-input"
                      :disabled="!form.hasConsumptionCount"
                    >
                      <template slot="append">次</template>
                    </el-input>
                  </div>
                </li>

                <li>
                  <div>
                    <el-checkbox v-model="form.hasConsumptionAmount"
                      >消费金额</el-checkbox
                    >
                  </div>
                  <div>
                    <el-select
                      v-model="form.consumptionAmountDate"
                      placeholder="请选择"
                      size="small"
                      :disabled="!form.hasConsumptionAmount"
                    >
                      <el-option
                        v-for="item in transactionDate"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <el-input
                      v-model="form.consumptionAmountMin"
                      size="small"
                      class="count-input"
                      :disabled="!form.hasConsumptionAmount"
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <span class="line">-</span>
                    <el-input
                      v-model="form.consumptionAmountMax"
                      size="small"
                      class="count-input"
                      :disabled="!form.hasConsumptionAmount"
                    >
                      <template slot="append">元</template>
                    </el-input>
                  </div>
                </li>

                <li>
                  <div>
                    <el-checkbox v-model="form.hasConsumptionAverage"
                      >消费均价</el-checkbox
                    >
                  </div>
                  <div>
                    <el-select
                      v-model="form.consumptionAverageDate"
                      placeholder="请选择"
                      size="small"
                      :disabled="!form.hasConsumptionAverage"
                    >
                      <el-option
                        v-for="item in transactionDate"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div>
                    <el-input
                      v-model="form.consumptionAverageMin"
                      size="small"
                      class="count-input"
                      :disabled="!form.hasConsumptionAverage"
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <span class="line">-</span>
                    <el-input
                      v-model="form.consumptionAverageMax"
                      size="small"
                      class="count-input"
                      :disabled="!form.hasConsumptionAverage"
                    >
                      <template slot="append">元</template>
                    </el-input>
                  </div>
                </li>
              </ul>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <el-button type="primary" size="medium" @click="saveLabel"
          >保存</el-button
        >
        <el-button plain size="medium" @click="cancelLabel">取消</el-button>
      </div>
    </div>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import { publicMixins } from "@/mixins/public-mixins.js";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //标签表单
      form: {
        consumptionDate: 1,
        consumptionCountDate: 1,
        consumptionAmountDate: 1,
        consumptionAverageDate: 1
      },
      //标签验证
      rules: {
        title: [{ required: true, message: "请输入标签名称", trigger: "blur" }]
      },
      //日期配置
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
      transactionDate: [
        {
          id: 0,
          name: "今天"
        },
        {
          id: 1,
          name: "最近7天"
        },
        {
          id: 2,
          name: "最近15天"
        },
        {
          id: 3,
          name: "最近30天"
        },
        {
          id: 4,
          name: "最近45天"
        },
        {
          id: 5,
          name: "最近60天"
        },
        {
          id: 6,
          name: "最近90天"
        },
        {
          id: 7,
          name: "最近180天"
        },
        {
          id: 8,
          name: "不限"
        }
      ]
    };
  },
  components: {
    MainScroll
  },
  created() {
    if (this.$route.query.item === null) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      this.$set(this.form, "type", this.$route.query.tab.toString());
      this.$set(this.form, "createDate", [start, end]);
      this.$set(this.form, "attentionDate", [start, end]);
      this.$set(this.form, "memberDate", [start, end]);
    }
  },
  methods: {
    //保存标签表单
    saveLabel() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
      this.$router.go(-1);
    },
    //取消标签表单
    cancelLabel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.label-form-warpper {
  .gray-bg-warpper {
    .el-form {
      margin-top: 20px;
      ::v-deep .el-form-item {
        .el-form-item__label {
          font-size: 12px;
        }
        .el-form-item__content {
          text-align: left;
          padding-left: 15px;
          .title {
            width: 300px;
          }
          .el-radio {
            .el-radio__label {
              font-size: 12px;
            }
          }
          .el-checkbox {
            .el-checkbox__label {
              font-size: 12px;
            }
          }
          ul {
            li {
              display: flex;
              align-items: center;
              & > div {
                margin-right: 20px;
                display: flex;
                align-items: center;
              }
              & > div:nth-of-type(1) {
                width: 100px;
              }
              & > div:nth-of-type(3) {
                .count-input {
                  width: 150px;
                }
                .line {
                  margin: 0px 10px;
                }
              }
            }
          }
        }
      }
      .condition-setting-header {
        text-align: left;
        margin-left: 20px;
        margin-bottom: 15px;
        span:nth-of-type(1) {
          font-size: 14px;
          font-weight: bold;
        }
        span:nth-of-type(2) {
          font-size: 12px;
          padding-left: 20px;
        }
      }
    }
  }
}
</style>
