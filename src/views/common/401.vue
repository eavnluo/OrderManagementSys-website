<template>
  <div class="errPage-container">
    <el-row class="errPage-content">
      <el-col :span="12">
        <h1 class="text-jumbo">Oops!</h1>
        <h2>您没有权限去该页面</h2>
        <h5 class="tips-desc">如有疑问请联系管理员</h5>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/">回到首页</router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12"
              style="text-align:right">
        <img :src="errGif"
             width="313"
             height="428"
             alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errGif from '@/assets/401.gif'

export default {
  name: 'Page401',
  data () {
    return {
      errGif: errGif + '?' + +new Date(),
      ewizardClap:
        'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
    }
  },
  methods: {
    back () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.errPage-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .errPage-content {
    width: 720px;
    margin: 0 auto;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #13abab;
  }
  .tips-desc {
    margin-left: 2px;
    margin-top: 0px;
  }
  .list-unstyled {
    font-size: 14px;
    line-height: 1.8;
    a {
      color: #008489;
    }
  }
}
</style>
