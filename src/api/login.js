import request from '@/utils/request'

export function login(NickName, Password) {
  return request({
    url: '/admin/Login',
    method: 'post',
    data: {
      NickName,
      Password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/GetAdminModel',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/Logout',
    method: 'post'
  })
}
