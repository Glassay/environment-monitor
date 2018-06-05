import { routerRedux } from 'dva/router';
import { message } from 'antd';

import {
  addData,
  updateData,
  queryData,
  deleteData,
  Login
} from '../services/users';

export default {
  namespace: 'users',

  state: {
    userInfo: []
  },

  effects: {
    *adminLogin({ payload }, { put, select, call }) {
      const res = yield call(Login, payload);
      if(res.status === 'success') {
        yield put(routerRedux.push('/main'));
      } else {
        message.error('用户名或密码错误！');
      }
    },

    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(queryData, payload);
      yield put({
        type: 'updateUsers',
        payload: res
      })
    },

    *addInfo({ payload }, { put, select, call }) {
      const res = yield call(addData, payload);
      console.log('addres>>>>', res);
      const refresh = yield call(queryData);
      yield put({
        type: 'updateUsers',
        payload: refresh
      })
    },

    *updateInfo({ payload }, { put, call }) {
      const res = yield call(updateData, payload);
      console.log('修改返回', res);
      const refresh = yield call(queryData);
      yield put({
        type: 'updateUsers',
        payload: refresh
      })
    },

    *deleteInfo({ payload }, { call, put }) {
      const res = yield call(deleteData, payload);
      console.log('addres>>>>', res);
      const refresh = yield call(queryData);
      yield put({
        type: 'updateUsers',
        payload: refresh
      })
    }
  },

  reducers: {
    updateUsers(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      }
    }
  }
}
