<template>
  <el-dialog title="添加"
             top="15vh"
             width="600px"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="费用类型"
                    prop="type">
        <el-select v-model="dataForm.type"
                   @change="changeType"
                   filterable
                   placeholder="请选择费用类型">
          <el-option v-for="item in priceTypeList"
                     :key="item.value"
                     :label="item.name"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用名称"
                    prop="name">
        <el-select v-model="dataForm.name"
                   @change="changeItem"
                   filterable
                   placeholder="请选择费用项">
          <el-option v-for="item in itemList"
                     :key="item.id"
                     :label="item.name +'(' +  item.unit + ')' "
                     :value="item.id"
                     ref="test">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="费用代码"
                    prop="code">
        <el-input v-model="dataForm.code"
                  readonly
                  placeholder="费用代码"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="单位"
                    prop="unit">
        <el-input v-model="dataForm.unit"
                  readonly
                  placeholder="单位"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="金额"
                    prop="price">
        <el-input v-model="dataForm.price"
                  type='number'
                  placeholder="金额"></el-input>
      </el-form-item>
      <el-form-item label="增值税"
                    prop="vatRate">
        <el-input v-model="dataForm.vatRate"
                  placeholder="增值税"
                  disabled></el-input>
      </el-form-item>
      <el-form-item v-if="isK"
                    label="始发地"
                    prop="startArea">
        <el-input v-model="dataForm.startArea"
                  placeholder="始发地" />
      </el-form-item>
      <el-form-item v-if="isK"
                    label="目的地"
                    prop="endArea">
        <el-input v-model="dataForm.endArea"
                  placeholder="目的地" />
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getUUID } from '@/utils'
export default {
  data () {
    return {
      visible: false,
      isK: false,
      dataForm: {
        id: '',
        name: '',
        code: '',
        type: '',
        unit: '',
        price: '',
        vatRate: '6%',
        startArea: '',
        endArea: '',
        isTransport: ''
      },
      dataRule: {
        name: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        vatRate: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        startArea: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ],
        endArea: [
          { required: true, message: '必填，不能为空', trigger: 'blur' }
        ]
      },
      priceTypeList: [],
      itemId: '',
      itemList: [],
      supplierList: []
    }
  },
  methods: {
    init (type) {
      if (type === 'K') {
        this.isK = true
        this.dataForm.isTransport = '1'
      } else {
        this.isK = false
        this.dataForm.isTransport = ''
      }
      this.findTypeList()
      this.visible = true
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // 增加到父页面上
          this.$emit('dataFormSubmit', JSON.parse(JSON.stringify(this.dataForm)))
          this.visible = false
          this.$refs['dataForm'].resetFields()
        }
      })
    },
    // 费用类型列表
    findTypeList () {
      this.$http.dict.findDicList({
        code: 'PRICE_TYPE'
      }).then(res => {
        if (res.data.code === 0) {
          this.priceTypeList = res.data.list
        }
      })
    },
    // 费用类型获取费用名称列表
    changeType (type) {
      this.$http.profile_price.findPriceItemList({
        type: type
      }).then(res => {
        if (res.data.code === 0) {
          this.itemList = res.data.list
        }
      })
    },
    changeItem (val) {
      for (let item of this.itemList) {
        if (item.id === val) {
          this.dataForm.id = getUUID()
          this.dataForm.type = item.type
          this.dataForm.name = item.name
          this.dataForm.unit = item.unit
          this.dataForm.code = item.code
        }
      }
    }
  }
}
</script>
