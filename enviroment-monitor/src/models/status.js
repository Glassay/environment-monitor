// import { message } from 'antd';

import { getInfos } from '../services/status';

export default {
  namespace: 'status',

  state: {
    infos: [],
    normal: '',
    unNormal: ''
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(getInfos, payload);
      for(let i=0;i<res.historyData.length;i++) {
        if(res.historyData[i].currentB < res.devices[i].phaseACurrent) {
          yield put({
            type: 'unNormalInc',
            payload: i + 1
          })
        } else {
          yield put({
            type: 'normalInc',
            payload: i + 1
          })
        }
      }
      yield put({
        type: 'updateInfo',
        payload: res
      })
    }
  },

  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        infos: payload
      }
    },

    normalInc(state, { payload }) {
      return {
        ...state,
        normal: payload
      }
    },

    unNormalInc(state, { payload }) {
      return {
        ...state,
        unNormal: payload
      }
    }
  }
}
