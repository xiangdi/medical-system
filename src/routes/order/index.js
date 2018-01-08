import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'
import { Search, List, Count } from './components/'
import styles from './index.less'

const Order = ({ order, dispatch, loading, location }) => {
  // location.query = queryString.parse(location.search)
  const { list, count, pagination, emporg, userInfo, orgList, organId, locationQuery } = order
  const { pageSize } = pagination
  const listProps = {
    dataSource: list,
    loading: loading.effects['order/query'],
    pagination,
    location,
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
  }
  const searchProps = {
    userInfo,
    organId,
    emporg,
    dispatch,
    orgList,
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
        pathname: '/order',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/order',
      }))
    },
    onOrgIdChange (payload) {
      dispatch({
        type: 'order/updateOrgId',
        payload,
      })
    },
  }

  const totalProps = {
    sumTotal: count.fpspCount - 0 || 0,
    having: count.possessCount - 0 || 0,
    exitedCount: count.exitedCount - 0 || 0,
    userNum: count.userNum - 0 || 0,
    finalAmount: count.finalAmount - 0 || 0,
  }

  return (
    <div>
      <Page className={styles.order}>
        <Search {...searchProps} />
      </Page>
      <Page className={styles.order}>
        <Count {...totalProps} />
        <List {...listProps} />
      </Page>
    </div>)
}

Order.propTypes = {
  order: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ order, loading }) => ({ order, loading }))(Order)
