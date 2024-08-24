import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';
import { Navbar } from './Navbar';

export default function App() {
  return (
    <MantineProvider forceColorScheme='light'>
      <Notifications />
      <Navbar />
      <Router />
    </MantineProvider>
  );
}