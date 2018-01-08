import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Button, Row, Form, Input, Layout, Col, Icon, Select, Steps } from 'antd'
import { config, checkRules } from 'utils'
import styles from './index.less'
const { Header, Content, Footer } = Layout;
import { VerifyCode, Page } from 'components'

const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;

const Forgot = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    getFieldsError,
    getFieldsValue
  },
  forgot
}) => {
  const { currentStep, count, imgDataUri } = forgot
  var base64Icon = 'data:image/png;base64,' + imgDataUri
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 6,
      },
    },
  };
  const prefixSelector = getFieldDecorator('prefix', {
    initialValue: '86',
  })(
    <Select style={{ width: 80 }}>
      <Option value="86">+86</Option>
      <Option value="87">+87</Option>
    </Select>
  );
  
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'forgot/checkIdentity',
          payload: values
        })
      }
    })
  };
  
  const handleSetting = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'forgot/update',
          payload: values
        })
      }
    })
  };
  
  const handleSendCaptcha = () => {
    dispatch({
      type: 'forgot/sendCaptcha'
    })
  };
  
  const handleConfirmPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('newPassword')) {
      callback('两次密码设置不一致！')
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  
  const verifycode = {
    handleSendSmsCode() {
      validateFieldsAndScroll(['mobile', 'captcha'], (err, values) => {
        if (!err) {
          dispatch({
            type: 'forgot/sendSmsCode',
            payload: values
          })
          let count= forgot.count;
          const timer0 = setInterval(function() {
            if (count < 0) {
              clearInterval(timer0);
              return;
            }
            dispatch({
              type: 'forgot/countdown'
            });
            count--
          }, 1000)
        }
      })
    },
    disabled: forgot.disabled,
    smsCodeText: forgot.smsCodeText
  };
  
  return (
    <Layout className="layout">
      <Content className={styles.content}>
        <Row className={styles.link}>
          <Col span={8} className={styles.header}>
            <Link to="/login">
              <img className={styles.logo} alt={'logo'} src={config.logo} />
            </Link>
            <span>{config.name}</span>
          </Col>
          <Col span={5} offset={11} className={ styles['login-form-link'] }>
            <Link to="/login">立即登录</Link>
          </Col>
        </Row>
        <div style={{ background: '#fff', padding: 24 }}>
          
          <Steps current={forgot.currentStep} className={styles.steps}>
            <Step title="验证身份"/>
            <Step title="修改新密码"/>
            <Step title="修改成功"/>
          </Steps>
          <div className="steps-content">
            {currentStep === 0 && <Form className={styles["forgot-form"]} onSubmit={handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="员工编号"
              >
                {getFieldDecorator('empId', {
                  rules: [{
                    required: true, whitespace: true, message: '员工号不能为空！',
                  },{
                    len: 12, message: '员工号不正确！',
                  }],
                  validateTrigger: 'onBlur',
                  validateFirst: true
                })(
                  <Input size="large"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号码"
              >
                {getFieldDecorator('mobile', {
                  rules: [
                    {required: true, whitespace: true, message: '手机号不能为空！' },
                    {pattern: checkRules.mobile, message: '手机号输入有误！'},
                    ],
                  validateTrigger: 'onBlur',
                  validateFirst: true
                })(
                  <Input addonBefore={prefixSelector} style={{ width: '100%' }} size="large"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="图形验证码"
              >
                <Row gutter={6}>
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, whitespace: true, message: '图形验证码不能为空！' },
                        { min: 4, max: 6, message: '图形验证码有误！' }
                      ],
                      validateTrigger: 'onBlur',
                      validateFirst: true
                    })(
                      <Input  size="large" />
                    )}
                  </Col>
                  <Col span={12}>
                    <img size="large" className={styles.captha} src={base64Icon} onClick={handleSendCaptcha}/>
                  </Col>
                </Row>
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="短信验证码"
              >
                <Row gutter={6}>
                  <Col span={12}>
                    {getFieldDecorator('smscode', {
                      rules: [{ required: true, whitespace: true, message: '短信验证码不能为空！' },
                        {len: 6, message: '短信验证码有误！'}
                      ],
                      validateTrigger: 'onBlur',
                      validateFirst: true
                    })(
                      <Input size="large" />
                    )}
                  </Col>
                  <Col span={12}>
                    <VerifyCode {...verifycode}/>
                  </Col>
                </Row>
              </FormItem>
              <Row>
                <Col span={18} offset={6}>
                  <Button type="primary" htmlType="submit" className={styles['login-form-button']} size="large" >下一步</Button>
                </Col>
              </Row>
            </Form>}
            {currentStep === 1 && <Form className={styles["forgot-form"]} onSubmit={handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="新密码"
              >
                {getFieldDecorator('newPassword', {
                  rules: [
                    {required: true, whitespace: true, message: '新密码不能为空！'},
                    {min: 8, max:20, pattern: checkRules.password, message: '密码输入有误！'}
                  ],
                  validateTrigger: 'onBlur',
                  validateFirst: true
                })(
                  <Input type="password" size="large"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="再次确认密码"
              >
                {getFieldDecorator('confirm', {
                  rules: [
                    {required: true, whitespace: true, message: '重新输入密码不能为空！'},
                    {min: 8, max:20, message: '密码输入有误！'},
                    {validator: handleConfirmPassword }
                  ],
                  validateTrigger: 'onBlur',
                  validateFirst: true
                })(
                  <Input type="password" size="large"/>
                )}
              </FormItem>
              <Row>
                <Col span={18} offset={6}>
                  <Button type="primary" htmlType={'button'} className={styles['login-form-button']} onClick={handleSetting} size="large">设置</Button>
                </Col>
              </Row>
            </Form>}
            {currentStep === 2 && <div className={styles['setting-ok']}>
              <img src={'/edit-success.png'}/>
              <span>密码修改成功</span>
              <Button type="primary" size="large" className={styles['login-btn']}>
                <a href="/login">立即登录</a>
              </Button>
            </div>}
          </div>
        </div>
      </Content>
    </Layout>
  )
}

Forgot.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading, forgot }) => ({ loading, forgot }))(Form.create()(Forgot))

