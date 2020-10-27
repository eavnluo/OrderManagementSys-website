<template>
  <el-upload :limit="limit"
             :action="action"
             :accept="accept"
             :on-success="successUplaod"
             :on-error="errorUpload"
             :file-list="fileList"
             :auto-upload="false"
             :data="params"
             ref="uploadFile"
             multiple
             show-file-list>
    <el-button type="success">
      选择附件
      <i class="el-icon-upload el-icon--right" />
    </el-button>
  </el-upload>
</template>

<script>
import { base } from '@/api/base'
export default {
  props: {
    fileType: String
  },
  data () {
    return {
      fileList: [],
      limit: 5,
      action: '',
      accept: '',
      params: {}
    }
  },
  created () {
    this.action = `${base.ksAdmin}/order/uploadFile?token=${this.$cookie.get('user_token')}`
    this.uploadFileType()
  },
  methods: {
    uploadFileType () {
      // fileType String 限制文件类型
      this.accept = this.fileType === undefined ? `.docx,.doc,.xls,.xlsx,.png,.jpg,.jpeg,.text` : this.fileType
    },
    uploadFile (id) {
      if (this.$route.name === 'OrderInfo_1') {
        this.params.belongTo = `${this.$route.params.orderItem}_${this.$cookie.get('user_companyCode')}`
      } else if (this.$route.name === 'PriceAdd') {
        this.params.belongTo = id
      } else if (this.$route.name === 'BillNo_0' || this.$route.name === 'BillNo_1') {
        this.params.belongTo = this.$route.params.billNo
      }
      this.$refs.uploadFile.submit()
    },
    successUplaod (response) {
      this.$notify('success', '文件上传成功')
    },
    errorUpload (response) {
      this.$notify('error', '文件上传失败')
    }
  }
}
</script>
