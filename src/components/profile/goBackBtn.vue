<template>
  <div class="goBack-div"
       @click="goBack">
    <el-tooltip content="返回上一级"
                effect="light"
                placement="top">
      <icon-svg name="return"
                class="goBack" />
    </el-tooltip>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.goBack-div {
  width: 50px;
  .goBack {
    margin-top: 40px;
    width: 1.9em;
    height: 1.9em;
    cursor: pointer;
  }
}
</style>
