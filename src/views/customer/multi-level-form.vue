<template>
  <main-scroll>
    <div class="multi-level-form-warpper public-warpper">
      <div class="gray-bg-warpper">
        <img src="../../assets/images/card-more.e90884c4.png" alt="" />
        <div>
          <ul>
            <li>
              <span class="title">基本信息</span>
              <div>
                <span>会员卡标题</span>
                <div class="w-250">
                  <el-input
                    type="text"
                    placeholder="必须填写会员卡名称"
                    v-model="form.title"
                    maxlength="9"
                    show-word-limit
                    size="small"
                  >
                  </el-input>
                </div>
              </div>
              <div>
                <span>卡号设置</span>
                <el-radio v-model="form.setting" label="0"
                  >系统自动生成</el-radio
                >
                <el-radio v-model="form.setting" label="1">
                  手机号作为卡号</el-radio
                >
              </div>
            </li>
            <li>
              <span class="title">开卡条件</span>
              <div>
                <el-checkbox-group v-model="form.condition">
                  <div>
                    <el-checkbox label="0" disabled>成为客户</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox label="1">绑定手机号</el-checkbox>
                  </div>
                  <div>
                    <el-checkbox label="2">累计消费满</el-checkbox>
                    <el-input
                      type="number"
                      v-model="form.consumption"
                      size="mini"
                      :disabled="hasAccumulative"
                    >
                      <template slot="append">元</template>
                    </el-input>
                    <el-input
                      type="number"
                      v-model="form.count"
                      size="mini"
                      :disabled="hasAccumulative"
                    >
                      <template slot="append">次</template>
                    </el-input>
                  </div>
                  <!-- <div>
                    <el-checkbox label="3">购买指定商品</el-checkbox>
                  </div> -->
                </el-checkbox-group>
              </div>
            </li>
            <li>
              <span class="title">开卡方式</span>
              <el-radio-group v-model="form.method">
                <el-radio label="0">自动发卡</el-radio>
                <el-radio label="1">用户领卡</el-radio>
              </el-radio-group>
            </li>
            <li>
              <span class="title">会员等级</span>
              <div class="membership-level-warpper">
                <div>
                  <ul>
                    <li>
                      <div><span>会员等级</span></div>
                      <div><span>成长值范围</span></div>
                      <div><span>等级权益</span></div>
                      <div><span>操作</span></div>
                    </li>
                    <li v-for="(item, index) in form.level" :key="index">
                      <div>
                        <el-input
                          type="text"
                          v-model="item.name"
                          size="small"
                          maxlength="12"
                          show-word-limit
                        >
                        </el-input>
                      </div>
                      <div>
                        <el-input
                          type="text"
                          v-model="item.min"
                          size="small"
                          disabled
                        >
                        </el-input>
                        <span>-</span>
                        <el-input
                          type="number"
                          v-model="item.max"
                          size="small"
                          v-if="item.max != -1"
                          min="0"
                          @input="growingUpMaxInput($event, index)"
                          @blur="growingUpMaxChange(index)"
                        >
                        </el-input>
                        <el-input
                          type="text"
                          value="无限大"
                          size="small"
                          disabled
                          v-else
                        >
                        </el-input>
                      </div>
                      <div>
                        <el-button
                          type="text"
                          size="small"
                          v-if="item.benefit.length == 0"
                          @click="selectBenefitShow(index)"
                          >选择权益</el-button
                        >
                        <div v-else></div>
                      </div>
                    </li>
                  </ul>
                </div>
                <el-button plain size="small" @click="addLevel"
                  >添加等级</el-button
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <select-benefit-dialog ref="selectBenefit"></select-benefit-dialog>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import { publicMixins } from "@/mixins/public-mixins.js";
import SelectBenefitDialog from "components/customer/select-benefit-dialog.vue";
export default {
  mixins: [publicMixins],
  components: {
    MainScroll,
    SelectBenefitDialog
  },
  data() {
    return {
      //会员卡表单
      form: {
        setting: "0",
        method: "0",
        condition: ["0"],
        level: [
          {
            name: "会员",
            min: 0,
            max: -1,
            benefit: []
          }
        ]
      },
      //被选中的等级
      selectIndex: -1
    };
  },
  methods: {
    //添加会员等级
    addLevel() {
      const len = this.form.level.length;
      this.$set(this.form.level[len - 1], "max", "");
      this.form.level.push({
        name: "会员",
        min: "",
        max: -1,
        benefit: []
      });
    },
    //确认会员最大成长值时候触发
    //index     会员等级
    growingUpMaxChange(index) {
      const item = this.form.level[index];
      if (item.min > item.max) {
        this.$message.error("成长值需递增");
        this.$set(item, "max", "");
        return;
      } else {
        const next = this.form.level[index + 1];
        this.$set(next, "min", parseInt(item.max) + 1);
      }
    },
    //修改会员最大成长值时候触发
    //val        最大值
    //index     会员等级
    growingUpMaxInput(val, index) {
      if (parseInt(val) <= 0) {
        const item = this.form.level[index];
        this.$set(item, "max", "");
      }
    },
    //选择权益弹窗显示
    //index     会员等级
    selectBenefitShow(index) {
      this.selectIndex = index;
      this.$refs.selectBenefit.show();
    }
  },
  computed: {
    //获取会员卡条件是否开启累计
    hasAccumulative() {
      const index = this.form.condition.indexOf("2");
      return index == -1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.multi-level-form-warpper {
  .gray-bg-warpper {
    display: flex;
    padding: 20px;
    & > img {
      width: 300px;
      margin-right: 80px;
      height: 550px;
    }
    & > div {
      flex: 1;
      & > ul {
        & > li {
          text-align: left;
          margin-bottom: 50px;
          & > .title {
            font-size: 14px;
            font-weight: bold;
          }
          & > div {
            display: flex;
            align-items: center;
            margin-top: 20px;
            & > span {
              font-size: 12px;
              width: 80px;
              margin-right: 20px;
            }
            .el-checkbox-group {
              display: flex;
              flex-direction: column;
              & > div {
                margin-bottom: 20px;
                &:nth-last-of-type(1) {
                  margin-bottom: 0px;
                }
                display: flex;
                align-items: center;
                .el-input {
                  margin-left: 20px;
                  width: 130px;
                }
              }
            }
            &.membership-level-warpper {
              flex-direction: column;
              align-items: flex-start;
              & > div {
                margin-bottom: 15px;
                border-radius: 4px;
                background-color: #fff;
                border: 1px solid #e3e2e5;
                width: 100%;
                ul {
                  li {
                    display: flex;
                    align-items: center;
                    height: 50px;
                    &:nth-of-type(1) {
                      span {
                        font-weight: bold;
                      }
                    }
                    &:not(:nth-of-type(1)) {
                      border-top: 1px solid #e3e2e5;
                      & > div {
                        &:nth-of-type(2) {
                          display: flex;
                          align-items: center;
                          & > span {
                            margin: 0px 5px;
                          }
                        }
                      }
                    }
                    & > div {
                      padding-left: 20px;
                      span {
                        font-size: 12px;
                      }
                      &:nth-of-type(1) {
                        width: 180px;
                        flex-shrink: 0;
                      }
                      &:nth-of-type(2) {
                        width: 200px;
                        flex-shrink: 0;
                      }
                      &:nth-of-type(3) {
                        flex: 1;
                      }
                      &:nth-of-type(4) {
                        width: 80px;
                        flex-shrink: 0;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
