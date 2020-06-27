<template>
  <div class="shop-classification-warpper public-warpper">
    <div class="gray-bg-warpper">
      <div class="show-warpper">
        <img src="../../assets/images/classification_header.jpg" alt="" />
        <div class="content">
          <div class="classification-list">
            <ul>
              <li v-for="(item, index) in classificationList" :key="index">
                <span>{{ item }}</span>
                <div class="line"></div>
              </li>
            </ul>
          </div>
          <div class="main">
            <div v-show="form.hasAdvertisingOne" class="advertising">
              <img
                :src="form.advertisingOneImage"
                alt=""
                v-if="form.advertisingOneImage"
              />
              <img src="../../assets/images/advertising.jpg" alt="" v-else />
            </div>
            <div class="middle-list">
              <ul>
                <li v-for="item in 9" :key="item">
                  <img
                    src="../../assets/images/classification_goods.jpg"
                    alt=""
                  />
                  <span>{{ form.listStatus === "0" ? "商品" : "分类" }}</span>
                </li>
              </ul>
            </div>
            <div v-show="form.hasAdvertisingTwo" class="advertising">
              <img
                :src="form.advertisingTwoImage"
                alt=""
                v-if="form.advertisingTwoImage"
              />
              <img src="../../assets/images/advertising.jpg" alt="" v-else />
            </div>
          </div>
        </div>
        <img src="../../assets/images/classification_footer.jpg" alt="" />
      </div>
      <div class="operating-warpper">
        <el-collapse
          accordion
          v-model="collapseActive"
          @change="collapseChange"
        >
          <el-collapse-item name="1">
            <template slot="title">
              <el-checkbox v-model="form.hasAdvertisingOne"></el-checkbox>
              <span class="title">图片导航1</span>
            </template>
            <div class="picNavOne">
              <div>
                <div class="title">
                  <span>图片上传</span>
                </div>
                <div>
                  <img
                    :src="form.advertisingOne"
                    alt
                    v-if="form.advertisingOne"
                  />
                  <img src="../../assets/images/horizontalpic.png" alt v-else />
                  <el-button plain size="small" @click="imageSelectShow"
                    >选择图片</el-button
                  >
                </div>
              </div>
              <div>
                <div class="title">
                  <span>选择链接</span>
                </div>
                <div>
                  <el-button plain size="small" @click="selectLinkShow(1)"
                    >选择链接</el-button
                  >
                  <span>{{ form.advertisingOneTitle }}</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <el-checkbox :value="true" disabled></el-checkbox>
              <span class="title">菜单</span>
            </template>
            <div class="list">
              <div>
                <div class="title">
                  <span>列表选项</span>
                </div>
                <div>
                  <el-checkbox v-model="form.listStatus" true-label="0"
                    >商品</el-checkbox
                  >
                  <el-checkbox v-model="form.listStatus" true-label="1"
                    >二级分类</el-checkbox
                  >
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item name="7">
            <template slot="title">
              <el-checkbox v-model="form.hasAdvertisingTwo"></el-checkbox>
              <span class="title">图片导航2</span>
            </template>
            <div class="picNavTwo">
              <div>
                <div class="title">
                  <span>图片上传</span>
                </div>
                <div>
                  <img
                    :src="form.advertisingTwo"
                    alt
                    v-if="form.advertisingTwo"
                  />
                  <img src="../../assets/images/horizontalpic.png" alt v-else />
                  <el-button plain size="small" @click="imageSelectShow"
                    >选择图片</el-button
                  >
                </div>
              </div>
              <div>
                <div class="title">
                  <span>选择链接</span>
                </div>
                <div>
                  <el-button plain size="small" @click="selectLinkShow(2)"
                    >选择链接</el-button
                  >
                  <span>{{ form.advertisingTwoTitle }}</span>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class="footer-btn">
      <div>
        <el-button size="medium" @click="saveClassification" type="primary"
          >保存</el-button
        >
      </div>
    </div>
    <image-select ref="imageSelect"></image-select>
    <page-link-select
      ref="pageLinkSelect"
      @confirm="selectLinkConfirm"
    ></page-link-select>
  </div>
</template>

