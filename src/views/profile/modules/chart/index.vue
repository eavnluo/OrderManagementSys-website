<template>
  <div class="profile-layout">
    <profile-title :title="$route.meta.title" />
    <el-row class="chart-postion"
            type="flex"
            :gutter="30">
      <el-col :span="12">
        <bar-chart :height="'330.5px'" />
      </el-col>
      <el-col :span="12">
        <line-chart />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <inventory-chart :height="'380px'" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import inventoryChart from './modules/inventoryChart'
import lineChart from './modules/lineChart'
import BarChart from './modules/barChart'
export default {
  data () {
    return {}
  },
  components: {
    inventoryChart,
    lineChart,
    BarChart
  }
}
</script>

<style scoped>
.chart-postion {
  margin: 30px 0 20px 0;
}
</style>
