import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Card, Tree } from 'antd'
import { color } from 'utils'
import { Page } from 'components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    background: '#fff',
  },
}
const TreeNode = Tree.TreeNode

function Organization ({ organization, loading }) {
  
  const { treeData } = organization
  const { level, children , name } = treeData

  const renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.id} />;
    });
  }
  return (
    <Page className={styles.organization}>
      <Tree
        showLine
        defaultExpandedKeys={['0-0']}
      >
        <TreeNode title={name} key="0-0">   
          {renderTreeNodes(children || [])}
        </TreeNode>
      </Tree>
    </Page>
  )
}

Organization.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ organization, loading }) => ({ organization, loading }))(Organization)
