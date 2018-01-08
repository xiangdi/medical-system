'use strict';

var Status = {};

Status[Status['SUCCESS'] = 0] = 'success';
Status[Status['FAIL'] = 1] = '操作失败，请稍后重试';
Status[Status['PARAMS_REQUIRED'] = 2] = 'params requried';

Status[Status['VERIFY_CODE'] = 102] = '图形验证码不能为空';
Status[Status['PARAMS_FAIL'] = 104] = 'params fail';

Status[Status['CAPTCHA_EXPIRE'] = 411] = '验证码过期，请重新获取';
Status[Status['TIMESTAMP_FAIL'] = 412] = '未登录';
Status[Status['SERVER_FAIL'] = 500] = 'server error';

module.exports = Status;
