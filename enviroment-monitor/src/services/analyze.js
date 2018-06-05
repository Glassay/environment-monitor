import request from '../utils/request';

export async function getInfos(params) {
  return request({
    url: '/hjjc/analyses/get',
    method: 'post',
    data: params
  })
}
