import { Container, Text, Button, Group } from '@mantine/core';
import classes from './HeroTitle.module.scss';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title} style={{ fontSize: '4rem', lineHeight: '1.2' }}>
          Learn{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'maroon', to: 'red' }} inherit>
            fully featured
          </Text>{' '}
          React components and hooks library
        </h1>

        <Text className={classes.description} color="dimmed" style={{ fontSize: '2em' }}>
          Learn contents of PDFs by letting $app name$'s AI make quizzes, and race your friends to finish the modules the fastest!
        </Text>

        <Group className={classes.controls} mt={50}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'maroon', to: 'red' }}
            onClick={() => navigate('/learn')}
          >
            Get started
          </Button>
        </Group>
      </Container>
    </div>
  );
}
