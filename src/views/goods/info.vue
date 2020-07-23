<template>
  <div class="goods-info-warpper public-warpper">
    <div class="step-header">
      <ul>
        <li
          v-for="(item, index) in stepList"
          :key="index"
          :class="{ active: index === 0 }"
        >
          <div>{{ index + 1 }}</div>
          <span>{{ item }}</span>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <div class="gray-bg-warpper">
      <div class="title">基本信息</div>
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="商品类型">
          <div>
            <el-radio v-model="form.type" label="0">实物商品(需配送)</el-radio>
            <el-radio v-model="form.type" label="1">虚拟商品(无配送)</el-radio>
            <span class="introduction">商品保存后无法修改，请谨慎选择</span>
          </div>
        </el-form-item>
        <el-form-item label="销售模式">
          <div>
            <el-radio v-model="form.mode" label="0">现货销售</el-radio>
            <el-radio v-model="form.mode" label="1">预售模式</el-radio>
            <span class="introduction">需设置商品预售数量</span>
          </div>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <div>
            <el-input
              v-model="form.name"
              maxlength="60"
              show-word-limit
              size="small"
              class="w-400"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="SPU编码" v-show="hasClassify">
          <div>
            <el-input v-model="form.spu" size="small" class="w-400"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="预售数量" v-if="form.mode === '1'" prop="preSale">
          <div class="preSale">
            <el-input v-model="form.preSale" size="small"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="商品类目" prop="classify" ref="classify">
          <div class="classify">
            <div v-if="hasClassify">
              <span>{{ form.classify.name }}</span>
              <span @click="classifySelectShow">修改</span>
            </div>
            <el-button plain size="small" @click="classifySelectShow" v-else
              >选择商品类目</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="商品规格" v-show="hasClassify">
          <div>
            <el-radio v-model="form.specificationModdel" label="0"
              >统一规格</el-radio
            >
            <el-radio v-model="form.specificationModdel" label="1"
              >多规格</el-radio
            >
          </div>
        </el-form-item>
        <div v-if="hasClassify && form.specificationModdel === '0'">
          <el-form-item label="商家编码">
            <div>
              <el-input
                v-model="form.coding"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="销售价" prop="sellingPrice">
            <div>
              <el-input
                v-model="form.sellingPrice"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="成本价">
            <div>
              <el-input
                v-model="form.costPrice"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="市场价">
            <div>
              <el-input
                v-model="form.marketPrice"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="库存">
            <div>
              <el-input
                v-model="form.stock"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="重量 (Kg)">
            <div>
              <el-input
                v-model="form.weight"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="体积 (m³)">
            <div>
              <el-input
                v-model="form.volume"
                size="small"
                class="w-400"
              ></el-input>
            </div>
          </el-form-item>
        </div>
        <!-- v-if="hasClassify && form.specificationModdel === '1'" -->
        <div>
          <div class="multiple">
            <div>
              <div
                class="specification-list"
                v-show="form.specificationList.length > 0"
              >
                <ul>
                  <li
                    v-for="(item, index) in form.specificationList"
                    :key="index"
                  >
                    <div class="specification-header">
                      <span>{{ item.value }}</span>
                      <el-popconfirm
                        title="确认删除该规格？"
                        @onConfirm="deleSpecification(index)"
                      >
                        <span slot="reference">移除</span>
                      </el-popconfirm>
                    </div>
                    <div class="specification-value">
                      <ul>
                        <li
                          v-for="(valItem, valIndex) in item.specificationValue"
                          :key="valIndex"
                        >
                          <el-tag
                            effect="plain"
                            type="info"
                            closable
                            @close="delItemSpecificationValue(valIndex, item)"
                          >
                            {{ valItem.value }}
                          </el-tag>
                        </li>
                      </ul>
                    </div>
                    <div class="add-specification-value">
                      <el-popover
                        placement="bottom-start"
                        width="670"
                        trigger="click"
                        :ref="`specificationValuePopover${index}`"
                      >
                        <div class="add-specification-value-wapper">
                          <el-input
                            placeholder="请选择或输入规格值"
                            size="small"
                            v-model="specificationValueInput"
                          >
                            <template slot="append">
                              <span
                                @click="specificationValueInputConfirm(item)"
                                >新增</span
                              >
                            </template>
                          </el-input>
                          <el-scrollbar>
                            <ul>
                              <li
                                v-for="(valItem,
                                valIndex) in specificationValueList"
                                :key="valIndex"
                                @click="
                                  changSpecificationValueAStatus(valItem, item)
                                "
                                :class="{
                                  active: checkSpecificationValueActive(
                                    valItem,
                                    item
                                  )
                                }"
                              >
                                <span>{{ valItem.value }}</span>
                                <el-popconfirm
                                  title="确定删除该规格值？可能会影响到以含有该规格值的规格。"
                                  @onConfirm="
                                    delSpecificationValue(
                                      valItem,
                                      valIndex,
                                      item
                                    )
                                  "
                                >
                                  <span
                                    class="el-icon-close"
                                    slot="reference"
                                    @click.stop
                                  ></span>
                                </el-popconfirm>
                              </li>
                            </ul>
                          </el-scrollbar>
                          <div class="btn">
                            <el-button
                              type="primary"
                              size="small"
                              @click="specificationValueInputHide(index)"
                              >确认</el-button
                            >
                          </div>
                        </div>
                        <el-button slot="reference" size="small">
                          添加规格值
                        </el-button>
                      </el-popover>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="add-specification">
                <el-button
                  plain
                  size="small"
                  @click="specificationInputShow"
                  v-show="!specificationInputVisible"
                  >添加规格</el-button
                >
                <el-autocomplete
                  v-model="specificationInput"
                  :fetch-suggestions="specificationInputSearch"
                  placeholder="请选择或输入规格"
                  @select="specificationInputSelect"
                  size="small"
                  v-show="specificationInputVisible"
                  :select-when-unmatched="true"
                >
                  <template slot="append">
                    <span @click="specificationInputConfirm">新增</span>
                  </template>
                </el-autocomplete>
              </div>
            </div>
            <div v-show="moreSpecificationList.length > 0">
              <batch-setting
                @batchSettingConfirm="batchSettingConfirm"
              ></batch-setting>
              <div class="more-specification-list">
                <el-table
                  :data="moreSpecificationTableData"
                  :span-method="objectSpanMethod"
                  border
                  style="width: 100%; margin-top: 20px"
                  :cell-style="tableCellStyle"
                >
                  <el-table-column
                    :label="item.value"
                    v-for="(item, index) in moreSpecificationList"
                    :key="index"
                  >
                    <template slot-scope="scope">
                      <span style="display:none">{{
                        setTabelValueColIndex(scope.$index, scope.row)
                      }}</span>
                      <span>{{ scope.row[item.value] }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="规格图片" width="80">
                    <template slot-scope="scope">
                      <img
                        :src="scope.row.image"
                        alt=""
                        v-if="scope.row.image"
                      />
                      <el-button
                        v-else
                        class="image-btn"
                        icon="el-icon-plus"
                        @click="imageSelectShow"
                      ></el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="商家编码" width="200">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.coding"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'coding')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="售价(元)" width="110">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.sellingPrice"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'sellingPrice')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="市场价(元)" width="110">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.marketPrice"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'marketPrice')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="成本价(元)" width="110">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.costPrice"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'costPrice')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" width="110">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.stock"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'stock')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="重量(kg)" width="110">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.weight"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'weight')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="体积(m³)" width="110">
                    <template slot-scope="scope">
                      <edit-btn
                        :value="scope.row.volume"
                        :disable="scope.row.disable"
                        @inputConfirm="
                          inputConfirm($event, scope.$index, 'volume')
                        "
                      ></edit-btn>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" min-width="120">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="clearRow(scope.$index)"
                        type="text"
                        size="small"
                      >
                        清空
                      </el-button>
                      <el-button
                        @click.native.prevent="disableRow(scope.$index)"
                        type="text"
                        size="small"
                        :style="{
                          color: scope.row.disable ? '#F56C6C' : '#409EFF'
                        }"
                      >
                        {{ scope.row.disable ? "启用" : "禁用" }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="total-inventory">
                <span>总库存</span>
                <el-input
                  v-model="totalInventory"
                  disabled
                  size="small"
                ></el-input>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="footer-btn">
      <div>
        <el-button size="medium" @click="back" plain>取消</el-button>
        <el-button size="medium" @click="next" type="primary">下一步</el-button>
        <el-button size="medium" @click="save" type="primary">保存</el-button>
      </div>
    </div>
    <classify-select
      ref="classifySelect"
      @confirm="classifySelectConfirm"
    ></classify-select>
    <image-select ref="imageSelect"></image-select>
  </div>
</template>

<script>
import ClassifySelect from "@/components/goods/classify-select.vue";
import BatchSetting from "@/components/goods/batch-setting.vue";
import EditBtn from "@/components/public/edit-btn.vue";
import ImageSelect from "@/components/public/image-select.vue";
export default {
  data() {
    var preSaleCheck = (rule, value, callback) => {
      if (value == 0) {
        return callback(new Error("预售数量不能为0"));
      } else {
        callback();
      }
    };

    return {
      //步骤列表
      stepList: ["基本信息", "扩展信息", "图文详情"],
      //商品表单
      form: {
        type: "0",
        mode: "0",
        preSale: "0",
        specificationModdel: "0",
        specificationList: [],
        stock: 0
      },
      //表单验证
      rules: {
        name: [{ required: true, message: "必须填写", trigger: "change" }],
        sellingPrice: [
          { required: true, message: "必须填写", trigger: "change" }
        ],
        preSale: [
          { validator: preSaleCheck, trigger: "change" },
          { required: true, message: "请输入预售数量", trigger: "blur" }
        ],
        classify: [{ required: true, message: "必须填写", trigger: "change" }]
      },
      //新增规格输入值
      specificationInput: "",
      //新增规格输入框是否显示
      specificationInputVisible: false,
      //新增规格属性输入值
      specificationValueInput: "",
      //规格属性列表
      specificationValueList: [],
      //多规格表格数据
      moreSpecificationTableData: []
    };
  },
  methods: {
    //取消该操作
    back() {},
    //保存表单
    save() {},
    //下一步
    next() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    //分类选择弹窗显示
    classifySelectShow() {
      this.$refs.classifySelect.show(
        this.hasClassify ? this.form.classify : null
      );
    },
    //分类选择确认
    //item  当前选择的分类
    classifySelectConfirm(item) {
      this.$set(this.form, "classify", item);
    },
    //添加规格显示
    specificationInputShow() {
      this.specificationInputVisible = true;
    },
    //添加规格选择选项
    //item    选择的规格
    specificationInputSelect(item) {
      this.specificationInputVisible = false;
      this.specificationInput = "";
      this.form.specificationList.push(item);
      this.modifyMoreSpecificationTableData();
    },
    //添加规格确认
    specificationInputConfirm() {
      this.specificationInputSelect({
        value: this.specificationInput
      });
    },
    //删除规格
    //index    规格的索引值
    deleSpecification(index) {
      const key = this.form.specificationList[index];
      this.form.specificationList.splice(index, 1);
      this.modifyMoreSpecificationTableData("", key);
    },
    //获取规格选择选项
    specificationInputSearch(queryString, cb) {
      cb([]);
    },
    //添加规格值确认
    //key      规格的具体值
    specificationValueInputConfirm(key) {
      const value = {
        value: this.specificationValueInput
      };
      if (key.specificationValue == null) {
        this.$set(key, "specificationValue", [value]);
      } else {
        key.specificationValue.push(value);
      }
      this.specificationValueList.push(value);
      this.specificationValueInput = "";
      this.modifyMoreSpecificationTableData();
    },
    //删除规格值
    //val         规格值具体值
    //valIndex    规格值索引
    //key         规格具体值
    delSpecificationValue(val, valIndex, key) {
      this.specificationValueList.splice(valIndex, 1);
      if (key.specificationValue != null) {
        const index = key.specificationValue.findIndex(
          item => item.value === val.value
        );
        key.specificationValue.splice(index, 1);
      }
      this.modifyMoreSpecificationTableData(val.value, key);
    },
    //查看规格值是否已被选中
    //item   规格值
    //key     规格
    checkSpecificationValueActive(item, key) {
      const index =
        key.specificationValue == null
          ? -1
          : key.specificationValue.findIndex(
              valItem => valItem.value === item.value
            );
      return index === -1 ? false : true;
    },
    //加入或者剔除规格中的规格值
    //value   规格值
    //key     规格
    changSpecificationValueAStatus(value, key) {
      let index = -1;
      if (key.specificationValue != null) {
        index = key.specificationValue.findIndex(
          item => item.value === value.value
        );
      }
      if (index == -1) {
        if (key.specificationValue == null) {
          this.$set(key, "specificationValue", [value]);
        } else {
          key.specificationValue.push(value);
        }
        this.modifyMoreSpecificationTableData();
      } else {
        key.specificationValue.splice(index, 1);
        this.modifyMoreSpecificationTableData(value.value, key);
      }
    },
    //新增规格属性弹出框关闭
    specificationValueInputHide(index) {
      this.$refs[`specificationValuePopover${index}`][0].doClose();
      this.specificationValueInput = "";
    },
    //剔除规格中的规格值
    //index  规格值的索引值
    //key    规格
    delItemSpecificationValue(index, key) {
      const value = key.specificationValue[index].value;
      key.specificationValue.splice(index, 1);
      this.modifyMoreSpecificationTableData(value, key);
    },
    //合并多规格表格
    objectSpanMethod({ columnIndex, rowIndex }) {
      if (
        this.moreSpecificationList.length > 0 &&
        columnIndex <= this.moreSpecificationList.length - 2
      ) {
        let tem = [];
        for (let i = 0; i < this.moreSpecificationList.length - 1; i++) {
          tem[i] = this.getOtherValueLen(i);
        }
        if (tem[columnIndex] && rowIndex % tem[columnIndex] === 0) {
          return {
            rowspan: tem[columnIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    //获取除了自身外所有同级的value的长度
    getOtherValueLen(itself) {
      let len = 1;
      this.moreSpecificationList.forEach((item, index) => {
        if (
          itself < index &&
          item.specificationValue &&
          item.specificationValue.length > 0
        ) {
          len = len * item.specificationValue.length;
        }
      });
      return len;
    },
    //清空多规格表格
    clearRow(index) {
      const item = this.moreSpecificationTableData[index];
      if (!item.disable) {
        this.$set(item, "coding", "");
        this.$set(item, "sellingPrice", "");
        this.$set(item, "marketPrice", "");
        this.$set(item, "costPrice", "");
        this.$set(item, "stock", "");
        this.$set(item, "weight", "");
        this.$set(item, "volume", "");
        this.$set(item, "iamge", "");
      }
    },
    //禁用
    //index  禁用列的索引
    disableRow(index) {
      const status = this.moreSpecificationTableData[index].disable
        ? false
        : true;

      this.$set(this.moreSpecificationTableData[index], "disable", status);
    },
    //根据计算对多规格表格进行增删
    modifyMoreSpecificationTableData(value, key) {
      let len = 0;
      this.moreSpecificationList.forEach(item => {
        if (item.specificationValue && item.specificationValue.length > 0) {
          if (len === 0) {
            len = 1;
          }
          len = len * item.specificationValue.length;
        }
      });
      if (this.moreSpecificationTableData.length < len) {
        let diffNum = len - this.moreSpecificationTableData.length;
        for (let index = 0; index < diffNum; index++) {
          this.moreSpecificationTableData.push({});
        }
      } else if (this.moreSpecificationTableData.length > len) {
        if (value === "") {
          const arrLen =
            this.moreSpecificationTableData.length /
            key.specificationValue.length;
          let temList = [];
          this.moreSpecificationTableData.forEach((item, index) => {
            if (index <= arrLen - 1) {
              temList.push(item);
            }
            this.moreSpecificationTableData = temList;
          });
        } else {
          this.moreSpecificationTableData = this.moreSpecificationTableData.filter(
            item => {
              return item[key.value] != value;
            }
          );
        }
      }
      this.$nextTick(() => {
        this.getTabelValueName();
      });
    },
    //设定表格的当前列数
    //colIndex    当前表格的列数索引值
    //row         当前表格的具体值
    setTabelValueColIndex(colIndex, row) {
      this.$set(row, "colIndex", colIndex);
    },
    //获取表格规格属性值名称
    getTabelValueName() {
      this.moreSpecificationTableData.forEach(item => {
        const colIndex = item.colIndex;
        this.moreSpecificationList.forEach((sItem, sIndex) => {
          let valueName = "";
          if (sIndex === this.moreSpecificationList.length - 1) {
            const valIndex = colIndex % sItem.specificationValue.length;
            valueName = sItem.specificationValue[valIndex].value;
          } else {
            let len = 1;
            this.moreSpecificationList.forEach((lItem, lIndex) => {
              if (sIndex <= lIndex) {
                len = len * lItem.specificationValue.length;
              }
            });
            //获取每个值占去多少格
            const itemValuelen = len / sItem.specificationValue.length;
            //获取
            let valIndex =
              colIndex >= itemValuelen
                ? parseInt(colIndex / itemValuelen)
                : colIndex;
            if (valIndex >= sItem.specificationValue.length) {
              valIndex = valIndex % sItem.specificationValue.length;
            }
            valueName = sItem.specificationValue[valIndex].value;
          }
          this.$set(item, sItem.value, valueName);
        });
      });
    },
    //表格输入确认
    //val      输入框的值
    //index    表格的索引
    //key      表格对象的key值
    inputConfirm(val, index, key) {
      this.$set(this.moreSpecificationTableData[index], key, val);
    },
    //表单单元格样式
    //row           当前表格列的具体值
    //columnIndex   当前表格列的每格的索引值
    tableCellStyle({ row, columnIndex }) {
      let style = {};
      if (row.disable && columnIndex > this.moreSpecificationList.length - 1) {
        style = {
          "background-color": "#F8F8F8"
        };
      }
      return style;
    },
    //规格列表批量设置
    //form   批量设置表单
    batchSettingConfirm({
      coding,
      sellingPrice,
      marketPrice,
      costPrice,
      stock,
      weight,
      volume
    }) {
      this.checkBatchSetting(coding, "coding");
      this.checkBatchSetting(sellingPrice, "sellingPrice");
      this.checkBatchSetting(marketPrice, "marketPrice");
      this.checkBatchSetting(costPrice, "costPrice");
      this.checkBatchSetting(stock, "stock");
      this.checkBatchSetting(weight, "weight");
      this.checkBatchSetting(volume, "volume");
    },
    //查看批量设置是否有值，有值则设置
    //value   设置具体值
    //key     设置key值
    checkBatchSetting(value, key) {
      if (value) {
        this.moreSpecificationTableData.forEach(item => {
          this.$set(item, key, value);
        });
      }
    },
    //选择规格图片显示
    imageSelectShow() {
      this.$refs.imageSelect.show();
    }
  },
  components: {
    ClassifySelect,
    BatchSetting,
    EditBtn,
    ImageSelect
  },
  computed: {
    //拥有商品类目
    hasClassify() {
      if (this.form.classify) {
        this.$refs.classify.clearValidate();
      }
      return this.form.classify ? true : false;
    },
    //多规格表格规格列表
    moreSpecificationList() {
      let temList = [];
      if (this.form.specificationList) {
        this.form.specificationList.forEach(item => {
          if (
            item.specificationValue != null &&
            item.specificationValue.length > 0
          ) {
            temList.push(item);
          }
        });
      }
      return temList;
    },
    //不同规格总库存
    totalInventory() {
      return 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.goods-info-warpper {
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
    padding-bottom: 50px;
    & > .title {
      text-align: left;
      color: #595961;
      font-size: 15px;
      font-weight: bold;
    }
    .el-form {
      overflow: hidden;
      margin-top: 10px;
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
            & > span.introduction {
              font-size: 12px;
              color: $secondary-text-color;
            }
            span {
              font-size: 12px;
            }
            .w-400 {
              width: 400px;
            }
            &.preSale {
              .el-input {
                width: 100px;
              }
            }
            &.classify {
              & > div {
                span:nth-of-type(2) {
                  margin-left: 20px;

                  cursor: pointer;
                  color: #2589ff;
                }
              }
            }
            .el-radio {
              .el-radio__label {
                font-size: 12px;
              }
            }
          }
        }
      }
      .multiple {
        border: 1px solid #e3e2e5;
        border-radius: 4px;
        background-color: #fff;
        margin: 0px 40px;
        text-align: left;
        padding: 20px 10px;
        & > div:nth-of-type(1) {
          border-bottom: 1px dashed #e3e2e5;
          padding-bottom: 20px;
          .specification-list {
            margin-bottom: 20px;
            & > ul {
              & > li {
                margin-bottom: 22px;
                span {
                  font-size: 12px;
                }
                .specification-header {
                  height: 50px;
                  background: #f2f2f6;
                  line-height: 50px;
                  border-radius: 4px;
                  padding: 0 10px;
                  display: flex;
                  justify-content: space-between;
                  span:nth-of-type(2) {
                    color: $theme-btn-color;
                    cursor: pointer;
                  }
                }
                .specification-value {
                  ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                      margin-top: 15px;
                      margin-right: 10px;
                    }
                  }
                }
                .add-specification-value {
                  margin-top: 20px;
                }
              }
            }
          }
          .add-specification {
            & > .el-button {
              color: #2589ff !important;
              background-color: white;
              border-color: #2589ff !important;
            }
            ::v-deep .el-input {
              width: 220px;
              .el-input-group__append {
                cursor: pointer;
                padding: 0;
                width: 55px;
                text-align: center;
                span {
                  display: block;
                }
              }
            }
          }
        }
        & > div:nth-of-type(2) {
          margin-top: 20px;
          .more-specification-list {
            max-width: 1200px;
            .image-btn {
              width: 40px;
              height: 40px;
              border: 1px dashed #e3e2e5;
              border-radius: 4px;
              text-align: center;
              cursor: pointer;
              margin-left: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .total-inventory {
            margin-top: 30px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            & > span {
              font-size: 12px;
              margin-right: 20px;
            }
            .el-input {
              width: 200px;
            }
          }
        }
      }
    }
  }
}
.add-specification-value-wapper {
  ::v-deep .el-input {
    width: 300px;
    .el-input-group__append {
      cursor: pointer;
      padding: 0;
      width: 60px;
      text-align: center;
      span {
        display: block;
      }
    }
  }
  ::v-deep .el-scrollbar {
    height: 200px;
    margin-top: 15px;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        padding: 0px 5px;
        li {
          margin-bottom: 12px;
          background: #f2f2f6;
          border-radius: 2px;
          height: 30px;
          cursor: pointer;
          display: flex;
          width: 16.5%;
          display: flex;
          align-items: center;
          padding: 0px 8px;
          margin-right: 1%;
          &.active {
            background: #d3e7ff;
            span {
              color: #2589ff;
            }
          }
          span {
            color: $routine-text-color;
          }
          span:nth-of-type(1) {
            font-size: 12px;
            flex: 1;
            overflow: hidden;
          }
        }
      }
    }
  }
  .btn {
    text-align: right;
  }
}
</style>
