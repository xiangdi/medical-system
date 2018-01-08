import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button } from 'antd'
import { Page } from 'components'
import { Filter, List, Statistics } from './components/'
import { parseRoleStatus } from '../../utils/'
import styles from './index.less'


const User = ({ location, dispatch, user, loading }) => {
  // location.query = queryString.parse(location.search)
  const { list, pagination, selectedRowKeys, userTotal, orgList, orgId, increasedUserNum, investUserNum, expireUserNum, userData, locationQuery, userInfo } = user
  const { pageSize } = pagination
  const statisticsProps = {
    userTotal,
    increasedUserNum,
    investUserNum,
    expireUserNum,
  }
  let userRole
  let isAdmin
  let isEdifact
  let isManager
  let isStaff
  let organId
  if (userInfo && userInfo.permissions) {
    userRole = parseRoleStatus(userInfo.permissions.role)
    isAdmin = userRole.admin
    isEdifact = userRole.edifact
    isManager = userRole.manager
    isStaff = userRole.staff
  }

  const handleTransactionItems = (data) => {
    const { query, pathname } = location
    if (data) {
      localStorage.moveInfo = data
      dispatch(routerRedux.push({
        pathname: '/user/transaction',
        query: {
          userId: Array.isArray(data) ? data : [data],
        },
      }))
    }
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['user/query'],
    pagination,
    location,
    dispatch,
    userInfo,
    handleTransactionItems,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...locationQuery,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'user/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    userData,
    userInfo,
    orgList,
    orgId,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/user',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/user',
      }))
    },
    onOrgIdChange (payload) {
      dispatch({
        type: 'user/updateOrgId',
        payload,
      })
    },
  }


  return (
    <Page inner className={styles.user}>
      <div className={styles.filter}>
        <Filter {...filterProps} />
      </div>
      <div className={styles.list}>
        <div className={styles.wrap}>
          <Statistics {...statisticsProps} />
          {
            (isAdmin || isManager) &&
            <Row style={{ float: 'right', fontSize: 13 }}>
              <Col>
                {`选中 ${selectedRowKeys.length} 条 `}
                <Button type="primary" disabled={selectedRowKeys.length == 0} style={{ marginLeft: 8 }} onClick={() => handleTransactionItems(selectedRowKeys)}>批量异动</Button>
              </Col>
            </Row>
          }
        </div>
        <List {...listProps} />
      </div>
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ user, loading }) => ({ user, loading }))(User)
