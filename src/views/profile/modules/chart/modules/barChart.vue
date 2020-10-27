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
      chart: null,
      rList: [],
      iList: [],
      rListData: [],
      iListData: []
    }
  },
  created () {
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
      /*  this.$http.profile_chart.getStatisticsOrderNum().then(res => {
         if (res.data.code === 0) {
           this.rList = res.data.data.inOrder
           this.iList = res.data.data.outOrder
           this.rList.forEach(item => {
             this.rListData.push(item.total)
           })
           this.iList.forEach(item => {
             this.iListData.push(item.total)
           }) */
      this.chart.setOption({
        legend: {
          show: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 30,
          left: '1%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // 箭头函数闭包
            data: (() => {
              var list = []
              for (let i = 1; i <= 12; i++) {
                list.push(`${i}月`)
              }
              return list
            })(),
            /* data: (() => {
              var list = ['3月', '4月']
              return list
            })(), */
            axisLabel: {
              show: true
            },
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              show: true
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '销售订单',
            type: 'bar',
            stack: 'vistors',
            barWidth: '50%',
            data: [79, 23, 150, 256, 390, 380, 160, 100, 150, 200, 300, 270],
            //  data: this.rListData,
            animationDuration
          },
          {
            name: '采购订单',
            type: 'bar',
            stack: 'vistors',
            barWidth: '50%',
            data: [80, 52, 200, 334, 390, 330, 220, 150, 120, 180, 300, 290],
            // data: this.iListData,
            animationDuration
          }
        ]
      })
      /*     }
        }) */
    }
  }
}
</script>
