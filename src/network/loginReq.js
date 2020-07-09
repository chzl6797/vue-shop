import { request } from './network'
/**
 * 登录请求
 * @param {*} config
 */
export function loginRequest(config) {
  return request({
    url: 'login',
    method: 'post',
    data: config
  })
}
