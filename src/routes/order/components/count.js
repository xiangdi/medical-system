import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './count.less'

const Count = ({ sumTotal, having, exitedCount, userNum, finalAmount }) => {
  return (
    <div className={styles.count}>
      共<span>{sumTotal}</span>笔订单，其中持有中<span>{having}</span>笔，已退出<span>{exitedCount}</span>笔。投资人数：<span>{userNum}</span>人，投资金额：<span>{finalAmount}</span>万元。
    </div>
  )
}

export default Count
