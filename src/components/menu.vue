<template>
  <div class="header">
    <div class="logo">
        <img src="../assets/logo.png" alt="" style=" width: 120px; height: 48px;">
    </div>
    <div class="nav">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value='vehicleInfo' title="实时车辆"></mu-tab>
        <mu-tab value="vehicleStatistics" title="数据统计"></mu-tab>
      </mu-tabs>
    </div>
  </div>
</template>
<style>
.nav {
  width: calc(70% - 400px);
  margin: 0 auto;
}
.header {
  background-color: rgba(22, 24, 23, 0.7);
}
.logo{
  position: absolute;
  top: 0;
  left: 50px;
}
</style>
<script>
export default {
  data() {
    return {
      activeTab: 'vehicleInfo'
    }
  },
  methods: {
    handleTabChange(val) {
      let _this = this
      _this.activeTab = val
      _this.$router.push('/' + val)
    }
  }
}
</script>
