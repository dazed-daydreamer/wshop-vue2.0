<template>
  <main-scroll>
    <div class="customer-label-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="label-header-warpper">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ active: tabIndex === index }"
            @click="tabChange(index)"
          >
            {{ item }}
          </span>
        </div>
        <div class="add-label-warpper">
          <el-button plain size="small" @click="jumpToFrom()"
            >新增标签</el-button
          >
        </div>
        <div v-show="tabIndex === 0" class="automatic-label-warpper">
          <div class="label-view-warpper">
            <div class="title">
              <span>系统标签</span>
              <span>标签每天0点更新</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in systemLabels" :key="index">
                  <div class="info">
                    <div class="title">
                      <span>{{ item.title }}</span>
                      <span>{{
                        item.status === "0" ? "（未开启）" : "（已开启）"
                      }}</span>
                    </div>
                    <div class="introduction">
                      <span>{{ item.introduction }}</span>
                    </div>
                    <div class="count">
                      <span>人数: {{ item.count }}</span>
                    </div>
                  </div>
                  <div class="btn">
                    <el-button type="text" size="small">
                      {{ item.status === "0" ? "开启" : "禁用" }}
                    </el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="space"></div>
          <div class="label-view-warpper">
            <div class="title">
              <span>自定义条件标签</span>
              <span>最多添加20个</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in customLabels" :key="index">
                  <div class="info">
                    <div class="title">
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="count">
                      <span>人数: {{ item.count }}</span>
                    </div>
                    <div class="date">
                      <span>创建时间：{{ item.create }}</span>
                    </div>
                    <div class="date">
                      <span>更新时间：{{ item.update }}</span>
                    </div>
                  </div>
                  <div class="btn">
                    <el-button type="text" size="small">
                      更新
                    </el-button>
                    <el-button
                      type="text"
                      size="small"
                      @click="jumpToFrom(item)"
                    >
                      编辑
                    </el-button>
                    <el-popconfirm
                      title="确认要删除标签吗？删除后无法恢复"
                      @onConfirm="confirmDeleteLabel(item, index, 'custom')"
                    >
                      <el-button slot="reference" type="text" size="small"
                        >删除</el-button
                      >
                    </el-popconfirm>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-show="tabIndex === 1" class="manual-label-warpper">
          <div class="label-view-warpper">
            <div class="title">
              <span>手动标签</span>
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in manualLabels" :key="index">
                  <div class="info">
                    <div class="title">
                      <span>{{ item.title }}</span>
                    </div>
                    <div class="count">
                      <span>人数: {{ item.count }}</span>
                    </div>
                    <div class="date">
                      <span>创建时间：{{ item.create }}</span>
                    </div>
                  </div>
                  <div class="btn">
                    <el-button
                      type="text"
                      size="small"
                      @click="jumpToFrom(item)"
                    >
                      编辑
                    </el-button>
                    <el-popconfirm
                      title="确认要删除标签吗？删除后无法恢复"
                      @onConfirm="confirmDeleteLabel(item, index, 'manual')"
                    >
                      <el-button slot="reference" type="text" size="small"
                        >删除</el-button
                      >
                    </el-popconfirm>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main-scroll>
</template>

<script>
import MainScroll from "components/public/main-scroll.vue";
import { publicMixins } from "@/mixins/public-mixins.js";
export default {
  mixins: [publicMixins],
  components: {
    MainScroll
  },
  data() {
    return {
      //当前标签页面索引
      tabIndex: 0,
      //标签组
      tabs: ["条件标签", "手动标签"],
      //系统客户标签
      systemLabels: [
        {
          title: "沉默客户",
          status: "0",
          introduction: "从未支付的客户",
          count: 0
        },
        {
          title: "发展客户",
          status: "0",
          introduction: "支付订单数在1-3的客户",
          count: 0
        },
        {
          title: "成熟客户",
          status: "0",
          introduction: "支付订单数在4-10的客户",
          count: 0
        },
        {
          title: "重要客户",
          status: "0",
          introduction: "支付订单数在11及以上的客户",
          count: 0
        }
      ],
      //自定义客户标签
      customLabels: [
        {
          title: "老客户",
          count: 0,
          create: "2020/10/05 14:35",
          update: "2020/10/05 14:35"
        },
        {
          title: "最新消费",
          count: 0,
          create: "2020/10/05 14:35",
          update: "2020/10/05 14:35"
        }
      ],
      //手动客户标签
      manualLabels: [
        {
          title: "新客户",
          count: 0,
          create: "2020/10/05 14:35"
        }
      ]
    };
  },
  methods: {
    //改变标签当前索引
    //index   索引
    tabChange(index) {
      this.tabIndex = index;
    },
    //确认删除标签
    //item    被删除标签的具体值
    //index   被删除标签的索引值
    //mark    被删除标签的列表标识
    confirmDeleteLabel(item, index, mark) {
      console.log(item);
      if (mark === "custom") {
        this.customLabels.splice(index);
      } else {
        this.manualLabels.splice(index);
      }
    },
    //跳转到标签表单页面
    //item   标签具体值
    jumpToFrom(item) {
      this.$router.push({
        name: "customerLabelForm",
        query: {
          item: item ? this.encryption(item) : null,
          tab: this.tabIndex
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.customer-label-warpper {
  .gray-bg-warpper {
    text-align: left;
    .label-header-warpper {
      margin-top: 10px;
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        width: 100px;
        text-align: center;
        cursor: pointer;
        &::after {
          content: "";
          width: 36px;
          height: 4px;
          border-radius: 6px;
          display: block;
          margin: 0px auto;
          margin-top: 8px;
        }
        &.active {
          color: #2589ff;
        }
        &.active::after {
          background: #2589ff;
        }
      }
    }
    .add-label-warpper {
      margin-top: 15px;
      padding: 10px;
      border-radius: 4px;
      background-color: #fff;
      padding-left: 20px;
    }
    .automatic-label-warpper,
    .manual-label-warpper {
      padding: 10px;
      border-radius: 4px;
      background-color: #fff;
      margin-top: 10px;
      & > .space {
        height: 30px;
      }
      .label-view-warpper {
        & > .title {
          margin: 10px 0px;
          padding-left: 10px;
          span:nth-of-type(1) {
            font-size: 14px;
            font-weight: bold;
          }
          span:nth-of-type(2) {
            font-size: 12px;
            padding-left: 10px;
            color: #9797a1;
          }
        }
        & > div {
          ul {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            li {
              width: 198px;
              height: 140px;
              margin: 0 0 10px 5px;
              border: 1px solid #e3e2e5;
              border-radius: 5px;
              padding: 10px;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              .info {
                & > .title {
                  margin-bottom: 8px;
                  span:nth-of-type(1) {
                    color: #595956;
                    font-size: 12px;
                    font-weight: bold;
                  }
                  span:nth-of-type(2) {
                    font-size: 12px;
                  }
                }

                & > .introduction {
                  font-size: 12px;
                  color: $regular-text-color;
                  margin-bottom: 8px;
                }

                & > .count {
                  font-size: 12px;
                  color: $regular-text-color;
                  margin-bottom: 8px;
                }

                & > .date {
                  font-size: 12px;
                  margin-bottom: 8px;
                }
              }

              .btn {
                text-align: right;
                .el-button {
                  padding-bottom: 0px;
                }
                span > .el-button {
                  margin-left: 10px;
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
