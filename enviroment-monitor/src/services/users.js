import request from '../utils/request';

export async function getUsers(params) {
  return request({
    url: '',
    method: 'get',
    data: params
  })
}
