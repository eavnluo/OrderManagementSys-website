<template>
  <el-menu class="div-shadow"
           :default-active="activeIndex"
           @select="handleSelect"
           :unique-opened="true"
           active-text-color="#13C2C2"
           router>
    <el-menu-item :index="`/profile/chart`">
      <icon-svg name="echart" />
      <span>平台数据</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <icon-svg name="daohang" />
        <span>合作指南</span>
      </template>
      <el-menu-item v-for="item in dictList"
                    :index="item.path"
                    :key="item.value">
        <icon-svg :name="item.icon" />
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <icon-svg name="user" />
        <span>用户中心</span>
      </template>
      <el-menu-item :index="`/profile/userCenter/${ userType }`">
        <icon-svg name="dangan" />
        <span>用户档案</span>
      </el-menu-item>
      <el-menu-item :index="`/profile/userCenter/EditPwd/${ userType }`">
        <icon-svg name="editPwd" />
        <span>修改密码</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4"
                v-if="decideUserType">
      <template slot="title">
        <icon-svg name="dingdan" />
        <span>订单管理</span>
      </template>
      <el-menu-item :index="`/profile/order/orderList/${userType}`">
        <icon-svg name="orderList" />
        <span>订单列表</span>
      </el-menu-item>
      <el-menu-item v-if="decideUserType"
                    index="/profile/order/orderAdd">
        <icon-svg name="orderAdd" />
        <span>订单添加</span>
      </el-menu-item>
      <el-menu-item v-if="decideUserType"
                    index="/profile/order/orderBaseContacts">
        <icon-svg name="baseContacts" />
        <span>联系人管理</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else-if="!decideUserType"
                  :index="`/profile/order/orderList/${userType}`">
      <icon-svg name="orderList" />
      <span>订单管理</span>
    </el-menu-item>
    <el-menu-item index="/profile/bill/billGroupMonth">
      <icon-svg name="jiesuan" />
      <span>结算中心</span>
    </el-menu-item>
    <el-menu-item v-if="!showInventory"
                  index="/profile/inventory/inventoryinfo">
      <icon-svg name="kucun" />
      <span>库存管理</span>
    </el-menu-item>
    <el-menu-item index="/profile/price/priceList">
      <icon-svg name="baojia" />
      <span>报价管理</span>
    </el-menu-item>
    <el-menu-item v-show="showCarManage"
                  index="/profile/CarManage">
      <icon-svg name="car" />
      <span>车辆管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      dictList: [],
      dictList_addList: [
        {
          icon: 'fangan'
        },
        {
          icon: 'liucheng'
        },
        {
          icon: 'jiesuan'
        },
        {
          icon: 'duijie'
        }
      ],
      activeIndex: '',
      showCarManage: false,
      showInventory: false
    }
  },
  computed: {
    decideUserType () {
      return this.$cookie.get('user_type') === '0'
    },
    userType () {
      return this.$cookie.get('user_type')
    },
    userBusinessType () {
      return this.$cookie.get('user_businessType')
    }
  },
  created () {
    if (this.$userType.isK()) {
      this.showCarManage = true
    }
    if (this.$cookie.get('user_businessType') === 'K') {
      this.showInventory = true
    }
    this.getfindDicList()
    this.handleSelect(this.$route.path)
  },
  watch: {
    $route () {
      this.handleSelect(this.$route.path)
      if (this.$userType.isK()) {
        this.showCarManage = true
      }
    }
  },
  methods: {
    getfindDicList () {
      this.$http.dict.findDicList({
        code: 'COOPERATION_GUIDE'
      }).then(res => {
        if (res.data.code === 0) {
          this.dictList = res.data.list
          this.dictList.forEach((item, i) => {
            item.icon = this.dictList_addList[i].icon
            item.path = `/profile/approachesDetail/${item.name}/${item.value}`
          })
        }
      })
    },
    // 确保跳转二级页面侧边栏也可以高亮
    handleSelect (index) {
      if (index.indexOf('/bill') !== -1) {
        this.activeIndex = '/profile/bill/billGroupMonth'
      } else if (index.indexOf('/price') !== -1) {
        this.activeIndex = '/profile/price/priceList'
      } else if (index.indexOf('/inventoryinfo') !== -1) {
        this.activeIndex = '/profile/inventory/inventoryinfo'
      } else {
        this.activeIndex = index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 15px !important;
}
</style>
