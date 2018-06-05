// import { message } from 'antd';

import { queryData, addData, updateData, deleteData } from '../services/company';

export default {
  namespace: 'company',

  state: {
    companyInfo: []
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(queryData);
      console.log('Mapres>>>>>', res);
      yield put({
        type: 'updateCompany',
        payload: res
      })
    },

    *addInfo({ payload }, { put, select, call }) {
      const res = yield call(addData, payload);
      console.log('addres>>>>', res);
      const refresh = yield call(queryData);
      yield put({
        type: 'updateCompany',
        payload: refresh
      })
    },

    *deleteInfo({ payload }, { put, select, call }) {
      const res = yield call(deleteData, payload);
      console.log('addres>>>>', res);
      const refresh = yield call(queryData);
      yield put({
        type: 'updateCompany',
        payload: refresh
      })
    },

    *updateInfo({ payload }, { put, select, call }) {
      const res = yield call(updateData, payload);
      console.log('updateres>>>>', res);
      const refresh = yield call(queryData);
      yield put({
        type: 'updateCompany',
        payload: refresh
      })
    }
  },

  reducers: {
    updateCompany(state, { payload }) {
      return {
        ...state,
        companyInfo: payload
      }
    }
  }
}
