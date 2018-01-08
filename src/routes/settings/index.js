import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Table, Button } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import styles from './index.less'
import { Link } from 'react-router-dom'

import Info from './components/info'

const labelKeys = [
  {
    key:'employeeId',
    label: '员工编号：'
  },
  {
    key:'name',
    label: '员工姓名：'
  },
  {
    key:'firstLevelDepartment',
    label: '一级部门：'
  },
  {
    key:'secondLevelDepartment',
    label: '二级部门：'
  },
  {
    key:'positionId',
    label: '职位序列：'
  },
  {
    key:'onJob',
    label: '人员状态：',
  },
  {
    key:'idcardNo',
    label: '身份证号：'
  },
  {
    key:'email',
    label: '邮箱：'
  }
  
];

let empInfoDataSource = {
  labelKeys
}

function Settings ({ settings, loading }) {
  
  empInfoDataSource.dataSource = settings.empInfo.empDetail;
  return (
    <div className={styles.settings}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h2>个人信息</h2>
          <Link to='/account/setting/empInfo'>修改个人信息</Link>
        </div>
        <Info {...empInfoDataSource} />
      </div>
      <div className={styles.password}>
        <div className={styles.title}>
          <h2>个人账号管理</h2>
        </div>
          <Link to='/account/setting/password'>
            <Button type="primary" className={styles['password-btn']}>修改密码</Button>
          </Link>
      </div>
    </div>
  )
}

Settings.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ settings, loading }) => ({ settings, loading }))(Settings)
