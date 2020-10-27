<template>
  <el-dialog width="550px"
             :title="!dataForm.id ? '新增' : !disabled ? '修改' : '查看'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             label-position="top"
             @keyup.enter.native="dataFormSubmit()"
             label-width="120px">
      <el-form-item label="车牌"
                    prop="plateNumber">
        <el-input v-model="dataForm.plateNumber"
                  :disabled="disabled"
                  placeholder="车牌"></el-input>
      </el-form-item>
      <el-form-item label="型号"
                    prop="type">
        <el-input v-model="dataForm.type"
                  :disabled="disabled"
                  placeholder="型号"></el-input>
      </el-form-item>
      <el-form-item label="司机"
                    prop="driver">
        <el-input v-model="dataForm.driver"
                  :disabled="disabled"
                  placeholder="司机"></el-input>
      </el-form-item>
      <el-form-item label="司机联系方式"
                    prop="driverLink">
        <el-input v-model="dataForm.driverLink"
                  :disabled="disabled"
                  placeholder="司机联系方式"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button v-if="!disabled"
                 type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      visible: false,
      dataForm: {
        id: 0,
        belongTo: '',
        plateNumber: '',
        type: '',
        driver: '',
        driverLink: '',
        createdBy: '',
        createdTime: '',
        updatedBy: '',
        updatedTime: '',
        delFlag: ''
      },
      dataRule: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        plateNumber: [{ required: true, message: '车牌不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '型号不能为空', trigger: 'blur' }],
        driver: [{ required: true, message: '司机不能为空', trigger: 'blur' }],
        driverLink: [
          {
            required: true,
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    init (id, disabled) {
      this.disabled = disabled
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http.profile_car.getCarInfoById(
            { id }
          ).then(res => {
            if (res.data.code === 0) {
              this.dataForm = res.data.carinfo
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm']
        .validate((valid) => {
          if (valid) {
            if (!this.dataForm.id) {
              // 添加
              this.$http.profile_car.saveCarInfo(
                this.dataForm
              ).then(res => {
                if (res.data.code === 0) {
                  this.$notify('success', '车辆信息添加成功', '新增成功')
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              // 修改
              this.$http.profile_car.updateCarInfo(
                this.dataForm
              ).then(res => {
                if (res.data.code === 0) {
                  this.$notify('success', '车辆信息修改成功', '修改成功')
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            }
          }
        })
    }
  }
}
</script>
