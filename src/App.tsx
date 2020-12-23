import './App.css';

import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

import { Admin } from './pages'
import React from 'react'
import { Routers } from './routers'

function App () {
  return (
      <Switch>
        {
          Routers.map(router => (
            <Route
              exact={!router.notExect}
              key={router.path}
              path={router.path}
              component={router.component}
            >
            </Route>
          ))
        }
        {/* 设置默认路由 推荐方法一*/}
        {/* 方法一 */}
        <Route path="/admin" component={Admin} exact></Route>
        {/* 方法二 重定向*/}
        {/* <Redirect path="/" to="/admin" /> */}
      </Switch>
  )
}

export default withRouter(App)
