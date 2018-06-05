// import { message } from 'antd';

import { getInfos } from '../services/analyze';

export default {
  namespace: 'analyze',

  state: {
    infos: []
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(getInfos, payload);
      const anyInfos = yield select(state => state.analyze.infos)
      for(let i=0;i<res.data.length;i++) {
        anyInfos.push({
          'time': res.data[i].dataTimeHour,
          'average': (res.data[i].currentA + res.data[i].currentA + res.data[i].currentA) / 3
        })
      }
      yield put({
        type: 'updateInfo',
        payload: anyInfos
      })
      // if(res.status === 200) {
      //   for(let i=0;i<res.data.length;i++) {
      //     anyInfos.push({
      //       'time': res.data[i].dataTimeHour,
      //       'average': (res.data[i].currentA + res.data[i].currentA + res.data[i].currentA) / 3
      //     })
      //   }
      //   message.success('查询成功！');
      //   yield put({
      //     type: 'updateInfo',
      //     payload: anyInfos
      //   })
      // } else {
      //   message.error('查询失败！');
      // }
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
