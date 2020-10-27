<template>
  <el-dialog title="新增"
             top="12vh"
             width="40%"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             @keydown.enter.native="toParentForm"
             ref="dataForm"
             label-width="80px">
      <el-form-item label="商品名"
                    prop="goodsName">
        <el-select v-model="dataForm.goodsName"
                   filterable
                   @change="changeInfo"
                   :loading="loading"
                   placeholder="请选择商品">
          <el-option v-for="item in goodsList"
                     :key="item.id"
                     :label="item.goodsName"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="dataForm.specification"
                  placeholder="型号"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="dataForm.goodsModel"
                  placeholder="型号"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-input v-model="dataForm.brand"
                  placeholder="品牌"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="包装">
        <el-input v-model="dataForm.goodsPacking"
                  placeholder="包装"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="材质">
        <el-input v-model="dataForm.goodsMaterial"
                  placeholder="材质"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="批次">
        <el-input v-model="dataForm.goodsBatch"
                  placeholder="批次"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="dataForm.price"
                  placeholder="单价"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="生产日期">
        <el-input v-model="dataForm.productionDate"
                  placeholder="生产日期"
                  disabled></el-input>
      </el-form-item>
      <el-form-item label="数量"
                    prop="goodsNum">
        <el-input v-model="dataForm.goodsNum"
                  type="number"
                  min="1"
                  @change="checkNum($event)"
                  placeholder="请选择数量"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="toParentForm()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        goodsId: '', // 商品ID
        goodsName: '',
        specification: '',
        brand: '',
        goodsPacking: '',
        goodsMaterial: '',
        goodsBatch: '',
        price: '',
        productionDate: '',
        goodsNum: ''
      },
      dataRule: {
        goodsName: [
          { required: true, message: '请选择商品', trigger: 'blur' }
        ],
        goodsNum: [
          { required: true, message: '请选择商品数量', trigger: 'blur' }
        ]
      },
      loading: false,
      goodsList: [],
      rateList: [],
      list: [],
      rate: ''
    }
  },
  methods: {
    // 获取商品列表
    getGoodsList () {
      this.loading = true
      this.$http.profile_order.findGoodList().then(res => {
        if (res.data.code === 0) {
          this.goodsList = res.data.list
        }
      })
        .finally(() => {
          this.loading = false
        })
    },
    changeInfo (id) {
      for (let item of this.goodsList) {
        if (item.id === id) {
          this.dataForm.goodsId = item.id
          this.dataForm.goodsName = item.goodsName
          this.dataForm.goodsModel = item.goodsModel
          this.dataForm.brand = item.brand
          this.dataForm.goodsPacking = item.goodsPacking
          this.dataForm.goodsMaterial = item.goodsMaterial
          this.dataForm.goodsBatch = item.goodsBatch
          this.dataForm.price = item.price
          this.dataForm.productionDate = item.productionDate
          this.dataForm.specification = item.specification
        }
      }
    },
    toParentForm () {
      this.$refs['dataForm'].validate(vaild => {
        if (vaild) {
          this.$emit('bindToParentForm', this.dataForm)
          this.visible = false
        }
      })
    },
    checkNum (e) {
      let result = new RegExp('^[1-9][0-9]*$').test(e)
      if (!result) {
        this.$message.error('请输入正整数')
        this.dataForm.goodsNum = ''
      }
    },
    // 打开dialog
    init () {
      this.dataForm = {}
      this.getGoodsList()
      this.visible = true
    }
  }
}
</script>
