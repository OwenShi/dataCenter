// 设置接收参数 样式设置 resize方法
import echarts from 'echarts'
let mixin = {
  props: {
    id: String,
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100'
    },
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    data: {
      type: Array
    }
  },
  methods: {
    resizeChart: function() {
      let _this = this
      _this.myChart.resize()
    },
    open() {
      let _this = this
      _this.modalState = true
      _this.$nextTick(function() {
        let chartModal = echarts.init(
          document.getElementById(_this.id + 'Modal')
        )
        let option = _this.myChart.getOption()
        chartModal.setOption(option)
      })
    },
    close() {
      let _this = this
      _this.modalState = false
    }
  },
  watch: {
    data: function(val) {
      let _this = this
      if (_this.myChart !== null) {
        let myChart = _this.myChart
        let option = myChart.getOption()
        console.log(_this.id + '---' + val)
        option.series[0].data = val
        myChart.setOption(option)
        _this.myChart = myChart
      }
    }
  },
  computed: {
    style() {
      let _this = this
      return {
        height: _this.height,
        width: _this.width.toString() + '%'
      }
    },
    idModal() {
      let _this = this
      return _this.id + 'Modal'
    },
    styleModal() {
      return {
        height: '800px',
        width: '100%'
      }
    }
  }
}

export default mixin
