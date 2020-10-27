<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="900px">
      <el-table :data="tableData"
                border
                stripe
                style="width: 100%">
        <el-table-column prop="orderStatus"
                         label="订单状态">
          <template slot-scope="scope">
            <span class="successInfo">
              {{ scope.row.orderStatus }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="statusDate"
                         label="状态时间">
        </el-table-column>
        <el-table-column prop="remark"
                         label="备注">
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      title: '订单详情'
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
      this.getOrderStatusFlow()
    },
    getOrderStatusFlow () {
      this.$http.profile_order.findOrderStatusFlow({
        orderItem: this.$route.params.orderItem
      }).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.list
          this.title = '工作单号：' + this.$route.params.orderItem
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__title {
  font-weight: bold;
  font-size: 21px;
  opacity: 0.8;
}
</style>
