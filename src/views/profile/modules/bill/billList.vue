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
          <el-form-item label="账单号">
            <el-input v-model="searchForm.billNo"
                      placeholder="账单号"
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click="getListByOrderNo"
                       type="success">
              查询
            </el-button>
            <el-button type="primary"
                       @click="exportData()">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">账单列表</el-divider>
    <el-table :data="dataTable"
              v-loading="loading"
              style="width: 100%;"
              show-summary
              border>
      <el-table-column header-align="center"
                       align="center"
                       width="60"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="invoiceNo"
                       header-align="center"
                       align="center"
                       width="140"
                       label="发票号">
      </el-table-column>
      <el-table-column prop="orderItem"
                       header-align="center"
                       align="center"
                       width="140"
                       label="工作单号">
        <template slot-scope="scope">
          <span class="successInfo"
                @click="handleStatementNo(scope.row.orderItem, scope.row.billNo, scope.row.id)">{{ scope.row.orderItem }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="billNo"
                       header-align="center"
                       align="center"
                       width="140"
                       label="账单号">
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
  </div>
</template>

<script>
import { judgeUserCode } from '@/utils'
import { base } from '@/api/base'
export default {
  data () {
    return {
      searchForm: {
        billNo: ''
      },
      dataTable: [],
      loading: false
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
    this.getListByOrderNo()
  },
  methods: {
    handleStatementNo (orderItem, billNo, id) {
      this.$router.push({ name: `BillNo_${this.$cookie.get('user_type')}`, params: { orderItem: orderItem, billNo: billNo, id: id } })
    },
    getListByOrderNo () {
      this.$http.profile_bill.findListByOrderNo({
        yearMonth: this.$route.params.yearMonth,
        orderNo: this.$route.params.orderNo,
        customerCode: judgeUserCode().customerCode,
        supplyCode: judgeUserCode().supplyCode,
        billNo: this.searchForm.billNo
      }).then(res => {
        if (res.data.code === 0) {
          this.dataTable = res.data.list
        }
      })
    },
    exportData () {
      window.open(
        `${base.ksAdmin}/bill/info/exportByOrder?billNo=${this.searchForm.billNo}&orderNo=${this.$route.params.orderNo}&customerCode=${judgeUserCode().customerCode}&supplyCode=${judgeUserCode().supplyCode}&yearMonth=${this.$route.params.yearMonth}&token=${this.$cookie.get('user_token')}`
      )
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/modules/order.scss';
</style>
