<template>
  <div :class="className"
       :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import '@/echarts-theme/macarons' // echarts theme
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
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      chart: null,
      rListData: [],
      iListData: []
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
      /* this.$http.profile_chart.getStatisticsOrderNum().then(res => {
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
        xAxis: {
          data: (() => {
            const list = []
            for (let i = 1; i <= 12; i++) {
              list.push(`${i}月`)
            }
            return list
          })(),
          axisLine: {
            lineStyle: {
              color: '#acacac'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#acacac'
            }
          },
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#acacac'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#acacac'
            }
          },
          axisTick: {
            show: false
          }
        },
        legend: {
          show: true
        },
        series: [{
          name: '销售订单',
          itemStyle: {
            normal: {
              color: '#5ab1ef',
              lineStyle: {
                color: '#5ab1ef',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: [79, 23, 150, 256, 390, 380, 160, 100, 150, 200, 300, 270],
          /* data: this.rListData, */
          animationDuration: 3000,
          animationEasing: 'cubicInOut'
        },
        {
          name: '采购订单',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#13c2c2',
              lineStyle: {
                color: '#13c2c2',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: [80, 52, 200, 334, 390, 330, 220, 150, 120, 180, 300, 290],
          /*  data: this.iListData, */
          animationDuration: 3000,
          animationEasing: 'quadraticOut'
        }]
      })
    }
    /*   })
    } */
  }
}
</script>
