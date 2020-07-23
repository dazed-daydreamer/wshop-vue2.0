<template>
  <div class="classify-select-warpper">
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="hide"
      class="classify-select-dialog"
      append-to-body
    >
      <div slot="title">
        <span>添加商品类目</span>
      </div>
      <div>
        <div>
          <span>选择常用类目</span>
          <el-select
            v-model="commonClassifysIndex"
            placeholder="请选择"
            size="small"
            @change="commonClassifyChange"
          >
            <el-option
              v-for="(item, index) in commonClassifys"
              :key="index"
              :label="item.name"
              :value="index"
            >
            </el-option>
          </el-select>
          <el-button
            plain
            :disabled="commonClassifysIndex === 0"
            size="small"
            @click="delCommonClassify"
            >删除</el-button
          >
        </div>
        <div>
          <span>您当前选择的是：</span>
          <span>{{ classifyName }}</span>
          <el-button
            plain
            size="small"
            :disabled="
              firstClassifysIndex === -1 || secondClassifysIndex === -1
            "
            @click="addCommonClassify"
            >设为常用类目</el-button
          >
        </div>
        <div>
          <div>
            <el-scrollbar>
              <ul>
                <li
                  v-for="(item, index) in classifys"
                  :key="index"
                  :class="{ active: firstClassifysIndex === index }"
                  @click="classifyChange(index, 'first')"
                >
                  <span>{{ item.first }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
          <div v-if="firstClassifysIndex != -1">
            <el-scrollbar>
              <ul>
                <li
                  v-for="(item, index) in classifys[firstClassifysIndex].second"
                  :key="index"
                  :class="{ active: secondClassifysIndex === index }"
                  @click="classifyChange(index, 'second')"
                >
                  <span>{{ item }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //弹窗是否显示
      dialogVisible: false,
      //常用类目索引
      commonClassifysIndex: 0,
      //常用类目
      commonClassifys: [
        {
          name: "请选择"
        }
      ],
      //一级类目索引
      firstClassifysIndex: -1,
      //二级类目索引
      secondClassifysIndex: -1,
      //类目
      classifys: [
        {
          first: "食品",
          second: [
            "进口零食",
            "休闲零食",
            "营养保健",
            "粮油干货",
            "冲饮乳品",
            "酒类",
            "茶叶",
            "生鲜水果",
            "烘培/甜品"
          ]
        },
        {
          first: "美妆护肤",
          second: [
            "美容护肤",
            "彩妆/香水/美妆工具",
            "美发/护发/假发",
            "沐浴/个人清洁",
            "美体/精油",
            "男士护肤",
            "口腔护理",
            "身体护理",
            "女性护理"
          ]
        },
        {
          first: "服饰",
          second: [
            "服饰配件/皮带/帽子/围巾",
            "女装",
            "男装",
            "女士内衣/男士内衣/家居服",
            "运动户外"
          ]
        },
        {
          first: "鞋类箱包",
          second: ["男鞋", "女鞋", "潮流女包", "精品男包", "功能箱包", "鞋靴"]
        },
        {
          first: "母婴",
          second: [
            "奶粉",
            "辅食/营养品",
            "纸尿裤/湿巾",
            "哺育喂养",
            "清洁洗护",
            "玩具/早教/益智/积木/模型",
            "车床/出行/安全/家纺",
            "童装童鞋",
            "孕妈专区"
          ]
        },
        {
          first: "居家日用",
          second: [
            "居家日用",
            "餐具水具",
            "厨具锅具",
            "床上用品",
            "家纺布艺",
            "宠物园艺",
            "收纳洗晒",
            "家装建材",
            "家具",
            "家饰",
            "成人用品",
            "卫生用品",
            "汽车用品",
            "生活服务",
            "厨卫清洁"
          ]
        }
      ]
    };
  },
  methods: {
    //弹窗显示
    show(classify) {
      if (classify) {
        this.firstclassifysIndex = classify.first;
        this.secondclassifysIndex = classify.second;
      }
      this.dialogVisible = true;
    },
    //弹窗隐藏
    hide() {
      this.dialogVisible = false;
    },
    //确认分类
    confirm() {
      this.$emit("confirm", {
        first: this.firstclassifysIndex,
        second: this.secondclassifysIndex,
        name: this.classifyName
      });
      this.hide();
    },
    //分类改变
    // index   分类的索引
    // key     分类类型
    classifyChange(index, key) {
      if (key === "first") {
        this.firstClassifysIndex = index;
        this.secondClassifysIndex = -1;
      } else {
        this.secondClassifysIndex = index;
      }
    },
    //添加常用分类
    addCommonClassify() {
      this.commonClassifys.push({
        first: this.firstClassifysIndex,
        second: this.secondClassifysIndex,
        name: this.classifyName
      });
    },
    //删除常用类目
    delCommonClassify() {
      this.commonClassifys.splice(this.commonClassifysIndex, 1);
      this.commonClassifysIndex = 0;
    },
    //常用类改变触发
    //index     常用类吃索引值
    commonClassifyChange(index) {
      if (index != 0) {
        const classify = this.commonClassifys[index];
        this.firstClassifysIndex = classify.first;
        this.secondClassifysIndex = classify.second;
      }
    }
  },
  computed: {
    classifyName() {
      const firstClassifysItem =
        this.firstClassifysIndex === -1
          ? {
              first: ""
            }
          : this.classifys[this.firstClassifysIndex];
      const secondClassifysItem =
        this.secondClassifysIndex === -1
          ? ""
          : firstClassifysItem.second[this.secondClassifysIndex];
      return `${firstClassifysItem.first} > ${secondClassifysItem}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.classify-select-dialog {
  ::v-deep .el-dialog {
    .el-dialog__header {
      font-size: 14px;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 20px;
      & > div {
        & > div:nth-of-type(1) {
          & > span {
            font-size: 13px;
          }
          .el-select {
            margin: 0px 20px;
          }
        }

        & > div:nth-of-type(2) {
          margin-top: 20px;
          & > span {
            font-size: 13px;
          }
          & > span:nth-of-type(2) {
            display: inline-block;
            width: 205px;
          }
        }

        & > div:nth-of-type(3) {
          height: 350px;
          display: flex;
          width: 100%;
          margin-top: 20px;
          & > div:nth-of-type(2) {
            margin-left: 50px;
          }
          .el-scrollbar {
            height: 100%;
            width: 240px;
            border: 1px solid #e0e0e0;
            .el-scrollbar__wrap {
              overflow-x: hidden;
              ul {
                li {
                  height: 35px;
                  line-height: 35px;
                  text-align: center;
                  cursor: pointer;
                  span {
                    font-size: 12px;
                  }
                  &.active {
                    background-color: #b3d6ff !important;
                    color: #2589ff;
                  }
                  &:nth-of-type(odd) {
                    background-color: #f2f2f6;
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
