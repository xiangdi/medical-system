/**
 * organization
 */
// const debug = require('debug')('controller:dashboard')
const { _, formatNumber } = require('../lib/utils');

exports.list = async(ctx, next) => {
  const service = ctx.service.organization;
  let ret;
  let data;

  const {
    empId,
    ipAddress
  } = ctx.parseParams();

  let query = {
    empId,
    ipAddress,
  };

  try {
    ret = await service.fetch(query)
    data = {
      treeData: ret.orgByLevel,
    }
  } catch (error) {
    ctx.body = error._response
    return;
  }

  ctx.dumpJSON(data);
}
