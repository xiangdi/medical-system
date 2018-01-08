import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const VerifyCode = ({
  handleSendSmsCode,
  disabled,
  smsCodeText,
}) => {
  return (
    <Button size="large" onClick={handleSendSmsCode} disabled={disabled} style={{ top: -4, width: 150 }}>{smsCodeText}</Button>)
}

VerifyCode.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default VerifyCode
