import { message } from 'antd';

import { getInfos } from '../services/analyze';

export default {
  namespace: 'analyze',

  state: {
    infos: []
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(getInfos, payload);
      console.log('分析数据>>>>', res);
      if(res.status === 'success') {
        message.success('查询成功！');
        yield put({
          type: 'updateInfo',
          payload: res
        })
      } else {
        message.error('查询失败！');
      }
    }
  },

  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        infos: payload
      }
    }
  },
}
