import request from '../utils/request';

export async function getDevices(params) {
  return request({
    url: '',
    method: 'get',
    data: params
  })
}
