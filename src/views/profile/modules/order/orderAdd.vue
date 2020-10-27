<template>
  <!-- 订单添加页面 -->
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-form class="headerInfo"
             :model="dataForm"
             :rules="dataRule"
             :inline="true"
             label-width="95px"
             label-position="left"
             ref="orderHeaderInfo">
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="订单号"
                        prop="orderNo">
            <el-input v-model="dataForm.orderNo"
                      style="width:225px"
                      placeholder="请输入订单号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发票号"
                        prop="invoiceNo">
            <el-input v-model="dataForm.invoiceNo"
                      style="width:225px"
                      placeholder="请输入发票号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订单类型"
                        prop="orderType">
            <el-select v-model="dataForm.orderType"
                       style="width:225px"
                       placeholder="请选择订单类型">
              <el-option v-for="item in ordtype"
                         :key="item.id"
                         :label="item.name"
                         :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="发货人"
                        prop="sendPeople">
            <el-select style="width:225px"
                       v-model="dataForm.sendPeople"
                       @change="changeSendPeople"
                       placeholder="请选择发货人">
              <el-option v-for="item in sendGoodsPeopleList"
                         :key="item.id"
                         :label="item.name"
                         :value="`${item.id},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人"
                        prop="receivePeople">
            <el-select style="width:225px"
                       @change="changeReceivePeople"
                       v-model="
                       dataForm.receivePeople"
                       placeholder="请选择收货人">
              <el-option v-for="item in receiveGoodsPeopleList"
                         :key="item.id"
                         :label="item.name"
                         :value="`${item.id},${item.name}`">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="始发地"
                        prop="startPoint">
            <el-input v-model="dataForm.startPoint"
                      style="width:225px"
                      placeholder="请填写始发地"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="25"
              v-show="showSendPeople || showReceivePeople"
              class="rowGoodsPeople">
        <el-col v-show="showSendPeople"
                :span="12">
          <el-card shadow="hover">
            <ul>
              <li>公司名称：{{ sendPeopleInfo.company }}</li>
              <li>地址：{{ sendPeopleInfo.address }}</li>
              <li>联系电话：{{ sendPeopleInfo.phone }}</li>
            </ul>
          </el-card>
        </el-col>
        <el-col v-show="showReceivePeople"
                :span="12">
          <el-card shadow="hover">
            <ul>
              <li>公司名称：{{ receivePeopleInfo.company }}</li>
              <li>地址：{{ receivePeopleInfo.address }}</li>
              <li>联系电话：{{ receivePeopleInfo.phone }}</li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter='25'>
        <el-col :span="8">
          <el-form-item label="目的地"
                        prop="endPoint">
            <el-input v-model="dataForm.endPoint"
                      style="width:225px"
                      placeholder="请填写目的地"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仓储供应商"
                        prop="storageSupplyId">
            <el-select v-model="dataForm.storageSupplyId"
                       style="width:225px"
                       @focus="getSupplyList('F')"
                       :loading="loading"
                       placeholder="请选择仓库">
              <el-option v-for="item in supplyList"
                         :key="item.id"
                         :label="item.supplyName"
                         :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="卡车供应商"
                        prop="carSupplyId">
            <el-select v-model="dataForm.carSupplyId"
                       style="width:225px"
                       @focus="getSupplyList('K')"
                       :loading="loading"
                       placeholder="请选择供应商">
              <el-option v-for="item in supplyList"
                         :key="item.id"
                         :label="item.supplyName"
                         :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter='25'>

        <el-col :span="8">
          <el-form-item label="提货时间"
                        prop="expectReceiveDate">
            <el-date-picker v-model="dataForm.expectReceiveDate"
                            style="width:225px;"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送货地址"
                        prop="shippingAddress">
            <el-input v-model="dataForm.shippingAddress"
                      style="width:225px"
                      placeholder="请输入送货地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="提货地址"
                        prop="receivingAddress">
            <el-input v-model="dataForm.receivingAddress"
                      style="width:225px"
                      placeholder="请输入提货地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="件数（个）"
                        prop="pieceNumber">
            <el-input v-model="dataForm.pieceNumber"
                      style="width:225px"
                      placeholder="请输入件数"></el-input>
          </el-form-item>
        </el-col>
        <el-col style="margin-left:9px;"
                :span="8">
          <el-form-item label="重量"
                        prop="weight">
            <el-input v-model="dataForm.weight"
                      style="width:225px"
                      type="number"
                      placeholder="请填写重量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7"
                style="margin-left:32px"
                class="handleBtn">
          <el-button type="success"
                     @click="addOrUpdateGoods()">新增商品</el-button>
          <el-button type="primary"
                     style="margin-left:23px"
                     @click="createOrder()">提交订单</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-divider class="form-line"
                content-position="center">商品列表</el-divider>
    <el-table :data="dataForm.goods"
              :max-height="tableHeight"
              :summary-method="getSummaries"
              show-summary
              stripe
              border>
      <el-table-column prop="goodsCode"
                       header-align="center"
                       align="center"
                       type="index"
                       width="80"
                       label="序号">
      </el-table-column>
      <el-table-column prop="goodsName"
                       header-align="center"
                       align="center"
                       label="品名">
      </el-table-column>
      <el-table-column prop="specification"
                       header-align="center"
                       align="center"
                       label="规格">
      </el-table-column>
      <el-table-column prop="goodsModel"
                       header-align="center"
                       align="center"
                       label="型号">
      </el-table-column>
      <el-table-column prop="brand"
                       header-align="center"
                       align="center"
                       label="品牌">
      </el-table-column>
      <el-table-column prop="goodsPacking"
                       header-align="center"
                       align="center"
                       label="包装">
      </el-table-column>
      <el-table-column prop="goodsMaterial"
                       header-align="center"
                       align="center"
                       label="材质">
      </el-table-column>
      <el-table-column prop="price"
                       header-align="center"
                       align="center"
                       label="单价">
      </el-table-column>
      <el-table-column prop="goodsNum"
                       header-align="center"
                       align="center"
                       label="数量">
      </el-table-column>
      <el-table-column prop="priceTotal"
                       header-align="center"
                       align="center"
                       label="总额">
      </el-table-column>
      <el-table-column fixed="right"
                       header-align="center"
                       align="center"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="removeGoods(scope.row.goodsId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdate"
                   :url="tableHeight"
                   @bindToParentForm="addToFrom" />
  </div>
