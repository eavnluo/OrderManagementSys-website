<template>
  <div class="form-bg">
    <div class="form">
      <div class="form-content">
        <h2 class="title">用户登录</h2>
        <el-form :model="dataForm"
                 :rules="dataRule"
                 @keyup.enter.native="dataFormSubmit"
                 ref="loginForm">
          <el-form-item prop="phoneNumber">
            <el-input v-model="dataForm.phoneNumber"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="dataForm.password"
                      placeholder="密码"
                      show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       style="width:100%"
                       :loading="loading"
                       @click="dataFormSubmit">
              <span v-show="!loading">{{ $t('login.button') }}</span>
            </el-button>
          </el-form-item>
        </el-form>
        <p class="handle-router">
          <el-row>
            <el-col :span="16">
              {{ $t('login.noAccount') }}
              <span @click="handleRouter('Register')">{{ $t('login.nowRegister') }}</span>
            </el-col>
            <el-col :span="8"
                    style="text-align:right">
              <span class="forgetPwd"
                    @click="handleRouter('ForgetPwd')">{{ $t('login.forget') }}</span>
            </el-col>
          </el-row>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        phoneNumber: '',
        password: ''
      },
      dataRule: {
        phoneNumber: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  computed: {
    userInfo () {
      return JSON.parse(this.$cookie.get('user_profile'))
    }
  },
  methods: {
    dataFormSubmit () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.loading = true
          this.$http.account.login(this.dataForm).then(res => {
            if (res.data.code === 0) {
              this.$store.commit('set_token', res.data.token)
              this.$store.commit('set_profile', res.data.user)
              this.$store.commit('set_businessType', res.data)
              this.$refs['loginForm'].resetFields()
              this.$notify('success', `欢迎登录，${this.$cookie.get('user_name')}。`, '登录成功')
              // UserCenter_0  UserCenter__1  /  0：客户 1：供应商
              this.handleRouter(this.userInfo.authenticationStatus === '0' ? `UserCenter_${this.$store.state.user.profile.type}` : 'Chart')
            }
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    handleRouter (routerName) {
      this.$router.replace({ name: routerName })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$refs['loginForm'].resetFields()
    next()
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: top;
  background-color: #fff;
  border-radius: 5px;
  color: #3c4858 !important;

  .form-content {
    width: 430px;
    padding: 0 45px;
    margin: 18px 0 40px 0;

    .title {
      margin-bottom: 25px;
      font-size: 27px;
    }

    .formItem-position {
      margin-bottom: 10px !important;
    }

    .forgetPwd {
      cursor: pointer;
      color: #3c4858 !important;
      &:hover {
        color: #13c2c2 !important;
      }
    }
  }

  .handle-router {
    font-size: 14px;
    span {
      cursor: pointer;
      color: #13c2c2 !important;
      &:hover {
        color: #13abab;
      }
    }
  }
}
</style>
