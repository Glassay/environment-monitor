import request from '../utils/request';

export async function Login(params) {
  return request({
    url: '/hjjc/user/login',
    method: 'post',
    data: params
  })
}

export async function queryData(params) {
  return request({
    url: '/hjjc/user/get',
    method: 'post',
    data: params
  })
}

export async function addData(params) {
  return request({
    url: '/hjjc/user/add',
    method: 'post',
    data: params
  })
}

export async function updateData(params) {
  return request({
    url: '/hjjc/user/update',
    method: 'post',
    data: params
  })
}

export async function deleteData(params) {
  return request({
    url: '/hjjc/user/delete',
    method: 'post',
    data: params
  })
}