<script>
import PageLinkSelect from "@/components/public/page-link-select.vue";
import ImageSelect from "@/components/public/image-select.vue";
export default {
  data() {
    return {
      //分类列表
      classificationList: ["婴童", "婴儿童装", "衣服", "美妆", "手机", "电脑"],
      //当前折叠板标志符
      collapseActive: "1",
      //分类模版表单
      form: {}
    };
  },
  created() {
    this._getClassification();
  },
  methods: {
    //折叠面板改变
    //id  改变item的标志符
    collapseChange(id) {
      if (id != "") {
        this.collapseActive = id;
      }
    },
    //获取分类模版
    _getClassification() {
      this.form = {
        hasAdvertisingOne: true,
        hasAdvertisingTwo: false,
        advertisingOneTitle: "",
        advertisingTwoTitle: "",
        advertisingOneLink: "",
        advertisingTwoLink: "",
        advertisingOneImage: "",
        advertisingTwoImage: "",
        listStatus: "0"
      };
    },
    //图片选择器显示
    imageSelectShow() {
      this.$refs.imageSelect.show();
    },
    //页面链接显示
    //index  广告索引值
    selectLinkShow(index) {
      let navDetail = {};
      if (index === 1) {
        navDetail = {
          url: this.form.picNavOneLink,
          urlTitle: this.formpicNavOneLinkTitle
        };
      } else {
        navDetail = {
          url: this.form.picNavTwoLink,
          urlTitle: this.picNavTwoLinkTitle
        };
      }
      this.$refs.pageLinkSelect.show(navDetail, index);
    },
    //链接选择确认
    //link       链接具体值
    //index      广告索引值
    //category   页面分类名称
    selectLinkConfirm(link, index, category) {
      if (index === 1) {
        this.form.advertisingOneLink = link.url;
        this.form.advertisingOneTitle = `${category} - ${link.urlTitle}`;
      } else {
        this.form.advertisingTwoLink = link.url;
        this.form.advertisingTwoTitle = `${category} - ${link.urlTitle}`;
      }
    },
    //分类页面模版
    saveClassification() {
      this.$message({
        message: "保存成功",
        type: "success"
      });
    }
  },
  components: {
    ImageSelect,
    PageLinkSelect
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.shop-classification-warpper {
  .gray-bg-warpper {
    display: flex;
    justify-content: center;
    .show-warpper {
      width: 375px;
      display: flex;
      flex-direction: column;
      & > img {
        width: 100%;
      }
      .content {
        height: 550px;
        background: #fff;
        padding-top: 15px;
        display: flex;
        .classification-list {
          width: 80px;
          flex-shrink: 0;
          background-color: #f8f8f8;
          ul {
            li {
              font-size: 13px;
              height: 35px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: $secondary-text-color;
              position: relative;
              &:nth-of-type(2) {
                background-color: #fff;
                color: #f577ab;
                .line {
                  height: 100%;
                  width: 2px;
                  background-color: #f577ab;
                  position: absolute;
                  left: 0;
                  border-radius: 0px 4px 4px 0px;
                }
              }
            }
          }
        }
        .main {
          flex: 1;
          padding: 0px 20px;
          .advertising {
            img {
              width: 100%;
            }
          }
          .middle-list {
            ul {
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 20px;
              li {
                margin-top: 10px;
                width: 33%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                img {
                  width: 60px;
                  height: 60px;
                }
                span {
                  margin-top: 5px;
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
    }
    .operating-warpper {
      margin-left: 130px;
      width: 460px;
      padding: 10px;
      background-color: #fff;

      .list {
        display: flex;
        ::v-deep .el-checkbox__label {
          font-size: 13px;
          color: $routine-text-color;
        }
      }
      ::v-deep .el-collapse {
        border: 1px solid #ebeef5;
        .el-collapse-item__header {
          background-color: #f2f2f6;
          border: none;
          i {
            display: none;
          }
          .el-checkbox {
            margin-left: 15px;
            margin-right: 10px;
          }
        }
        .el-collapse-item__content {
          padding: 0px;

          .picNavOne,
          .picNavTwo,
          .list {
            padding: 20px 20px;
            & > div {
              display: flex;
              align-items: center;
              &:not(:nth-of-type(1)) {
                margin-top: 14px;
              }
              & > .title {
                width: 100px;
                text-align: left;
              }
              & > div:nth-of-type(2) {
                display: flex;
                align-items: center;
                img {
                  width: 75px;
                  height: 40px;
                  margin-right: 15px;
                }
                & > span {
                  font-size: 12px;
                  margin-left: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
  .footer-btn {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    z-index: 999;
    & > div {
      border-radius: 10px 10px 0px 0px;
      box-shadow: $shadow;
      overflow: hidden;
      background-color: #fff;
      margin: 0px 10px;
      height: 100%;
    }
  }
}
</style>
