let api = {}
const DEV_API = {
  getCatData: 'http://182.254.232.74:9010/screen/getCarData',
  nearbyWalker: 'http://182.254.232.74:9010/screen/nearbyWalker',
  getDriverInfo: 'http://182.254.232.74:9010/screen/driverInfo'
}
const REAL_API = {
  getCatData: 'https://api3.bmkp.cn/backend/v4.4/screen/getCarData',
  nearbyWalker: 'https://api3.bmkp.cn/backend/v4.4/screen/nearbyWalker',
  getDriverInfo: 'https://api3.bmkp.cn/backend/v4.4/screen/driverInfo'
}
function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}
console.log('xxxxxx',getQueryString('dt'))
if (getQueryString('dt') === 'debug') {
  api = DEV_API
} else {
  api = REAL_API
}
console.log('-----',api)
export default api
