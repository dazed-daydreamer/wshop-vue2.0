<template>
  <div class="goods-all-warpper public-warpper">
    <div class="gray-bg-warpper">
      <div class="search-header">
        <div>
          <div>
            <el-select
              v-model="keyWorkTypeActive"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="(item, index) in keyWorkTypes"
                :key="index"
                :label="item"
                :value="index"
              >
              </el-option>
            </el-select>

            <el-input
              placeholder="请输入内容"
              v-model="keyWork"
              class="input-with-select"
              size="small"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="keyWorkSearch"
              ></el-button>
            </el-input>
          </div>
          <div>
            <el-button plain size="small" @click="show">高级筛选</el-button>
          </div>
        </div>
        <div>
          <span>商品标签</span>
          <div>
            <div>
              <el-tag
                size="medium"
                :type="labelFilterList.length === 0 ? '' : 'info'"
                >不限</el-tag
              >
            </div>
            <div>
              <ul>
                <li v-for="(item, index) in labelFilterList" :key="index">
                  <el-tag closable @close="deleTelabelFilterItem(index)">
                    {{ item.label }}
                  </el-tag>
                </li>
              </ul>
              <el-button plain size="small" @click="labelSelectShow"
                >添加标签</el-button
              >
            </div>
          </div>
        </div>
        <div class="more" v-show="!headeMoreSearchShow">
          <ul>
            <li v-show="productTypeShow">
              <span>商品类型:</span>
              <span>{{ productTypeSelectName }}</span>
            </li>
            <li v-show="searchMoreForm.salesModel != '0'">
              <span>销售模式:</span>
              <span>{{ salesModel[parseInt(searchMoreForm.salesModel)] }}</span>
            </li>
            <li v-show="searchMoreForm.productStatus != '0'">
              <span>商品状态:</span>
              <span>{{
                productStatus[parseInt(searchMoreForm.productStatus)]
              }}</span>
            </li>
            <li v-show="searchMoreForm.date != ''">
              <span>商品上下架时间:</span>
              <span>{{ porductDateName }}</span>
            </li>
            <li
              v-show="
                searchMoreForm.priceLowest != '' ||
                  searchMoreForm.priceHighest != ''
              "
            >
              <span>商品价格区间:</span>
              <span>{{ porductPriceName }}</span>
            </li>

            <li v-show="searchMoreForm.group != '0'">
              <span>商品分组:</span>
              <span>{{ productGroup[parseInt(searchMoreForm.group)] }}</span>
            </li>
          </ul>
          <div @click="cleanMore" class="clean">
            <span>清空高级筛选</span>
          </div>
        </div>
        <div>
          <span>快捷操作</span>
          <div>
            <el-button plain size="small" @click="productPageShow()"
              >新增商品</el-button
            >
            <el-button plain size="small">批量上架</el-button>
            <el-button plain size="small">批量下架</el-button>
            <el-button plain size="small">导出</el-button>
          </div>
        </div>
      </div>
      <div class="product-table">
        <el-table
          :data="productList"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="title" label="商品名称"> </el-table-column>
          <el-table-column prop="price" label="价格" width="120" sortable>
          </el-table-column>
          <el-table-column prop="stock" label="库存" width="100" sortable>
          </el-table-column>
          <el-table-column prop="sales" label="销量" width="120" sortable>
          </el-table-column>
          <el-table-column prop="date" label="上架时间" width="160" sortable>
          </el-table-column>
          <el-table-column label="上架状态" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.status === "0" ? "下架" : "上架" }}</span>
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="90" sortable>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
                >编辑</el-button
              >
              <el-button
                size="mini"
                @click="handleCope(scope.$index, scope.row)"
                >复制</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer-btn">
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
      :visible.sync="searchMoreDialogVisible"
      width="740px"
      :before-close="hide"
      class="search-more-dialog"
      append-to-body
    >
      <div slot="title">
        <span>高级筛选</span>
      </div>
      <div>
        <div class="type">
          <div class="title">
            商品类型
          </div>
          <ul>
            <li
              v-for="(item, index) in productType"
              :key="index"
              @click="searchMoreFormChange(index, 'productType')"
              :class="{
                active: getProductTypeActive(index)
              }"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="mode">
          <div class="title">
            销售模式
          </div>
          <ul>
            <li
              v-for="(item, index) in salesModel"
              :key="index"
              @click="searchMoreFormChange(index, 'salesModel')"
              :class="{
                active: index === parseInt(temSearchMoreForm.salesModel)
              }"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="status">
          <div class="title">
            商品状态
          </div>
          <ul>
            <li
              v-for="(item, index) in productStatus"
              :key="index"
              @click="searchMoreFormChange(index, 'productStatus')"
              :class="{
                active: index === parseInt(temSearchMoreForm.productStatus)
              }"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="info">
          <div class="title">
            商品信息
          </div>
          <ul>
            <li>
              <span>商品上下架时间</span>
              <el-date-picker
                v-model="temSearchMoreForm.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                size="small"
              >
              </el-date-picker>
            </li>
            <li>
              <span>商品价格区间</span>
              <div>
                <el-input
                  placeholder="最低价格"
                  v-model="temSearchMoreForm.priceLowest"
                  size="small"
                >
                  <template slot="append">元</template>
                </el-input>
                <span>-</span>
                <el-input
                  placeholder="最高价格"
                  v-model="temSearchMoreForm.priceHighest"
                  size="small"
                >
                  <template slot="append">元</template>
                </el-input>
              </div>
            </li>

            <li>
              <span>商品分组 </span>
              <el-select
                v-model="temSearchMoreForm.group"
                placeholder="请选择"
                size="small"
              >
                <el-option
                  v-for="(item, index) in productGroup"
                  :key="index"
                  :label="item"
                  :value="`${index}`"
                >
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="saveMoreSearch">确 定</el-button>
      </span>
    </el-dialog>
    <label-select ref="labelSelect" @confirm="labelConfirm"></label-select>
  </div>
