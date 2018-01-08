import React from 'react'
import classnames from 'classnames'
import styles from './statistics.less'

const Statistics = ({ userTotal, increasedUserNum, investUserNum, expireUserNum }) => {
  return (
    <div className={styles.statistics}>
      <div className="user">客户数：<span>{userTotal}</span>人</div>
      <div>当月新增客户：<span>{increasedUserNum}</span>人</div>
      <div>当月投资：<span>{investUserNum}</span>人</div>
      <div>当月到期：<span>{expireUserNum}</span>人</div>
    </div>
  )
}

Statistics.propTypes = {
}

export default Statistics
