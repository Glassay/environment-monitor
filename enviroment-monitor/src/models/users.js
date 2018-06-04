import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'users',

  state: {
    adminInfo: {
      userName: '111',
      password: '111',
    }
  },

  effects: {
    *adminLogin({ payload }, { put, select }) {
      console.log('payload>>>>', payload);
      const data = yield select( state => state.login.adminInfo)
      console.log('data>>>', data);
      if(data.userName === payload.userName && data.password === payload.password) {
        yield put(routerRedux.push('/main/map'));
      } else {
        message.error('输入错误, 请重新输入！');
      }
    }
  }
}
