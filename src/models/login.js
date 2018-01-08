import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import { message } from 'antd'

const config = require('../utils/config')

const { apiPrefix } = config

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      const data = yield call(login, payload)
      if (data && data.status == 0) {
        let { locationSearch } = yield select(_ => _.app)
        let { from } = locationSearch
        yield put({ type: 'app/query' })
        yield put(routerRedux.push('/dashboard'))
      }
      // if (from && from !== '/login') {
      //   // yield put(routerRedux.push(from))
      //   yield put(routerRedux.push('/dashboard'))
      // } else {
      //   yield put(routerRedux.push('/dashboard'))
      // }
    },
  },

}
