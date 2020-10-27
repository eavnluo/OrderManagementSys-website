<template>
  <div class="profile-layout"
       ref="orderInfo">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             :model="headerInfo"
             :inline="true"
             label-width="95px"
             label-position="left"
             ref="orderHeaderInfo">
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="工作单号">
            <el-input v-model="headerInfo.orderItem"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单号">
            <el-input v-model="headerInfo.orderNo"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号">
            <el-input v-model="headerInfo.invoiceNo"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="发货人">
            <el-input v-model="headerInfo.sendGoodsPeople"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人">
            <el-input v-model="headerInfo.receiveGoodsPeople"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="始发地">
            <el-input v-model="headerInfo.startPoint"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="目的地">
            <el-input v-model="headerInfo.endPoint"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓储供应商">
            <el-input v-model="headerInfo.storageSupplyId"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卡车供应商">
            <el-input v-model="headerInfo.carSupplyId"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="预计时间">
            <el-input v-model="headerInfo.expectReceiveDate"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送货地址">
            <el-input v-model="headerInfo.shippingAddress"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货地址">
            <el-input v-model="headerInfo.receivingAddress"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="件数（个）">
            <el-input v-model="headerInfo.pieceNumber"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="重量"
                        style="margin-bottom:0px !important">
            <el-input v-model="headerInfo.weight"
                      style="width:225px"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="订单状态">
            <span class="showOrderStatus"
                  @click="showOrderStatus">查看</span>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <span class="showOrderStatus"
                  @click="printOrderInfo">打印订单</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">仓储信息</el-divider>
    <el-form :inline="true"
             label-width="95px"
             label-position="left"
             ref="carForm">
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="出入库单号">
            <el-input v-model="outInOddNum"
                      style="width:225px"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="goodsList"
              :max-height="tableHeight"
              :summary-method="getSummaries"
              show-summary
              class="goodsTable"
              v-loading="loading"
              border>
      <el-table-column prop="goodsCode"
                       header-align="center"
                       align="center"
                       type="index"
                       width="80"
                       label="序号">
      </el-table-column>
      <el-table-column prop="goodsName"
                       header-align="center"
                       align="center"
                       label="品名">
      </el-table-column>
      <el-table-column prop="goodsModel"
                       header-align="center"
                       align="center"
                       label="型号">
      </el-table-column>
      <el-table-column prop="brand"
                       header-align="center"
                       align="center"
                       label="品牌">
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
      <el-table-column prop="goodsNum"
                       header-align="center"
                       align="center"
                       label="数量">
      </el-table-column>
      <el-table-column prop="price"
                       header-align="center"
                       align="center"
                       label="单价">
      </el-table-column>
      <el-table-column prop="priceTotal"
                       header-align="center"
                       align="center"
                       label="总额">
      </el-table-column>
      <el-table-column prop="storageLocation"
                       header-align="center"
                       align="center"
                       label="库位">
      </el-table-column>
    </el-table>
    <el-divider class="form-line line-top"
                content-position="center">卡车信息</el-divider>
    <el-form :inline="true"
             label-width="95px"
             label-position="left"
             ref="carForm">
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="运单号">
            <el-input v-model="wayBillNo"
                      style="width:225px"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="签收单号">
            <el-input v-model="signNumber"
                      style="width:225px"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="carTable"
              :max-height="tableHeight"
              v-loading="loading"
              stripe
              border>
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
                       label="联系方式">
      </el-table-column>
    </el-table>
    <el-divider class="form-line line-top"
                content-position="center">追货宝信息</el-divider>
    <el-form :inline="true"
             :model="trackInfo"
             label-width="95px"
             label-position="left"
             ref="trackInfo">
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="设备编号">
            <el-input v-model="trackInfo.deviceCode"
                      placeholder="设备编号"
                      style="width:225px"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-date-picker v-model="trackInfo.startTime"
                            type="datetime"
                            placeholder="开始时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间">
            <el-date-picker v-model="trackInfo.endTime"
                            type="datetime"
                            placeholder="结束时间"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <file-list :routeName="$route.name" />
    <order-status-flow ref="orderStatusFlow" />
  </div>
</template>

<script>
import orderStatusFlow from './orderStatusFlow'
export default {
  data () {
    return {
      headerInfo: {},
      goodsList: [],
      carTable: [],
      trackInfo: {},
      fileList: [],
      outInOddNum: '',
      wayBillNo: '',
      signNumber: '',
      tableHeight: 335,
      loading: false
    }
  },
  components: {
    orderStatusFlow
  },
  computed: {
    orderItem () {
      return this.$route.params.orderItem
    }
  },
  created () {
    this.getHeadInfo()
  },
  methods: {
    getHeadInfo () {
      this.loading = true
      this.$http.profile_order.findOrderInfo(this.orderItem).then(res => {
        if (res.data.code === 0) {
          const data = res.data.data
          this.headerInfo = data.orderHeaderInfo
          this.goodsList = data.goodsList
          if (data.trackInfo) {
            this.trackInfo = data.trackInfo
          }
          this.fileList = data.fileList
          this.outInOddNum = this.headerInfo.outInOddNum
          // 是否存在卡车信息
          if (data.carList.length !== 0) {
            this.carTable = data.carList
            for (let item of this.carTable) {
              if (item.wayBillNo && item.signNumber) {
                this.wayBillNo = item.wayBillNo
                this.signNumber = item.signNumber
                break
              }
            }
          }
          // 计算table中的总价
          this.goodsList.forEach(item => {
            item.priceTotal = (item.goodsNum * item.price).toFixed(2)
          })
        }
      })
        .finally(() => {
          this.loading = false
        })
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 7 || index === 9) {
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
    showOrderStatus () {
      this.$refs.orderStatusFlow.init()
    },
    printOrderInfo () {
      this.$print(this.$refs.orderInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.showOrderStatus {
  color: #13c2c2;
  &:hover {
    cursor: pointer;
  }
}
@import '@/styles/modules/order.scss';
</style>
