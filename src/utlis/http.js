'use strict'
import axios from 'axios'

axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error)
  }
)
const http = function(method, url, param, sfn, efn) {
  axios({
    method: method,
    url,
    params: method === 'get' ? JSON.stringify(param) : '',
    data: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    sfn && sfn(response)
  })
}

export default http
