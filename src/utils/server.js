import axios from 'axios';
import config from './config-util.js' // 引入配置文件
const instance = axios.create({
    baseURL: config.baseUrl.dev,
    timeout: 60000
  })
  
  // 请求拦截器
  instance.interceptors.request.use(function (config) {
    console.log('发请求之前', config)
    return config
  }, function (error) {
    console.log('请求错误', error)
    return Promise.reject(error)
  })
  
  // 响应拦截器
  instance.interceptors.response.use(function (response) {
    console.log('得到的响应数据', response)
    return response
  }, function (error) {
    console.log('响应错误', error)
    return Promise.reject(error)
  })
  
  // get请求
  export function get (url, data = {}) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, {
          params: data
        })
        .then((response) => {
          resolve(response)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  
  // post请求
  export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
      instance.post(url, data).then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }