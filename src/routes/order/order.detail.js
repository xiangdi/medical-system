import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page } from 'components'
import { Detail } from './components/'

const OrderDetail = ({ orderDetail }) => {
  const { detail } = orderDetail
  const detailProps = {
    dataSource: detail,
  }

  return (
    <Page inner>
      <Detail {...detailProps} />
    </Page>)
}

export default connect(({ orderDetail, loading }) => ({ orderDetail, loading }))(OrderDetail)
