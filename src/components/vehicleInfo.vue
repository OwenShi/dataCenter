<template>
  <div>
  <mu-paper class="tooltips">
      <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="level1" title="Level I"/>
      <mu-bottom-nav-item value="level2" title="Level II"/>
      <mu-bottom-nav-item value="level3" title="Level III" />
      <mu-bottom-nav-item value="level4" title="Level IV" />
      </mu-bottom-nav>
  </mu-paper>
  <router-view/>
  </div>
</template>
<style>
.tooltips {
  max-width: 375px;
  position: fixed;
  top: 60px;
  left: 20px;
  z-index: 999;
}
.mu-bottom-nav {
  height: 32px;
  background-color: rgba(25, 251, 213, 0.7);
}
.mu-paper {
  background-color: transparent;
}
.mu-buttom-item {
  color: rgba(0, 0, 0, 0.9);
}
.mu-bottom-item-active {
  font-weight: 800;
}
.mu-text-field.has-label {
  background-color: rgba(50, 50, 50, 0.8);
}
.mu-dropDown-menu-text {
  color: rgba(200, 200, 200, 0.9);
}
</style>
<script>
export default {
  data() {
    return {
      bottomNav: 'level1'
    }
  },
  mounted: function() {
    let _this = this
    _this.$router.push('/overviewMap')
  },
  methods: {
    handleChange(val) {
      let _this = this
      _this.bottomNav = val
      switch (val) {
        case 'level1':
          _this.$router.push('/overviewMap')
          break
        case 'level2':
          _this.$router.push('/detailMap/1')
          break
        case 'level3':
          _this.$router.push('/detailMap/2')
          break
        case 'level4':
          _this.$router.push('/detailMap/3')
          break
      }
    }
  }
}
</script>
