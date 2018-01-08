import React from 'react'
import { connect } from 'dva'
import { Page } from 'components'
import { TransactionUserInfo, TransactionRecord, TransactionOrganization } from './components/index'

const Transaction = ({ location, userTransaction, dispatch, loading }) => {
  let size
  const { userInfo, userInfoData, selectedUserIds, orgId, transactionRecord, orgList, saleList } = userTransaction

  const userInfoProps = {
    dataSource: userInfoData,
  }
  const transactionRecordProps = {
    dataSource: transactionRecord,
  }
  const organizationsProps = {
    userInfo,
    saleList,
    orgList,
    orgId,
    selectedUserIds,
    userInfoData,
    onOrganizationsChange (payload) {
      dispatch({
        type: 'userTransaction/saleQuery',
        payload,
      })
    },
    onSubmit (payload) {
      dispatch({
        type: 'userTransaction/update',
        payload,
      })
    },
  }

  const userIdsLength = (data) => {
    size = data.join(',').split(',').length
    return size
  }

  return (
    <Page inner>
      <TransactionUserInfo {...userInfoProps} />
      {
        selectedUserIds && userIdsLength(selectedUserIds) == 1 &&
        <TransactionRecord {...transactionRecordProps} />
      }
      <TransactionOrganization {...organizationsProps} />
    </Page>
  )
}

Transaction.propTypes = {
}

export default connect(({ userTransaction, loading }) => ({ userTransaction, loading }))(Transaction)
