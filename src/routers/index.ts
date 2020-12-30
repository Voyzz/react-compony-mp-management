import {
  Admin,
} from '../pages'

export type RouterType = {
  path: string,
  component: React.LazyExoticComponent<any>,
  root: string[],
  notExect?: boolean,
}

const HomeRouter: RouterType = {
  path: '/admin',
  component: Admin,
  root: [],
}
// 总路由
const Routers: RouterType[] = ([
  HomeRouter,
])

export {
  Routers
}