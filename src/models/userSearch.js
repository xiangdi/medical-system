import modelExtend from 'dva-model-extend'
import * as usersService from '../services/users'
import { model } from 'models/common'
import { message } from 'antd'

const { search } = usersService

export default modelExtend(model, {

  namespace: 'userSearch',

  state: {
    isLoading: false,
    searchResult: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname !== '/user/search') {
          dispatch({
            type: 'updateSearch',
          })
        }
      })
    },
  },

  effects: {
    * searchQuery ({
      payload,
    }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          isLoading: true,
        },
      })
      const data = yield call(search, payload)
      if (data && data.status == 0) {
        yield put({
          type: 'updateState',
          payload: {
            searchResult: data.data,
            isLoading: false,
          },
        })
      }
    },
    * updateSearch ({
      payload,
    }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          isLoading: false,
          searchResult: {},
        },
      })
    },
  },
})
