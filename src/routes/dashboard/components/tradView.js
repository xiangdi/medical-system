import React from 'react'
import PropTypes from 'prop-types'
import { Table, Icon } from 'antd'
import { formatNumber } from '../../../utils/'
import { Link } from 'react-router-dom'

function TradView ({ data }) {
  const columns = [{
    title: '本月成交量（笔）',
    key: 'dealCount',
    fixed: 'left',
    width: 150,
    render: (text, record) => (
      <span>
        {record.dealCount}
      </span>
    ),
  }, {
    title: '本月成交人数（人）',
    key: 'dealPeopleCount',
    render: (text, record) => (
      <span>
        {record.dealPeopleCount}
      </span>
    ),
  }, {
    title: '本月成交金额（万元）',
    key: 'dealAmountSum',
    render: (text, record) => (
      <span>
        {formatNumber(record.dealAmountSum, 2)}
      </span>
    ),
  }, {
    title: '本月年化成交金额（万元）',
    key: 'yearAmountSum',
    render: (text, record) => (
      <span>
        {formatNumber(record.yearAmountSum, 2)}
      </span>
    ),
  }, {
    title: '本月到期金额（万元）',
    key: 'expireAmountSum',
    render: (text, record) => (
      <span>
        {formatNumber(record.expireAmountSum, 2)}
      </span>
    ),
  },  {
    title: '操作',
    key: 'operate',
    fixed: 'right',
    width: 100,
    render: () => (
      <span>
        <Link to='/order'>查看详情</Link>
      </span>
    ),
  }]
  return (
    <div className="tradview">
      <Table columns={columns} rowKey={(record, index) => index} pagination={false} dataSource={data} scroll={{ x: 1000 }} />
    </div>
  )
}

TradView.propTypes = {
  data: PropTypes.array,
}

export default TradView