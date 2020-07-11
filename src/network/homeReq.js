import { request } from './network'

/* 获取侧边栏功能数剧 */
export function menusRequest() {
  return request({
    url: 'menus'
  })
}
/* 获取用户信息列表 */
export function getUserList(config) {
  return request({
    url: 'users',
    params: config
  })
}

/* 根据id改变用户状态 */
export function setUserState(config) {
  return request({
    url: 'users/' + config.id + '/state/' + config.type,
    method: 'put'
  })
}

/* 添加用户 */
export function addUser(config) {
  return request({
    url: 'users',
    method: 'post',
    data: config
  })
}

/* 根据id查询用户信息 */
export function findUserById(id) {
  return request({
    url: `users/${id}`
  })
}

/*  编辑用户用户信息 */
export function editUserInfo(id, config) {
  return request({
    url: `users/${id}`,
    method: 'put',
    data: config
  })
}

/* 根据Id删除用户 */
export function deleteUserInfo(id) {
  return request({
    url: `users/${id}`,
    method: 'delete'
  })
}