</template>

<script>
import LabelSelect from "@/components/public/label-select.vue";
import { publicMixins } from "@/mixins/public-mixins.js";
export default {
  mixins: [publicMixins],
  data() {
    return {
      //关键字类型
      keyWorkTypes: ["商品名称", "SPU码", "商品编码"],
      //当前关键字类型
      keyWorkTypeActive: 0,
      //关键字
      keyWork: "",
      //商品标签筛选组
      labelFilterList: [],
      //商品列表
      productList: [
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        },
        {
          title: "测试1",
          price: "200",
          stock: "0",
          sales: "100",
          date: "2020-07-07 09:55",
          sort: 0,
          status: "0"
        }
      ],
      //高级筛选显示
      searchMoreDialogVisible: false,
      //商品类型
      productType: ["全部", "实物商品(需配送)", "虚拟商品(无配送)"],
      //商品状态
      productStatus: ["全部", "上架中", "下架中", "售罄"],
      //销售模式
      salesModel: ["全部", "现货售卖", "预售模式"],
      //高级筛选表单
      searchMoreForm: {
        productType: ["0"],
        productStatus: "0",
        salesModel: "0",
        date: "",
        priceLowest: "",
        priceHighest: "",
        group: "0"
      },
      //高级筛选临时表单
      temSearchMoreForm: {},
      //时间选择器设置
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
      //商品分组
      productGroup: ["全部"]
    };
  },
  methods: {
    //关键字搜索
    keyWorkSearch() {},
    //添加搜索标签显示
    labelSelectShow() {
      this.$refs.labelSelect.show();
    },
    //标签选择确认
    //labels   已选中的标签组
    labelConfirm(labels) {
      this.labelFilterList = labels;
    },
    //关闭某个标签
    //index  标签的索引值
    deleTelabelFilterItem(index) {
      this.labelFilterList.splice(index, 1);
    },
    //商品列表全选
    handleSelectionChange() {},
    //商品修改
    handleEdit() {},
    //商品复制
    handleCopy() {},
    //高级筛选显示
    show() {
      this.searchMoreDialogVisible = true;
      this.temSearchMoreForm = JSON.parse(JSON.stringify(this.searchMoreForm));
    },
    //高级筛选隐藏
    hide() {
      this.searchMoreDialogVisible = false;
      this.temSearchMoreForm = {};
    },
    //保存高级筛选
    saveMoreSearch() {
      this.searchMoreForm = JSON.parse(JSON.stringify(this.temSearchMoreForm));
      this.hide();
    },
    //高级筛选表单改变
    //value   改变的值
    //key     改变的变量
    searchMoreFormChange(value, key) {
      if (key === "productType") {
        if (value === 0) {
          this.temSearchMoreForm[key] = ["0"];
        } else {
          const index = this.temSearchMoreForm.productType.findIndex(
            item => item === `${value}`
          );
          if (index === -1) {
            this.temSearchMoreForm[key].push(`${value}`);
          } else {
            this.temSearchMoreForm[key].splice(index);
          }
          if (this.temSearchMoreForm[key].length === 0) {
            this.temSearchMoreForm[key] = ["0"];
          } else {
            const hasAllIndex = this.temSearchMoreForm.productType.findIndex(
              item => item === "0"
            );
            if (this.temSearchMoreForm[key].length >= 2 && hasAllIndex != -1) {
              this.temSearchMoreForm.productType.splice(hasAllIndex, 1);
            }
          }
        }
      } else {
        if (`${value}` === this.temSearchMoreForm[key]) {
          this.temSearchMoreForm[key] = "0";
        } else {
          this.temSearchMoreForm[key] = `${value}`;
        }
      }
    },
    //获取高级筛选商品类型是否被选中
    //value   该条索引值
    getProductTypeActive(value) {
      const index =
        this.temSearchMoreForm.productType != null
          ? this.temSearchMoreForm.productType.findIndex(
              item => item === `${value}`
            )
          : -1;
      return index != -1;
    },
    //清除高级筛选器
    cleanMore() {
      this.searchMoreForm = {
        productType: ["0"],
        productStatus: "0",
        salesModel: "0",
        date: "",
        priceLowest: "",
        priceHighest: "",
        group: "0"
      };
    },
    //跳转到产品页面
    //detail    已有产品的值，如新增产品不需要赋值
    productPageShow(detail) {
      if (detail) {
        console.log(detail);
      } else {
        this.$router.replace({ name: "goodsInfo" });
      }
    }
  },
  components: {
    LabelSelect
  },
  computed: {
    //显示商品类型状态数值
    productTypeSelectName() {
      let str = "";
      this.searchMoreForm.productType.forEach(item => {
        str += `${this.productType[parseInt(item)]}  `;
      });
      return str;
    },
    //是否显示商品类型项
    productTypeShow() {
      return this.searchMoreForm.productType[0] != "0";
    },
    //显示商品上下架时间数值
    porductDateName() {
      return this.searchMoreForm.date === ""
        ? ""
        : `${this.dateFormatConversion(
            this.searchMoreForm.date[0]
          )} ~ ${this.dateFormatConversion(this.searchMoreForm.date[1])}`;
    },
    //显示商品价格区间数值
    porductPriceName() {
      return `${
        this.searchMoreForm.priceLowest === ""
          ? "--"
          : this.searchMoreForm.priceLowest + "元"
      } ～ ${
        this.searchMoreForm.priceHighest === ""
          ? "--"
          : this.searchMoreForm.priceHighest + "元"
      }`;
    },
    //筛选头部高级筛选是否显示
    headeMoreSearchShow() {
      return (
        this.searchMoreForm.productType[0] === "0" &&
        this.searchMoreForm.productStatus === "0" &&
        this.searchMoreForm.salesModel === "0" &&
        this.searchMoreForm.date === "" &&
        this.searchMoreForm.priceLowest === "" &&
        this.searchMoreForm.priceHighest === "" &&
        this.searchMoreForm.productStatus === "0" &&
        this.searchMoreForm.group === "0"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.goods-all-warpper {
  .gray-bg-warpper {
    padding-bottom: 50px;
    .search-header {
      background-color: #fff;
      border-radius: 5px;
      padding: 20px;
      & > div {
        display: flex;
        align-items: center;
      }
      & > div:nth-of-type(1) {
        justify-content: space-between;
        & > div {
          display: flex;
          .el-input {
            width: 250px;
            margin-left: 15px;
          }
          .el-select {
            width: 120px;
          }
          &:nth-of-type(2) {
            .el-button {
              border: 1px solid #2589ff !important;
              color: #2589ff !important;
            }
          }
        }
      }
      & > div:nth-of-type(2) {
        margin-top: 25px;
        & > span {
          font-size: 13px;
        }
        & > div {
          display: flex;
          flex: 1;
          .el-tag {
            height: 30px;
          }
          & > div:nth-of-type(1) {
            margin-left: 10px;
            margin-right: 15px;
            .el-tag {
              width: 100px;
            }
          }
          & > div:nth-of-type(2) {
            display: flex;
            ul {
              display: flex;
              li {
                margin-right: 10px;
              }
            }
            & > .el-button {
              height: 30px;
              width: 80px;
            }
          }
        }
      }
      .more {
        display: flex;
        margin-top: 25px;
        ul {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          li {
            margin-right: 15px;
            span {
              font-size: 13px;
              color: $secondary-text-color;
            }
            & > span:nth-of-type(1) {
              margin-right: 5px;
            }
          }
        }
        .clean {
          font-size: 13px;
          cursor: pointer;
          color: #2589ff;
          margin-right: 10px;
        }
      }
      & > div:nth-last-of-type(1) {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid #e3e2e5;
        & > span {
          font-size: 13px;
        }
        & > div {
          margin-left: 10px;
          .el-button {
            height: 30px;
            width: 80px;
            &:nth-of-type(1) {
              border: 1px solid #2589ff !important;
              color: #2589ff !important;
            }
          }
        }
      }
    }
    .product-table {
      margin-top: 20px;
      border-radius: 5px;
      overflow: hidden;
      width: 100%;
      div {
        font-size: 13px;
      }
      .el-switch {
        width: 35px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
  .footer-btn {
    & > div {
      display: flex;
      padding: 0px 10px;
      justify-content: space-between;
      align-items: center;
      & > span {
        font-size: 13px;
        color: $secondary-text-color;
      }
      ::v-deep {
        .el-pagination {
          display: flex;
          align-items: center;
          ul {
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
::v-deep.search-more-dialog {
  .el-dialog__header {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__body {
    padding: 15px 20px;
    & > div {
      .type,
      .mode,
      .status {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .title {
          width: 80px;
          font-size: 12px;
        }
        ul {
          flex: 1;
          display: flex;
          li {
            min-width: 80px;
            margin-left: 10px;
            padding: 5px 10px;
            background: #f2f2f6;
            border-color: #f2f2f6;
            cursor: pointer;
            text-align: center;
            border-radius: 4px;
            span {
              font-size: 12px;
            }
            &.active {
              background: #d3e7ff;
              color: #2589ff;
            }
          }
        }
      }

      .info {
        display: flex;
        margin-bottom: 20px;
        .title {
          margin-top: 8px;
          width: 80px;
          font-size: 12px;
        }
        ul {
          flex: 1;
          li {
            margin-bottom: 20px;
            margin-left: 10px;
            span {
              font-size: 12px;
            }
            & > span {
              width: 100px;
              display: inline-block;
            }
            .el-date-editor {
              margin-left: 15px;
            }
            .el-select {
              margin-left: 15px;
            }
            &:nth-of-type(2) {
              display: flex;
              align-items: center;
              & > div {
                margin-left: 15px;
                align-items: center;
                display: flex;
                & > span {
                  margin: 0px 10px;
                }
                .el-input {
                  width: 150px;
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
