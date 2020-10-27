<template>
  <div class="companyNews">
    <el-row type="flex">
      <el-col :span="12">
        <img src="../../assets/companyNews/qy1.png" />
      </el-col>
      <el-col :span="12"
              class="enterpriseNews">
        <img src="../../assets/companyNews/qy2.jpg" />
        <div class="enterpriseNewsList">
          <p class="title-fontSize">{{ $t('enterpriseNew.headTitle') }}</p>
          <ul>
            <li v-for="item in enterpriseNewsList"
                :key="item.id"
                @click="handleNews(0)">{{ item.newsTitle }}</li>
          </ul>
          <p @click="handleNews(0)">{{ $t('enterpriseNew.tip') }}></p>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="12"
              class="industryNews">
        <img src="../../assets/companyNews/qy2.jpg" />
        <div class="industryNewsList">
          <p class="title-fontSize">{{ $t('industryNew.headTitle') }}</p>
          <ul>
            <li v-for="item in industryNewsList"
                :key="item.id"
                @click="handleNews(1)">{{ item.newsTitle }}</li>
          </ul>
          <p @click="handleNews(1)">{{ $t('industryNew.tip') }}></p>
        </div>
      </el-col>
      <el-col :span="12">
        <img src="../../assets/companyNews/qy3.jpg" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      enterpriseNewsList: [],
      industryNewsList: []
    }
  },
  created () {
    this.getEnterpriseNews()
    this.getIndustryNews()
  },
  methods: {
    // 公司动态
    getEnterpriseNews () {
      this.$http.website.findWebSiteNews({
        newsCategory: 0,
        limit: 5
      }).then(res => {
        if (res.data.code === 0) {
          this.enterpriseNewsList = res.data.page.records
        }
      })
    },
    // 行业动态
    getIndustryNews () {
      this.$http.website.findWebSiteNews({
        newsCategory: 1,
        limit: 5
      }).then(res => {
        if (res.data.code === 0) {
          this.industryNewsList = res.data.page.records
        }
      })
    },
    handleNews (newsCategory) {
      this.$router.push({ name: 'News', params: { newsCategory: newsCategory } })
    }
  }
}
</script>

<style lang="scss" scoped>
$color-green: #13c2c2;
.companyNews {
  .industryNews,
  .enterpriseNews {
    position: relative;
  }

  .title-fontSize {
    padding: 45px 0 35px 0;
    color: #fff;
    @media screen and (max-width: 1600px) {
      padding: 25px 0;
    }
    @media screen and (max-width: 1365px) {
      padding: 15px 0;
    }
  }

  .industryNewsList,
  .enterpriseNewsList {
    position: absolute;
    top: 0;
    padding: 0 20px 0 30px;

    p:nth-of-type(2) {
      line-height: 3em;
      color: $color-green;
      cursor: pointer;
      &:hover {
        color: #13abab;
      }
    }

    ul {
      li {
        color: #fff;
        font-size: 1.03em;
        line-height: 3em;
        cursor: pointer;

        &:hover {
          color: $color-green;
        }
        @media screen and (max-width: 1600px) {
          line-height: 2.7em;
        }
        @media screen and (max-width: 1365px) {
          line-height: 2.2em;
        }
      }
    }
  }

  img {
    max-width: 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    vertical-align: middle;
  }
}
</style>
