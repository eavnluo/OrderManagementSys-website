<template>
  <div class="navbar"
       ref="navBar"
       @mouseover="backgroundActive = 'background-color:rgb(0,0,0,0.5)'"
       @mouseleave="backgroundActive = ''"
       :style="backgroundActive">
    <div class="navbarMenu">
      <div class="logo"
           @click="goBackHome">
        <img src="../assets/logo-w.png" />
      </div>
      <el-menu router
               mode="horizontal"
               background-color="transparent"
               :text-color="textColor"
               :active-text-color="activeColor">
        <el-menu-item index="/">
          <a v-scroll-to="{ el:'#introduction', offset: -70 }">
            {{ $t('route.introduction') }}
          </a>
        </el-menu-item>
        <el-menu-item index="/">
          <a v-scroll-to="{ el:'#solution', offset: -70 }">
            {{ $t('route.solution') }}
          </a>
        </el-menu-item>
        <el-menu-item index="/demand">
          <a>{{ $t('route.demand') }}</a>
        </el-menu-item>
        <el-menu-item index="/">
          <a v-scroll-to="{ el:'#aboutUs', offset: -70 }">
            {{ $t('route.aboutUs') }}
          </a>
        </el-menu-item>
        <el-menu-item v-if="language === 'zh'"
                      @click="changeLangType('en')">
          <a>English</a>
        </el-menu-item>
        <el-menu-item v-else-if="language === 'en'"
                      @click="changeLangType('zh')">
          <a>中文</a>
        </el-menu-item>
        <el-menu-item :index="profile_index"
                      v-show="show">
          <el-dropdown>
            <span>
              <a><img class="headshot"
                     src="../assets/profile/headshot.png"></a>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleRouter('Chart')">
                平台数据
              </el-dropdown-item>
              <el-dropdown-item @click.native="handleRouter('EditPwd', profile_type)">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { clearLoginInfo, getUUID } from '@/utils'
export default {
  data () {
    return {
      textColor: '',
      activeColor: '',
      backgroundActive: '',
      language: '',
      show: false,
      profile_type: 0,
      profile_index: '' // 个人中心跳转路径
    }
  },
  created () {
    this.$i18n.locale === 'zh' ? this.language = 'zh' : this.language = 'en'
    this.showProfile()
  },
  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', () => this.handleScroll(), true)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', () => this.handleScroll(), true)
  },
  computed: {
    userInfo () {
      return JSON.parse(this.$cookie.get('user_profile'))
    }
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let navBar = this.$refs.navBar
      if (navBar) {
        let offsetTop = navBar.offsetTop
        if (scrollTop === offsetTop && this.$route.path === '/') {
          this.activeColor = '#fff'
          this.textColor = '#fff'
          navBar.style.background = 'transparent'
          navBar.style.boxShadow = 'none'
        } else {
          this.activeColor = '#343a40'
          this.textColor = '#343a40'
          navBar.style.boxShadow = ''
          navBar.style.background = ''
        }
      }
    },
    changeLangType (type) {
      this.language = type
      this.$i18n.locale = type
      localStorage.setItem('locale', type)
    },
    goBackHome () {
      this.handleRouter('HomeContent')
      this.handleScroll()
    },
    handleRouter (routerName, type) {
      this.$router.push({ name: routerName, params: { type: type } })
    },
    logout () {
      this.$confirm('是否登出账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 使用query传参，退出账号后依然可以监听路由改变
        this.$router.push({ name: 'HomeContent', query: { JWT: getUUID() } })
        clearLoginInfo()
        this.showProfile()
        this.$notify('success', '账号已安全退出', '登出成功')
      }).catch(() => { })
    },
    showProfile () {
      if (this.$cookie.get('user_token')) {
        this.profile_type = this.$cookie.get('user_type')
        this.show = true
        this.profile_index = this.userInfo.authenticationStatus === '0' ? `/profile/userCenter/${this.profile_type}` : `/profile/chart`
      } else {
        this.show = false
      }
    }
  },
  watch: {
    $route () {
      this.handleScroll()
      this.showProfile()
    }
  }
}
</script>
<style>
.el-menu.el-menu--popup.el-menu--popup-bottom-start {
  background-color: #fff !important;
}
</style>

<style lang="scss" scoped>
@import '@/styles/modules/headerView.scss';
</style>
