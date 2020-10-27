<template>
  <div class="profile-layout">
    <profile-title :title="this.$route.meta.title" />
    <el-form class="headerInfo"
             :model="dataForm"
             :rules="dataRule"
             :inline="true"
             label-width="95px"
             label-position="left"
             ref="headInfo">
      <el-row :gutter='25'>
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
        <el-col :span="8">
          <el-form-item label="报价人"
                        prop="bidder">
            <el-input v-model="dataForm.bidder"
                      style="width:225px"
                      placeholder="请输入报价人" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="报价时间"
                        prop="quoteTime">
            <el-date-picker v-model="dataForm.quoteTime"
                            type="date"
                            style="width:225px"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择报价时间" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生效时间"
                        prop="effectTime">
            <el-date-picker v-model="dataForm.effectTime"
                            type="date"
                            style="width:225px"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择生效时间" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="到期时间"
                        prop="expireTime">
            <el-date-picker v-model="dataForm.expireTime"
                            type="date"
                            style="width:225px"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择到期时间" />
          </el-form-item>
        </el-col>
        <el-col v-if="this.$userType.isF()"
                :span="8">
          <el-form-item label="仓库位置"
                        prop="startArea">
            <el-input v-model="dataForm.startArea"
                      style="width:225px"
                      placeholder="请输入仓库位置" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-show="this.$userType.isK()">
      <el-divider content-position="center">运输费用</el-divider>
      <el-col :span="8">
        <el-button type="success"
                   style="margin:0 0 24px 0;"
                   @click="profileItemAddOrUpdate('K')">
          添加明细
          <i class="el-icon-edit-outline el-icon--right" />
        </el-button>
      </el-col>
    </el-row>
    <el-row v-show="this.$userType.isK()">
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
        <el-table-column fixed="right"
                         align="center"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click="removeTransportCostList(scope.row.id)"
                       type="text"
                       size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-divider class="form-line line-top"
                  content-position="center">{{ tableTitle }}</el-divider>
      <el-col :span="8">
        <el-button type="success"
                   style="margin:0 0 24px 0;"
                   @click="profileItemAddOrUpdate">
          添加明细
          <i class="el-icon-edit-outline el-icon--right" />
        </el-button>
      </el-col>
    </el-row>
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
      <el-table-column prop="vatRate"
                       header-align="center"
                       align="center"
                       label="增值税税率">
      </el-table-column>
      <el-table-column fixed="right"
                       align="center"
                       label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button @click="removeOtherCostList(scope.row.id)"
                     type="text"
                     size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-divider class="form-line line-top"
                  content-position="center">附件上传</el-divider>
      <el-col :span="12">
        <upload-add-or-update ref="upload" />
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="3">
        <el-button type="primary"
                   @click="dataFormSubmit">
          提交报价
          <i class="el-icon-edit el-icon--right" />
        </el-button>
      </el-col>
    </el-row>
    <profileItem-add-or-update @dataFormSubmit="getDataList"
                               ref="profileItemAddOrUpdate" />
  </div>
</template>
<script>
import uploadAddOrUpdate from '@/components/profile/upload-add-or-update'
import profileItemAddOrUpdate from './profileItem-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        priceNo: '',
        companyName: '',
        companyCode: '',
        bidder: '',
        type: '1', // 默认供应商
        status: '1',
        quoteTime: '',
        effectTime: '',
        expireTime: '',
        startArea: '', // 仓库位置
        priceDetailList: [],
        fileList: []
      },
      dataRule: {
        priceNo: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        companyCode: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        quoteTime: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        effectTime: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        expireTime: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        bidder: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        startArea: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ]
      },
      type: '',
      tableHeight: 335,
      tableTitle: '报价清单',
      transportCostList: [], // 只展示用 运输列表
      otherCostList: [] // 只展示用 其他费用 or 报价清单
    }
  },
  components: {
    uploadAddOrUpdate,
    profileItemAddOrUpdate
  },
  created () {
    this.createPriceNo()
    this.tableTitle = this.$userType.isK() ? '其他费用' : this.tableTitle
  },
  methods: {
    createPriceNo () {
      this.dataForm.companyName = this.$cookie.get('user_companyName')
      this.dataForm.companyCode = this.$cookie.get('user_companyCode')
    },
    profileItemAddOrUpdate (type) {
      this.$nextTick(() => {
        this.$refs.profileItemAddOrUpdate.init(type)
      })
    },
    // 接收子组件传值
    getDataList (dataForm) {
      if (dataForm.isTransport) {
        this.transportCostList.push(dataForm)
      } else {
        this.otherCostList.push(dataForm)
      }
    },
    dataFormSubmit () {
      this.$refs.headInfo.validate(valid => {
        if (valid) {
          // 组装数组，运输费用 + 其他费用 = 费用列表
          this.dataForm.priceDetailList = this.transportCostList.concat(this.otherCostList)
          if (this.dataForm.priceDetailList.length === 0) {
            return this.$notify('error', '报价清单不能为空！')
          }
          this.$confirm(`即将提交报价, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.profile_price.save(this.dataForm).then(res => {
              if (res.data.code === 0) {
                this.$refs.upload.uploadFile(res.data.id)
                this.$notify('success', '报价提交成功')
                this.$router.push({ name: 'PriceList' })
              }
            })
          }).catch(() => { })
        }
      })
    },
    translateDict (row) {
      return this.$translateDict('PRICE_TYPE', row.type)
    },
    // 删除运输费用
    removeTransportCostList (id) {
      this.transportCostList.forEach((item, i) => {
        if (item.id === id) {
          this.transportCostList.splice(i, 1)
        }
      })
    },
    // 删除 其他 / 报价清单 费用
    removeOtherCostList (id) {
      this.otherCostList.forEach((item, i) => {
        if (item.id === id) {
          this.otherCostList.splice(i, 1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/modules/order.scss';
</style>
