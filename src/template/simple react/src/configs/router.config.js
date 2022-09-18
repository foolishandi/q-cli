import React from 'react';
import {useRoutes} from 'react-router-dom';
import AuthComponent from '../components/AuthComponent';
import LazyLoad from '../components/LazyLoad';
import Admin from '../pages/admin';

function IndexRouter(props) {
  const routerElement = useRoutes([
    //  重定向操作
    {
      path: '/',
      element: (
        <AuthComponent>
          <Admin></Admin>
        </AuthComponent>
      ),
      children: [
        //  二级路由的重定向
        {
          path: '/',
          element: LazyLoad('/home'),
        },

        {
          path: 'home',
          element: LazyLoad('/home'),
        },

        {
          path: 'rights',
          element: LazyLoad('/admin/rights'),
        },
        // 配置 无权限（404）
        {
          path: '*',
          element: LazyLoad('/error'),
        },
      ],
    },
    {
      path: '/login',
      element: LazyLoad('/login'),
    },
    // 配置 无权限（404）
    {
      path: '*',
      element: LazyLoad('/error'),
    },
  ]);

  return routerElement;
}

function IsAuth() {
  return !!localStorage.getItem('token');
}

export default IndexRouter;
