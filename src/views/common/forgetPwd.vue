<template>
  <div class="form-bg">
    <div class="form">
      <img src="../../assets/loginBanner.jpg" />
      <div class="form-content">
        <h2 class="title">用户找回密码</h2>
        <el-form :model="dataForm"
                 :rules="dataRule"
                 ref="dataForm">
          <el-form-item prop="phoneNumber">
            <el-input v-model="dataForm.phoneNumber"
                      placeholder="手机号"></el-input>
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
          <el-form-item prop="code">
            <el-row>
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
            </el-row>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="dataForm.password"
                      placeholder="新密码"
                      show-password></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input v-model="dataForm.confirmPassword"
                      placeholder="再次输入新密码"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width:100%"
                       :loading="loading"
                       @click="dataFormSubmit">找回密码</el-button>
          </el-form-item>
        </el-form>
        <p class="handle-router">
          已有账号?
          <span @click="handleRouter()">立即登录</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
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
        phoneNumber: '',
        code: '',
        password: '',
        confirmPassword: '',
        type: ''
      },
      dataRule: {
        phoneNumber: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
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
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, validator: checkPwd, trigger: 'blur' }
        ]
      },
      messageType: '02', // 注册：01 找回密码：02
      timer: null,
      timeCount: 0,
      loading: false,
      show: false
    }
  },
  methods: {
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http.account.forgetPwd(this.dataForm).then(res => {
            if (res.data.code === 0) {
              this.$notify('success', '找回密码成功')
              this.handleRouter()
            }
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
    handleRouter () {
      this.$router.replace({ name: 'HomeContent' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/modules/handleView.scss';
</style>
