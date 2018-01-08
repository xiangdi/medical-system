import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input, Col, Modal } from 'antd'
import { color, checkRules } from 'utils'
import { Page, VerifyCode } from 'components'
import styles from './index.less'
import { Link } from 'react-router-dom'

const FormItem = Form.Item

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

function SettingsPassword (
  {
    settingsPassword,
    loading,
    dispatch,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      getFieldValue,
    },
  }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'settingsPassword/password',
          payload: values,
        })
      }
    })
  }

  const hideModal = () => {
    dispatch({
      type: 'settingsPassword/hideModal',
    })
  }

  const handleConfirmPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('newPassword')) {
      callback('两次密码设置不一致！')
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }

  const handleConfirmOldPassword = (rule, value, callback) => {
    if (value && value === getFieldValue('oldPassword')) {
      callback('新旧密码不能一致！')
    }
    callback()
  }

  return (
    <Page className={styles.info} inner>
      <div className={styles.title}>
        <h2>设置密码</h2>
      </div>
      <Form className={styles['settings-form']} onSubmit={handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="姓名"
          hasFeedback
        >
          <Row gutter={8}>
            <Col span={24}>{settingsPassword.name}</Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="旧密码"
          hasFeedback
        >
          {getFieldDecorator('oldPassword', {
            rules: [
              { required: true, whitespace: true, message: '旧密码不能为空！' },
              { min: 8, max: 20, pattern: checkRules.password, message: '密码输入有误！' },
            ],
            validateTrigger: 'onBlur',
            validateFirst: true,
          })(
            <Input type="password" placeholder='请输入旧密码'/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="新密码"
          hasFeedback
        >
          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, whitespace: true, message: '密码不能为空！' },
              { min: 8, max: 20, pattern: checkRules.password, message: '请输入8-20英文和数字组合！' },
              { validator: handleConfirmOldPassword },
            ],
            validateTrigger: 'onBlur',
            validateFirst: true,
          })(
            <Input type="password" placeholder='请输入8-20位英文数字'/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="再次确认密码"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [
              { required: true, whitespace: true, message: '密码不能为空！' },
              { min: 8, max: 20, message: '请输入8-20英文和数字组合！' },
              { validator: handleConfirmPassword },
            ],
            validateTrigger: 'onBlur',
            validateFirst: true,
          })(
            <Input type="password" placeholder='请输入8-20位英文数字'/>
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" size="large" htmlType="submit" className={styles['settings-form-button']}>修改密码</Button>
        </FormItem>
      </Form>
      <Modal
        title="修改密码"
        closable={false}
        visible={settingsPassword.showModal}
        footer={[
          <Button key="back" onClick={hideModal}>留在本页</Button>,
          <Link to={settingsPassword.prevUrl}>
            <Button key="submit" type="primary" onClick={hideModal}>去设置页</Button>
          </Link>,
        ]}
      >
        <p>修改密码成功</p>
      </Modal>
    </Page>
  )
}

SettingsPassword.propTypes = {
  settingsPassword: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ settingsPassword = {}, loading }) => ({ settingsPassword, loading }))(Form.create()(SettingsPassword))
