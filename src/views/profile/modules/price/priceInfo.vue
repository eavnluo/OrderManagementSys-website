<template>
  <div class="profile-layout">
    <profile-title :title="this.$route.meta.title" />
    <el-form class="headerInfo"
             :model="dataForm"
             :inline="true"
             label-width="95px"
             label-position="left"
             ref="orderHeaderInfo">
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="报价单号"
                        prop="priceNo">
            <el-input v-model="dataForm.priceNo"
                      style="width:225px"
                      placeholder="请输入报价单号"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司名称"
                        prop="companyName">
            <el-input v-model="dataForm.companyName"
                      style="width:225px"
                      placeholder="请输入公司名称"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司代码"
                        prop="companyCode">
            <el-input v-model="dataForm.companyCode"
                      style="width:225px"
                      placeholder="请输入公司代码"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="报价人"
                        prop="bidder">
            <el-input v-model="dataForm.bidder"
                      style="width:225px"
                      placeholder="请输入报价人"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报价时间"
                        prop="quoteTime">
            <el-date-picker v-model="dataForm.quoteTime"
                            type="date"
                            style="width:225px"
                            placeholder="请选择报价时间"
                            disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生效时间"
                        prop="effectTime">
            <el-date-picker v-model="dataForm.effectTime"
                            type="date"
                            style="width:225px"
                            placeholder="请选择生效时间"
                            disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="到期时间"
                        prop="expireTime">
            <el-date-picker v-model="dataForm.expireTime"
                            type="date"
                            style="width:225px"
                            placeholder="请选择到期时间"
                            disabled />
          </el-form-item>
        </el-col>
        <el-col v-show="this.$userType.isF()"
                :span="8">
          <el-form-item label="仓库位置"
                        prop="startArea">
            <el-input v-model="dataForm.startArea"
                      style="width:225px"
                      placeholder="请输入仓库位置"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col v-show="this.$userType.isC()"
                :span="8">
          <el-form-item label="客户代表"
                        prop="effectTime">
            <el-input v-model="dataForm.customerRepresentative"
                      style="width:225px"
                      placeholder="客户代表"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col v-show="this.$userType.isC()"
                :span="8">
          <el-form-item label="审批人"
                        prop="effectTime">
            <el-input v-model="dataForm.approver"
                      style="width:225px"
                      placeholder="审批人"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-show="this.$userType.isK() || this.$userType.isC()">
      <el-divider class="form-line"
                  content-position="center">运输费用</el-divider>
    </el-row>
    <el-row v-show="this.$userType.isK() || this.$userType.isC()">
      <el-table :data="transportCostList"
                :max-height="tableHeight"
                prop="orderItem"
                style="width: 100%;"
                stripe
                border>
        <el-table-column prop="orderNo"
                         header-align="center"
                         align="center"
                         type="index"
                         width="80"
                         label="序号" />
        <el-table-column prop="type"
                         :formatter="translateDict"
                         header-align="center"
                         align="center"
                         label="费用类型">
        </el-table-column>
        <el-table-column prop="name"
                         header-align="center"
                         align="center"
                         label="费用名称" />
        <el-table-column prop="code"
                         header-align="center"
                         align="center"
                         label="费用代码" />
        <el-table-column prop="unit"
                         header-align="center"
                         align="center"
                         label="费用单位" />
        <el-table-column prop="price"
                         header-align="center"
                         align="center"
                         type="number"
                         label="金额" />
        <el-table-column prop="startArea"
                         header-align="center"
                         align="center"
                         label="始发地" />
        <el-table-column prop="endArea"
                         header-align="center"
                         align="center"
                         label="目的地" />
      </el-table>
    </el-row>
    <el-divider class="form-line line-top"
                content-position="center">{{ tableTitle }}</el-divider>
    <el-table :data="otherCostList"
              :max-height="tableHeight"
              prop="orderItem"
              style="width: 100%;"
              stripe
              border>
      <el-table-column prop="orderNo"
                       header-align="center"
                       align="center"
                       type="index"
                       width="80"
                       label="序号" />
      <el-table-column prop="type"
                       :formatter="translateDict"
                       header-align="center"
                       align="center"
                       label="费用类型" />
      <el-table-column prop="name"
                       header-align="center"
                       align="center"
                       label="费用名称" />
      <el-table-column prop="code"
                       header-align="center"
                       align="center"
                       label="费用代码" />
      <el-table-column prop="unit"
                       header-align="center"
                       align="center"
                       label="费用单位" />
      <el-table-column prop="price"
                       header-align="center"
                       align="center"
                       label="金额" />
      <el-table-column prop="vatRate"
                       header-align="center"
                       align="center"
                       label="增值税税率" />
    </el-table>
    <file-list :routeName="$route.name" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {},
      transportCostList: [], // 只展示用 运输列表
      otherCostList: [], // 只展示用 其他费用 or 报价清单
      tableHeight: 500,
      flag: true,
      tableTitle: '报价清单'
    }
  },
  created () {
    this.tableTitle = this.$userType.isK() || this.$userType.isC() ? '其他费用' : this.tableTitle
    this.getPriceInfo()
  },
  methods: {
    getPriceInfo () {
      this.$http.profile_price.findPriceInfo({
        id: this.$route.params.id
      }).then(res => {
        if (res.data.code === 0) {
          this.dataForm = res.data.info
          this.dataForm.priceDetailList.forEach(item => {
            if (item.isTransport === '1') {
              this.transportCostList.push(item)
            } else {
              this.otherCostList.push(item)
            }
          })
        }
      })
    },
    translateDict (row) {
      return this.$translateDict('PRICE_TYPE', row.type)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/modules/order.scss';
</style>
