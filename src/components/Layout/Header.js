import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover } from 'antd'
import moment from 'moment'
import { parseDateTime } from '../../utils/dateFormat'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu

const Header = ({ user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu }) => {
  let handleClickLogout = () => logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  let userName
  let userLastTime
  if (user && user.isLogin) {
    userName = user.user.empName
    userLastTime = user.user.lastLoginTime
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div
          className={styles.button}
          onClick={switchSider}
        >
          <Icon type={classnames({ 'right-square-o': siderFold, 'left-square-o': !siderFold })} />
        </div>}
      <div className={styles.rightWarpper}>
        {/* <div className={styles.button}>
          <Icon type="mail" />
        </div> */}
        <Menu mode="horizontal" >
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {userName}
            </span>}
          >
            <Menu.Item>
              <Link to="/account/setting/empInfo">修改个人信息</Link>
            </Menu.Item>
            {/* <Menu.Item key="logout">
              退出
            </Menu.Item> */}
          </SubMenu>
        </Menu>
        <div className={styles['last-login-time']}>上次登录时间：{parseDateTime(userLastTime)}</div>
        <div onClick={handleClickLogout} className={styles['last-logout']}>退出登录</div>
      </div>
    </div>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
