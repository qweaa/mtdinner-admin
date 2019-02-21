import request from '@/utils/request'

let name = 'store'

export function GetBookList({Current_Page, Current_Size}) {
  return request({
    url: '/' + name + '/GetBookList',
    method: 'get',
    params: { Current_Page, Current_Size }
  })
}

export function GetBookDetail(Book_ID) {
  return request({
    url: '/' + name + '/GetBookDetail',
    method: 'get',
    params: { Book_ID }
  })
}

//修改订单状态
export function UpdateStatus({Book_ID, Status}) {
  return request({
    url: '/' + name + '/UpdateStatus',
    method: 'post',
    data: { Book_ID, Status }
  })
}
//修改订单状态
export function UpdateBookStatus({Book_ID, BookStatus}) {
    return request({
      url: '/' + name + '/UpdateBookStatus',
      method: 'post',
      data: { Book_ID, BookStatus }
    })
  }
