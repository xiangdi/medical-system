import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styles from './detail.less'
import { formatNumber, orderStatus, productType } from '../../../utils/'
import { parseDate } from '../../../utils/dateFormat'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'

const Detail = ({ dataSource }) => {
  const orderInfo = [{
    title: '订单号',
    dataIndex: 'id',
  }, {
    title: '产品类型',
    dataIndex: 'productType',
  }, {
    title: '投资产品',
    dataIndex: 'name',
  }, {
    title: '投资期限',
    dataIndex: 'lockPeriod',
  }, {
    title: '利率',
    dataIndex: 'aveLoanRateVo',
  }, {
    title: '购买日',
    dataIndex: 'createTime',
  }, {
    title: '投资金额',
    dataIndex: 'finalAmountVo',
  }, {
    title: '起息日',
    dataIndex: 'beginProfitDate',
  }, {
    title: '到期日',
    dataIndex: 'endLockingTime',
  }, {
    title: '订单状态',
    dataIndex: 'status',
  }]
  const userInfo = [{
    title: '客户编号',
    dataIndex: 'userId',
  }, {
    title: '客户姓名',
    dataIndex: 'userName',
  }, {
    title: '是否为首投',
    dataIndex: 'firstInvest',
  }]
  const empInfo = [{
    title: '理财顾问',
    dataIndex: 'empName',
  }, {
    title: '理财顾问工号',
    dataIndex: 'employeeId',
  }, {
    title: '理财顾问手机号',
    dataIndex: 'empMobile',
  }]

  let dataList = dataSource || {}
  function valueTranste(val){
    if(val === 'createTime' || val === 'beginProfitDate' || val === 'endLockingTime'){
      return parseDate(dataList[val])
    }
    if(val === 'lockPeriod'){
      return `${dataList[val]}个月`
    }
    if(val === 'aveLoanRateVo'){
      return `${dataList[val]}%`
    }
    if(val === 'finalAmountVo'){
      return formatNumber(dataList[val], 2)
    }
    if(val === 'status'){
      return orderStatus(dataList[val])
    }
    if(val === 'productType'){
      return productType(dataList[val])
    }
    if(val === 'firstInvest'){
      return dataList[val] ?'是': '否'
    }
    return dataList[val]
  }

  return (
    <div className={styles.content}>
      <Row className={styles.info}>
        <Col xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <Row>
            <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }}>
              <h3 className={styles['info-title']}>订单信息</h3>
            </Col>
            <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }} className={styles['back-link']}>
              <Link to={'/order'} >返回订单列表</Link>
            </Col>
          </Row>
        </Col>
        {
          orderInfo.map((item, index) => 
          <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} key={index}>
            <span className={styles.item}>{item.title} : {valueTranste(item.dataIndex)}</span>
          </Col>)
        }
      </Row>
      <Row className={styles.info}>
        <Col xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <h3 className={styles['info-title']}>客户信息</h3>
        </Col>
        {
          userInfo.map((item, index) => 
          <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} key={index}>
            <span className={styles.item}>{item.title} : {valueTranste(item.dataIndex)}</span>
          </Col>)
        }
      </Row>
      <Row className={styles.info}>
        <Col xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <h3 className={styles['info-title']}>理财顾问信息</h3>
        </Col>
        {
          empInfo.map((item, index) => 
          <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 24 }} key={index}>
            <span className={styles.item}>{item.title} : {valueTranste(item.dataIndex)}</span>
          </Col>)
        }
      </Row>
    </div>
  )
}

export default Detail
