<template>
  <div id="app">
    <s-menu></s-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function() {
    let _this = this
    _this.$router.push('/vehicleInfo')
  }
}
</script>
<style>
body {
  background-color: rgba(22, 24, 23, 0.9);
}
.mu-card {
  background-color: rgba(0, 0, 0, 0.3);
}
.mu-dialog {
  background-color: rgba(22, 24, 23, 0.9);
}
.mu-tabs {
  background-color: rgba(22, 24, 23, 0.7);
}
.mu-tab-link-highlight {
  background-color: rgba(24, 250, 210, 1);
}
</style>
