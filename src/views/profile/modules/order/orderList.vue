<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             :inline="true"
             :model="searchForm"
             label-width="85px"
             label-position="left"
             @keyup.enter.native="getOrderList()">
      <el-row :gutter='40'>
        <el-col :span="8">
          <el-form-item label="工作单号">
            <el-input v-model="searchForm.orderItem"
                      placeholder="工作单号"
                      style="width:225px"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo"
                      placeholder="订单号"
                      style="width:225px"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-date-picker v-model="searchForm.orderBeginDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="开始时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='40'>
        <el-col :span="8">
          <el-form-item label="结束时间">
            <el-date-picker v-model="searchForm.orderEndDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="结束时间" />
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="handleBtn">
          <el-button @click="searchOrderItem"
                     type="success">查询订单</el-button>
          <el-button type="primary"
                     @click="exportDataHandle"
                     style="margin-left:25px">导出订单</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">订单列表</el-divider>
    <el-table :data="dataTable"
              v-loading="loading"
              prop="orderItem"
              style="width: 100%;"
              stripe
              border>
      <el-table-column prop="orderNo"
                       header-align="center"
                       align="center"
                       width="50"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="buyerCode"
                       header-align="center"
                       align="center"
                       width="180"
                       label="工作单号">
        <template slot-scope="scope">
          <div class="successInfo"
               @click="showOrderInfo(scope.row.orderItem, scope.row.storageSupplyStatus, scope.row.carSupplyStatus)">
            {{scope.row.orderItem}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="orderNo"
                       header-align="center"
                       align="center"
                       width="180"
                       label="订单号">
      </el-table-column>
      <el-table-column prop="invoiceNo"
                       header-align="center"
                       align="center"
                       width="180"
                       label="发票号">
      </el-table-column>
      <el-table-column prop="startPoint"
                       header-align="center"
                       align="center"
                       label="始发地">
      </el-table-column>
      <el-table-column prop="endPoint"
                       header-align="center"
                       align="center"
                       label="目的地">
      </el-table-column>
      <el-table-column prop="statusName"
                       header-align="center"
                       align="center"
                       label="订单状态">
        <template slot-scope="scope">
          <div class="successInfo">{{scope.row.statusName}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="storageSupplyStatus"
                       header-align="center"
                       align="center"
                       label="仓储信息">
        <template slot-scope="scope">
          <el-tag type="danger"
                  v-if="scope.row.storageSupplyStatus === '0' && scope.row.storageSupplyStatus">
            未完善
          </el-tag>
          <el-tag v-else
                  type="success">
            已完善
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="carSupplyStatus"
                       header-align="center"
                       align="center"
                       label="卡车信息">
        <template slot-scope="scope">
          <el-tag type="danger"
                  v-if="scope.row.carSupplyStatus === '0' && scope.row.carSupplyStatus">
            未完善
          </el-tag>
          <el-tag v-else
                  type="success">
            已完善
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="custom-pagination"
                   @size-change="sizeChangeHandle"
                   @current-change="currentChangeHandle"
                   :current-page="searchForm.page"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="searchForm.limit"
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
        page: 1,
        limit: 10,
        orderItem: '',
        orderNo: '',
        orderBeginDate: '',
        orderEndDate: ''
      },
      ordtype: [
        {
          value: 'R',
          label: '采购订单'
        },
        {
          value: 'I',
          label: '销售订单'
        }
      ],
      dataTable: [],
      totalPage: 0,
      loading: false
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    // 获取数据列表
    getOrderList () {
      this.loading = true
      this.$http.profile_order.findOrderList(this.searchForm).then(res => {
        if (res.data.code === 0) {
          this.dataTable = res.data.page.records
          this.totalPage = res.data.page.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 查询
    searchOrderItem () {
      this.searchForm.page = 1
      this.getOrderList()
    },
    // 每页数
    sizeChangeHandle (val) {
      this.searchForm.limit = val
      this.searchForm.page = 1
      this.getOrderList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.searchForm.page = val
      this.getOrderList()
    },
    // 展示订单详情
    showOrderInfo (orderItem, storageSupplyStatus, carSupplyStatus) {
      const userType = this.$cookie.get('user_type')
      this.$router.push(
        { name: `OrderInfo_${userType}`, params: { orderItem: orderItem, storageSupplyStatus: storageSupplyStatus, carSupplyStatus: carSupplyStatus } }
      )
    },
    // 导出
    exportDataHandle () {
      window.open(
        `${base.ksAdmin}/order/exportData?orderNo=${this.searchForm.orderNo}&status=&orderBeginDate=${this.searchForm.orderBeginDate}&orderEndDate=${this.searchForm.orderEndDate}&customerCode=${this.$cookie.get('user_companyCode')}&token=${this.$cookie.get('user_token')}`
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/modules/order.scss';
</style>
