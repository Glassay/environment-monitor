import { message } from 'antd';

import { queryData } from '../services/map';

export default {
  namespace: 'map',

  state: {
    maps: [],
    companyInfo: []
  },

  effects: {
    *queryInfo({ payload }, { put, select, call }) {
      const res = yield call(queryData);
      yield put({
        type: 'updateCompany',
        payload: res
      })
      const companies = yield select(state => state.map.maps)
      if(res.status === 'success') {
        console.log('坐标奥斯达斯+', res);
        // console.log('经度=++++', res.data[0].JD);
        for(let i=0;i<res.data.length;i++) {
          companies.push({
            'companyName': res.data[i].name,
            'position': {
              'longitude': res.data[i].jd,
              'latitude': res.data[i].wd
            }
          })
        }
        yield put({
          type: 'updateInfo',
          payload: companies
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
        maps: payload
      }
    },
    updateCompany(state, { payload }) {
      return {
        ...state,
        companyInfo: payload
      }
    }
  }
}
