import React, { Component, PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
// import { parseDateTime } from '../../utils/dateFormat';
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const TransactionRecord = ({ dataSource }) => {
  const columns = [
    {
      title: '异动前销售名称（状态）',
      dataIndex: 'managerPre',
      key: 'managerPre',
    }, {
      title: '异动前销售所属组织架构全称',
      dataIndex: 'organizationPre',
      key: 'organizationPre',
    }, {
      title: '销售手机号',
      dataIndex: 'mobilePre',
      key: 'mobilePre',
    }, {
      title: '异动后销售名称（状态）',
      dataIndex: 'managerNow',
      key: 'managerNow',
    }, {
      title: '异动后销售所属组织架构全称',
      dataIndex: 'organizationNow',
      key: 'organizationNow',
    }, {
      title: '销售手机号',
      dataIndex: 'mobileNow',
      key: 'mobileNow',
    }, {
      title: '异动操作人姓名',
      dataIndex: 'operater',
      key: 'operater',
    }, {
      title: '异动原因',
      dataIndex: 'changeReason',
      key: 'changeReason',
    }]

  return (
    <div>
      <h3>异动记录</h3>
      <Table
        bordered
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  )
}
export default TransactionRecord
