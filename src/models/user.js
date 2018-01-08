/* global window */
import modelExtend from 'dva-model-extend'
import { config, formatNumber } from '../utils/'
import * as usersService from '../services/users'
import { pageModel, model } from './common'

const { query, fetch } = usersService
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'user',

  state: {
    userInfo: {},
    currentItem: {},
    selectedRowKeys: [],
    userTotal: 0,
    increasedUserNum: 0,
    investUserNum: 0,
    expireUserNum: 0,
    locationQuery: {},
    orgList: {},
    orgId: '',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/user') {
          const payload = location.query
          dispatch({
            type: 'query',
            payload,
          })
        } else {
          dispatch({
            type: 'updateUserInfo',
          })
        }
      })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put, select }) {
      let userData
      const data = yield call(query, payload)
      const { user, locationQuery } = yield select(_ => _.app)
      yield put({
        type: 'queryStatics',
        payload: {
          userInfo: user,
          orgList: JSON.parse(user.user.orgList),
        },
      })
      if (data && data.status == 0) {
        userData = data.data
        yield put({
          type: 'queryStatics',
          payload: {
            userTotal: userData.userTotal,
            increasedUserNum: userData.increasedUserNum,
            investUserNum: userData.investUserNum,
            expireUserNum: userData.expireUserNum,
            selectedRowKeys: [],
            locationQuery,
            userInfo: user,
          },
        })
        yield put({
          type: 'querySuccess',
          payload: {
            list: userData.userList.dataList,
            pagination: {
              current: userData.userList.pageNumber - 0,
              pageSize: userData.userList.pageSize - 0,
              total: userData.userList.totalCount - 0,
            },
          },
        })
      }
    },

    * updateUserInfo ({ payload = {} }, { call, put }) {
      yield put({
        type: 'queryStatics',
        payload: {
          userInfo: {},
        },
      })
    },

    * updateOrgId ({
      payload,
    }, { call, put }) {
      yield put({
        type: 'queryStatics',
        payload: {
          orgId: payload.orgId,
        },
      })
    },


    * fetch ({ payload = {} }, { call, put }) {
      const data = yield call(fetch, payload)
      if (data && data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataList: data.data.dataList,
          },
        })
      } else {
        throw data
      }
    },
  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

    queryStatics (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

  },
})
