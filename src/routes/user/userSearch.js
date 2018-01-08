import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './userDetail.less'
import { Spin, Card } from 'antd'
import { Page } from 'components'
import { SearchFilter } from './components/'

const UserSearch = ({ loading, userSearch, dispatch }) => {
  const { isLoading, searchResult } = userSearch
  let content
  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch({
        type: 'userSearch/searchQuery',
        payload: value,
      })
    },
  }


  if (searchResult && searchResult.empName) {
    content = (<Card title={searchResult.empName} style={{ width: '34%' }}>
      {searchResult.orgList}
    </Card>)
  }
  if (searchResult && searchResult.message) {
    content = (<Card title={searchResult.message} style={{ width: '34%' }} />)
  }

  return (
    <Page inner>
      <Spin spinning={isLoading}>
        <SearchFilter {...filterProps} />
        {content}
      </Spin>
    </Page>
  )
}

UserSearch.propTypes = {
}

export default connect(({ userSearch, loading }) => ({ userSearch, loading }))(UserSearch)
