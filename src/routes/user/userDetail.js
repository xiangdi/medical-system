import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './userDetail.less'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { Page } from 'components'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { UserInfo, AccountInfo, InvestRecord } from './components/index'

const Detail = ({ userDetail, loading, dispatch, location }) => {
  const { userDataList, accountDataList, investRecord, pagination, locationQuery } = userDetail
  const userInfoData = {
    dataSource: userDataList,
  }
  const accountInfoData = {
    dataSource: accountDataList,
  }
  const investData = {
    dataSource: investRecord,
    pagination,
    location,
    dispatch,
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
  return (
    <Page inner className={styles.content}>
      <div>
        <Link to={'/user'} className={styles['back-link']}>返回客户列表</Link>
      </div>
      <UserInfo {...userInfoData} />
      <AccountInfo {...accountInfoData} />
      <InvestRecord {...investData} />
    </Page>
  )
}

Detail.propTypes = {
}

export default connect(({ userDetail, loading }) => ({ userDetail, loading: loading.models.userDetail }))(Detail)
