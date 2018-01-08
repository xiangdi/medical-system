import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import styles from './search.less'
import { OrgList } from '../../../components/'
import { Form, Button, Row, Col, DatePicker, Input, Select, Icon } from 'antd'
import { parseRoleStatus } from '../../../utils/'
import { parseDateTime } from '../../../utils/dateFormat'

const Option = Select.Option
const Search = Input.Search
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
  userInfo,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
  emporg,
  dispatch,
  orgList,
  onOrgIdChange,
  organId,
}) => {
  let userRole
  let isAdmin
  let isEdifact
  let isManager
  let isStaff
  let empNa
  let employeeId
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
    onOrgIdChange({ organId: value })
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    if (isAdmin || isManager) {
      fields.orgId = organId
    } else {
      fields.orgId = orgList.id
    }
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    organId = ''
    onOrgIdChange({ organId })
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
      if (item == 'userSearchName') {
        fields.userSearchName = 'NAME'
      } else if (item == 'timeSearchName') {
        fields.timeSearchName = 'INVESTMENT'
      } else if (item == 'isInvite') {
        fields.isInvite = '2'
      } else if (item == 'searchTime') {
        fields.searchTime = [moment().subtract(30, 'days'), moment()]
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleDownload = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
    dispatch({ type: 'order/download', payload: fields })
  }
  const orgProps = {
    orgList,
    handleChange,
    organId,
    isStaff,
  }
  const { isInvite, orgId, userSearchName, searchTime } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  return (
    <div className={styles.filterwrap}>
      <Row gutter={24}>
        {
          isAdmin &&
          <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
            <FilterItem label="客户类型">
              {getFieldDecorator('isInvite', { initialValue: '2' })(
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="客户类型"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="2">全部</Option>
                  <Option value="1">有销售</Option>
                  <Option value="0">无销售</Option>
                </Select>
              )}
            </FilterItem>
          </Col>
        }
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="所在部门">
            {
              getFieldDecorator('orgId')(
                <OrgList {...orgProps} />
              )}
          </FilterItem>

        </Col>
        {
          !isStaff &&
          <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
            <FilterItem label="销售姓名">
              {
                getFieldDecorator('empName')(
                  <Input style={{ width: '100%' }} placeholder="请输入销售姓名" />
                )}
            </FilterItem>
          </Col>
        }
        {
          !isStaff &&
          <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
            <FilterItem label="销售工号">
              {
                getFieldDecorator('sourceValue')(
                  <Input style={{ width: '100%' }} placeholder="请输入销售工号" />
                )}
            </FilterItem>
          </Col>
        }
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="客户信息">
            <InputGroup>
              <Row gutter={12}>
                <Col span={12}>
                  <FormItem className={styles.mad}>
                    {getFieldDecorator('userSearchName', { initialValue: 'NAME' })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder="客户信息"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        showSearch
                      >
                        <Option value="NAME">姓名</Option>
                        <Option value="PHONE">手机号</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={12} >
                  <FormItem className={styles.mad}>
                    {getFieldDecorator('userSearchValue')(
                      <Input style={{ width: '100%' }} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </InputGroup>
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="产品名称">
            {getFieldDecorator('productName')(
              <Input style={{ width: '100%' }} placeholder="请输入产品名称" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="产品类型">
            {getFieldDecorator('productType')(
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="产品类型"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="PLAN">计划</Option>
              </Select>
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="订单号">
            {getFieldDecorator('orderNo')(
              <Input style={{ width: '100%' }} placeholder="请输入订单号" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }}>
          <FilterItem label="订单状态">
            {getFieldDecorator('orderStatus')(
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="订单状态"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="INPROGRESS">持有中</Option>
                <Option value="EXITED">已退出</Option>
                <Option value="EXITING">退出中</Option>
              </Select>
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 10 }} sm={{ span: 14 }}>
          <FilterItem>
            <InputGroup compact>
              <Row gutter={12}>
                <Col span={8}>
                  <FormItem className={styles.mad}>
                    {getFieldDecorator('timeSearchName', { initialValue: 'INVESTMENT' })(
                      <Select
                        style={{ width: '100%' }}
                        placeholder="时间检索"
                        showSearch
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Option value="INVESTMENT">投资时间</Option>
                        <Option value="EXPIRE">到期时间</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col span={16}>
                  <FormItem className={styles.mad} >
                    {getFieldDecorator('searchTime', { initialValue: [moment().subtract(30, 'days'), moment()] })(
                      <RangePicker style={{ width: '100%' }} allowClear={false} />
                    )}
                  </FormItem>
                </Col>
              </Row>
            </InputGroup>
          </FilterItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 24 }} md={{ span: 24 }} style={{ textAlign: 'center' }}>
          <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>搜索</Button>
          <Button size="large" className="margin-right" onClick={handleReset} type="primary" ghost>重置检索条件</Button>
          <Button size="large" onClick={handleDownload} type="primary" ghost>导出<Icon type="download" /></Button>
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
