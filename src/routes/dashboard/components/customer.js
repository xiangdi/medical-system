import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Icon } from 'antd'
import { formatNumber } from '../../../utils/'

function Customer ({ data }) {
  const columns = [{
    title: '客户总数',
    key: 'empCustomerCount',
    fixed: 'left',
    width: 150,
    render: (text, record) => (
      <span>
        {formatNumber(record.empCustomerCount, 0)}
      </span>
    ),
  }, {
    title: '已完成投资客户数',
    key: 'investedCustomerCount',
    render: (text, record) => (
      <span>
        {formatNumber(record.investedCustomerCount, 0)}
      </span>
    ),
  }, {
    title: '投资中客户数',
    key: 'investingCustomerCount',
    render: (text, record) => (
      <span>
        {formatNumber(record.investingCustomerCount, 0)}
      </span>
    ),
  }, {
    title: '本月新增客户数',
    key: 'newUserCount',
    render: (text, record) => (
      <span>
        {formatNumber(record.newUserCount, 0)}
      </span>
    ),
  }, {
    title: '本月首投客户数',
    key: 'firstInvestCount',
    render: (text, record) => (
      <span>
        {formatNumber(record.firstInvestCount, 0)}
      </span>
    ),
  },  {
    title: '本月到期客户数',
    key: 'monthExpireCount',
    render: (text, record) => (
      <span>
        {formatNumber(record.monthExpireCount, 0)}
      </span>
    ),
  },  {
    title: '操作',
    key: 'operate',
    fixed: 'right',
    width: 100,
    render: () => (
      <span>
        <Link to='/user'>查看详情</Link>
      </span>
    ),
  }]
  return (
    <div className="tradview">
      <Table columns={columns} rowKey={(record, index) => index} pagination={false} dataSource={data} scroll={{ x: 1000 }} />
    </div>
  )
}

Customer.propTypes = {
  data: PropTypes.array,
}

export default Customer