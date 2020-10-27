<template>
  <el-row v-show="fileList.length > 0"
          class="file-list">
    <el-divider class="form-line line-top"
                content-position="center">附件列表</el-divider>
    <el-col>
      <ul>
        <li class="file-item"
            @click="downloadFile(item.id)"
            v-for="item in fileList"
            :key="item.id">
          <i class="el-icon-document" />
          <span>{{ item.fileName }}</span>
          <i class="el-icon-download" />
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
import { base } from '@/api/base'
export default {
  props: {
    routeName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fileList: [],
      params: ''
    }
  },
  created () {
    this.getFileList()
  },
  methods: {
    getFileList () {
      this.judgeRouteName()
      this.$http.profile_downloadFile.downloadFile({
        belongTo: this.params
      }).then(res => {
        if (res.data.code === 0) {
          this.fileList = res.data.files
        }
      })
    },
    // 判断当前路由，对params赋值
    judgeRouteName () {
      if (this.routeName === 'PriceInfo') {
        this.params = `${this.$route.params.id}`
      } else if (this.routeName.includes('BillNo')) {
        this.params = `${this.$route.params.billNo}`
      } else if (this.routeName.includes('OrderInfo')) {
        this.params = `${this.$route.params.orderItem}`
      }
    },
    downloadFile (id) {
      window.open(
        `${base.ksAdmin}/order/downloadFile?id=${id}&token=${this.$cookie.get('user_token')}`
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.file-list {
  .file-title {
    line-height: 3;
    font-size: 14px;
  }

  .file-item {
    width: 100%;
    background-color: #fafafa;
    margin-bottom: 10px;
    padding: 4px 10px;
    cursor: pointer;

    span {
      color: #303133;
      font-size: 14px;
    }

    .el-icon-download {
      margin-top: 2px;
    }

    &:hover {
      background-color: #13c2c2;
      color: #f9f9f9 !important;
      span {
        color: #f9f9f9 !important;
      }
      .el-icon-download {
        color: #f9f9f9 !important;
      }
    }
    .el-icon-download {
      color: rgb(21, 161, 147);
      float: right;
    }
  }
}
@import '@/styles/modules/order.scss';
</style>
