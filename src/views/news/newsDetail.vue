<template>
  <div class="newsInfo">
    <h3 class="news-title">{{ title }}</h3>
    <div class="news-desc"
         v-html="desc"></div>
  </div>
</template>

<script>
export default {
  props: {
    'title': {
      type: String
    },
    'desc': {
      type: String
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.newsInfo {
  min-height: 800px;
  padding: 30px;
  background: #fff;
  text-align: center;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  .news-title {
    font-size: 25px;
    color: #555;
    margin: 0 0 30px 0;
  }

  .news-desc >>> p {
    text-align: left;
    font-size: 15px;
    line-height: 2rem;
  }
}
</style>
