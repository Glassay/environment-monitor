import request from '../utils/request';

export async function queryData(params) {
  return request({
    url: '/hjjc/company/get',
    method: 'post',
    data: params
  })
}

export async function addData(params) {
  return request({
    url: '/hjjc/company/add',
    method: 'post',
    data: params
  })
}

export async function updateData(params) {
  return request({
    url: '/hjjc/company/update',
    method: 'post',
    data: params
  })
}

export async function deleteData(params) {
  return request({
    url: '/hjjc/company/delete',
    method: 'post',
    data: params
  })
}
