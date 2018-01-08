import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Modal, Col } from 'antd'
import { color, checkRules } from 'utils'
import { Page } from 'components'
import styles from './index.less'
import { Link } from 'react-router-dom'

import Info from './components/info'

const FormItem = Form.Item

const labelKeys = [
  {
    key: 'name',
    label: '员工姓名：',
  },
  {
    key: 'employeeId',
    label: '员工编号：',
  },
  {
    key: 'orgAllName',
    label: '所属部门：',
  },
  {
    key: 'idcardNo',
    label: '身份证号：',
  },
]

let empInfoDataSource = {
  labelKeys,
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
}


function SettingsEmpInfo (
  {
    settingsEmpInfo,
    loading,
    dispatch,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
    },
  }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'settingsEmpInfo/updateEmpInfo',
          payload: values,
        })
      }
    })
  }

  const hideModal = () => {
    dispatch({
      type: 'settingsEmpInfo/hideModal',
    })
  }
  const empDetail = settingsEmpInfo.empInfo.empDetail || {}
  empInfoDataSource.dataSource = empDetail
  return (
    <div className={styles.settings}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h2>基本信息</h2>
        </div>
        <Info {...empInfoDataSource} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <h2>联系方式</h2>
        </div>
        <Form className={styles['settings-form']} onSubmit={handleSubmit}>

          <FormItem
            {...formItemLayout}
            label="手机号"
            hasFeedback
          >
            <Row gutter={8}>
              {empDetail.mobile && <Col span={14}>{empDetail.mobile}</Col>}
              <Col span={10}>
                <Link to="/account/setting/mobile">
                  <Button size="large">{empDetail.mobile ? '修改手机号' : '绑定手机号'}</Button>
                </Link>
              </Col>
            </Row>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="QQ号"
          >
            {getFieldDecorator('qq', {
              rules: [
                { pattern: checkRules.qq, message: 'QQ号不正确！' }],
              validateTrigger: 'onBlur',
              validateFirst: true,
              initialValue: empDetail.qq,
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: '邮箱格式不正确！' }],
              validateTrigger: 'onBlur',
              validateFirst: true,
              initialValue: empDetail.email,
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="通讯地址"
          >
            {getFieldDecorator('address', {
              initialValue: empDetail.address,
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮编"
          >
            {getFieldDecorator('postCode', {
              rules: [
                { pattern: checkRules.postcode, message: '邮政编码格式不正确！' }],
              validateTrigger: 'onBlur',
              validateFirst: true,
              initialValue: empDetail.postCode,
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className={styles['settings-form-button']}>保存</Button>
          </FormItem>
        </Form>
        <Modal
          title="个人信息修改"
          closable={false}
          visible={settingsEmpInfo.showModal}
          footer={[
            <Button key="back" onClick={hideModal}>留在本页</Button>,
            <Link to={settingsEmpInfo.prevUrl}>
              <Button key="submit" type="primary" onClick={hideModal}>去设置页</Button>,
            </Link>,
          ]}
        >
          <p>联系方式修改成功</p>
        </Modal>
      </div>
    </div>
  )
}

SettingsEmpInfo.propTypes = {
  settingsEmpInfo: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ settingsEmpInfo, loading }) => ({ settingsEmpInfo, loading }))(Form.create()(SettingsEmpInfo))
