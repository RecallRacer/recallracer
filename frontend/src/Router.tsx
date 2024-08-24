import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { LearnPage } from './pages/Learn.page';
import { LoginPage } from './pages/Login.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/learn',
    element: <LearnPage />
  }, {
    path: '/login',
    element: <LoginPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
