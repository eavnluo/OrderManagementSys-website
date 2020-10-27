<template>
  <div class="form-bg">
    <div class="form">
      <img src="../../assets/loginBanner.jpg" />
      <div class="form-content">
        <h2 class="title">用户注册</h2>
        <el-form :model="dataForm"
                 :rules="dataRule"
                 ref="registerForm">
          <el-form-item prop="name">
            <el-input v-model="dataForm.name"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="type">
            <el-select v-model="dataForm.type"
                       style="width:100%"
                       placeholder="用户类型">
              <el-option v-for="item in typeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="phoneNumber">
            <el-input v-model.number="dataForm.phoneNumber"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row :gutter="24">
              <el-col :span="16">
                <el-input v-model="dataForm.code"
                          placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary"
                           @click="getCaptch"
                           style="width:100%"
                           :disabled="show">
                  <span v-show="!show">获取验证码</span>
                  <span v-show="show">{{ timeCount }}秒</span>
                </el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="dataForm.password"
                      placeholder="密码"
                      show-password></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword"
                        class="formItem-position">
            <el-input v-model="dataForm.confirmPassword"
                      placeholder="再次输入密码"
                      show-password></el-input>
          </el-form-item>
          <el-form-item class="formItem-position">
            <el-row>
              <el-col :span="24">
                <el-checkbox v-model="agreeRegister">
                  <span @click="dialogVisible = true">我已阅读并同意服务条款&隐私声明</span>
                </el-checkbox>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width:100%"
                       :loading="loading"
                       @click="dataFormSubmit">
              <span v-show="!loading">注册</span>
            </el-button>
          </el-form-item>
        </el-form>
        <register-agree @close-dialogStatus="Close_dialog"
                        :dialog="dialogVisible" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterAgree from './register-agree'
export default {
  data () {
    const checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    const checkCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value.length !== 6) {
        callback(new Error('请输入正确的6位数验证码'))
      } else {
        callback()
      }
    }
    return {
      typeList: [
        {
          id: 1,
          value: '0',
          label: '客户'
        },
        {
          id: 2,
          value: '1',
          label: '供应商'
        }
      ],
      dataForm: {
        name: '',
        phoneNumber: '',
        code: '',
        password: '',
        confirmPassword: '',
        type: '',
        authenticationStatus: '0' // 信息完善状态
      },
      dataRule: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        phoneNumber: [
          {
            type: 'number',
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '用户类型不能为空', trigger: 'blur' }
        ],
        code: [
          { validator: checkCode, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: checkPwd, trigger: 'blur' }
        ]
      },
      loading: false,
      dialogVisible: false,
      messageType: '01', // 注册：01 找回密码：02
      agreeRegister: false,
      timer: null,
      timeCount: 0,
      show: false // 是否点击按钮
    }
  },
  components: { RegisterAgree },
  created () {
    this.dataForm.type = this.registerType
  },
  methods: {
    dataFormSubmit () {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          if (this.agreeRegister === false) {
            return this.$notify('error', '请同意服务条款 & 隐私声明')
          }
          this.loading = true
          this.$http.account.register(this.dataForm).then(res => {
            if (res.data.code === 0) {
              this.$notify('info', '账号需要审核，审核完毕后将以短信形式通知您', '注册成功')
              this.$router.push({ name: 'HomeContent' })
              this.$refs['registerForm'].resetFields()
            }
          })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },
    getCaptch () {
      if (this.dataForm.phoneNumber === '') {
        return this.$notify('warning', '请输入手机号')
      }
      this.Captch_count()
      this.$http.account.sendSms({
        codeType: this.messageType,
        phoneNumber: this.dataForm.phoneNumber
      }).then(res => {
        if (res.data.code === 0) {
          return this.$notify('success', '请注意查收', '验证码已发送')
        }
      })
    },
    Captch_count () {
      const TIME_COUNT = 60
      if (!this.timer && this.dataForm.phoneNumber) {
        this.timeCount = TIME_COUNT
        this.show = true
        this.timer = setInterval(() => {
          if (this.timeCount > 0 && this.timeCount <= TIME_COUNT) {
            this.timeCount--
          } else {
            this.show = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    Close_dialog () {
      this.dialogVisible = false
      this.agreeRegister = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/modules/handleView.scss';
</style>
