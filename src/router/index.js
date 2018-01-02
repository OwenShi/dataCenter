import Vue from 'vue'
import Router from 'vue-router'
import VehicleInfo from '../components/vehicleInfo.vue'
import VehicleStatistics from '../components/vehicleStatistics.vue'
import OverviewMap from '../components/overviewMap.vue'
import DetailMap from '../components/detailMap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/vehicleInfo',
      name: 'vehicleInfo',
      component: VehicleInfo,
      children: [
        {
          path: '/overviewMap',
          component: OverviewMap
        },
        {
          path: '/detailMap/:level',
          component: DetailMap
        }
      ]
    },
    {
      path: '/vehicleStatistics',
      component: VehicleStatistics
    }
  ]
})
