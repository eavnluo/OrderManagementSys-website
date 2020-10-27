<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             label-width="85px"
             label-position="left"
             :inline="true"
             :model="searchForm"
             @keyup.enter.native="getDataList()">
      <el-row>
        <el-col :span="8">
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.goodsName"
                      style="width:225px"
                      placeholder="商品名称"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item v-if="$cookie.get('user_type') === '0'"
                        label="库房代码">
            <el-input v-model="searchForm.storeCode"
                      style="width:225px"
                      placeholder="库房代码"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item v-if="$cookie.get('user_type') === '1'"
                        label="客户代码">
            <el-input v-model="searchForm.ownerCode"
                      style="width:225px"
                      placeholder="客户代码"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="success"
                       @click="getDataList()">查询</el-button>
            <el-button type="primary"
                       @click="exportData()">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">库存列表</el-divider>
    <el-table ref="inventoryInfo"
              :data="dataList"
              :summary-method="getSummaries"
              show-summary
              stripe
              border
              style="width: 100%;">
      <el-table-column type="index"
                       header-align="center"
                       align="center"
                       width="65"
                       label="序号">
      </el-table-column>
      <el-table-column prop="goodsName"
                       header-align="center"
                       align="center"
                       width="150"
                       label="品名">
        <template slot-scope="scope">
          <span @click="handleInventoryinfoRecord(scope.row)"
                class="successInfo">{{ scope.row.goodsName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="goodsModel"
                       header-align="center"
                       align="center"
                       width="80"
                       label="型号">
      </el-table-column>
      <el-table-column prop="specification"
                       header-align="center"
                       align="center"
                       label="规格">
      </el-table-column>
      <el-table-column prop="goodsPacking"
                       header-align="center"
                       align="center"
                       label="包装">
      </el-table-column>
      <el-table-column prop="goodsMaterial"
                       header-align="center"
                       align="center"
                       label="材质">
      </el-table-column>
      <el-table-column prop="price"
                       header-align="center"
                       align="center"
                       label="单价">
      </el-table-column>
      <el-table-column prop="itemQuantity"
                       header-align="center"
                       align="center"
                       label="数量">
      </el-table-column>
      <el-table-column prop="priceTotal"
                       header-align="center"
                       align="center"
                       label="总额">
      </el-table-column>
      <el-table-column prop="ownerCode"
                       header-align="center"
                       align="center"
                       label="客户代码">
      </el-table-column>
      <el-table-column prop="storeCode"
                       header-align="center"
                       align="center"
                       label="库房代码">
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
  </div>
</template>

<script>
import { base } from '@/api/base'
export default {
  data () {
    return {
      searchForm: {
        goodsName: '',
        storeCode: '',
        ownerCode: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList () {
      this.$http.profile_inventoryinfo.getInventoryList({
        'page': this.pageIndex,
        'limit': this.pageSize,
        'goodsName': this.searchForm.goodsName,
        'storeCode': this.searchForm.storeCode,
        'ownerCode': this.searchForm.ownerCode
      }).then(res => {
        if (res.data.code === 0) {
          this.dataList = res.data.page.records
          this.dataList.forEach(item => {
            item.priceTotal = (item.price * item.itemQuantity).toFixed(2)
          })
          this.totalPage = res.data.page.total
        } else {
          this.dataList = []
          this.totalPage = 0
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
    // 跳转出入库记录
    handleInventoryinfoRecord (row) {
      const { itemId, ownerCode, storeCode } = row
      this.$store.commit('set_inventoryinfo', row)
      this.$router.push(
        {
          name: 'InventoryinfoRecord',
          params: {
            id: itemId,
            ownerCode: ownerCode,
            storeCode: storeCode
          }
        })
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 6) {
          sums[index] = '--'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if (index === 8) {
            sums[index] = sums[index].toFixed(2)
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    exportData () {
      window.open(
        `${base.ksAdmin}/inventoryinfo/exportStoreData?goodsName=${this.searchForm.goodsName}&storeCode=${this.searchForm.storeCode}&ownerCode=${this.searchForm.ownerCode}&token=${this.$cookie.get('user_token')}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/modules/order.scss';
</style>
