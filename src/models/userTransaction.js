import { routerRedux } from 'dva/router'
import * as usersService from '../services/users'

const { remove, saleQuery, update } = usersService

export default {

  namespace: 'userTransaction',

  state: {
    userInfo: {},
    userInfoData: [],
    transactionRecord: [],
    organizations: [],
    saleList: [],
    selectedUserIds: [],
    orgList: {},
    orgId: '',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user/transaction') {
          const payload = {
            userId: [localStorage.moveInfo],
          }
          dispatch({
            type: 'moveInfo',
            payload,
          })
        } else {
          localStorage.removeItem('moveInfo')
        }
      })
    },
  },

  effects: {
    * moveInfo ({
      payload,
    }, { call, put, select }) {
      let transactionData
      const data = yield call(remove, payload)
      const { user } = yield select(_ => _.app)
      if (data && data.status == 0) {
        transactionData = data.data
        yield put({
          type: 'querySuccess',
          payload: {
            userInfo: user,
            orgList: JSON.parse(user.user.orgList),
            selectedUserIds: payload.userId,
            userInfoData: transactionData.users,
            transactionRecord: transactionData.changeLogs,
          },
        })
      }
    },
    * saleQuery ({
      payload,
    }, { call, put }) {
      const data = yield call(saleQuery, payload)
      if (data && data.status == 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            saleList: data.data.employees,
            orgId: payload.orgId,
          },
        })
      }
    },
    * update ({
      payload,
    }, { call, put }) {
      const data = yield call(update, payload)
      if (data && data.status == 0) {
        yield put(routerRedux.push('/user'))
      }
    },
  },


  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
