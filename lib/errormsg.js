/**
 * errormsg
 */
var ErrMsg = {
  // def
  def: '操作失败，稍后重试',
  // login
  login: '请输入正确的用户名和密码',
  loginCount: '登录失败次数过多,请稍后再试',
  loginPassword: '密码不正确',
  emptyPassword: '密码不能为空',
  isLogin: '请登录后操作',
  // mobile
  isMobile: '请输入正确的手机号码',
  emptyMobile: '请输入手机号码',
  equalMobile: '手机号码不能和当前相同',
  mobileExists: '该手机号已注册',
  trialActivityMobileExists: '此活动仅限新用户参加',
  mobileNotExists: '手机号码不存在',
  noRegister: '该账号未被注册',
  isHeroRate: '请输入收益率',
  // captcha
  isCaptcha: '请输入正确的验证码',
  isCaptchaCorrect: '请输入正确的图形验证码',
  lenCaptcha: '请输入正确的验证码',
  expireCaptcha: '验证码过期，请重新获取',
  emptyCaptcha: '图形验证码不能为空',
  // smscode
  isCode: '请输入正确的手机验证码',
  emptyCode: '请输入手机验证码',
  isSmsCode: '请输入正确的短信验证码',
  quickSmsCode: '验证码发送过于频繁，1分钟后再试',
  lenSmsCode: '请输入正确的手机验证码',
  // nickname
  isNickName: '请输入正确的昵称',
  emptyNickName: '请输入昵称,2-12个字符',
  nickNameExists: '昵称已存在',
  lenNickName: '2-12个字符',
  // password
  isPwd: '密码长度应为8-20位',
  emptyPwd: '请输入密码',
  emptyCurrentPwd: '请输入当前密码',
  emptyRePwd: '请输入确认密码',
  emptyNewPwd: '新密码不能为空',
  emptyReNewPwd: '重复密码不能为空',
  lenPwd: '密码长度8-20个字符',
  rePwd: '两次输入密码不一致',
  currentPwd: '当前密码不正确',
  purePwd: '密码不能是纯数字或纯字母',
  equalPwd: '新密码不能原密码相同',
  lenNewPwd: '新密码长度8-20个字符',
  illegalPwd: '密码不能包含特殊字符',
  lenTradPwd: '6位数字交易密码',
  isFormatTradPwd: '交易密码格式不正确',
  // realname
  isRealname: '请输入正确的姓名',
  emptyRealname: '请输入真实姓名',
  isEmptyUserId: '用户id不能为空',
  // Identity
  isIdentity: '身份证号码不正确',
  emptyIdentity: '请输入身份证号',
  isMateIdentity: '请输入正确的身份证号',
  // Trusted
  isTrusted: '请先进行实名认证',
  articleError: '暂无数据',
  productNoError: '暂无数据',
  // smscode
  isEmptySmsCode: '短信验证码不能为空',
  sendVerifyCodeError: '发送短信验证码失败',
  lenSmsError: '验证码输入有误',
  isEmptySmsCodeType: '发送验证码类型不能为空',
  isActionError: '发送短信类型有误',
  //staff
  isStaffId: '未查询到该员工号，请重新输入',
};


module.exports = ErrMsg;
