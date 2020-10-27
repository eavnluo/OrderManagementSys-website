<template>
  <div class="mod-carinfo">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             :inline="true"
             label-width="85px"
             label-position="left"
             :model="searchForm"
             @keyup.enter.native="getDataList()">
      <el-row>
        <el-col :span="8">
          <el-form-item label="车牌号">
            <el-input v-model="searchForm.plateNumber"
                      placeholder="车牌号"
                      style="width:225px"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="success" @click="getDataList()">查询</el-button>
            <el-button type="primary"
                       @click="addOrUpdateHandle()">新增</el-button>
            <el-button type="danger"
                       @click="deleteHandle()"
                       :disabled="dataListSelections.length <= 0">批量删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-divider class="form-line"
                content-position="center">车辆列表</el-divider>
    <el-table :data="dataList"
              border
              stripe
              @selection-change="selectionChangeHandle"
              style="width: 100%;">
      <el-table-column type="selection"
                       header-align="center"
                       align="center"
                       width="50">
      </el-table-column>
      <el-table-column prop="plateNumber"
                       header-align="center"
                       align="center"
                       label="车牌">
      </el-table-column>
      <el-table-column prop="type"
                       header-align="center"
                       align="center"
                       label="型号">
      </el-table-column>
      <el-table-column prop="driver"
                       header-align="center"
                       align="center"
                       label="司机">
      </el-table-column>
      <el-table-column prop="driverLink"
                       header-align="center"
                       align="center"
                       label="司机联系方式">
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="center"
                       align="center"
                       width="150"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="showDetails(scope.row.id)">查看</el-button>
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
import AddOrUpdate from './carinfo-add-or-update'

export default {
  data () {
    return {
      searchForm: {
        plateNumber: ''
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
      this.$http.profile_car.getCarList(
        {
          'page': this.pageIndex,
          'limit': this.pageSize,
          'plateNumber': this.searchForm.plateNumber
        }
      ).then(res => {
        if (res.data.code === 0) {
          this.dataList = res.data.page.records
          this.totalPage = res.data.page.total
        } else {
          this.dataList = []
          this.totalPage = 0
        }
      })
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
    // 查看详情
    showDetails (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, true)
      })
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
      this.$confirm(`确定对[id=${ids.join(',')}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.profile_car.deleteCarInfoById(
          { ids }
        ).then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500
            })
            this.getDataList()
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mod-carinfo {
  padding: 0 15px;
}
@import '@/styles/modules/order.scss';
</style>
