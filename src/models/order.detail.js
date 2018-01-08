import modelExtend from 'dva-model-extend'
import { fetch } from '../services/order'
import { pageModel } from './common'
import pathToRegexp from 'path-to-regexp'

export default modelExtend(pageModel, {

  namespace: 'orderDetail',

  state: {
    detail: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({pathname}) => {
        const match = pathToRegexp('/order/:id').exec(pathname)
        if (match) {
          dispatch({
            type: 'fetch',
            payload: {id: match[1]},
          })
        }
      })
    },
  },

  effects: {
    * fetch ({ payload = {} }, { call, put }) {
      const data = yield call(fetch, payload)
      let detailData
      if (data && data.status == 0) {
        detailData = data.data.detail
        yield put({
          type: 'fetchSuccess',
          payload: {
            detail: detailData
          },
        })
      }
    },
  },

  reducers: {
    fetchSuccess (state, { payload }) {
      const { detail } = payload
      return {
        ...state,
        detail,
      }
    },
  },
})
