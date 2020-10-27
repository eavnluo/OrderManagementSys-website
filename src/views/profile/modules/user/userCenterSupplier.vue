<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             ref="dataForm"
             :model="dataForm"
             :rules="ruleList"
             label-position="top"
             label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司名称"
                        prop="supplyName">
            <el-input v-model="dataForm.supplyName"
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
                      placeholder="国家"
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
                       :disabled="disabled"
                       placeholder="请选择区域"
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
                        prop="supplyAddress">
            <el-input v-model="dataForm.supplyAddress"
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
          <el-form-item label="业务类型"
                        prop="typeArr">
            <el-select v-model="dataForm.typeArr"
                       :disabled="disabled"
                       placeholder="请选择"
                       multiple>
              <el-option v-for="(item ,index) in typeList"
                         v-bind:key="index"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="主营业务描述"
                        prop="mainBusinessDesc">
            <el-input type="textarea"
                      :rows="5"
                      v-model="dataForm.mainBusinessDesc"
                      placeholder="主营业务描述"></el-input>
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
        <el-col class="tips"
                v-show="tipsShow"
                :span="21">
          <p>*提交之后，公司名称，省，市，区以及业务类型将无法更改</p>
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
        supplyCode: '',
        supplyName: '',
        legalPerson: '',
        taxRegistrationNo: '',
        country: '',
        privince: '',
        city: '',
        area: '',
        supplyAddress: '',
        linkName: '',
        linkPhone: '',
        emailAddress: '',
        typeArr: [],
        type: '',
        mainBusinessDesc: '',
        registerUserId: ''
      },
      ruleList: {
        supplyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        legalPerson: [{ required: true, message: '请输入公司法人', trigger: 'blur' }],
        taxRegistrationNo: [{ required: true, message: '请输入税务登记证号码', trigger: 'blur' }],
        country: [{ required: true, message: '请输入国家', trigger: 'blur' }],
        privince: [{ required: true, message: '请输入省份', trigger: 'blur' }],
        city: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        area: [{ required: true, message: '请输入区域', trigger: 'blur' }],
        linkName: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        linkPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        emailAddress: [{ required: true, message: '请输入邮件地址', trigger: 'blur' }],
        typeArr: [{ required: true, message: '请输入业务类型', trigger: 'blur' }],
        mainBusinessDesc: [{ required: true, message: '请输入主营业务描述', trigger: 'blur' }],
        supplyAddress: [{ required: true, message: '请输入公司地址', trigger: 'blur' }]
      },
      typeList: [
        { name: '卡车', value: 'K' },
        { name: '仓储', value: 'F' },
        { name: '其他', value: 'O' }
      ],
      submitType: 'primary',
      submitText: '提交',
      provinceList: [],
      cityList: [],
      areaList: [],
      loading: false,
      disabled: false, // 是否禁用
      tipsShow: true
    }
  },
  created () {
    this.submitBtn_type()
    this.init()
  },
  methods: {
    perfectInfo () {
      // eslint-disable-next-line no-useless-escape
      const reg = /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|[\(\)\]\[\（\）\{\}\<\>\》\《])+$/
      if (!reg.test(this.dataForm.supplyName)) {
        return this.$notify('error', '公司名称必须为中文', '提交失败')
      }
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.dataForm.type = this.dataForm.typeArr.join()
          this.$http.profile_user.perfectSupplyInfo(this.dataForm).then(res => {
            if (res.data.code === 0) {
              this.$notify('success', '档案提交成功')
              this.$cookie.set('user_businessType', this.dataForm.type, { expires: '7D' })
              this.$cookie.set('user_name', this.dataForm.supplyName, { expires: '7D' })
              this.$cookie.set('user_auth', '1', { expires: '7D' }) // 信息完善后，重新提交cookie，改变当前认证状态 0 未认证 1已认证
              this.$refs['dataForm'].resetFields()
              this.init()
              this.$router.push({ name: 'Chart' })
            }
          })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    // 获取信息
    init () {
      this.$nextTick(() => {
        this.$http.profile_user.getSupplyInfo().then(res => {
          if (res.data.code === 0) {
            if (res.data.data !== null) {
              let data = res.data.data
              for (let item in this.dataForm) {
                this.dataForm[item] = data[item]
              }
              this.dataForm.country = '中国'
              if (this.dataForm.type && this.dataForm.type !== '') {
                this.dataForm.typeArr = this.dataForm.type.split(',')
              }
            }
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
</style>
