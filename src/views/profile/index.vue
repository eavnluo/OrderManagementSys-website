<template>
  <div class="profile-bg">
    <div class="profile">
      <el-row :gutter="40"
              type="flex">
        <el-col :span="4"
                style="padding-left:0">
          <personal-headshot />
          <profile-navmenu />
        </el-col>
        <el-col :span="20"
                class="profile-desc div-shadow">
          <transition name="fade-transform"
                      mode="out-in">
            <router-view :key="key" />
          </transition>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PersonalHeadshot from '@/views/profile/profile-headshot'
import ProfileNavmenu from '@/views/profile/profile-navmenu'
export default {
  components: {
    PersonalHeadshot,
    ProfileNavmenu
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  },
  created () {
    this.getDictList()
  },
  methods: {
    // 存储字典查询数据
    getDictList () {
      this.$http.dict.findDicList().then(res => {
        if (res.data.code === 0 && !sessionStorage.getItem('dictList')) {
          sessionStorage.setItem('dictList', JSON.stringify(res.data.list))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-bg {
  padding: 95px 0 25px 0;
  background-color: #fafafa;

  .profile {
    width: 1270px;
    margin: 0 auto;
  }

  .profile-desc {
    background-color: #fff;
    padding-bottom: 40px;
  }
}
</style>