</template>

<script>
import AddOrUpdateGood from './good-add-or-update'

export default {
  data () {
    return {
      dataForm: {
        orderNo: '',
        invoiceNo: '',
        orderType: '',
        sendPeople: '',
        sendGoodsPeople: '',
        sendGoodsPeopleId: '',
        receivePeople: '',
        receiveGoodsPeople: '',
        receiveGoodsPeopleId: '',
        startPoint: '',
        endPoint: '',
        carSupplyId: '',
        storageSupplyId: '',
        pieceNumber: '',
        weight: '',
        goods: []
      },
      sendGoodsPeopleList: [], // 发货人列表
      receiveGoodsPeopleList: [], // 收货人列表
      dataRule: {
        orderNo: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        invoiceNo: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        orderType: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        sendPeople: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        receivePeople: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        startPoint: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        endPoint: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        carSupplyId: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        storageSupplyId: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        pieceNumber: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        shippingAddress: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        receivingAddress: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ],
        expectReceiveDate: [
          { required: true, message: '必填，请输入', trigger: 'blur' }
        ]
      },
      ordtype: [
        {
          id: 1,
          value: 'R',
          name: '采购订单'
        },
        {
          id: 2,
          value: 'I',
          name: '销售订单'
        }
      ],
      supplyList: [], // 供应商列表
      tableHeight: 335,
      addOrUpdateVisible: false,
      loading: false,
      showSendPeople: false,
      showReceivePeople: false,
      sendPeopleInfo: {
        company: '',
        address: '',
        phone: ''
      },
      receivePeopleInfo: {
        company: '',
        address: '',
        phone: ''
      }
    }
  },
  components: {
    'addOrUpdate': AddOrUpdateGood
  },
  created () {
    this.getBaseContactsAllList()
  },
  methods: {
    addOrUpdateGoods () {
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    },
    // 将子组件转过来的数据加入list
    addToFrom (dataForm) {
      this.dataForm.goods.push(dataForm)
      this.dataForm.goods.forEach(item => {
        item.priceTotal = (item.price * item.goodsNum).toFixed(2)
      })
    },
    createOrder () {
      this.$refs['orderHeaderInfo'].validate((valid) => {
        if (valid) {
          if (this.dataForm.goods.length === 0) {
            return this.$notify('error', '商品列表不能为空！')
          }
          this.$confirm('确认填写无误，即将提交订单, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let baseContactsStr1 = this.dataForm.receivePeople.split(',')
            let baseContactsStr = this.dataForm.sendPeople.split(',')
            this.dataForm.sendGoodsPeopleId = baseContactsStr[0]
            this.dataForm.sendGoodsPeople = baseContactsStr[1]
            this.dataForm.receiveGoodsPeopleId = baseContactsStr1[0]
            this.dataForm.receiveGoodsPeople = baseContactsStr1[1]
            this.$http.profile_order.saveCompleteOrder(this.dataForm).then(res => {
              if (res.data.code === 0) {
                this.$notify('success', '下单成功')
                this.dataForm = {}
                this.$router.push({ name: 'OrderList', params: { type: this.$cookie.get('user_type') } })
              }
            })
          }).catch(() => { })
        }
      })
    },
    // 获取供应商列表
    getSupplyList (type) {
      this.supplyList = []
      this.loading = true
      this.$http.profile_order.findListByType({
        type: type
      }).then(res => {
        if (res.data.code === 0 && res.data.list.length > 0) {
          this.supplyList = res.data.list
        } else {
          this.$notify('warning', '当前账户未报价，客户请联系平台，供应商请到报价管理自行维护', '未报价', 7000)
        }
      })
        .finally(() => {
          this.loading = false
        })
    },
    // 获取联系人列表
    getBaseContactsAllList () {
      this.$http.profile_order.findBaseContactsAllList().then(res => {
        if (res.data.code === 0) {
          res.data.list.forEach(item => {
            if (item.type === '0') {
              this.sendGoodsPeopleList.push(item)
            } else if (item.type === '1') {
              this.receiveGoodsPeopleList.push(item)
            }
          })
        }
      })
    },
    removeGoods (goodsId) {
      this.dataForm.goods.forEach((item, i) => {
        if (item.goodsId === goodsId) {
          this.dataForm.goods.splice(i, 1)
        }
      })
    },
    // 发货人展示对应信息
    changeSendPeople (val) {
      const baseContactsStr = val.split(',')
      const sendPeopleId = baseContactsStr[0]
      this.sendGoodsPeopleList.forEach(item => {
        if (item.id === sendPeopleId) {
          this.sendPeopleInfo.company = item.company
          this.sendPeopleInfo.address = item.address
          this.sendPeopleInfo.phone = item.phone
        }
      })
      this.showSendPeople = true
    },
    // 收货人展示对应信息
    changeReceivePeople (val) {
      const baseContactsStr = val.split(',')
      const receivePeopleId = baseContactsStr[0]
      this.receiveGoodsPeopleList.forEach(item => {
        if (item.id === receivePeopleId) {
          this.receivePeopleInfo.company = item.company
          this.receivePeopleInfo.address = item.address
          this.receivePeopleInfo.phone = item.phone
        }
      })
      this.showReceivePeople = true
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else if (index === 7) {
          sums[index] = '--'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          if (index === 9) {
            sums[index] = sums[index].toFixed(2)
          }
        } else {
          sums[index] = '--'
        }
      })
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-card__body {
  cursor: pointer;
  padding: 10px 15px !important;
}

.rowGoodsPeople {
  margin: 0 0 25px 0;
  ul li {
    font-size: 14px;
    line-height: 2;
  }
}
@import '@/styles/modules/order.scss';
</style>
