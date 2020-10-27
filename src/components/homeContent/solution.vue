<template>
  <div class="solution-bg">
    <div class="solution">
      <p class="title-fontSize title-position">{{ $t('solution.headTitle') }}</p>
      <ul>
        <li v-for="item in solutionList"
            :key="item.id">
          <img :src="`${imgUrl}/${item.newsImage}`" />
          <p>{{ item.newsTitle }}</p>
          <span v-html="item.newsContent"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { base } from '@/api/base'
export default {
  data () {
    return {
      solutionList: [],
      imgUrl: ''
    }
  },
  created () {
    this.imgUrl = base.imgUrl
    this.getSolutionList()
  },
  methods: {
    // 解决方案列表
    getSolutionList () {
      this.$http.website.findWebSiteNews({
        page: 1,
        limit: 10,
        newsCategory: 2
      }).then(res => {
        if (res.data.code === 0) {
          this.solutionList = res.data.page.records
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$opacity: 0.7;
.solution-bg {
  background-color: #e5e5e5;
}
.solution {
  width: 1200px;
  margin: 0 auto;
  padding: 30px 0 90px 0;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;

    li {
      width: 225px;
      height: 400px;
      background-color: #fff;

      img {
        width: 225px;
        height: 162px;
        object-fit: cover;
      }

      p {
        margin: 20px 0;
        text-align: center;
        font-size: 14px;
        opacity: $opacity;
      }

      span {
        display: inline-block;
        font-size: 12px;
        opacity: $opacity;
        margin: 0 10px;
        line-height: 1.6em;
      }
    }
  }
}
</style>
