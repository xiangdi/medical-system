import React, { Component, PropTypes } from 'react'
import { Table, Popconfirm, Row, Col } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { parseDateTime, parseDate } from '../../../utils/dateFormat'
import { formatNumber, parseUtmSourceType, parseEmpStatus } from '../../../utils/'
import Page from '../../../components/Page/Page'
import styles from '../userDetail.less'

const UserInfo = ({ dataSource, loading }) => {
  const accountInfo = [
    {
      title: '客户ID',
      dataIndex: 'userId',
    }, {
      title: '客户昵称',
      dataIndex: 'username',
    }, {
      title: '客户名称',
      dataIndex: 'name',
    }, {
      title: '客户手机号',
      dataIndex: 'mobile',
    }, {
      title: '性别',
      dataIndex: 'gender',
    }, {
      title: '注册时间',
      dataIndex: 'registerTime',
    }, {
      title: '注册渠道',
      dataIndex: 'utmSource',
    }, {
      title: '是否开户',
      dataIndex: 'hasEscrowAcc',
    }, {
      title: '开户时间',
      dataIndex: 'openAccTime',
    }, {
      title: '当前状态',
      dataIndex: 'status',
    }, {
      title: '最近登录时间',
      dataIndex: 'lastLoginTime',
    }, {
      title: '首投时间',
      dataIndex: 'firstJoinTime',
    }, {
      title: '首投金额',
      dataIndex: 'firstJoinAmount',
    }, {
      title: '最近投资',
      dataIndex: 'recentInvestTime',
    }, {
      title: '理财经理',
      dataIndex: 'empName',
    }]

  const accountInfoVal = dataSource[0] || {}
  const parseGender = (val) => {
    if (val === '0') {
      return '男'
    } else if (val === '1') {
      return '女'
    }
    return ''
  }
  const parseEmpName = (name, status) => {
    if (name && status) {
      return `${name}（${parseEmpStatus(status)}）`
    }
    if (name && !status) {
      return `${name}`
    }
    return ''
  }
  function valueTranste (val) {
    if (val == 'gender') {
      return parseGender(accountInfoVal[val])
    }
    if (val == 'registerTime' || val == 'openAccTime' || val == 'firstJoinTime' || val == 'recentInvestTime') {
      return parseDate(accountInfoVal[val])
    }
    if (val == 'lastLoginTime') {
      return parseDateTime(accountInfoVal[val])
    }
    if (val == 'hasEscrowAcc') {
      return accountInfoVal[val] == '1' ? '已开户' : '未开户'
    }
    if (val == 'status') {
      return accountInfoVal[val] == 'true' ? '已启动' : '禁用'
    }
    if (val == 'firstJoinAmount') {
      return formatNumber(accountInfoVal[val], 2)
    }
    if (val == 'utmSource') {
      return parseUtmSourceType(accountInfoVal[val])
    }
    if (val == 'empName') {
      return parseEmpName(accountInfoVal[val], accountInfoVal.empStatus)
    }
    return accountInfoVal[val]
  }

  return (
    <div className={styles['user-info']}>
      <h3>客户信息</h3>
      <Row>
        {
          accountInfo.map((item, index) => (
            <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} key={index} className={styles.item}>
              <span>{item.title} : {valueTranste(item.dataIndex)}</span>
            </Col>))
        }
      </Row>

    </div>
  )
}

UserInfo.propTypes = {
}

export default UserInfo
