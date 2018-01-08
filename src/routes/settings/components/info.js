import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Table, Button } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import styles from './info.less'
import { parseEmpStatus } from '../../../utils/'

const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  style: {
    marginBottom: 16,
  },
};

function Info ({ labelKeys=[], dataSource={}, loading }) {
  function valueTranste (val){
    if(val == 'onJob'){
      return parseEmpStatus(dataSource[val])
    }else {
      return dataSource[val]
    }
  }
  return (
    <div className={styles.content}>
      <Row gutter={16}>
        {labelKeys && labelKeys.map((value, index)=> <Col {...ColProps} className="gutter-row" span={6} key={index}>
          <div className="gutter-box">
            <label htmlFor="">{value.label}</label>
            <span>{valueTranste(value.key)}</span>
          </div>
        </Col>)}
      </Row>
    </div>
  )
}

Info.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default Info
