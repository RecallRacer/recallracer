import { useEffect, useState } from 'react';
import { Center, Code, Stack, Title } from '@mantine/core';
import { useHealthCheck } from '@/hooks/useHealthCheck';

import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import classes from './HeroTitle.module.scss';

export function HomePage() {
  const { healthCheck } = useHealthCheck();
  const [health, setHealth] = useState();

  useEffect(() => {
    async function requestHealthCheck() {
      const healthStatus = await healthCheck();
      setHealth(healthStatus);
    }
    requestHealthCheck();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          Learn{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            fully featured
          </Text>{' '}
          React components and hooks library
        </h1>

        <Text className={`${classes.description} m-10`} color="dimmed">
          Learn contents of PDFs by letting $app name$'s AI make quizzes, and race your friends to finish the modules the fastest!
        </Text>

        <Group className={`${classes.controls} mt-10`}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
}
