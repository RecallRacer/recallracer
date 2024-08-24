import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Router } from './Router';

export default function App() {
  return (
    <MantineProvider forceColorScheme='dark'>
      <Notifications />
      <Router />
    </MantineProvider>
  );
}