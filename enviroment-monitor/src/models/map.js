import { message } from 'antd';

import { queryData } from '../services/map';

export default {
  namespace: 'map',

  state: {
    companies: ''
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      console.log('payload>>>>', payload);
      const res = yield call(queryData);
      if(res.status === 'success') {
        yield put({
          type: 'updateInfo',
          payload: res
        })
      } else {
        message.error('查询失败！');
      }
      console.log('res+++++', res);
    }
  },

  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        companies: payload
      }
    }
  }
}
