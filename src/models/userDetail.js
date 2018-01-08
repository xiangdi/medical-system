import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import * as usersService from '../services/users'
import { pageModel, model } from './common'

const { query, fetch } = usersService

export default modelExtend(pageModel, {

  namespace: 'userDetail',

  state: {
    userDataList: [],
    accountDataList: [],
    investRecored: [],
    locationQuery: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ location, pathname }) => {
        const match = pathToRegexp('/user/detail/:id').exec(pathname)
        if (match) {
          dispatch({
            type: 'fetch',
            payload: {
              id: match[1],
            },
          })
        }
      })
    },
  },

  effects: {
    * fetch ({
      payload,
    }, { call, put, select }) {
      const { user, locationQuery } = yield select(_ => _.app)
      const queryData = {
        ...payload,
        ...locationQuery,
      }
      const data = yield call(fetch, queryData)
      if (data && data.status === 0) {
        let {
          userDetailInfo,
          accountInfo,
          investRecord,
        } = data.data
        yield put({
          type: 'queryStatics',
          payload: {
            userInfo: user,
            userDataList: userDetailInfo,
            accountDataList: accountInfo,
            investRecord: investRecord.recordList,
            locationQuery,
          },
        })
        yield put({
          type: 'querySuccess',
          payload: {
            investRecord: investRecord.recordList,
            pagination: {
              current: investRecord.pageNumber - 0,
              pageSize: investRecord.pageSize - 0,
              total: investRecord.totalCount - 0,
            },
          },
        })
      }
    },
  },

  reducers: {
    queryStatics (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
