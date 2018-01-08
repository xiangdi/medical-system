import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import { query } from 'services/organization'
import { model } from 'models/common'
import { message } from 'antd'

export default modelExtend(model, {
  namespace: 'organization',
  state: {
    treeData: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/organization') {
          dispatch({ type: 'tree' })
        }
      })
    },
  },
  effects: {
    * tree({
      payload,
    }, {call, put }) {
      const treeList = yield call(query, parse(payload))
      if(treeList.status){
        message.error(treeList.message)
      }
      const _data = treeList.data
      yield put({
        type: 'updateState',
        payload: _data,
      })
    }
  },
})