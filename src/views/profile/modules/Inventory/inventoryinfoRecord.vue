<template>
  <div class="profile-layout">
    <profile-title :title="this.$route.meta.title" />
    <el-form class="headerInfo"
             :inline="true"
             label-width="85px"
             :model="dataForm"
             label-position="left">
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="品名">
            <el-input v-model="dataForm.goodsName"
                      style="width:225px"
                      placeholder="商品名称"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="型号">
            <el-input v-model="dataForm.goodsModel"
                      style="width:225px"
                      placeholder="商品型号"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规格">
            <el-input v-model="dataForm.specification"
                      style="width:225px"
                      placeholder="商品规格"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-form-item label="包装">
            <el-input v-model="dataForm.goodsPacking"
                      style="width:225px"
                      placeholder="商品包装"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="材质">
            <el-input v-model="dataForm.goodsMaterial"
                      style="width:225px"
                      placeholder="商品材质"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量">
            <el-input v-model="dataForm.itemQuantity"
                      style="width:225px"
                      placeholder="商品数量"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">出入库列表</el-divider>
    <el-table :data="dataTable"
              :summary-method="getSummaries"
              show-summary
              stripe
              border
              style="width:100%">
      <el-table-column type="index"
                       header-align="center"
                       align="center"
                       width="65"
                       label="序号" />
      <el-table-column prop="createdTime"
                       header-align="center"
                       align="center"
                       width="180"
                       label="时间" />
      <el-table-column prop="outInOddNum"
                       header-align="center"
                       align="center"
                       width="150"
                       label="库房单号" />
      <el-table-column prop="price"
                       header-align="center"
                       align="center"
                       label="单价" />
      <el-table-column prop="goodsNum"
                       header-align="center"
                       align="center"
                       label="数量" />
      <el-table-column prop="priceTotal"
                       header-align="center"
                       align="center"
                       label="总额" />
      <el-table-column prop="storageLocation"
                       header-align="center"
                       align="center"
                       label="库位" />
      <el-table-column prop="orderItem"
                       header-align="center"
                       align="center"
                       width="150"
                       label="工作单号" />
      <el-table-column prop="orderNo"
                       header-align="center"
                       align="center"
                       width="150"
                       label="订单号" />
      <el-table-column prop="invoiceNo"
                       header-align="center"
                       align="center"
                       width="150"
                       label="发票号" />
      <el-table-column prop="wayBillNo"
                       header-align="center"
                       align="center"
                       width="150"
                       label="运单号" />
      <el-table-column prop="signNumber"
                       header-align="center"
                       align="center"
                       width="150"
                       label="签收单号" />
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
export default {
  data () {
    return {
      dataForm: {},
      dataTable: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0
    }
  },
  created () {
    this.getDataForm()
    this.getDataTable()
  },
  methods: {
    getDataTable () {
      this.$http.profile_inventoryinfo.getOutInRecords({
        page: this.pageIndex,
        limit: this.pageSize,
        goodsId: this.$route.params.id,
        ownerCode: this.$route.params.ownerCode,
        storeCode: this.$route.params.storeCode
      }).then(res => {
        if (res.data.code === 0) {
          this.dataTable = res.data.page.records
          this.dataTable.forEach(item => {
            item.priceTotal = (item.price * item.goodsNum).toFixed(2)
          })
          this.totalPage = res.data.page.total
        }
      })
    },
    getDataForm () {
      this.dataForm = this.$store.state.inventoryinfo.inventoryinfo || {}
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataTable()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataTable()
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 3 || index === 6) {
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
          if (index === 5) {
            sums[index] = sums[index].toFixed(2)
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/modules/order.scss';
</style>
