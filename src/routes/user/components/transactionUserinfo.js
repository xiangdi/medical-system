import React, { Component, PropTypes } from 'react'
import { Table, Popconfirm } from 'antd'
// import { parseDateTime } from '../../utils/dateFormat';
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

const UserInfo = ({ dataSource }) => {
  const columns = [
    {
      title: '客户ID',
      dataIndex: 'userId',
      key: 'userId',
    }, {
      title: '客户姓名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '客户手机号',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '所属销售',
      dataIndex: 'empName',
      key: 'empName',
    }, {
      title: '销售所属组织架构名称',
      dataIndex: 'orgName',
      key: 'orgName',
    }]

  return (
    <div>
      <h3>客户信息</h3>
      <Table
        rowKey={(record, index) => index}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  )
}
export default UserInfo
