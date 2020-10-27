<template>
  <div class="profile-layout">
    <el-row>
      <el-col :span="24">
        <profile-title :title="$route.meta.title" />
      </el-col>
    </el-row>
    <el-form :inline="true"
             class="headerInfo"
             label-width="85px"
             label-position="left"
             :model="searchForm"
             @keyup.enter.native="getDataList()">
      <el-row>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="searchForm.name"
                      placeholder="姓名"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="success"
                       @click="searchDataList()">查询</el-button>
            <el-button type="primary"
                       @click="addOrUpdateHandle()">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">联系人列表</el-divider>
    <el-table :data="dataList"
              border
              stripe
              @selection-change="selectionChangeHandle"
              style="width: 100%;">
      <el-table-column prop="type"
                       header-align="center"
                       :formatter="baseContactsType"
                       align="center"
                       label="类型">
      </el-table-column>
      <el-table-column prop="company"
                       header-align="center"
                       align="center"
                       width="150"
                       label="公司名称">
      </el-table-column>
      <el-table-column prop="name"
                       header-align="center"
                       align="center"
                       width="100"
                       label="联系人">
      </el-table-column>
      <el-table-column prop="phone"
                       header-align="center"
                       align="center"
                       width="150"
                       label="电话">
      </el-table-column>
      <el-table-column prop="address"
                       header-align="center"
                       align="center"
                       width="150"
                       label="地址">
      </el-table-column>
      <el-table-column prop="industryType"
                       header-align="center"
                       align="center"
                       width="250"
                       label="产业类型">
      </el-table-column>
      <el-table-column prop="country"
                       header-align="center"
                       align="center"
                       label="国家">
      </el-table-column>
      <el-table-column prop="province"
                       header-align="center"
                       align="center"
                       label="省份">
      </el-table-column>
      <el-table-column prop="city"
                       header-align="center"
                       align="center"
                       label="城市">
      </el-table-column>
      <el-table-column prop="area"
                       header-align="center"
                       align="center"
                       label="地区">
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="center"
                       align="center"
                       width="100"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text"
                     size="small"
                     @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="custom-pagination"
                   @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"
                   :current-page="pageIndex"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="pageSize"
                   :total="totalPage"
                   layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './baseContacts-add-or-update.vue'

export default {
  data () {
    return {
      searchForm: {
        name: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  created () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.$http.profile_order.findBaseContactsList({
        'page': this.pageIndex,
        'limit': this.pageSize,
        'name': this.searchForm.name
      }).then(res => {
        if (res.data.code === 0) {
          this.dataList = res.data.page.records
          this.totalPage = res.data.page.total
        }
      })
    },
    // 查询
    searchDataList () {
      this.pageIndex = 1
      this.getDataList()
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle (id) {
      let ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.profile_order.deleteBaseContacts({
          ids: ids
        }).then(res => {
          if (res.data.code === 0) {
            this.$notify('success', '联系人删除成功', '已删除')
            this.getDataList()
          }
        })
      }).catch(() => {
      })
    },
    // 承认人类型
    baseContactsType (row) {
      if (row.type === '0') {
        return '发货公司'
      } else if (row.type === '1') {
        return '收货公司'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/modules/order.scss';
</style>
