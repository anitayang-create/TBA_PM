import { createHashRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import UserManagement from '../pages/Permission/UserManagement';
import RoleManagement from '../pages/Permission/RoleManagement';
import ProductManagement from '../pages/Product/ProductManagement';
import MemberManagement from '../pages/Member/MemberManagement';
import OrderManagement from '../pages/Order/OrderManagement';
import BannerManagement from '../pages/Content/BannerManagement';
import FAQManagement from '../pages/Content/FAQManagement';
import AuditLog from '../pages/System/AuditLog';


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
        path: 'order',
        element: <OrderManagement />,
      },
      {
        path: 'content/banners',
        element: <BannerManagement />,
      },
      {
        path: 'content/faq',
        element: <FAQManagement />,
      },
      {
        path: 'system/audit-log',
        element: <AuditLog />,
      },
      {
        path: '*',
        element: <Navigate to="/permission/users" replace />,
      }
    ],
  },
];

const router = createHashRouter(routes);

export default router;
