import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './authContext';
import Header from './components/header';
import { HomePage } from './pages/Home.page';
import { LearnPage } from './pages/Learn.page';
import Login from './components/auth/login';
import Register from './components/auth/register';
import { StartLearningPage } from './pages/StartLearningPage';

export default function App() {
  return (
    <AuthProvider>
      <MantineProvider forceColorScheme="light">
        <Notifications />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:id" element={<StartLearningPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </AuthProvider>
  );
}
