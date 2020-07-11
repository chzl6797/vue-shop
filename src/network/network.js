import Axios from 'axios'
/**
 * 封装网络请求
 * @param {*} config
 */
export function request(config) {
  const axiosInstance = Axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })

  axiosInstance.interceptors.request.use(req => {
    req.headers.Authorization = window.sessionStorage.getItem('token')
    return req
  })

  axiosInstance.interceptors.response.use(res => {
    return res
  })

  return axiosInstance(config)
}
