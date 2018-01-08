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

function SettingsMobile (
  {
    settingsMobile,
    loading,
    dispatch,
    form: {
      getFieldDecorator,
      validateFieldsAndScroll,
      resetFields,
    },
  }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'settingsMobile/mobile',
          payload: values,
        })
      }
    })
  }

  const hideModal = () => {
    dispatch({
      type: 'settingsMobile/hideModal',
    })
  }

  const handleResetForm = () => {
    resetFields()
  }

  const countDown = () => {
    let count = settingsMobile.count
    const timer0 = setInterval(() => {
      if (count < 0) {
        clearInterval(timer0)
        return
      }
      dispatch({
        type: 'settingsMobile/countdown',
      })
      count--
    }, 1000)
  }

  const verifycode = {
    handleSendSmsCode () {
      validateFieldsAndScroll(['mobile'], (err, values) => {
        if (!err) {
          dispatch({
            type: 'settingsMobile/sendSmsCode',
            payload: {
              ...values,
              countDown,
            },
          })
        }
      })
    },
    disabled: settingsMobile.disabled,
    smsCodeText: settingsMobile.smsCodeText,
  }

  return (
    <Page className={styles.info} inner>
      <div className={styles.title}>
        <h2>修改手机号</h2>
      </div>
      <Form className={styles['settings-form']} onSubmit={handleSubmit}>

        <FormItem
          {...formItemLayout}
          label="新手机号"
        >
          {getFieldDecorator('mobile', {
            rules: [
              { required: true, whitespace: true, message: '手机号不能为空！' },
              { pattern: checkRules.mobile, message: '手机号不正确！' }],
            validateTrigger: 'onBlur',
            validateFirst: true,
          })(
            <Input size="large" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="短信验证码"
        >
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('smscode', {
                rules: [{ required: true, whitespace: true, message: '短信验证码不能为空！' },
                ],
                validateTrigger: 'onBlur',
                validateFirst: true,
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={8}>
              <VerifyCode {...verifycode} />
            </Col>
          </Row>
        </FormItem>


        <FormItem {...tailFormItemLayout}>
          <Row gutter={8}>
            <Col span={12}>
              <Button type="primary" size="large" htmlType="submit" className={styles['settings-form-button']}>保存</Button>
            </Col>
            <Col span={12}>
              <Button type="primary" size="large" htmlType="button" className={styles['settings-form-button']} onClick={handleResetForm}>重置</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
      <Modal
        title="修改手机号"
        visible={settingsMobile.showModal}
        closable={false}
        footer={[
          <Button key="back" onClick={hideModal}>留在本页</Button>,
          <Link to={settingsMobile.prevUrl}>
            <Button key="submit" type="primary" onClick={hideModal}>去个人信息修改页</Button>,
          </Link>,
        ]}
      >
        <p>修改手机号成功</p>
      </Modal>
    </Page>
  )
}

SettingsMobile.propTypes = {
  settingsMobile: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ settingsMobile = {}, loading }) => ({ settingsMobile, loading }))(Form.create()(SettingsMobile))
