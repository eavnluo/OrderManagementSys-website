<template>
  <div class="partners">
    <p class="title-fontSize title-position">{{ $t('partner.headTitle') }}</p>
    <div class="partners-list">
      <ul>
        <li v-for="item in partnerList "
            :key="item.id">
          <a :href="item.linkAddress"
             target="_blank">
            <img :src="`${imgUrl}/${item.fileName}`" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { base } from '@/api/base'
export default {
  name: 'serviceEnterPrises',
  data () {
    return {
      partnerList: [],
      imgUrl: ''
    }
  },
  created () {
    this.getIndexImage()
  },
  methods: {
    getIndexImage () {
      this.$http.website.findIndexImage({
        belongTo: 'WEBSITE_PARTNRES_IMAGE'
      }).then(res => {
        if (res.data.code === 0) {
          this.imgUrl = base.imgUrl
          this.partnerList = res.data.list
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.partners {
  width: 1200px;
  margin: 0 auto;
  padding: 50px 0 50px 0;

  .partners-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      min-height: 150px;
      margin-top: 45px;

      li {
        margin: 0 20px 20px 0;
      }

      img {
        width: 180px;
        height: 75px;
        object-fit: cover;
      }
    }
  }
}
</style>
