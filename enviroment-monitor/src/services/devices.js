import request from '../utils/request';

export async function queryData(params) {
  return request({
    url: '/hjjc/devices/get',
    method: 'post',
    data: params
  })
}

export async function addData(params) {
  return request({
    url: '/hjjc/devices/add',
    method: 'post',
    data: params
  })
}

export async function updateData(params) {
  return request({
    url: '/hjjc/devices/update',
    method: 'post',
    data: params
  })
}

export async function deleteData(params) {
  return request({
    url: '/hjjc/devices/delete',
    method: 'post',
    data: params
  })
}
