import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { LocaleProvider } from 'antd'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/organization',
      models: () => [import('./models/organization')],
      component: () => import('./routes/organization/'),
    }, {
      path: '/user',
      models: () => [import('./models/user')],
      component: () => import('./routes/user/'),
    }, {
      path: '/user/search',
      models: () => [import('./models/userSearch')],
      component: () => import('./routes/user/userSearch'),
    }, {
      path: '/user/transaction',
      models: () => [import('./models/userTransaction')],
      component: () => import('./routes/user/userTransaction'),
    }, {
      path: '/user/detail/:id',
      models: () => [import('./models/userDetail')],
      component: () => import('./routes/user/userDetail'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/request',
      component: () => import('./routes/request/'),
    }, {
      path: '/chart/ECharts',
      component: () => import('./routes/chart/ECharts/'),
    }, {
      path: '/chart/highCharts',
      component: () => import('./routes/chart/highCharts/'),
    }, {
      path: '/chart/Recharts',
      component: () => import('./routes/chart/Recharts/'),
    }, {
      path: '/order',
      models: () => [import('./models/order')],
      component: () => import('./routes/order/'),
    }, {
      path: '/order/derive',
      models: () => [import('./models/order')],
      component: () => import('./routes/order/'),
    }, {
      path: '/order/:id',
      models: () => [import('./models/order.detail')],
      component: () => import('./routes/order/order.detail'),
    }, {
      path: '/forgot',
      models: () => [import('./models/forgot')],
      component: () => import('./routes/forgot'),
    }, {
      path: '/account/setting',
      models: () => [import('./models/settings')],
      component: () => import('./routes/settings/'),
    }, {
      path: '/account/setting/empInfo',
      models: () => [import('./models/settings.empInfo')],
      component: () => import('./routes/settings/empInfo'),
    }, {
      path: '/account/setting/mobile',
      models: () => [import('./models/settings.mobile')],
      component: () => import('./routes/settings/mobile'),
    }, {
      path: '/account/setting/password',
      models: () => [import('./models/settings.password')],
      component: () => import('./routes/settings/password'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
