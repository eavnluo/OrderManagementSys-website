<template>
  <div class="profile-layout">
    <el-row>
      <el-col :span="1">
        <go-back />
      </el-col>
      <el-col :span="8">
        <profile-title :title="$route.meta.title" />
      </el-col>
    </el-row>
    <el-form class="headerInfo"
             :inline="true"
             label-width="85px"
             label-position="left"
             :model="searchForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo"
                      placeholder="订单号"
                      style="width:225px"
                      clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8"
                type="flex">
          <el-form-item>
            <el-button type="success"
                       @click="getListByMonth">查询</el-button>
            <el-button type="primary"
                       @click="exportData()">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">订单列表</el-divider>
    <el-table :data="dataTable"
              v-loading="loading"
              style="width: 100%;"
              stripe
              border>
      <el-table-column header-align="center"
                       align="center"
                       width="60"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="orderNo"
                       header-align="center"
                       align="center"
                       width="160"
                       label="订单号">
        <template slot-scope="scope">
          <span class="successInfo"
                @click="handleBillList($route.params.yearMonth, scope.row.orderNo)">{{ scope.row.orderNo }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="beforeTax"
                       header-align="center"
                       align="center"
                       label="税前合计">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.beforeTax) }}
        </template>
      </el-table-column>
      <el-table-column prop="vatRate"
                       header-align="center"
                       align="center"
                       label="增值税">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.vatRate) }}
        </template>
      </el-table-column>
      <el-table-column prop="afterTax"
                       header-align="center"
                       align="center"
                       label="税后总费用">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.afterTax) }}
        </template>
      </el-table-column>
      <el-table-column prop="confirmedMoney"
                       header-align="center"
                       align="center"
                       label="已确认">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.confirmedMoney) }}
        </template>
      </el-table-column>
      <el-table-column prop="unconfirmedMoney"
                       header-align="center"
                       align="center"
                       label="未确认">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.unconfirmedMoney) }}
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
                   layout="total, sizes, prev, pager, next, jumper" />
  </div>
</template>

<script>
import { judgeUserCode } from '@/utils'
import { base } from '@/api/base'
export default {
  data () {
    return {
      searchForm: {
        orderNo: ''
      },
      dataTable: [],
      loading: false,
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  created () {
    this.getListByMonth()
  },
  methods: {
    handleBillList (yearMonth, orderNo) {
      this.$router.push({ name: 'BillList', params: { yearMonth: yearMonth, orderNo: orderNo } })
    },
    getListByMonth () {
      this.$http.profile_bill.findListByMonth({
        orderNo: this.searchForm.orderNo,
        customerCode: judgeUserCode().customerCode,
        supplyCode: judgeUserCode().supplyCode,
        yearMonth: this.$route.params.yearMonth
      }).then(res => {
        if (res.data.code === 0) {
          this.dataTable = res.data.page.records
          this.totalPage = res.data.page.total
        }
      })
    },
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getListByMonth()
    },
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getListByMonth()
    },
    exportData () {
      window.open(
        `${base.ksAdmin}/bill/info/exportByMonth?orderNo=${this.searchForm.orderNo}&customerCode=${judgeUserCode().customerCode}&supplyCode=${judgeUserCode().supplyCode}&yearMonth=${this.$route.params.yearMonth}&token=${this.$cookie.get('user_token')}`
      )
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/modules/order.scss';
</style>
