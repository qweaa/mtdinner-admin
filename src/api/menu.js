import request from '@/utils/request'

export function GetMenuList({Store_ID, Current_Page, Current_Size, Status, IsComment}) {
  return request({
    url: '/menu/GetMenuList',
    method: 'get',
    params: {Store_ID, Current_Page, Current_Size, Status, IsComment}
  })
}

export function GetMenuModel(Menu_ID) {
  return request({
    url: '/menu/GetMenuModel',
    method: 'get',
    params: {Menu_ID}
  })
}

//修改菜单状态
export function UpdateMenuStatus({Menu_ID, Status}) {
  return request({
    url: '/menu/UpdateStatus',
    method: 'post',
    data: { Menu_ID, Status }
  })
}

//添加菜单
export function AddMenu({MenuName, Status, IsComment, Year, Month, Week, Day, Price, Store_ID}) {
  return request({
    url: '/menu/AddMenu',
    method: 'post',
    data: {MenuName, Status, IsComment, Year, Month, Week, Day, Price, Store_ID}
  })
}

//修改菜单
export function UpdateMenu({MenuName, IsComment, Month, Week, Day, Price, Menu_ID}) {
  return request({
    url: '/menu/UpdateMenu',
    method: 'post',
    data: {MenuName, IsComment, Month, Week, Day, Price, Menu_ID}
  })
}