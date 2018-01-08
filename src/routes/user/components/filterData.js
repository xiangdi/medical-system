import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { OrgList } from '../../../components/'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select } from 'antd'
import Styles from './filter.less'
import { parseRoleStatus } from '../../../utils/'

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
  onOrgIdChange,
  filter,
  userInfo,
  userData,
  orgList,
  orgId,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  let userRole
  let isAdmin
  let isEdifact
  let isManager
  let isStaff
  let organId
  if (userInfo && userInfo.permissions) {
    userRole = parseRoleStatus(userInfo.permissions.role)
    isAdmin = userRole.admin
    isEdifact = userRole.edifact
    isManager = userRole.manager
    isStaff = userRole.staff
  }
  const handleFields = (fields) => {
    const { searchTime } = fields
    if (searchTime.length) {
      fields.searchTime = [searchTime[0].format('YYYY-MM-DD'), searchTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleChange = (value) => {
    organId = value
    onOrgIdChange({ orgId: value })
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    if (isAdmin || isManager) {
      fields.orgId = orgId
    } else {
      fields.orgId = orgList.id
    }
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const orgProps = {
    orgList,
    handleChange,
    isStaff,
    organId: orgId,
  }
  const { name, address, hasEmp, orgCode, empInfoType, empInfo, saleInfo, userInfoType, userValue, userStatus } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <div className="filterwrap">
      <Row gutter={24}>
        {
          isAdmin &&
          <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
            <FilterItem label="客户类型">
              {getFieldDecorator('hasEmp', { initialValue: hasEmp || '2' })(
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="客户类型"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="0">无销售</Option>
                  <Option value="1">有销售</Option>
                  <Option value="2">全部</Option>
                </Select>
              )}
            </FilterItem>
          </Col>
        }
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="组织架构">
            {getFieldDecorator('orgId')(
              <OrgList {...orgProps} />
            )}
          </FilterItem>
        </Col>
        {
          (isAdmin || isManager) &&
          <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
            <FilterItem label="销售名称">
              <InputGroup compact>
                <Row gutter={8}>
                  <Col span={12}>
                    <FormItem>
                      {getFieldDecorator('empInfoType', { initialValue: empInfoType || '1' })(
                        <Select
                          style={{ width: '100%' }}
                        >
                          <Option value="1">员工编号</Option>
                          <Option value="2">员工姓名</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem>
                      {getFieldDecorator('empInfo', { initialValue: empInfo })(
                        <Input style={{ width: '100%' }} />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </InputGroup>
            </FilterItem>
          </Col>
        }
      </Row>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="客户信息">
            <InputGroup compact>
              <Row gutter={24}>
                <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }}>
                  <FormItem>
                    {getFieldDecorator('userInfoType', { initialValue: userInfoType || '0' })(
                      <Select
                        style={{ width: '100%' }}
                      >
                        <Option value="0">姓名</Option>
                        <Option value="1">手机号</Option>
                        <Option value="2">id</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={{ span: 12 }} md={{ span: 12 }} sm={{ span: 12 }}>
                  <FormItem>
                    {getFieldDecorator('userValue', { initialValue: '' })(
                      <Input />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </InputGroup>
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="注册时间">
            {getFieldDecorator('searchTime', { initialValue: initialCreateTime })(
              <RangePicker
                style={{ width: '100%' }}
                placeholder={['开始时间', '结束时间']}
              />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="投资状态">
            {getFieldDecorator('userStatus', { initialValue: userStatus })(
              <Select
                showSearch
                allowClear
                style={{ width: 200 }}
                placeholder="投资状态"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="0">未投资</Option>
                <Option value="1">投资中</Option>
                <Option value="2">已退出</Option>
              </Select>
            )}
          </FilterItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...TwoColProps} xl={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div >
              <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
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
