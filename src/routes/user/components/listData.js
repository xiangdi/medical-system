import React, { PropTypes } from 'react'
import { Table, Button } from 'antd'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import styles from './userList.less'
import { parseDateTime, parseDate } from '../../../utils/dateFormat'
import { parseRoleStatus, parseInvestStatus, formatNumber, parseEmpStatus } from '../../../utils/'

const List = ({ onDeleteItem, user, dispatch, onEditItem, isMotion, location, userInfo, handleTransactionItems, dataSource, ...tableProps }) => {
  let userRole
  let isAdmin
  let isEdifact
  let isManager
  let isStaff
  if (userInfo && userInfo.permissions) {
    userRole = parseRoleStatus(userInfo.permissions.role)
    isAdmin = userRole.admin
    isEdifact = userRole.edifact
    isManager = userRole.manager
    isStaff = userRole.staff
  }
  const columns = [
    {
      title: '客户ID',
      dataIndex: 'userId',
      key: 'userId',
      fixed: 'left',
      width: 100,
      render: (text, record) => <Link to={`/user/detail/${text}`}>{text}</Link>,
    }, {
      title: '真实姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    }, {
      title: '客户手机号',
      width: 140,
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '注册时间',
      width: 210,
      dataIndex: 'registerTime',
      key: 'registerTime',
      render: (text, record) => (
        <span>
          {parseDate(record.registerTime)}
        </span>
      ),
    }, {
      title: '开户',
      dataIndex: 'hasEscrowAcc',
      width: 100,
      key: 'hasEscrowAcc',
      render: (text, record) => (<span>{record.hasEscrowAcc == '1' ? '已开户' : '未开户'}</span>),
    }, {
      title: '投资状态',
      width: 100,
      dataIndex: 'investStatus',
      key: 'investStatus',
      render: (text, record) => (
        <span>
          {parseInvestStatus(record.investStatus)}
        </span>
      ),
    }, {
      title: '首投时间',
      width: 120,
      dataIndex: 'firstJoinTime',
      key: 'firstJoinTime',
      render: (text, record) => (
        <span>
          {parseDate(record.firstJoinTime)}
        </span>
      ),
    }, {
      title: '账户余额',
      width: 120,
      dataIndex: 'availablePoints',
      key: 'availablePoints',
      render: (text, record) => (
        <span>
          {formatNumber(record.availablePoints, 2)}
        </span>
      ),
    }, {
      title: '累计收益',
      width: 100,
      dataIndex: 'totalInterest',
      key: 'totalInterest',
      render: (text, record) => (
        <span>
          {formatNumber(record.totalInterest, 2)}
        </span>
      ),
    }, {
      title: '持有总资产',
      width: 120,
      dataIndex: 'assets',
      key: 'assets',
      render: (text, record) => (
        <span>
          {formatNumber(record.assets, 2)}
        </span>
      ),
    }, {
      title: '最近一次投资时间',
      dataIndex: 'recentInvestTime',
      width: 160,
      key: 'recentInvestTime',
      render: (text, record) => (
        <span>
          {parseDate(record.recentInvestTime)}
        </span>
      ),
    }, {
      title: '最近登录时间',
      dataIndex: 'lastLoginTime',
      width: 120,
      key: 'lastLoginTime',
      render: (text, record) => (
        <span>
          {parseDateTime(record.lastLoginTime)}
        </span>
      ),
    }, {
      title: '理财顾问',
      dataIndex: 'empName',
      width: 130,
      key: 'empName',
      render: (text, record) => {
        if (record.empName) {
          if (record.empStatus) {
            return `${record.empName}(${parseEmpStatus(record.empStatus)})`
          }
          return `${record.empName}`
        }
      },
    }, {
      title: '操作',
      dataIndex: 'detail',
      fixed: 'right',
      width: 100,
      key: 'detail',
      render: (text, record) => (
        (isAdmin || isManager) &&
        <Button type="primary" size="small" onClick={() => handleTransactionItems(record.userId)}>异动</Button>
      ),
    },
  ]

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true })}
        bordered
        rowKey={(record, index) => record.userId}
        scroll={{ x: 1700 }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
