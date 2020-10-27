<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             ref="dataForm"
             :model="dataForm"
             :rules="ruleList"
             :inline="true"
             label-position="top"
             label-width="150px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称"
                        prop="customerName">
            <el-input v-model="dataForm.customerName"
                      disabled="disabled"
                      placeholder="公司名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司法人"
                        prop="legalPerson">
            <el-input v-model="dataForm.legalPerson"
                      placeholder="公司法人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税务登记证号码"
                        prop="taxRegistrationNo">
            <el-input v-model="dataForm.taxRegistrationNo"
                      placeholder="税务登记证号码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="国家"
                        prop="country">
            <el-input v-model="dataForm.country"
                      placeholder="国家，例：中国"
                      disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="省"
                        prop="privince">
            <el-select v-model="dataForm.privince"
                       placeholder="请选择省份"
                       :disabled="disabled"
                       clearable
                       @change="changeProvince">
              <el-option v-for="item in provinceList"
                         v-bind:key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="市"
                        prop="city">
            <el-select v-model="dataForm.city"
                       placeholder="请选择城市"
                       :disabled="disabled"
                       clearable
                       @change="changeCity">
              <el-option v-for="item in cityList"
                         v-bind:key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="区"
                        prop="area">
            <el-select v-model="dataForm.area"
                       placeholder="请选择区域"
                       :disabled="disabled"
                       clearable>
              <el-option v-for="item in areaList"
                         v-bind:key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址"
                        prop="customerAddress">
            <el-input v-model="dataForm.customerAddress"
                      placeholder="地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人"
                        prop="linkName">
            <el-input v-model="dataForm.linkName"
                      placeholder="联系人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="联系电话"
                        prop="linkPhone">
            <el-input v-model="dataForm.linkPhone"
                      disabled
                      placeholder="联系电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮件地址"
                        prop="emailAddress">
            <el-input v-model="dataForm.emailAddress"
                      placeholder="邮件地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产业类型"
                        prop="industryType">
            <el-select v-model="dataForm.industryType"
                       @change="changeIndustryType"
                       placeholder="请选择">
              <el-option v-for="item in industryTypeList"
                         :key="item.id"
                         :label="item.industryType"
                         :value="item.id + ''">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col v-show="showRemark"
                :span="8">
          <el-form-item label="其他产业"
                        prop="remark1">
            <el-input v-model="dataForm.remark1"
                      placeholder="请输入所属行业"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主要产品"
                        prop="mainProduct">
            <el-input v-model="dataForm.mainProduct"
                      placeholder="主要产品"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主营业务"
                        prop="mainBusiness">
            <el-input v-model="dataForm.mainBusiness"
                      placeholder="主营业务"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button class="profile-submit"
                     :type="submitType"
                     :loading="loading"
                     @click="perfectInfo()">
            {{ submitText }}
          </el-button>
        </el-col>
        <el-col :span="22">
          <el-col class="tips"
                  v-show="tipsShow"
                  :span="21">
            <p>*提交之后，公司名称，省，市，区将无法更改</p>
          </el-col>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        id: '',
        customerCode: '',
        customerName: '',
        legalPerson: '',
        taxRegistrationNo: '',
        country: '',
        privince: '',
        city: '',
        area: '',
        customerAddress: '',
        linkName: '',
        linkPhone: '',
        emailAddress: '',
        industryType: '',
        remark1: '',
        mainProduct: '',
        mainBusiness: '',
        registerUserId: ''
      },
      ruleList: {
        customerName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        legalPerson: [{ required: true, message: '请输入公司法人', trigger: 'blur' }],
        taxRegistrationNo: [{ required: true, message: '请输入税务登记证号码', trigger: 'blur' }],
        customerAddress: [{ required: true, message: '请输入公司地址', trigger: 'blur' }],
        industryType: [{ required: true, message: '请输入产业类型', trigger: 'blur' }],
        country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
        privince: [{ required: true, message: '请输入省份', trigger: 'blur' }],
        city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        area: [{ required: true, message: '请输入区域', trigger: 'blur' }],
        linkName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        linkPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        mainProduct: [{ required: true, message: '请输入主要产品', trigger: 'blur' }],
        mainBusiness: [{ required: true, message: '请输入主营业务', trigger: 'blur' }],
        emailAddress: [{ required: true, message: '请输入邮件地址', trigger: 'blur' }]
      },
      submitType: 'primary',
      submitText: '提交',
      industryTypeList: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      loading: false,
      disabled: false, // 是否禁用
      tipsShow: true,
      showRemark: false
    }
  },
  created () {
    this.submitBtn_type()
    this.getIndustryTypeList()
  },
  methods: {
    // 完善信息
    perfectInfo () {
      // eslint-disable-next-line no-useless-escape
      const reg = /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|[\(\)\]\[\（\）\{\}\<\>\》\《])+$/
      if (!reg.test(this.dataForm.customerName)) {
        return this.$notify('error', '公司名称必须为中文', '提交失败')
      }
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.profile_user.perfectCustomerInfo(this.dataForm).then(res => {
            this.loading = false
            if (res.data.code === 0) {
              this.$notify('success', '档案提交成功')
              this.$cookie.set('user_name', this.dataForm.customerName, { expires: '7D' })
              this.$cookie.set('user_auth', '1', { expires: '7D' }) // 信息完善后，重新提交cookie，改变当前认证状态 0 未认证 1已认证
              this.$refs['dataForm'].resetFields()
              this.$router.push({ name: 'Chart' })
            }
          }).catch(() => {
            this.laoding = false
          })
        }
      })
    },
    // 获取信息
    init () {
      this.$nextTick(() => {
        this.$http.profile_user.getCustomerInfo().then(res => {
          if (res.data.code === 0) {
            if (res.data.data !== null) {
              let data = res.data.data
              for (let item in this.dataForm) {
                this.dataForm[item] = data[item]
              }
              this.dataForm.country = '中国'
            }
            if (this.dataForm.remark1) {
              this.showRemark = true
            }
            // 重新赋值List 避免select无法将number转换为对应的name
            if (res.data.provinceList) {
              this.provinceList = res.data.provinceList
            }
            if (res.data.cityList) {
              this.cityList = res.data.cityList
            }
            if (res.data.areaList) {
              this.areaList = res.data.areaList
            }
          }
        })
      })
    },
    getIndustryTypeList () {
      this.$http.profile_user.getIndustryTypeList().then(res => {
        if (res.data.code === 0) {
          this.industryTypeList = res.data.list
          this.init()
        }
      })
    },
    // 根据省份ID获取城市列表
    changeProvince (parentId) {
      this.dataForm.city = ''
      this.dataForm.area = ''
      this.$http.profile_user.getListByParentId({ parentId }).then(res => {
        if (res.data.code === 0) {
          this.cityList = res.data.list
        } else {
          return []
        }
      })
    },
    // 根据城市ID获取区域列表
    changeCity (parentId) {
      this.dataForm.area = ''
      this.$http.profile_user.getListByParentId({ parentId }).then(res => {
        if (res.data.code === 0) {
          this.areaList = res.data.list
        } else {
          return []
        }
      })
    },
    submitBtn_type () {
      if (this.$cookie.get('user_auth') === '1') {
        this.submitType = 'success'
        this.submitText = '修改'
        this.disabled = true
        this.tipsShow = false
      }
    },
    // 如果选择其他产业 增加备注
    changeIndustryType (val) {
      this.dataForm.remark1 = ''
      if (val === '32') {
        this.showRemark = true
        return
      }
      this.showRemark = false
    }
  }

}
</script>

<style lang="scss" scoped>
.tips {
  margin: 25px 0 0 20px;
  font-size: 14px;
  color: #f56c6c;
}
@import '@/styles/modules/userCenter.scss';
@import '@/styles/modules/order.scss';
</style>
