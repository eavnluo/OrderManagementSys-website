<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import '@/echarts-theme/macarons'
const animationDuration = 3000
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        title: {
          text: '库存信息',
          subtext: '数据来自聚潍通官网'
        },
        legend: {
          top: '3%',
          show: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: [
          {
            show: true
          },
          {
            type: 'inside'
          }
        ],
        grid: {
          top: 65,
          left: '1%',
          right: '0%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // 箭头函数闭包
          data: (() => {
            var list = ['仓库A', '仓库B', '仓库C', '仓库D', '仓库E', '仓库F', '仓库G']
            return list
          })(),
          axisLabel: {
            show: true
          },
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            show: true
          },
          axisTick: {
            show: false
          }
        }],
        series: [
          {
            name: '商用车轮胎',
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70],
            animationDuration
          },
          {
            name: '集成电路',
            type: 'bar',
            data: [10, 20, 30, 40, 50, 60, 70],
            animationDuration
          },
          {
            name: '蛇川百草液',
            type: 'bar',
            data: [20, 30, 40, 50, 60, 70, 80],
            animationDuration
          },
          {
            name: '运动型轿车车胎',
            type: 'bar',
            data: [20, 30, 40, 50, 60, 70, 80],
            animationDuration
          },
          {
            name: '商务型轿车车胎',
            type: 'bar',
            data: [50, 60, 70, 40, 30, 20, 10],
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
