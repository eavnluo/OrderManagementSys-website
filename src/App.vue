<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer id="aboutUs" />
  </div>
</template>

<script>
import Header from '@/components/headerView'
import Footer from '@/components/bottomView'
export default {
  name: 'App',
  data () { },
  components: { Header, Footer }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
