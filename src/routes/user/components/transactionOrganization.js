import React from 'react'
import { TreeSelect, Row, Col, Form, Button, Select, Input } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { parseRoleStatus } from '../../../utils/'
import { OrgList } from '../../../components/'

const FormItem = Form.Item
const TreeNode = TreeSelect.TreeNode
const Option = Select.Option
const { TextArea } = Input
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TransactionOrg = ({
  userInfo,
  onOrganizationsChange,
  saleList,
  selectedUserIds,
  onSubmit,
  orgList,
  orgId,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    validateFieldsAndScroll,
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
  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields.orgId = orgId
    onSubmit(fields)
  }
  const renderSaleList = (data) => {
    if (data) {
      return data.map((item) => {
        return (
          <Option value={item.employeeId} title="" key={item.id}>{item.name}（{item.employeeId}）</Option>
        )
      })
    }
  }
  const handleChange = (value) => {
    organId = value
    onOrganizationsChange({ orgId: value })
  }

  const renderTransactionUsers = (data) => {
    if (Array.isArray(data)) {
      return data.join(',')
    }
    return data
  }
  const orgProps = {
    orgList,
    handleChange,
    isStaff,
    organId: orgId,
  }
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      handleSubmit()
    })
  }
  const handleReset = () => {
    orgId = ''
    onOrganizationsChange({ orgId })
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          if (item == 'userIds') {
            continue
          }
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
  }
  return (
    <div>
      <h3>移入</h3>
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 6 }} md={{ span: 10 }} sm={{ span: 10 }}>
          <FormItem>
            {getFieldDecorator('orgId')(
              <OrgList {...orgProps} />
            )}
          </FormItem>
        </Col>
        {
          <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }}>
            <FormItem>
              {getFieldDecorator('empCode', {
                rules: [
                  { required: true, message: '请选择销售!' },
                ],
              })(
                <Select
                  placeholder="请选择销售"
                  style={{ width: 220 }}
                  allowClear
                  showSearch
                  filterOption={(input, option) => option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    saleList && saleList.length &&
                    renderSaleList(saleList)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        }
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 6 }} sm={{ span: 8 }}>
          <FormItem>
            {getFieldDecorator('userIds', { initialValue: renderTransactionUsers(selectedUserIds) })(
              <Input type="hidden" />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormItem label="异动原因">
            {getFieldDecorator('reason')(
              <TextArea placeholder="请在此输入异动原因" autosize={{ minRows: 4, maxRows: 20 }} />
            )}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col xl={{ span: 2 }} md={{ span: 4 }} sm={{ span: 6 }}>
          <Button type="primary" size="large" className="margin-right" onClick={handleOk}>保存</Button>
        </Col>
        <Col xl={{ span: 2 }} md={{ span: 4 }} sm={{ span: 6 }}>
          <Button type="rest" size="large" className="margin-right" onClick={handleReset}>重置</Button>
        </Col>
      </Row>
    </div>
  )
}

TransactionOrg.propTypes = {
  form: PropTypes.object,
  transactionOrganization: PropTypes.object,
}

export default Form.create()(TransactionOrg)
