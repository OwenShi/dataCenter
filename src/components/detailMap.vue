<template>
<div>
    <mu-paper class="searchBox" v-bind:class="{transBox: istrans}">
      <mu-select-field v-model="carType" :labelFocusClass="['label-foucs']" label="车辆类型">
        <mu-menu-item v-for="(item,index) in carTypeList" :key="index" :value="item.value" :title="item.title" />
      </mu-select-field>
      <mu-select-field v-model="driverType" :labelFocusClass="['label-foucs']" label="司机类型">
        <mu-menu-item v-for="(item,index) in driverTypeList" :key="index" :value="item.value" :title="item.title" />
      </mu-select-field>
      <mu-select-field v-model="city" :labelFocusClass="['label-foucs']" label="城市">
        <mu-menu-item value="武汉市" title="武汉市"/>
        <mu-menu-item value="深圳市" title="深圳市"/>
        <mu-menu-item value="南京市" title="南京市"/>
        <mu-menu-item value="杭州市" title="杭州市"/>
        <mu-menu-item value="天津市" title="天津市"/>
        <mu-menu-item value="贵阳市" title="贵阳市"/>
        <mu-menu-item value="成都市" title="成都市"/>
        <mu-menu-item value="重庆市" title="重庆市"/>
        <mu-menu-item value="长沙市" title="长沙市"/>
        <mu-menu-item value="厦门市" title="厦门市"/>
        <mu-menu-item value="廊坊市" title="廊坊市"/>
        <mu-menu-item value="商丘市" title="商丘市"/>
        <mu-menu-item value="" title="全部"/>
      </mu-select-field>
    </mu-paper>
    <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="close()">
      <mu-list>
        <mu-list-item title="车辆">
          {{driverInfo.plateNum}}
        </mu-list-item>
        <mu-list-item title="司机">
          {{driverInfo.driverName}}
        </mu-list-item>
        <mu-list-item title="电话">
          {{driverInfo.phone}}
        </mu-list-item>
        <mu-list-item title="订单">
          {{driverInfo.orderId}}
        </mu-list-item>
          <mu-list-item title="起点">
          {{driverInfo.startAddress}}
        </mu-list-item>
          <mu-list-item title="终点">
          {{driverInfo.destAddress}}
        </mu-list-item>
      </mu-list>
    </mu-popup>
    <div id="searchButton" @click="switchBox">{{searchTitle}}</div>
    <div id='detailMapContaint'></div>
  </div>
