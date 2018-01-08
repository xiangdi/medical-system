import React from 'react'
import { Table, Row, Col } from 'antd'
import { formatNumber } from '../../../utils/'
import styles from '../userDetail.less'

const AccountInfo = ({ dataSource }) => {
  const userInfo = [{
    title: '账户余额',
    dataIndex: 'funds',
    key: 'funds',
    render: (text, record) => (
      <span>
        {formatNumber(record.funds, 2)}
      </span>
    ),
  }, {
    title: '可用金额',
    dataIndex: 'availablePoints',
  }, {
    title: '冻结金额',
    dataIndex: 'frozenPoints',
  }, {
    title: '当前持有资产',
    dataIndex: 'assets',
  }, {
    title: '累计充值',
    dataIndex: 'rechargeAmount',
  }, {
    title: '累计提现',
    dataIndex: 'cashDrawAmount',
  }, {
    title: '累计投资金额',
    dataIndex: 'investAmount',
  }, {
    title: '计划累计投资',
    dataIndex: 'planTotalAmount',
  }, {
    title: '计划累计收益',
    dataIndex: 'planTotalInterest',
  }, {
    title: '散标累计收益',
    dataIndex: 'loanTransferAmount',
  }, {
    title: '债权累计收益',
    dataIndex: 'loanTransferInterest',
  }]
  const userInfoVal = dataSource[0] || {}
  function valueTranste (val) {
    return formatNumber(userInfoVal[val], 2)
  }

  return (
    <div className={styles['account-info']}>
      <h3>账户信息</h3>
      <Row>
        {
          userInfo.map((item, index) =>
            (<Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} key={index} className={styles.item}>
              <span >{item.title} : {valueTranste(item.dataIndex)}</span>
            </Col>))
        }
      </Row>


    </div>
  )
}

AccountInfo.propTypes = {
}

export default AccountInfo
