<template>
  <main-scroll>
    <div class="product-comment-warpper public-warpper">
      <div class="gray-bg-warpper">
        <div class="comment-search">
          <div>
            <el-select
              v-model="filterForm.level"
              placeholder="评价等级"
              size="small"
              clearable
            >
              <el-option
                v-for="item in commentLevelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>

            <el-select
              v-model="filterForm.reply"
              placeholder="全部回复"
              size="small"
              clearable
            >
              <el-option
                v-for="item in commentReplyList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>

            <el-select
              v-model="filterForm.featured"
              placeholder="精选状态"
              size="small"
              clearable
            >
              <el-option
                v-for="item in commentFeaturedList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>

            <el-select
              v-model="filterForm.show"
              placeholder="显示状态"
              size="small"
              clearable
            >
              <el-option
                v-for="item in commentShowList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="filterForm.keyWorkType" size="small">
              <el-option
                v-for="item in commentKeyWorkTypeList"
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
              ></el-button>
            </el-input>
          </div>
        </div>

        <div class="comment-table">
          <el-table :data="tableData" stripe>
            <el-table-column prop="common" label="评论内容"></el-table-column>
            <el-table-column label="评论图片" width="180">
              <template slot-scope="scope">
                <ul>
                  <li v-for="(item, index) in scope.row.image" :key="index">
                    <el-image
                      :src="item"
                      fit="cover"
                      :preview-src-list="scope.row.image"
                    ></el-image>
                  </li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column prop="goods" label="商品信息"> </el-table-column>
            <el-table-column label="等级" width="80">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(commentLevelList, scope.row.level)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="显示" width="80">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(commentShowList, scope.row.show)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="精选" width="80">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(commentFeaturedList, scope.row.feature)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="回复" width="80">
              <template slot-scope="scope">
                <span>{{
                  returnTableValue(commentReplyList, scope.row.reply)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="text">
                  {{ scope.row.feature === "1" ? "设为精选" : "剔除精选" }}
                </el-button>

                <el-button size="small" type="text">
                  {{ scope.row.show === "1" ? "隐藏" : "显示" }}
                </el-button>

                <el-button size="small" type="text">
                  回复
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
      //筛选表单
      filterForm: {
        keyWorkType: "1"
      },
      //评论等级列表
      commentLevelList: [
        {
          id: "0",
          name: "好评"
        },
        {
          id: "1",
          name: "中评"
        },
        {
          id: "2",
          name: "差评"
        }
      ],
      //评论回复列表
      commentReplyList: [
        {
          id: "0",
          name: "未回复"
        },
        {
          id: "1",
          name: "已回复"
        }
      ],
      //评论精选列表
      commentFeaturedList: [
        {
          id: "0",
          name: "未精选"
        },
        {
          id: "1",
          name: "已精选"
        }
      ],
      //评论显示列表
      commentShowList: [
        {
          id: "0",
          name: "已隐藏"
        },
        {
          id: "1",
          name: "显示中"
        }
      ],
      //评论关键词类型列表
      commentKeyWorkTypeList: [
        {
          id: "0",
          name: "订单编号"
        },
        {
          id: "1",
          name: "商品名称"
        },
        {
          id: "2",
          name: "用户昵称"
        },
        {
          id: "3",
          name: "收货人姓名"
        },
        {
          id: "4",
          name: "收货人手机号"
        }
      ],
      //表单数据
      tableData: []
    };
  },
  created() {
    this.getCommentList();
  },
  methods: {
    //根据不同的数组和不同的id返回不同的值
    //list    返回内容的数组
    //id      返回内容的id
    returnTableValue(list, id) {
      const matchItem = list.find(item => item.id === id);
      return matchItem.name;
    },
    //获取评论列表
    getCommentList() {
      this.tableData = [
        {
          common: "测试99999999999999999999999999",
          goods: "测试1",
          level: "0",
          show: "1",
          feature: "0",
          reply: "0",
          image: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596260024397&di=f850691a76d9ef1d74ac4f8ce9c8bc61&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F7aec54e736d12f2e78d02dfb44c2d56284356850.jpg",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
          ]
        },
        {
          common: "测试99999999999999999999999999",
          goods: "测试1",
          level: "1",
          reply: "1",
          show: "0",
          feature: "1",
          image: [
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png",
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596088854471&di=73c6642be58f12417c59966e96235711&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F01%2F39%2F53%2F98%2F5904377a0152e.png"
          ]
        },
        {
          common: "测试99999999999999999999999999",
          goods: "测试1",
          reply: "1",
          level: "1",
          show: "0",
          feature: "1"
        }
      ];
    }
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.product-comment-warpper {
  .gray-bg-warpper {
    .comment-search {
      background-color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div:nth-of-type(1) {
        .el-select {
          width: 110px;
          margin-right: 10px;
        }
      }
      & > div:nth-of-type(2) {
        display: flex;
        .el-select {
          width: 150px;
        }
        .el-input {
          margin-left: 10px;
          width: 220px;
        }
      }
    }
    .comment-table {
      width: 100%;
      margin-top: 10px;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid #e3e2e5;
      .el-table {
        width: 100%;
        font-size: 12px;
        span {
          & > .el-button {
            margin-left: 10px;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          li {
            cursor: pointer;
            &:not(:nth-of-type(1)) {
              margin-left: 10px;
            }
            .el-image {
              width: 40px;
              height: 40px;
              border: 1px solid #eee;
            }
          }
        }
      }
    }
  }
}
</style>
