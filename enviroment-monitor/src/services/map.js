import request from '../utils/request';

export async function queryData(params) {
  return request({
    url: '/hjjc/company/get',
    method: 'post',
    data: params
  })
}
