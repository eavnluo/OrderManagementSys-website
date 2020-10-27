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
      </el-row>
    </el-form>
    <div v-if="isF">
      <el-divider class="form-line"
                  content-position="center">仓储信息</el-divider>
      <el-form :inline="true"
               :model="dataForm"
               label-width="95px"
               label-position="left"
               ref="goodsForm">
        <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item label="出入库单号"
                          prop="outInOddNum">
              <el-input v-model="dataForm.outInOddNum"
                        placeholder="请输入出入库单号"
                        style="width:225px"
                        :disabled="!functionFlag" />
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
          <template slot-scope="scope">
            <el-input v-if="storageSupplyStatus === '0'"
                      placeholder="请输入库位"
                      v-model="scope.row.storageLocation"
                      clearable />
            <span v-else>{{ scope.row.storageLocation }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="isK">
      <el-divider class="form-line line-top"
                  content-position="center">卡车信息</el-divider>
      <el-form :inline="true"
               :model="dataForm"
               label-width="95px"
               label-position="left"
               ref="carForm">
        <el-row :gutter="25">
          <el-col :span="8">
            <el-form-item label="运单号"
                          prop="wayBillNo">
              <el-input v-model="dataForm.wayBillNo"
                        placeholder="运单号"
                        style="width:225px"
                        :disabled="!functionFlag" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签收单号"
                          prop="signNumber">
              <el-input v-model="dataForm.signNumber"
                        placeholder="签收单号"
                        style="width:225px"
                        :disabled="!functionFlag" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template v-if="carSupplyStatus === '0'">
        <el-table :data="carTable"
                  class="goodsTable"
                  :max-height="tableHeight"
                  @selection-change="chooseCarDriver"
                  v-loading="loading"
                  border>
          <el-table-column type="selection"
                           header-align="center"
                           align="center">
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
                           label="联系方式">
          </el-table-column>
        </el-table>
      </template>
      <template v-else-if="carSupplyStatus === '1'">
        <el-table :data="carTable"
                  :max-height="tableHeight"
                  v-loading="loading"
                  stripe
                  border>
          <el-table-column type="index"
                           header-align="center"
                           align="center">
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
                           label="联系方式">
          </el-table-column>
        </el-table>
      </template>
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
                        :disabled="!functionFlag" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker v-model="trackInfo.startTime"
                              type="datetime"
                              placeholder="开始时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :disabled="!functionFlag" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束时间">
              <el-date-picker v-model="trackInfo.endTime"
                              type="datetime"
                              placeholder="结束时间"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :disabled="!functionFlag" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row v-show="functionFlag">
      <el-divider v-show="functionFlag"
                  class="form-line"
                  content-position="center">附件信息</el-divider>
      <el-col :span="12">
        <upload-add-or-update ref="upload" />
      </el-col>
    </el-row>
    <file-list :routeName="$route.name" />
    <el-row style="margin-top:20px"
            v-show="functionFlag">
      <el-col :span="3">
        <el-button type="primary"
                   @click="completeInfo">
          完善信息
          <i class="el-icon-edit el-icon--right" />
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadAddOrUpdate from '@/components/profile/upload-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        orderItem: '',
        wayBillNo: '',
        signNumber: '',
        outInOddNum: '',
        orderCarList: [],
        orderGoodsList: []
      },
      trackInfo: {
        orderItem: '',
        deviceCode: '',
        startTime: '',
        endTime: ''
      },
      headerInfo: {},
      fileList: [],
      goodsList: [],
      carTable: [],
      total: 0,
      tableHeight: 337,
      loading: false,
      isF: true,
      isK: true,
      functionFlag: false
    }
  },
  components: {
    UploadAddOrUpdate
  },
  computed: {
    // 仓储信息 0 未完善 1已完善
    storageSupplyStatus () {
      return this.$route.params.storageSupplyStatus
    },
    // 卡车信息 0 未完善 1 已完善
    carSupplyStatus () {
      return this.$route.params.carSupplyStatus
    },
    // 订单号
    orderItem () {
      return this.$route.params.orderItem
    },
    // K 卡车供应商 F仓储供应商 O 客户 user_companyCode
    userCompanyCode () {
      return this.$cookie.get('user_companyCode')
    }
  },
  created () {
    this.getHeadInfo()
    this.getCarTable()
  },
  methods: {
    // 获取表头信息
    getHeadInfo () {
      this.loading = true
      this.$http.profile_order.findOrderInfo(this.orderItem).then(res => {
        if (res.data.code === 0) {
          const data = res.data.data
          this.headerInfo = data.orderHeaderInfo
          if (data.trackInfo) {
            this.trackInfo = data.trackInfo
          }
          // 判断当前订单状态 决定是否提示维护信息
          if (this.headerInfo.orderType === 'I' && this.$cookie.get('user_companyCode') !== this.headerInfo.storageSupplyCode && this.headerInfo.storageSupplyStatus === '0') {
            this.$notify('error', '此订单为销售订单，请先维护仓储信息', '无法维护')
          } else if (this.headerInfo.orderType === 'R' && this.$cookie.get('user_companyCode') !== this.headerInfo.carSupplyCode && this.headerInfo.carSupplyStatus === '0') {
            this.$notify('error', '此订单为采购订单，请先维护卡车信息', '无法维护')
          }
          this.goodsList = data.goodsList
          this.dataForm.outInOddNum = data.orderHeaderInfo.outInOddNum
          this.decideBusinessType(data.orderHeaderInfo.storageSupplyCode, data.orderHeaderInfo.carSupplyCode)
          if (data.carList.length !== 0) {
            this.carTable = data.carList
            for (let item of this.carTable) {
              if (item.wayBillNo && item.signNumber) {
                this.dataForm.wayBillNo = item.wayBillNo
                this.dataForm.signNumber = item.signNumber
                break
              }
            }
          }
          // 计算table中的总价
          this.goodsList.forEach(item => {
            item.priceTotal = (item.goodsNum * item.price).toFixed(2)
          })
          this.fileList = data.fileList
        }
      })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取供应商车辆列表 不能分页 默认拉取100条
    getCarTable () {
      if (this.carSupplyStatus === '0') {
        this.$http.profile_car.getCarList({
          page: '1',
          limit: '100'
        }).then(res => {
          if (res.data.code === 0) {
            this.carTable = res.data.page.records
            this.total = res.data.page.total
          }
        })
      }
    },
    // 选择卡车司机
    chooseCarDriver (orderCarList) {
      this.dataForm.orderCarList = orderCarList
    },
    // 完善信息
    completeInfo () {
      if ((this.dataForm.orderCarList.length === 0 && this.isK)) {
        return this.$notify('error', '请完善订单信息')
      }
      if (this.headerInfo.orderType === 'I' && this.$cookie.get('user_companyCode') !== this.headerInfo.storageSupplyCode && this.headerInfo.storageSupplyStatus === '0') {
        return this.$notify('error', '此订单为销售订单，请先维护仓储信息', '无法维护')
      } else if (this.headerInfo.orderType === 'R' && this.$cookie.get('user_companyCode') !== this.headerInfo.carSupplyCode && this.headerInfo.carSupplyStatus === '0') {
        return this.$notify('error', '此订单为采购订单，请先维护卡车信息', '无法维护')
      }
      if (this.trackInfo.deviceCode) {
        if (!this.trackInfo.startTime || !this.trackInfo.endTime) {
          return this.$notify('error', '开始时间和结束时间不能为空')
        }
      }
      if (this.$cookie.get('user_businessType') === 'K') {
        if (!this.dataForm.wayBillNo || !this.dataForm.signNumber) {
          return this.$notify('error', '运单号和签收单号不能为空')
        }
      }
      if (this.$cookie.get('user_businessType') === 'F') {
        if (!this.dataForm.outInOddNum) {
          return this.$notify('error', '出入库单号不能为空')
        }
      }
      if (this.$userType.isF() && this.$cookie.get('user_companyCode') === this.headerInfo.storageSupplyCode) {
        for (let item of this.dataForm.orderGoodsList) {
          if (!item.storageLocation) {
            return this.$notify('error', '库位信息不能为空')
          }
        }
      }
      // 从这往上全是校验↑↑↑
      this.$confirm('确认填写信息无误, 提交后将无法更改!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleTableToFrom()
        this.dataForm.orderItem = this.orderItem
        this.trackInfo.orderItem = this.orderItem
        if (!this.trackInfo.id && this.trackInfo.deviceCode) {
          this.$http.profile_order.stackInfo(this.trackInfo).then(res => { }).catch(() => { })
        }
        this.$http.profile_order.perfectOrderInfo(this.dataForm).then(res => {
          if (res.data.code === 0) {
            // 上传附件
            this.$refs.upload.uploadFile()
            this.$notify('success', `${this.$route.params.orderItem}订单信息已完善`)
            this.$router.push({ name: 'OrderList', params: { type: this.$cookie.get('user_type') } })
          }
        })
      }).catch(() => { })
    },
    // 表格给表单赋值
    handleTableToFrom () {
      this.dataForm.orderGoodsList = this.goodsList
      for (let item in this.dataForm.orderCarList) {
        this.dataForm.orderCarList[item]['carId'] = this.dataForm.orderCarList[item].id
        this.dataForm.orderCarList[item].id = ''
      }
    },
    // 判断当前用户类型 展示哪些页面
    decideBusinessType (storageSupplyCode, carSupplyCode) {
      if (this.userCompanyCode === storageSupplyCode && this.userCompanyCode !== carSupplyCode) {
        this.isF = true
        this.isK = false
      } else if (this.userCompanyCode !== storageSupplyCode && this.userCompanyCode === carSupplyCode) {
        this.isF = false
        this.isK = true
      }
      // 判断信息是否完善 隐藏按钮
      if ((this.storageSupplyStatus === '0' && this.isF) || (this.carSupplyStatus === '0' && this.isK)) {
        this.functionFlag = true
      }
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
    printOrderInfo () {
      this.$print(this.$refs.orderInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.carTable-pagination {
  text-align: right;
  margin-top: 15px;
}

.goodsTable {
  >>> input {
    border: 0 !important;
    padding: 0 !important;
    text-align: center !important;
  }
}

@import '@/styles/modules/order.scss';
</style>
