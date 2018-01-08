import modelExtend from 'dva-model-extend'
import { config } from '../utils/'
import { query, download } from '../services/order'
import { pageModel } from './common'

export default modelExtend(pageModel, {
  namespace: 'order',
  state: {
    list: [],
    count: {},
    emporg: [],
    userInfo: {},
    orgList: {},
    locationQuery: {},
    organId: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/order') {
          const payload = location.query
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put, select }) {
      let recordList
      const data = yield call(query, payload)
      const { user, locationQuery } = yield select(_ => _.app)
      yield put({
        type: 'queryStatics',
        payload: {
          userInfo: user,
          orgList: JSON.parse(user.user.orgList)
        }
      })
      if (data && data.status == 0) {
        recordList = data.data
        yield put({
          type: 'queryStatics',
          payload: {
            emporg: recordList.dataList.empOrgs,
            count: recordList.orderTotal,
            locationQuery,
            userInfo: user,
          }
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list: recordList.dataList.list,
            pagination: {
              current: recordList.dataList.pageNumber - 0,
              pageSize: recordList.dataList.pageSize - 0,
              total: recordList.dataList.totalCount - 0,
            },
          },
        })
      }
    },

    * download ({
      payload = {},
    }, { call, put }) {
      const data = yield call(download, payload)
      if (data && data.data) {
        location.replace(location.origin+data.data.fileUrl);
      }
    },

    * updateOrgId ({
      payload,
    }, { call, put }) {
      yield put({
        type: 'queryStatics',
        payload: {
          organId: payload.organId,
        },
      })
    },

  },

  reducers: {
    queryStatics (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
})
