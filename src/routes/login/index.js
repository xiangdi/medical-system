import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Link } from 'dva/router'
import { Button, Row, Form, Input, Col } from 'antd'
import { config } from 'utils'
import styles from './index.less'
import Particles from 'react-particles-js'

const FormItem = Form.Item

const parOption = {
  particles: {
    color: {
      value: '#666',
    },
    line_linked: {
      shadow: {
        enable: true,
        color: '#333',
        blur: 1,
      },
    },
  },
}

const Login = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'login/login', payload: values })
    })
  }

  return (
    <div className="login-wrap">
      <Particles
        params={parOption}
      />
      <div className={styles.form}>
        <div className={styles.logo}>
          <img alt={'logo'} src={config.logo} />
          <div className={styles.logotitle}>
            <p className={styles.maintitle}>{config.name}</p>
            <p className={styles.subhead}>（测试版）</p>
          </div>
        </div>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '用户名必填',
                },
              ],
            })(<Input size="large" onPressEnter={handleOk} placeholder="请输入员工工号" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '密码不能为空',
                },
              ],
            })(<Input
              size="large"
              type="password"
              onPressEnter={handleOk}
              placeholder="请输入密码" 
            />)}
          </FormItem>
          <Row>
            <Button
              type="primary"
              size="large"
              onClick={handleOk}
              loading={loading.effects.login}
            >
              登录
            </Button>
          </Row>
          <Row className={styles.forgot}>
            <Col span={7} offset={18}>
              <Link to="/forgot">忘记密码？</Link>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(Login))
