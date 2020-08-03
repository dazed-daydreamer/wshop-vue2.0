<template>
  <main-scroll>
    <div class="shop-page-warpper public-warpper">
      <div class="top">
        <div class="home-page">
          <span>当前首页:</span>
          <span>默认首页</span>
        </div>
        <div class="add-btn">
          <el-button type="primary" @click="jumpAdd">新建页面</el-button>
        </div>
      </div>
      <div class="page-list-warpeer gray-bg-warpper">
        <div class="top-wapper">
          <div class="btn-warpper">
            <el-select
              v-model="filterForm.listType"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in typeSelect"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button plain size="small">批量删除</el-button>
            <el-button plain size="small">修改分享信息</el-button>
          </div>
          <div class="search-warpper">
            <el-input
              placeholder="请输入内容"
              v-model="filterForm.keyword"
              size="small"
            >
              <template slot="append">
                <div @click="search">搜索</div>
              </template>
            </el-input>
          </div>
        </div>
        <div class="table-warpper">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="页面名称"></el-table-column>
            <el-table-column
              prop="state"
              label="当前状态"
              width="200"
            ></el-table-column>
            <el-table-column prop="date" label="最后修改时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div class="table-btn">
                  <span @click="handleEdit(scope.$index, scope.row)">编辑</span>
                  <span @click="handleDelete(scope.$index, scope.row)"
                    >删除</span
                  >
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">更多</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>设为首页</el-dropdown-item>
                      <el-dropdown-item>取消发布</el-dropdown-item>
                      <el-dropdown-item>页面设置</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
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
import { getPageList } from "api/http";
import MainScroll from "components/public/main-scroll.vue";

export default {
  data() {
    return {
      //过滤的表单
      filterForm: {
        listType: 0,
        keyword: ""
      },
      //当前列表页码
      page: 1,
      //页面状态列表
      typeSelect: [
        {
          id: 0,
          title: "全部状态"
        },
        {
          id: 1,
          title: "未发布"
        },
        {
          id: 2,
          title: "已发布"
        },
        {
          id: 3,
          title: "已取消发布"
        }
      ],
      //页面列表
      tableData: []
    };
  },
  created() {
    //获取页面列表
    this._getPageList();
  },
  methods: {
    //过滤
    search() {
      console.log(1);
    },

    handleSelectionChange() {},

    handleEdit() {},

    handleDelete() {},

    handleCurrentChange() {},

    //获取页面列表
    async _getPageList() {
      const res = await getPageList();
      this.tableData = res.data.list;
    },
    //添加新页面
    jumpAdd() {
      this.$router.push({ name: "shopPageStep1" });
    }
  },
  components: {
    MainScroll
  }
};
</script>

<style lang="scss">
@import "@/styles/theme.scss";
.shop-page-warpper {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px 15px 10px;
    .home-page {
      span {
        font-size: 15px;
      }
    }
    .add-btn {
      button {
        background-color: $theme-color;
      }
    }
  }
  .page-list-warpeer {
    .top-wapper {
      border-radius: 5px;
      background-color: #fff;
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      button {
        margin-left: 15px;
      }
    }
    .search-warpper {
      .el-input-group__append {
        cursor: pointer;
      }
    }
  }

  .table-warpper {
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: $shadow;
    .table-btn {
      display: flex;
      span {
        font-size: 14px;
        cursor: pointer;
        margin-right: 14px;
        color: $theme-color;
      }
    }
  }
}
</style>