</template>
<style>
#detailMapContaint {
  position: absolute;
  width: 100%;
  height: calc(100% - 48px);
}
.searchBox {
  position: fixed;
  top: -100px;
  right: 90px;
  z-index: 998;
}
#searchButton {
  position: fixed;
  width: 75px;
  height: 30px;
  padding: 0 3px;
  z-index: 997;
  top: 80px;
  right: 5px;
  background-color: rgba(100, 100, 100, 0.7);
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
.demo-popup-left {
  display: flex;
  width: 80%;
  max-width: 325px;
  height: 100%;
  align-items: center;
  padding: 20px;
}
.mu-popup {
  background-color: rgba(100, 100, 100, 0.7);
}
.mu-item {
  color: #ffffff;
}
.mu-text-field.has-label .mu-text-field-label {
  left: 12px;
}
.mu-dropDown-menu-text-overflow {
  text-align: center;
}
.mu-text-field.focus-state {
  color: rgba(24, 250, 210, 1);
}
.mu-text-field-focus-line {
  background-color: rgba(24, 250, 210, 1);
}
.mu-menu-item-wrapper.active {
  color: rgba(24, 250, 210, 0.7);
}
.mu-popover {
  background-color: rgba(100, 100, 100, 0.7);
}
.mu-menu-item-wrapper {
  color: #ffffff;
}
.transBox {
  animation: searchBoxTrans 0.5s;
  animation-fill-mode: forwards;
}
@keyframes searchBoxTrans {
  from {
    top: -100px;
  }
  to {
    top: 60px;
  }
}
</style>
<script>
import api from '../utlis/api'
import http from '../utlis/http'
export default {
  data() {
    return {
      leftPopup: false,
      myMap: null,
      carType: '',
      driverType: '',
      city: '',
      searchTitle: 'SEARCH',
      ishidden: false,
      istrans: false,
      driverInfo: {
        city: '',
        destAddress: '',
        driverName: '',
        orderId: '',
        phone: '',
        plateNum: '',
        runId: '',
        startAddress: '',
        type: ''
      },
      driverList: [],
      carTypeList: [
        {
          title: '网约车',
          value: '2'
        },
        {
          title: '网摇车',
          value: '1'
        },
        {
          title: '全部',
          value: ''
        }
      ],
      driverTypeList: [
        {
          title: '斑马自营',
          value: '1'
        },
        {
          title: '加盟司机',
          value: '2'
        },
        {
          title: '全部',
          value: ''
        }
      ]
    }
  },
  mounted: function() {
    let _this = this
    let myMap = new BMap.Map('detailMapContaint')
    let centerPoint = new BMap.Point(114.3896, 30.6628)
    myMap.centerAndZoom(centerPoint, 11)
    myMap.enableScrollWheelZoom()
    let styleJson = [
      {
        featureType: 'water',
        elementType: 'all',
        stylers: {
          color: '#031628'
        }
      },
      {
        featureType: 'land',
        elementType: 'geometry',
        stylers: {
          color: '#000102'
        }
      },
      {
        featureType: 'highway',
        elementType: 'all',
        stylers: {
          visibility: 'off'
        }
      },
      {
        featureType: 'arterial',
        elementType: 'geometry.fill',
        stylers: {
          color: '#000000'
        }
      },
      {
        featureType: 'arterial',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#0b3d51'
        }
      },
      {
        featureType: 'local',
        elementType: 'geometry',
        stylers: {
          color: '#000000'
        }
      },
      {
        featureType: 'railway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#000000'
        }
      },
      {
        featureType: 'railway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#08304b'
        }
      },
      {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
          lightness: -70
        }
      },
      {
        featureType: 'building',
        elementType: 'geometry.fill',
        stylers: {
          color: '#000000'
        }
      },
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#857f7f'
        }
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#000000'
        }
      },
      {
        featureType: 'building',
        elementType: 'geometry',
        stylers: {
          color: '#022338'
        }
      },
      {
        featureType: 'green',
        elementType: 'geometry',
        stylers: {
          color: '#062032'
        }
      },
      {
        featureType: 'boundary',
        elementType: 'all',
        stylers: {
          color: '#465b6c'
        }
      },
      {
        featureType: 'manmade',
        elementType: 'all',
        stylers: {
          color: '#022338'
        }
      },
      {
        featureType: 'label',
        elementType: 'all',
        stylers: {
          visibility: 'off'
        }
      }
    ]
    myMap.setMapStyle({ styleJson: styleJson })
    _this.myMap = myMap
    getCarData(_this)
  },
  methods: {
    drawCar: function(driverList) {
      let _this = this
      let map = _this.myMap
      let currentOverlay = map.getOverlays()
      map.removeOverlay(currentOverlay)
      for (let i = 0; i < driverList.length; i++) {
        let myOverlay = new CreatOverlay(
          new BMap.Point(driverList[i].longtitude, driverList[i].latitude),
          driverList[i].phone,
          _this
        )
        map.addOverlay(myOverlay)
      }
      _this.myMap = map
    },
    switchBox: function() {
      let _this = this
      _this.istrans = !_this.istrans
    },
    openDriverInfo: function(id) {
      let _this = this
      console.log(id)
      let param = {
        phone: id
      }
      http(
        'post',
        api.getDriverInfo,
        param,
        function(response) {
          if (response.data.data) {
            _this.driverInfo = response.data.data
          }
        },
        function(e) {
          alert(e)
        }
      )
      _this.leftPopup = true
    },
    close: function() {
      let _this = this
      _this.leftPopup = false
    }
  },
  watch: {
    '$route.params.level': function(val) {
      console.log(val)
      let _this = this
      switch (parseInt(val)) {
        case 1:
          _this.myMap.setZoom(11)
          break
        case 2:
          _this.myMap.setZoom(13)
          break
        case 3:
          _this.myMap.setZoom(16)
      }
    }
  }
}
// 自定义覆盖物
function CreatOverlay(point, id, vue) {
  this._point = point
  // this._shape = shape
  this._id = id
  this._vue = vue
}
CreatOverlay.prototype = new BMap.Overlay()
CreatOverlay.prototype.initialize = function(map) {
  let _this = this
  this._map = map
  let div = (this._div = document.createElement('div'))
  div.style.position = 'absolute'
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)
  div.style.backgroundColor = 'rgba(24, 250, 210, 1)'
  div.style.height = '10px'
  div.style.width = '10px'
  div.onclick = function() {
    _this._vue.openDriverInfo(_this._id)
  }
  map.getPanes().labelPane.appendChild(div)
  return div
}
CreatOverlay.prototype.draw = function() {
  let map = this._map
  let pixel = map.pointToOverlayPixel(this._point)
  this._div.style.left = pixel.x + 'px'
  this._div.style.top = pixel.y + 'px'
}
// 轮询车辆数据
function getCarData(_this) {
  let param = {
    businessType: _this.carType,
    driverType: _this.driverType,
    city: _this.city,
    type: 1,
    latitude: 30.506367,
    longtitude: 114.401375
  }
  console.log('+++++++', api.nearbyWalker)
  http(
    'post',
    api.nearbyWalker,
    param,
    function(response) {
      let driverList = response.data.data.drivers
      console.log(driverList)
      _this.drawCar(driverList)
      setTimeout(function() {
        getCarData(_this)
      }, 30000)
    },
    function(e) {
      console.log(e)
      setTimeout(function() {
        getCarData(_this)
      }, 30000)
    }
  )
}
</script>
