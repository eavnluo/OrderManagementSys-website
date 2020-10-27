<template>
  <div>
    <el-row type="flex">
      <el-col :span="1">
        <go-back />
      </el-col>
      <el-col :span="11">
        <profile-title :title="`账单：${$route.params.billNo}`" />
      </el-col>
    </el-row>
    <el-form class="headerInfo"
             :inline="true"
             :model="dataForm"
             label-width="85px"
             label-position="left">
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户代码">
            <el-input v-model="dataForm.orderInfo.customerCode"
                      style="width:225px"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司名称">
            <el-input v-model="dataForm.orderInfo.customerName"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工作单号">
            <el-input v-model="dataForm.statementInfo.orderItem"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号">
            <el-input v-model="dataForm.statementInfo.orderNo"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号">
            <el-input v-model="dataForm.statementInfo.invoiceNo"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运单号">
            <el-input v-model="dataForm.orderInfo.wayBillNo"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="始发地">
            <el-input v-model="dataForm.orderInfo.startPoint"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="目的地">
            <el-input v-model="dataForm.orderInfo.endPoint"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="件数">
            <el-input v-model="dataForm.orderInfo.pieceNumber"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="重量">
            <el-input v-model="dataForm.orderInfo.weight"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="币种">
            <el-input v-model="currency"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="增值税率">
            <el-input v-model="added_value_tax"
                      disabled
                      style="width:225px" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">费用列表</el-divider>
    <el-table :data="dataForm.statementItem"
              :max-height="tableHeight"
              @selection-change="chooseStatementItem"
              v-loading="loading"
              :summary-method="getSummaries"
              show-summary
              style="width: 100%;"
              border>
      <el-table-column type="selection"
                       :selectable="selectable"
                       width="55">
      </el-table-column>
      <el-table-column header-align="center"
                       align="center"
                       width="60"
                       type="index"
                       label="序号">
      </el-table-column>
      <el-table-column prop="code"
                       header-align="center"
                       align="center"
                       label="费用代码">
      </el-table-column>
      <el-table-column prop="name"
                       header-align="center"
                       align="center"
                       width="400"
                       label="费用描述">
      </el-table-column>
      <el-table-column prop="unit"
                       header-align="center"
                       align="center"
                       label="单位">
      </el-table-column>
      <el-table-column prop="price"
                       header-align="center"
                       align="center"
                       label="金额">
        <template slot-scope="scope">
          {{ $omitNumber(scope.row.price) }}
        </template>
      </el-table-column>
      <el-table-column prop="vatRate"
                       header-align="center"
                       align="center"
                       label="增值税">
      </el-table-column>
      <el-table-column prop="isConfirm"
                       header-align="center"
                       align="center"
                       label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isConfirm === '1'"
                  type="success">已确认</el-tag>
          <el-tag v-else
                  type="danger">未确认</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-divider class="form-line line-top"
                content-position="center">备注</el-divider>
    <el-row>
      <el-col :span="24">
        <el-input v-model="confirmForm.remark"
                  type="textarea"
                  rows="6" />
      </el-col>
    </el-row>
    <el-divider v-if="showBtn"
                class="form-line line-top"
                content-position="center">账单凭证</el-divider>
    <el-row v-if="showBtn">
      <el-col :span="12">
        <p class="tips">*请上传凭证</p>
        <upload-add-or-update :fileType="`.jpg,.png,.jpeg`"
                              ref="upload" />
      </el-col>
    </el-row>
    <file-list :routeName="$route.name" />
    <el-row v-if="showBtn"
            style="margin-top:20px;">
      <el-col :span="8">
        <el-button type="primary"
                   @click="dataFormSubmit">
          提交账单
          <i class="el-icon-edit el-icon--right" />
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { judgeUserCode } from '@/utils'
import UploadAddOrUpdate from '@/components/profile/upload-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        orderInfo: {},
        statementInfo: {},
        statementItem: []
      },
      confirmForm: {
        billNo: '',
        remark: '',
        itemIds: ''
      },
      remark: '',
      currency: '元/人民币',
      added_value_tax: '6%',
      tableHeight: 335,
      loading: false,
      showBtn: false
    }
  },
  components: {
    UploadAddOrUpdate
  },
  created () {
    this.getInfoByStatementNo()
  },
  methods: {
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计'
          return
        } else if (index === 2 || index === 7) {
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
          if (index === 5 || index === 6) {
            sums[index] = sums[index].toFixed(2)
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
    },
    selectable (row) {
      return row.isConfirm !== '1'
    },
    chooseStatementItem (statementItem) {
      this.confirmForm.itemIds = ''
      this.confirmForm.billNo = this.$route.params.billNo
      statementItem.forEach(item => {
        this.confirmForm.itemIds += item.id + ','
      })
    },
    getInfoByStatementNo () {
      this.$http.profile_bill.findInfoByStatementNo({
        orderItem: this.$route.params.orderItem,
        id: this.$route.params.id,
        customerCode: judgeUserCode().customerCode,
        supplyCode: judgeUserCode().supplyCode
      }).then(res => {
        if (res.data.code === 0) {
          this.dataForm = res.data.data
          if (this.dataForm.statementItem.length > 0) {
            for (let i = 0; i < this.dataForm.statementItem.length; i++) {
              if (this.dataForm.statementItem[i].isConfirm === '0') {
                this.showBtn = true
                break
              }
            }
          }
          if (!this.dataForm.statementInfo.remark) {
            this.confirmForm.remark = ''
          }
          this.confirmForm.remark = this.dataForm.statementInfo.remark
        }
      })
    },
    dataFormSubmit () {
      if (!this.confirmForm.itemIds) {
        return this.$notify('error', '请确认至少一项账单费用', '提交失败')
      }
      this.$confirm('即将提交账单内容，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.profile_bill.confirmItem(this.confirmForm).then(res => {
          if (res.data.code === 0) {
            this.$refs.upload.uploadFile()
            this.$notify('success', '账单内容确认成功', '提交成功')
            this.$router.go(-1)
          }
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang='scss' scoped>
$font-weight: 600;
.totalList {
  text-align: right;
  padding: 20px 27px 0 0;
  line-height: 2;
  font-size: 16px;
  label {
    margin-left: 20px;
    font-weight: 600;
    color: #909399;

    span {
      color: #f56c6c !important;
    }
  }
}
.billNum {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  padding-top: 45px;
  font-size: 18px;

  span:nth-of-type(1) {
    font-weight: $font-weight;
    opacity: 0.8;
  }

  span:nth-of-type(2) {
    font-weight: $font-weight;
    color: #13abab;
  }
}

.tips {
  font-size: 14px;
  margin: 0 0 10px 17px;
  color: #f56c6c;
  font-weight: 600;
}

@import '@/styles/modules/order.scss';
</style>
