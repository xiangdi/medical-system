import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Table, Button } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import styles from './changeRecord.less'

const columns = [{
  title: '异动前',
  dataIndex: 'fromDesc',
}, {
  title: '异动后',
  className: 'column-money',
  dataIndex: 'toDesc',
}, {
  title: '操作员',
  dataIndex: 'empName',
}, {
  title: '异动原因',
  dataIndex: 'remark',
}, {
  title: '异动时间',
  dataIndex: 'createTime',
}]

function ChangeRecord ({ dataSource }) {
  return (
    <div className={styles.table}>
      <Table
        columns={columns}
        dataSource={dataSource}
        bordered
        pagination= {false}
      />
    </div>
  )
}

ChangeRecord.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default ChangeRecord
