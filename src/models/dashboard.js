import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query, tradQuery } from 'services/dashboard'
import { model } from 'models/common'
import { message } from 'antd'
import { parseRoleStatus } from '../utils/'

export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    tradData: [],
    dealTrad: [],
    invest: [],
    situation: [],
    userRole: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({ type: 'trad' })
        }
      })
    },
  },
  effects: {
    * trad({
      payload,
    }, {call, put, select }) {
      let userRoles, isAdmin, isEdifact, isManager, isStaff
      const { user } = yield select(_ => _.app)
      if(user && user.permissions){
        userRoles = parseRoleStatus(user.permissions.role)
        isAdmin = userRoles.admin
        isEdifact = userRoles.edifact
        isManager = userRoles.manager
        isStaff = userRoles.staff
      }
      yield put({
        type: 'updateState',
        payload: {
          userRole: userRoles,
        }
      })
      const dashboardData = yield call(tradQuery, parse(payload))
      const _data = dashboardData.data
      yield put({
        type: 'updateState',
        payload: _data,
      })
    }
  },
})
