<template>
  <div class="news">
    <el-row :gutter="10"
            type="flex"
            justify="space-between">
      <el-col :span="6">
        <div class="newsList">
          <h2 v-if="newsCategory === 0">{{ $t('enterpriseNew.headTitle') }}</h2>
          <h2 v-else-if="newsCategory === 1">{{ $t('industryNew.headTitle') }}</h2>
          <ul v-loading="loading">
            <li v-for="item in newsTitle"
                :class="{ hanleNewsActive: item.id === newsID }"
                @click="handleContent(item.newsTitle, item.newsContent, item.id)"
                :key="item.id">{{ item.newsTitle }}</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="17"
              class="newsContent">
        <news-detail :title="headline"
                     :desc="newsInfo" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NewsDetail from '@/views/news/newsDetail'
export default {
  data () {
    return {
      newsTitle: [],
      newsID: '',
      headline: '',
      newsInfo: '',
      loading: false
    }
  },
  components: {
    NewsDetail
  },
  computed: {
    newsCategory () {
      return this.$route.params.newsCategory
    }
  },
  created () {
    this.getNewsList()
  },
  methods: {
    getNewsList () {
      this.loading = true
      this.$http.website.findWebSiteNews({
        page: 1,
        limit: 10,
        newsCategory: this.$route.params.newsCategory
      }).then(res => {
        if (res.data.code === 0) {
          const records = res.data.page.records
          this.newsTitle = records
          this.newsID = records[0].id
          this.headline = records[0].newsTitle
          this.newsInfo = records[0].newsContent
        }
      })
        .finally(() => {
          this.loading = false
        })
    },
    handleContent (headline, content, id) {
      this.newsID = id
      this.headline = headline
      this.newsInfo = content
    }
  }
}
</script>

<style lang="scss" scoped>
$color-green: #13c2c2;
.news {
  width: 1200px;
  margin: 0 auto;
  padding: 100px 0 50px 0;

  .newsList {
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    padding: 20px;

    h2 {
      color: #3c4858;
      font-weight: 400;
      margin: 10px 0 25px 0;
    }

    .active {
      color: $color-green;
    }

    ul {
      min-height: 250px;
      font-size: 14px;
      color: #555;
      li {
        line-height: 1.4rem;
        padding: 0 0 10px 0;
        cursor: pointer;
      }
    }
  }
}
</style>
