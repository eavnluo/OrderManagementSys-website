<template>
  <div class="profile-layout">
    <profile-title :title="this.$route.meta.title" />
    <el-form class="headerInfo"
             :inline="true"
             label-width="85px"
             label-position="left"
             :model="dataForm">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称">
            <el-input v-model="dataForm.companyName"
                      placeholder="公司名称"
                      style="width:225px"
                      clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="success"
                       @click="getPriceList">查询</el-button>
            <el-button type="primary"
                       @click="addPrice"
                       v-show="userType">新增</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">报价列表</el-divider>
    <el-table :data="dataTable"
              v-loading="loading"
              prop="orderItem"
              style="width: 100%;"
              stripe
              border>
      <el-table-column header-align="center"
                       align="center"
                       width="60"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="160"
                       label="报价单号">
        <template slot-scope="scope">
          <span class="successInfo"
                @click="handlePriceInfo(scope.row.id)"
                type="text">{{ scope.row.priceNo}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="companyCode"
                       header-align="center"
                       align="center"
                       label="公司代码">
      </el-table-column>
      <el-table-column prop="companyName"
                       header-align="center"
                       align="center"
                       label="公司名称">
      </el-table-column>
      <el-table-column prop="bidder"
                       v-if="userType"
                       header-align="center"
                       align="center"
                       label="报价人">
      </el-table-column>
      <el-table-column prop="quoteTime"
                       header-align="center"
                       align="center"
                       label="报价时间">
      </el-table-column>
      <el-table-column prop="effectTime"
                       header-align="center"
                       align="center"
                       label="生效时间">
      </el-table-column>
      <el-table-column prop="expireTime"
                       header-align="center"
                       align="center"
                       label="到期时间">
      </el-table-column>
      <el-table-column prop="customerRepresentative"
                       header-align="center"
                       align="center"
                       v-if="!userType"
                       label="客户代表">
      </el-table-column>
      <el-table-column prop="approver"
                       header-align="center"
                       align="center"
                       v-if="!userType"
                       label="审批人">
      </el-table-column>
      <el-table-column prop="状态"
                       fixed="right"
                       header-align="center"
                       align="center"
                       label="状态">
        <template slot-scope="scope">
          <el-tag type="danger"
                  v-if="scope.row.status === '1' && scope.row.status">
            未生效
          </el-tag>
          <el-tag v-else
                  type="success">
            已生效
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="custom-pagination"
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
export default {
  data () {
    return {
      dataForm: {
        companyName: ''
      },
      dataTable: [],
      totalPage: 0,
      loading: false,
      pageIndex: 1,
      pageSize: 10
    }
  },
  computed: {
    userType () {
      return this.$cookie.get('user_type') !== '0'
    }
  },
  created () {
    this.getPriceList()
  },
  methods: {
    getPriceList () {
      this.loading = true
      this.$http.profile_price.findPriceList({
        page: this.pageIndex,
        limit: this.pageSize,
        companyName: this.dataForm.companyName
      }).then(res => {
        if (res.data.code === 0) {
          this.dataTable = res.data.page.records
          this.totalPage = res.data.page.total
        }
      }).finally(() => {
        this.loading = false
      })
    },
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getPriceList()
    },
    handlePriceInfo (id) {
      this.$router.push({ name: 'PriceInfo', params: { id: id } })
    },
    // 新增报价单
    addPrice () {
      this.$router.push({ name: 'PriceAdd' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/modules/order.scss';
</style>
