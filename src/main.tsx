import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import "bootstrap-icons/font/bootstrap-icons.min.css";
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import DefaultLayout from './layouts/DefaultLayout';
import LoginPage from './pages/Auth/LoginPage';

const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const FeedPage = lazy(() => import('./pages/Feed'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DefaultLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Carregando...</div>}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
