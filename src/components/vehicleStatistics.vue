<template>
<div>
  <mu-flexbox class="flex-row">
    <mu-flexbox-item class="pie-chart-sm">
      <pie-chart
      ref="2"
      id="2"
      height="300px"
      title="乘用车订单比例"
      :data="data2">
      </pie-chart>
    </mu-flexbox-item>
    <mu-flexbox-item grow="2" class="pie-chart-sm">
      <histogram
          ref="5"
          id="5"
          height="300px"
          title="今日订单总额"
          :data="data5">
        </histogram>
    </mu-flexbox-item>
    <mu-flexbox-item class="pie-chart-sm">
      <pie-chart
      ref="3"
      id="3"
      height="300px"
      title="订单金额比例"
      :data="data3">
      </pie-chart>
    </mu-flexbox-item>
  </mu-flexbox>
  <mu-flexbox class="flex-row">
    <mu-flexbox-item class="pie-chart-sm">
        <pie-chart
        ref="4"
        id="4"
        height="300px"
        title="用户成交比例"
        :data="data4">
        </pie-chart>
    </mu-flexbox-item>
    <mu-flexbox-item grow="2.5" class="pie-chart-sm">
      <histogram
          ref="6"
          id="6"
          height="300px"
          title="今日订单总量"
          :data="data6">
        </histogram>
    </mu-flexbox-item>
    <mu-flexbox-item class="pie-chart-sm">
      <pie-chart
      ref="1"
      id="1"
      height="300px"
      title="订单里程分布"
      :data="data1">
      </pie-chart>
    </mu-flexbox-item>
  </mu-flexbox>
</div>
</template>
<style>
.pie-chart-sm {
}
.flex-row {
  margin-top: 30px;
}
</style>
<script>
import http from '../utlis/http'
import api from '../utlis/api'
export default {
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: []
    }
  },
  mounted() {
    let _this = this
    console.log('----', _this.$refs)
    window.onresize = function() {
      // 父组件监听window.onresize之后resize所有子组件
      for (let i in _this.$refs) {
        let resizeChart = _this.$refs[i].resizeChart
        resizeChart && resizeChart()
      }
    }
    getDataAll(_this)
  }
}
// 轮询列表数据
function getDataAll(_this) {
  http(
    'get',
    api.getCatData,
    '',
    function(response) {
      if (response.data.success) {
        if (response.data.data.distanceRate) {
          let distanceRate = response.data.data.distanceRate
          let data1 = []
          for (let i = 0; i < distanceRate.length; i++) {
            data1.push({
              name: distanceRate[i].distance,
              value: distanceRate[i].rate
            })
          }
          _this.data1 = data1
        }
        if (response.data.data.orderCostRate) {
          let orderCostRate = response.data.data.orderCostRate
          let data2 = []
          for (let i = 0; i < orderCostRate.length; i++) {
            data2.push({
              name: orderCostRate[i].name,
              value: orderCostRate[i].rate
            })
          }
          _this.data2 = data2
        }
        if (response.data.data.orderRateByCarType) {
          let orderRateByCarType = response.data.data.orderRateByCarType
          let data3 = []
          for (let i = 0; i < orderRateByCarType.length; i++) {
            data3.push({
              name: orderRateByCarType[i].name,
              value: orderRateByCarType[i].rate
            })
          }
          _this.data3 = data3
        }
        if (response.data.data.orderRateByUser) {
          let orderRateByUser = response.data.data.orderRateByUser
          let data4 = []
          for (let i = 0; i < orderRateByUser.length; i++) {
            data4.push({
              name: orderRateByUser[i].name,
              value: orderRateByUser[i].num
            })
          }
          _this.data4 = data4
        }
        if (response.data.data.orderInfoByDate) {
          let orderInfoByDate = response.data.data.orderInfoByDate
          let data5 = []
          let data6 = []
          orderInfoByDate.forEach((value, index, array) => {
            data5.push(value.y)
            data6.push(value.z)
          })
          for (let i = 0; i < orderInfoByDate.length; i++) {
            data5.push(orderInfoByDate.y)
            data6.push(orderInfoByDate.z)
          }
          _this.data5 = data5
          _this.data6 = data6
        }
      }
      setTimeout(function(_this) {
        getDataAll(_this)
      }, 15000)
    },
    function(e) {
      console.log(e)
      setTimeout(function(_this) {
        getDataAll(_this)
      }, 15000)
    }
  )
}
</script>
