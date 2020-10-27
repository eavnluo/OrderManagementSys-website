<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-steps class="edit-steps"
              :active="active"
              finish-status="success"
              simple>
      <el-step v-for="item in stepList"
               :title="item.title"
               :key="item.id" />
    </el-steps>
    <el-form class="editForm"
             label-position="right"
             @keyup.enter.native="dataFormSubmit"
             :model="dataForm"
             :rules="dataRule"
             ref="editForm">
      <el-form-item label="当前账户手机号"
                    prop="phoneNumber">
        <el-input @input="changeStep(1)"
                  placeholder="请输入手机号"
                  v-model="dataForm.phoneNumber" />
      </el-form-item>
      <el-form-item label="新密码"
                    prop="password">
        <el-input @input="changeStep(2)"
                  placeholder="请输入新密码"
                  v-model="dataForm.password"
                  show-password />
      </el-form-item>
      <el-form-item label="确认新密码"
                    prop="comfirmPassword">
        <el-input @input="changeStep(3)"
                  placeholder="再次输入新密码"
                  v-model="dataForm.comfirmPassword"
                  show-password />
      </el-form-item>
      <el-form-item>
        <el-button class="profile-submit"
                   type="primary"
                   @click="dataFormSubmit">提交</el-button>
      </el-form-item>
    </el-form>
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
    return {
      dataForm: {
        phoneNumber: '',
        password: '',
        comfirmPassword: ''
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
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        comfirmPassword: [
          { required: true, validator: checkPwd, trigger: 'blur' }
        ]
      },
      stepList: [
        { id: 1, title: '手机号', value: 1 },
        { id: 2, title: '新密码', value: 2 },
        { id: 3, title: '确认新密码', value: 3 }
      ],
      active: 0
    }
  },
  methods: {
    dataFormSubmit () {
      this.$refs['editForm'].validate(valid => {
        if (valid) {
          this.$http.account.editPassword(this.dataForm).then(res => {
            if (res.data.code === 0) {
              this.$notify('success', '密码修改成功')
              this.$refs['editForm'].resetFields()
              this.active = 0
            }
          })
        }
      })
    },
    changeStep (activeValue) {
      this.active = activeValue
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-steps {
  background-color: #fafafa;
  margin-top: 15px;
}

.editForm {
  margin: 10px 0 0 0;
  width: 300px;
}

/deep/ .el-form-item__label {
  font-size: 15px;
  font-weight: 600;
  padding: 0 0 5px 0;
}
</style>
