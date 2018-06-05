import { routerRedux } from 'dva/router';
import { message } from 'antd';

import {
  addData,
  updateData,
  queryData,
  deleteData,
} from '../services/devices';

export default {
  namespace: 'devices',

  state: {
    deviceInfo: []
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(queryData, payload);
      console.log('query>>>>', res);
      yield put({
        type: 'updateDevices',
        payload: res
      })
    },

    *addInfo({ payload }, { put, select, call }) {
      const res = yield call(addData, payload);
      console.log('addres>>>>', res);
      const refresh = yield call(queryData);
      console.log('refreshuser++++', refresh);
      yield put({
        type: 'updateDevices',
        payload: refresh
      })
    },

    *updateInfo({ payload }, { put, call }) {
      const res = yield call(updateData, payload);
      console.log('修改返回', res);
      const refresh = yield call(queryData);
      console.log('refreshuser++++', refresh);
      yield put({
        type: 'updateDevices',
        payload: refresh
      })
    },

    *deleteInfo({ payload }, { call, put }) {
      const res = yield call(deleteData, payload);
      console.log('addres>>>>', res);
      const refresh = yield call(queryData);
      console.log('refreshuser++++', refresh);
      yield put({
        type: 'updateDevices',
        payload: refresh
      })
    }
  },

  reducers: {
    updateDevices(state, { payload }) {
      return {
        ...state,
        deviceInfo: payload
      }
    }
  }
}
