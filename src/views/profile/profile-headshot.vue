<template>
  <div class="profile_headshot div-shadow">
    <div class="profile_show">
      <img src="../../assets/profile/headshot.png">
      <ul class="profile_info">
        <li class="profile_info_name">
          {{ userName }}
        </li>
        <li class="profile_info_enName">{{ userInfo.phoneNumber }}</li>
        <li class="profile_id">
          <span v-if="userAuth === '0'">
            <icon-svg class="auth-icon"
                      name="weirenzheng" />
          </span>
          <span v-else>
            <icon-svg class="auth-icon"
                      name="yirenzheng" /></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userAuth: '',
      userName: ''
    }
  },
  created () {
    this.userName = this.$cookie.get('user_name')
    this.userAuth = this.$cookie.get('user_auth')
  },
  computed: {
    userInfo () {
      return JSON.parse(this.$cookie.get('user_profile'))
    }
  },
  watch: {
    $route () {
      this.userName = this.$cookie.get('user_name')
      this.userAuth = this.$cookie.get('user_auth')
    }
  }
}
</script>

<style lang="scss" scoped>
$opacity: 0.8;
.profile_headshot {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 25px 0 10px 0;
  margin: 0 0 20px 0;
  background-color: #fff;

  .profile_show {
    text-align: center;
    img {
      width: 120px;
      object-fit: cover;
    }

    .profile_info {
      margin-top: 10px;
      line-height: 2;

      .profile_info_name {
        position: relative;
        font-size: 20px;
        font-weight: 600;
        opacity: $opacity;
      }

      .profile_info_enName {
        font-size: 18px;
        font-weight: 600;
        opacity: $opacity;
      }

      .profile_id {
        padding: 5px 0 0 0;
        .auth-icon {
          font-size: 3.6em;
          height: 35px;
        }
      }
    }
  }
}
</style>
