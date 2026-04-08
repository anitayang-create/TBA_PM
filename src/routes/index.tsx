import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import UserManagement from '../pages/Permission/UserManagement';
import RoleManagement from '../pages/Permission/RoleManagement';
import ProductManagement from '../pages/Product/ProductManagement';
import MemberManagement from '../pages/Member/MemberManagement';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/permission/users" replace />,
      },
      {
        path: 'permission/users',
        element: <UserManagement />,
      },
      {
        path: 'permission/roles',
        element: <RoleManagement />,
      },
      {
        path: 'product',
        element: <ProductManagement />,
      },
      {
        path: 'member',
        element: <MemberManagement />,
      },
      {
        path: '*',
        element: <Navigate to="/permission/users" replace />,
      }
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
