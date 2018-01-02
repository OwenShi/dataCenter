import pieChart from './pieChart.vue'

const Pie = {
  install: (Vue) => {
    Vue.component('pie-chart', pieChart)
  }
}

export default Pie
