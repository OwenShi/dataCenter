<template class="chart-box">
  <div @click="open">
    <mu-card>
      <mu-card-media>
        <div :id="id" :style="style"></div>
      </mu-card-media>
      <mu-card-title :title="title" :subTitle="subTitle"/>
    </mu-card>
    <mu-dialog :open="modalState" :title="title" dialogClass="dialogClass" @close="close">
      <div :id="idModal" :style="styleModal"></div>
    </mu-dialog>
  </div>
</template>
<style>
.titleClass {
  font-size: 20px !important;
  line-height: 15px !important;
}
.mu-card-title-container .mu-card-title {
  color: rgba(140, 140, 140, 1);
}
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
  methods: {},
  mounted: function() {
    let _this = this
    let myChart = echarts.init(document.getElementById(_this.id))
    myChart.setOption({
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['45%', '70%'],
          color: [
            'rgba(24, 250, 210, 1)',
            'rgba(178, 254, 241, 0.7)',
            'rgba(200, 200, 200, 0.8)'
          ],
          data: _this.data,
          label: {
            normal: {
              show: true,
              formatter: '{b}\n{d}%'
            }
          }
          // [
          //   {value: 335, name: '直接访问'},
          //   {value: 310, name: '邮件营销'},
          //   {value: 234, name: '联盟广告'},
          //   {value: 135, name: '视频广告'},
          //   {value: 1548, name: '搜索引擎'}
          // ]
        },
        {
          name: 'radial gradient',
          type: 'pie',
          radius: '70%',
          avoidLabelOverlap: false,
          itemStyle: {
            normal: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 255, 255, 0)'
                  },
                  {
                    offset: 0.13,
                    color: 'rgba(255, 255, 255, 0.5)'
                  },
                  {
                    offset: 0.35,
                    color: 'rgba(255, 255, 255, 0.5)'
                  },
                  {
                    offset: 0.95,
                    color: 'rgba(255, 255, 255, 0)'
                  }
                ],
                slient: true,
                z: 999,
                data: [{ value: 1, name: '' }]
              }
            }
          }
        }
      ]
    })
    _this.myChart = myChart
  }
}
</script>
