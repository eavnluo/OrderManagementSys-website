<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             :inline="true"
             label-width="85px"
             label-position="left"
             :model="searchForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="月份">
            <el-date-picker v-model="searchForm.yearMonth"
                            type="month"
                            style="225px"
                            clearable
                            value-format="yyyy-MM"
                            placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="success"
                       @click="getListGroupMonth">查询</el-button>
            <el-button type="primary"
                       @click="exportData()">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">结算列表</el-divider>
    <el-table :data="dataTable"
              style="width: 100%;"
              stripe
              border>
      <el-table-column header-align="center"
                       align="center"
                       width="80"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="yearMonth"
                       header-align="center"
                       align="center"
                       label="月份">
        <template slot-scope="scope">
          <span class="successInfo"
                @click="handleBillInfo(scope.row.yearMonth)">{{ scope.row.yearMonth }}</span>
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
          {{ $omitNumber(scope.row.vatRate)}}
        </template>
      </el-table-column>
      <el-table-column prop="afterTax"
                       header-align="center"
                       align="center"
                       label="税后总费用">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.afterTax)}}
        </template>
      </el-table-column>
      <el-table-column prop="confirmedMoney"
                       header-align="center"
                       align="center"
                       label="已确认">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.confirmedMoney)}}
        </template>
      </el-table-column>
      <el-table-column prop="unconfirmedMoney"
                       header-align="center"
                       align="center"
                       label="未确认">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.unconfirmedMoney)}}
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
        yearMonth: ''
      },
      dataTable: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  computed: {
    customerCode () {
      return this.$cookie.get('user_type') === '0' ? this.$cookie.get('user_companyCode') : ''
    },
    supplyCode () {
      return this.$cookie.get('user_type') === '1' ? this.$cookie.get('user_companyCode') : ''
    }
  },
  created () {
    this.getListGroupMonth()
  },
  methods: {
    getListGroupMonth () {
      if (this.$cookie.get('user_type') === '0' && !judgeUserCode().customerCode) {
        this.dataTable = []
        return
      } else if (this.$cookie.get('user_type') === '1' && !judgeUserCode().supplyCode) {
        this.dataTable = []
        return
      }
      this.$http.profile_bill.findListGroupMonth({
        customerCode: judgeUserCode().customerCode,
        supplyCode: judgeUserCode().supplyCode,
        yearMonth: this.searchForm.yearMonth
      }).then(res => {
        if (res.data.code === 0) {
          this.dataTable = res.data.page.records
          this.totalPage = res.data.page.total
        }
      })
    },
    handleBillInfo (yearMonth) {
      this.$router.push({ name: 'BillInfo', params: { yearMonth: yearMonth } })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getListGroupMonth()
    },
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getListGroupMonth()
    },
    exportData () {
      window.open(
        `${base.ksAdmin}/bill/info/export?customerCode=${judgeUserCode().customerCode}&supplyCode=${judgeUserCode().supplyCode}&yearMonth=${this.searchForm.yearMonth}&token=${this.$cookie.get('user_token')}`
      )
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/modules/order.scss';
</style>
