import request from '../utils/request';

export async function getInfos(params) {
  return request({
    url: '/hjjc/abnormal/get',
    method: 'post',
    data: params
  })
}
