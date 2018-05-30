// import { routerRedux } from 'dva/router';
import { message } from 'antd';

import { queryData } from '../services/query';

export default {
  namespace: 'query',

  state: {
    infos: ''
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      console.log('payload>>>>', payload);
      const res = yield call(queryData, payload);
      if(res.status === 'success') {
        message.success('查询成功！');
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
        infos: payload
      }
    }
  }
}
