<template>
  <div class="demand-bg">
    <div class="demand div-shadow">
      <h3 class="title">融资需求调研表</h3>
      <p class="explain">感谢您对易融星空平台应收账款融资方案的关注，为了更好的评估您的融资需求，请填写此表格，我们的客户代表将第一时间与您联系沟通</p>
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="registerForm"
               label-position="top">
        <el-form-item label="公司名称"
                      prop="companyName">
          <el-input v-model="dataForm.companyName"
                    placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="统一社会信用代码"
                      prop="uscc">
          <el-input v-model="dataForm.uscc"
                    placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="联系人姓名"
                      prop="contactName">
          <el-input v-model="dataForm.contactName"
                    placeholder="请输入联系人姓名" />
        </el-form-item>
        <el-form-item label="手机电话号码"
                      prop="phoneNumber">
          <el-input v-model="dataForm.phoneNumber"
                    placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱地址"
                      prop="email">
          <el-input v-model="dataForm.email"
                    placeholder="请输入邮箱地址" />
        </el-form-item>
        <el-form-item label="请填写贵公司的所属行业"
                      prop="industry">
          <el-select v-model="dataForm.industry"
                     placeholder="请选择领域"
                     style="width:100%">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.industryType"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="如果贵公司属于医药行业，请填写细分领域"
                      prop="segmentation">
          <el-input placeholder="请填写细分领域"
                    v-model="dataForm.segmentation" />
        </el-form-item>
        <el-form-item label="贵司经营的主要产品范围"
                      prop="productRange">
          <el-input v-model="dataForm.productRange"
                    placeholder="请输入主要产品范围" />
        </el-form-item>
        <el-form-item label="请您填写计划的融资额度（万元）"
                      prop="financingAmount">
          <el-input v-model="dataForm.financingAmount"
                    placeholder="请输入计划的融资额度">
          </el-input>
        </el-form-item>
        <el-form-item label="企业是否使用如下类型的管理系统"
                      prop="managementSystemArr">
          <el-checkbox-group v-model="dataForm.managementSystemArr">
            <el-row>
              <el-col :span="12">
                <el-checkbox label="ERP管理系统" />
              </el-col>
              <el-col :span="12">
                <el-checkbox label="WMS仓储管理系统" />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-checkbox label="TMS车辆管理系统" />
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="6">
                    <el-checkbox label="其他" />
                  </el-col>
                  <el-col :span="14">
                    <el-form-item prop="otherSystem">
                      <el-input v-model="dataForm.otherSystem"
                                placeholder="请输入管理系统" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary"
                     @click="dataFormSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const checkOtherSystem = (rule, value, callback) => {
      if (this.dataForm.managementSystem.includes('其他') && !value) {
        callback(new Error('必填，请输入'))
      } else if (!this.dataForm.managementSystem.includes('其他') && value) {
        callback(new Error('请先勾选其他'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        companyName: '',
        uscc: '',
        contactName: '',
        phoneNumber: '',
        email: '',
        industry: '',
        segmentation: '',
        productRange: '',
        financingAmount: '',
        managementSystemArr: [],
        managementSystem: '',
        otherSystem: ''
      },
      dataRule: {
        companyName: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        uscc: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        phoneNumber: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '必填，请输入', trigger: 'blur' },
          {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        industry: [
          { required: true, message: '必填，请选择', trigger: 'blur' }
        ],
        productRange: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        financingAmount: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        managementSystemArr: [
          { required: true, message: '必填，请选择', trigger: 'blur' }
        ],
        otherSystem: [
          { validator: checkOtherSystem, trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  created () {
    this.getIndustryList()
  },
  methods: {
    dataFormSubmit () {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.dataForm.managementSystem = this.dataForm.managementSystemArr.join(',')
          this.$http.demand.save(this.dataForm).then(res => {
            this.dataForm.managementSystem = []
            if (res.data.code === 0) {
              this.$message.success('表单提交成功')
              this.$refs['registerForm'].resetFields()
            }
          })
        }
      })
    },
    getIndustryList () {
      this.$http.demand.findIndustryList().then(res => {
        if (res.data.code === 0) {
          this.options = res.data.list
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.demand-bg {
  background-color: #fafafa;
  padding: 120px 0 50px 0;
}
.demand {
  width: 950px;
  margin: 0 auto;
  background-color: #fff;
  padding: 40px 100px 20px 100px;

  .title {
    text-align: center;
    font-size: 23px;
  }

  .explain {
    font-size: 14px;
    opacity: 0.7;
    margin: 0 0 60px 0;
  }

  .submit {
    text-align: center;
    button {
      width: 25%;
      font-size: 15px;
    }
  }
}

/deep/ .el-form-item {
  margin: 0 0 50px 0;
}

/deep/ .el-form-item__label {
  font-size: 16px;
  font-weight: 600;
  padding: 0 0 5px 0;
}

/deep/ .el-input__inner {
  padding: 0;
  border: 0;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0;
}
</style>
