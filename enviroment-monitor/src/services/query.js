import request from '../utils/request';

export async function queryData(params) {
  return request({
    url: '/hjjc/device/get',
    method: 'post',
    data: params
  })
}
