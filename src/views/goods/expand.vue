<template>
  <main-scroll>
    <div class="goods-expand-warpper public-warpper">
      <div class="step-header">
        <ul>
          <li
            v-for="(item, index) in stepList"
            :key="index"
            :class="{ active: index === 1 }"
          >
            <div>{{ index + 1 }}</div>
            <span>{{ item }}</span>
            <div class="line"></div>
          </li>
        </ul>
      </div>
      <div class="gray-bg-warpper">
        <div class="title">
          参数属性
        </div>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="商品分类">
            <div>
              <el-autocomplete
                v-model="form.classify"
                :fetch-suggestions="classifyQuerySearch"
                placeholder="请输入分类关键字"
                @select="classifyHandleSelect"
                size="small"
                class="w-350"
              ></el-autocomplete>

              <el-button
                type="text"
                size="small"
                class="mar-left-15"
                @click="addClassify"
              >
                新增分类
              </el-button>
            </div>
          </el-form-item>
          <el-form-item label="商品属性">
            <goods-form-value ref="goodsFormValue"></goods-form-value>
          </el-form-item>
          <el-form-item label="商品参数">
            <goods-form-parameter
              ref="goodsFormParameter"
            ></goods-form-parameter>
          </el-form-item>
          <el-form-item label="商品标签">
            <el-select
              v-model="form.lebel"
              placeholder="请选择商品标签"
              size="small"
            >
              <el-option
                v-for="item in goodsLabelList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="初始销量">
            <div>
              <el-input
                class="w-350"
                size="small"
                v-model="form.initSales"
                placeholder="默认销售量为0"
              ></el-input>

              <span class="prompt"
                >设置后，您的用户看到的销量=初始销量+下单量</span
              >
            </div>
          </el-form-item>
          <el-form-item label="库存计算方式">
            <div>
              <el-radio-group v-model="form.stockCalculation">
                <el-radio label="0">下单减库存</el-radio>
                <el-radio label="1">支付减库存</el-radio>
              </el-radio-group>
              <span class="prompt">下单减库存,存在</span>
              <span :style="{ color: '#ff0000' }">恶拍风险</span>
            </div>
          </el-form-item>

          <el-form-item label="上架状态">
            <div>
              <el-radio-group v-model="form.status">
                <el-radio label="0">上架</el-radio>
                <el-radio label="1">下架</el-radio>
              </el-radio-group>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog
        :visible.sync="classifyDialogVisible"
        width="420px"
        :before-close="classifyHandleClose"
        class="classify-dialog-warpper"
        append-to-body
      >
        <el-form
          :model="classifyForm"
          label-width="100px"
          :rules="classifyRules"
          ref="classifyForm"
        >
          <el-form-item label="级别">
            <el-radio-group
              v-model="classifyForm.level"
              @change="classifyFormLevelChange"
            >
              <el-radio label="1">一级</el-radio>
              <el-radio label="2">二级</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="classifyForm.level === '1'">
            <el-form-item label="一级分类名称" prop="firstTitle">
              <el-input
                v-model="classifyForm.firstTitle"
                size="small"
              ></el-input>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="上级分类" prop="firstId">
              <el-select
                v-model="classifyForm.firstId"
                placeholder="请选择上级分类"
                size="small"
              >
                <el-option
                  v-for="item in classifyFirst"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="二级分类名称" prop="secondTitle">
              <el-input
                v-model="classifyForm.secondTitle"
                size="small"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类图片" prop="secondImage">
              <el-button size="small" @click="imageSelectShow"
                >上传图片</el-button
              >
            </el-form-item>
          </div>
          <el-form-item label="分类状态">
            <el-radio-group v-model="classifyForm.show">
              <el-radio label="1">显示</el-radio>
              <el-radio label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="classifyHandleClose" size="small">取 消</el-button>
          <el-button type="primary" @click="addClassifyConfirm" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>

      <image-select ref="imageSelect"></image-select>
    </div>
    <div class="footer-btn" slot="footer">
      <div>
        <el-button size="medium" @click="cancel" plain>取消</el-button>
        <el-button size="medium" @click="back" plain>上一步</el-button>
        <el-button size="medium" @click="next" type="primary">下一步</el-button>
        <el-button size="medium" @click="save" type="primary">保存</el-button>
      </div>
    </div>
  </main-scroll>
</template>

