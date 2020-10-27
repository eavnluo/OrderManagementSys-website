<template>
  <div class="profile-layout">
    <profile-title :title="title" />
    <div style="min-height: 400px;"
         v-html="guideList.content"
         v-loading="loading" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      guideList: [],
      loading: false
    }
  },
  computed: {
    title: {
      get () {
        return this.$route.params.title
      },
      set () { }
    },
    type () {
      return this.$route.params.type
    }
  },
  created () {
    this.getGuideList()
  },
  methods: {
    getGuideList () {
      this.loading = true
      this.$http.profile_approache.findGuideList({
        type: this.type
      }).then(res => {
        if (res.data.code === 0 && res.data.list.length > 0) {
          const [first] = res.data.list // 解构赋值
          this.guideList = first
        } else {
          this.$router.push({ name: 'NoData' })
        }
      }).finally(() => {
        this.loading = false
      })
    }
  },
  watch: {
    $route () {
      this.getGuideList()
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.title = this.$route.params.title
    next()
  }
}
</script>
<style lang="scss" scoped>
</style>
