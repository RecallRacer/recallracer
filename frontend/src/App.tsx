import React from "react";
import { AuthProvider } from "./authContext";
import { useRoutes, RouteObject, BrowserRouter } from "react-router-dom";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import { Navbar } from './Navbar';
import { Router } from './Router';

const App = () => {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
  ];

  return (
  <AuthProvider>
    <MantineProvider forceColorScheme="light">
      <Notifications />
        <Router/>
    </MantineProvider>
    </AuthProvider>
  );
};

export default App;