<script>
import ImageSelect from "@/components/public/image-select.vue";
import GoodsFormValue from "@/components/goods/goods-form-value.vue";
import GoodsFormParameter from "@/components/goods/goods-form-parameter.vue";
import MainScroll from "components/public/main-scroll.vue";
export default {
  data() {
    return {
      //步骤列表
      stepList: ["基本信息", "扩展信息", "图文详情"],
      //上一页的表单
      prevForm: {},
      //表单
      form: {
        stockCalculation: "0",
        status: "0"
      },
      //新增商品分类显示
      classifyDialogVisible: false,
      //新增商品分类表单
      classifyForm: {
        level: "1",
        show: "1"
      },
      //新增商品表单验证
      classifyRules: {
        firstTitle: [
          { required: true, message: "必须填写名称", trigger: "blur" }
        ],
        secondTitle: [
          { required: true, message: "必须填写名称", trigger: "blur" }
        ],
        firstId: [
          { required: true, message: "必须选择上级分类", trigger: "blur" }
        ],
        secondImage: [
          { required: true, message: "必须上传图片", trigger: "blur" }
        ]
      },
      //一级分类列表
      classifyFirst: [
        {
          id: 0,
          title: "化妆产品"
        },
        {
          id: 1,
          title: "电子产品"
        },
        {
          id: 3,
          title: "家具产品"
        }
      ],
      //商品标签
      goodsLabelList: [
        {
          id: 0,
          title: "最新"
        },
        {
          id: 1,
          title: "最热"
        },
        {
          id: 2,
          title: "清仓"
        },
        {
          id: 3,
          title: "特价"
        }
      ]
    };
  },
  created() {
    this.prevForm = this.$route.query;
  },
  methods: {
    //取消该操作
    cancel() {},
    //回退上一步
    back() {
      this.$router.go(-1);
    },
    //保存表单
    save() {},
    //下一步
    next() {
      const form = this.getTotalForm();
      this.$router.push({ path: "/goods/detail", query: form });
    },
    //获取总表单
    getTotalForm() {
      const parameterList = this.$refs.goodsFormParameter.returnParameterList();
      const attributesList = this.$refs.goodsFormValue.returnAttributesList();
      return Object.assign(this.prevForm, this.form, {
        parameter: parameterList,
        attributes: attributesList
      });
    },
    //商品分组搜索列表
    classifyQuerySearch() {},
    //商品分组选择
    classifyHandleSelect() {},
    //新增分组
    addClassify() {
      this.classifyForm = {
        level: "1",
        show: "1"
      };
      this.classifyDialogVisible = true;
    },
    //新增分组隐藏
    classifyHandleClose() {
      this.$refs.classifyForm.clearValidate();
      this.classifyDialogVisible = false;
    },
    //新增分组确认
    addClassifyConfirm() {
      this.$refs.classifyForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    //分类级别改变的时候清除验证表单
    classifyFormLevelChange() {
      this.$refs.classifyForm.clearValidate();
    },
    //图片选择显示
    imageSelectShow() {
      this.$refs.imageSelect.show();
    }
  },
  components: {
    ImageSelect,
    GoodsFormValue,
    GoodsFormParameter,
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.goods-expand-warpper {
  .step-header {
    margin: 20px 0px;
    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        display: flex;
        align-items: center;
        & > div:nth-of-type(1) {
          width: 30px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #76767b;
          border-radius: 50%;
        }
        span {
          font-size: 13px;
          font-weight: bold;
          margin-left: 15px;
        }
        &:nth-last-of-type(1) {
          .line {
            display: none;
          }
        }
        .line {
          width: 90px;
          height: 1px;
          margin: 0px 10px;
          background-color: #e3e2e5;
        }
        &.active {
          & > div:nth-of-type(1) {
            background-color: #2689ff;
            border-color: #2689ff;
            color: #fff;
          }
        }
      }
    }
  }
  .gray-bg-warpper {
    padding: 20px;
    & > .title {
      text-align: left;
      color: #595961;
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .el-form {
      ::v-deep .el-form-item {
        .el-form-item__label {
          font-size: 12px;
        }
        .el-form-item__content {
          text-align: left;
          .el-form-item__error {
            margin-left: 20px;
          }
          & > div:nth-of-type(1) {
            margin-left: 20px;
            span {
              font-size: 12px;
            }
            .w-400 {
              width: 400px;
            }
            .w-350 {
              width: 350px;
            }
            .mar-left-15 {
              margin-left: 15px;
            }
            & > .prompt {
              margin-left: 20px;
              color: $secondary-text-color;
            }
          }
        }
      }
    }
  }
}
.classify-dialog-warpper {
  .el-form {
    ::v-deep .el-form-item {
      .el-form-item__label {
        font-size: 12px;
      }
      .el-radio {
        .el-radio__label {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
