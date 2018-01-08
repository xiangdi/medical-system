/**
 * dashboard
 */
// const debug = require('debug')('controller:dashboard')
const { _, formatNumber } = require('../lib/utils')

const dashboard = async (ctx, next) => {
  await next()
}

dashboard.trad = async (ctx, next) => {
  const service = ctx.service.dashboard

  let data

  const {
    empId,
    ipAddress,
  } = ctx.parseParams()

  let query = {
    empId,
    ipAddress,
  }

  try {
    values = await Promise.all([
      service.fetch(query, 'trad_view'),
      service.fetch(query, 'deal_trad'),
      service.fetch(query, 'invest_deadline'),
      service.fetch(query, 'staff_situation'),
    ])

    data = {
      tradData: [_.get(values, '[0].dealFinanceExcel')],
      dealTrad: _.get(values, '[1].tradeCurveInfo'),
      invest: _.get(values, '[2].dealAmountDistribute'),
      situation: [_.get(values, '[3].customerCountExcel')],
    }
  } catch (error) {
    ctx.body = error._response
    return
  }
  ctx.dumpJSON(data)
}

module.exports = dashboard
