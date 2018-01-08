import React from 'react'
import { TreeSelect } from 'antd'

const TreeNode = TreeSelect.TreeNode
const OrgList = ({ orgList, handleChange, isStaff, organId }) => {
  const { children, name, id } = orgList
  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} value={String(item.id)}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      if (item.id) {
        return <TreeNode title={item.name} key={item.id} value={String(item.id)} />
      }
    })
  }
  return (
    <div>
      {
        orgList.id && !isStaff &&
        <TreeSelect
          style={{ width: '100%' }}
          placeholder="所在部门"
          allowClear
          onChange={(handleChange)}
          treeDefaultExpandedKeys={['1']}
          value={organId || []}
        >
          <TreeNode title={name} key={id} value={String(id)}>
            {renderTreeNodes(children || [])}
          </TreeNode>
        </TreeSelect>
      }
      {
        orgList.id && isStaff &&
        <TreeSelect
          style={{ width: '100%' }}
          value={isStaff && String(orgList.id)}
          disabled={isStaff && true}
        >
          <TreeNode title={name} key={orgList.id} value={String(orgList.id)} />
        </TreeSelect>
      }
    </div>
  )
}

export default OrgList
