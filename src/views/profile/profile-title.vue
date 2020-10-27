<template>
  <div class="profile-title"
       v-show="title">
    <div class="line" />
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.profile-title {
  position: relative;
  padding-left: 20px;
  margin: 40px 0 0 0;

  .line {
    position: absolute;
    top: 3px;
    height: 27px;
    left: 0;
    border: 3.5px solid #13abab;
  }

  h2 {
    opacity: 0.8;
    margin: 0;
  }
}
</style>
