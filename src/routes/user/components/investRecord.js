import React from 'react'
import { Table, Tabs } from 'antd'
import { orderStatus } from '../../../utils/'
import { parseDate } from '../../../utils/dateFormat'

const InvestRecord = ({ dataSource, ...tableProps }) => {
  const TabPane = Tabs.TabPane

  // table columns
  const productColumns = [{
    title: '订单号',
    dataIndex: 'investId',
    key: 'investId',
  }, {
    title: '投资产品',
    dataIndex: 'planName',
    key: 'planName',

  }, {
    title: '投资期限',
    dataIndex: 'period',
    key: 'period',
  }, {
    title: '投资金额',
    dataIndex: 'amount',
    key: 'amount',
  }, {
    title: '投资时间',
    dataIndex: 'beginTime',
    key: 'beginTime',
  }, {
    title: '投资状态',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <span>
        {orderStatus(record.status)}
      </span>
    ),
  }, {
    title: '已赚金额',
    dataIndex: 'totalEarnInterest',
    key: 'totalEarnInterest',
  }, {
    title: '退出时间',
    dataIndex: 'finishTime',
    key: 'finishTime',
    render: (text, record) => { return parseDate(text) },
  }]
  return (
    <div>
      <h3>投资记录</h3>
      <Tabs type="card">
        <TabPane tab="红利计划" key="1">
          <Table
            {...tableProps}
            bordered
            scroll={{ x: 1100 }}
            rowKey={(record, index) => index}
            columns={productColumns}
            dataSource={dataSource}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

InvestRecord.propTypes = {
}

export default InvestRecord
