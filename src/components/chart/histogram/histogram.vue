<template>
  <div @click="open">
    <mu-card>
      <mu-card-media>
        <div :id="id" :style="style"></div>
      </mu-card-media>
      <mu-card-title :title="title" :subTitle="subTitle"/>
    </mu-card>
    <mu-dialog :open="modalState" :title="title" @close="close">
      <div :id="idModal" :style="styleModal"></div>
    </mu-dialog>
  </div>
</template>
<style>

</style>
<script>
import echarts from 'echarts'
import mixin from '../../../mixin/index'

export default {
  data() {
    return {
      myChart: null,
      modalState: false
    }
  },
  mixins: [mixin],
  mounted: function() {
    let _this = this
    let myChart = echarts.init(document.getElementById(_this.id))
    myChart.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
            '24:00'
          ],
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(24, 250, 210, 0.8)'
            }
          }
        }
      ],
      yAxis: [
        {
          axisTick: {
            alignWithLabel: true
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(24, 250, 210, 0.8)'
            }
          }
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: '85%',
          data: _this.data
        }
      ],
      label: {
        normal: {
          show: true,
          position: 'top',
          formatter: '{c}'
        }
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(24, 250, 210, 1)'
            },
            {
              offset: 1,
              color: 'rgba(24, 250, 210, 0.1)'
            }
          ]),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      }
    })
    _this.myChart = myChart
  },
  methods: {}
}
</script>
