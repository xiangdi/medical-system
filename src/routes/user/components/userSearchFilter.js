import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select } from 'antd'
import Styles from './filter.less'

const Search = Input.Search
const Option = Select.Option
const FormItem = Form.Item
const InputGroup = Input.Group
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 15 },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onFilterChange,
  filter,
  userInfo,
  userData,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    validateFieldsAndScroll,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFieldsValue()
    onFilterChange(fields)
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    onFilterChange(fields)
  }

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      handleSubmit()
    })
  }
  const { empInfoType, empInfo } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <div className="filterwrap">
      <Row gutter={16}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 16 }}>
          <FilterItem label="客户信息">
            <InputGroup compact>
              <Row gutter={8}>
                <Col span={12}>
                  <FormItem>
                    {getFieldDecorator('empInfoType', { initialValue: '1' })(
                      <Select
                        style={{ width: '100%' }}
                      >
                        <Option value="1">手机号</Option>
                        <Option value="2">客户ID</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem>
                    {getFieldDecorator('empInfo', {
                      initialValue: empInfo,
                      rules: [{
                        required: true,
                        message: '请输入客户信息',
                      }],
                    })(
                      <Input style={{ width: '100%' }} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </InputGroup>
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div >
              <Button type="primary" className="margin-right" onClick={handleOk}>搜索</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
