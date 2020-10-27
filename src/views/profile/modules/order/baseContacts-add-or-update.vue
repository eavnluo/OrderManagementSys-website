<template>
  <el-dialog :title="!dataForm.id ? '新增' : !disabled ? '修改' : '查看'"
             :close-on-click-modal="false"
             top="14vh"
             width="40%"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             label-position="left"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="dataForm.name"
                  :disabled="disabled"
                  placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话"
                    prop="phone">
        <el-input v-model="dataForm.phone"
                  :disabled="disabled"
                  placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="国家"
                    prop="country">
        <el-input v-model="dataForm.country"
                  disabled
                  placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="省"
                    prop="province">
        <el-select v-model="dataForm.province"
                   filterable
                   placeholder="省"
                   style="width:100%"
                   :disabled="disabled"
                   clearable
                   @change="changePrivince">
          <el-option v-for="item in provinceList"
                     v-bind:key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市"
                    prop="city">
        <el-select v-model="dataForm.city"
                   filterable
                   placeholder="城"
                   style="width:100%"
                   :disabled="disabled"
                   clearable
                   @change="changeCity">
          <el-option v-for="item in cityList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区"
                    prop="area">
        <el-select v-model="dataForm.area"
                   placeholder="区"
                   style="width:100%"
                   :disabled="disabled"
                   clearable>
          <el-option v-for="item in areaList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公司"
                    prop="company">
        <el-input v-model="dataForm.company"
                  :disabled="disabled"
                  placeholder="公司"></el-input>
      </el-form-item>
      <el-form-item label="地址"
                    prop="address">
        <el-input v-model="dataForm.address"
                  :disabled="disabled"
                  placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="类型"
                    prop="type">
        <el-select style="width:100%;"
                   v-model="dataForm.type"
                   placeholder="请选择">
          <el-option v-for="item in typeList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行业类型"
                    prop="industryType">
        <el-select v-model="dataForm.industryType"
                   placeholder="行业类型"
                   style="width:100%"
                   @change="changeIndustryType"
                   :disabled="disabled"
                   clearable>
          <el-option v-for="item in industryTypeList"
                     :key="item.id"
                     :label="item.industryType"
                     :value="item.id + ''">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="其他产业"
                    v-show="showRemark">
        <el-input v-model="dataForm.remark"
                  placeholder="请输入所属行业"></el-input>
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
        name: '',
        phone: '',
        country: '中国',
        province: '',
        city: '',
        area: '',
        company: '',
        address: '',
        type: '',
        industryType: '',
        remark: ''
      },
      typeList: [
        {
          value: '0',
          label: '发货公司'
        },
        {
          value: '1',
          label: '收货公司'
        }
      ],
      dataRule: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        country: [
          { required: true, message: '国家不能为空', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '省份不能为空', trigger: 'blur' }
        ],
        city: [
          { required: true, message: '城市不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '区域不能为空', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        industryType: [
          { required: true, message: '产业类型不能为空', trigger: 'blur' }
        ]
      },
      industryTypeList: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      showRemark: false
    }
  },
  methods: {
    init (id, disabled) {
      this.disabled = disabled
      this.dataForm.id = id || ''
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.industryType = ''
        this.getIndustryTypeList()
        if (id) {
          // 修改-查询详情
          this.$http.profile_order.viewBaseContacts(id).then(res => {
            if (res.data.code === 0) {
              if (res.data.customercontacts) {
                this.dataForm = res.data.customercontacts
                if (this.dataForm.remark) {
                  this.showRemark = true
                }
              }
              // 重新赋值List 避免select无法将number转换为对应的name
              if (res.data.provinceList && res.data.provinceList.length) {
                this.provinceList = res.data.provinceList
              }
              if (res.data.cityList && res.data.cityList.length) {
                this.cityList = res.data.cityList
              }
              if (res.data.areaList && res.data.areaList.length) {
                this.areaList = res.data.areaList
              }
            }
          })
        } else {
          // 添加，获取省份列表
          this.$http.profile_user.getListByParentId({ parentId: '100000' }).then(res => {
            if (res.data.code === 0) {
              this.provinceList = res.data.list
            } else {
              this.provinceList = []
            }
          })
        }
      })
    },
    // 获取产业类型
    getIndustryTypeList () {
      this.$http.profile_user.getIndustryTypeList().then(res => {
        if (res.data.code === 0) {
          this.industryTypeList = res.data.list
        }
      })
    },
    // 根据省份ID获取城市列表
    changePrivince (parentId) {
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
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.$http.profile_order.addBaseContacts(this.dataForm).then(res => {
            if (res.data.code === 0) {
              this.$notify('success', `${!this.dataForm.id ? `[${this.dataForm.name}]添加成功` : `[${this.dataForm.name}]修改成功`}`, `${!this.dataForm.id ? '已添加' : ' 已修改'}`)
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        }
      })
    },
    // 如果选择其他产业 增加备注
    changeIndustryType (val) {
      this.dataForm.remark = ''
      if (val === '32') {
        this.showRemark = true
        return
      }
      this.showRemark = false
    }
  }
}
</script>
