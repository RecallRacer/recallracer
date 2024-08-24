import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "*",
        element: <Login />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}