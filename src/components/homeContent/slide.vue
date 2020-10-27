<template>
  <div class="slickSlide">
    <el-carousel :height="bannerHeight + 'px'">
      <el-carousel-item v-for="item in slideList"
                        :key="item.id">
        <div class="img-wrapper">
          <img ref="imgHeight"
               class="slickSlide-img"
               :src="`${imgUrl}/${item.fileName}`"
               @load="imgLoad()" />
        </div>
      </el-carousel-item>
    </el-carousel>
    <login class="loginView"
           v-show="isLogin" />
  </div>
</template>

<script>
import login from '@/views/common/login'
import { base } from '@/api/base'
export default {
  data () {
    return {
      slideList: [],
      bannerHeight: '',
      imgUrl: '',
      isLogin: false
    }
  },
  components: {
    login
  },
  watch: {
    $route () {
      this.isLogin = !this.$cookie.get('user_token')
    }
  },
  created () {
    this.isLogin = !this.$cookie.get('user_token')
    this.getIndexImage()
  },
  mounted () {
    this.imgLoad()
  },
  updated () {
    window.addEventListener('resize', () => {
      this.imgLoad()
    }, true)
  },
  beforeDestroy () {
    window.removeEventListener('resize', () => {
      this.imgLoad()
    }, true)
  },
  methods: {
    getIndexImage () {
      this.imgUrl = base.imgUrl
      this.$http.website.findIndexImage({
        belongTo: 'WEBSITE_INDEX_IMAGE'
      }).then(res => {
        if (res.data.code === 0) {
          this.slideList = res.data.list
        }
      })
    },
    imgLoad () {
      let imgHeight = this.$refs.imgHeight
      if (imgHeight) {
        if (imgHeight.length !== 0) {
          this.bannerHeight = imgHeight[0].height
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slickSlide {
  position: relative;
  z-index: 0;

  .img-wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-top: 50.52%;

    .slickSlide-img {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
}

.loginView {
  position: absolute;
  top: 27%;
  right: calc(50% - 564px);
  z-index: 500;
}
</style>
