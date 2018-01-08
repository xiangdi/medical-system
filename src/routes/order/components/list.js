import React from 'react'
import classnames from 'classnames'
import styles from './list.less'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import { formatNumber, orderStatus, productType } from '../../../utils/'
import { parseDateTime } from '../../../utils/dateFormat'

const List = ({ dataSource, ...tableProps }) => {
  const columns = [{
    title: '订单号',
    dataIndex: 'id',
    fixed: 'left',
    width: 150,
  }, {
    title: '投资产品',
    dataIndex: 'name',
    width: 260,
  }, {
    title: '产品类型',
    dataIndex: 'productType',
    render: (text, record) => productType(text),
    width: 120,
  }, {
    title: '投资期限',
    dataIndex: 'lockPeriod',
    render: (text, record) => `${text}个月`,
    width: 100,
  }, {
    title: '利率',
    dataIndex: 'aveLoanRateVo',
    render: (text, record) => `${text}%`,
    width: 100,
  }, {
    title: '购买日',
    dataIndex: 'createTime',
    render: (text, record) => parseDateTime(text, 'YYYY-MM-DD'),
    width: 120,
  }, {
    title: '投资金额',
    dataIndex: 'finalAmountVo',
    render: (text, record) => formatNumber(text, 2),
    width: 150,
  }, {
    title: '起息日',
    dataIndex: 'beginProfitDate',
    render: (text, record) => parseDateTime(text, 'YYYY-MM-DD'),
    width: 120,
  }, {
    title: '到期日',
    dataIndex: 'endLockingTime',
    render: (text, record) => parseDateTime(text, 'YYYY-MM-DD'),
    width: 120,
  }, {
    title: '订单状态',
    dataIndex: 'status',
    render: (text, record) => orderStatus(text),
    width: 120,
  }, {
    title: '理财顾问',
    dataIndex: 'empName',
    width: 120,
  }, {
    title: '理财顾问工号',
    dataIndex: 'employeeId',
    width: 160,
  }, {
    title: '操作',
    fixed: 'right',
    render: (text, record) => <Link to={`/order/${record.id}`}>查看详情</Link>,
    width: 120,
  }]

  return (
    <Table
      columns={columns}
      className={classnames({ [styles.table]: true})}
      bordered
      rowKey={(record, index) => index}
      dataSource={dataSource}
      scroll={{ x: 1700 }}
      { ...tableProps }
    />
  )
}

export default List
