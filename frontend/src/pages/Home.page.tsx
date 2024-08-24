import { Container, Text, Button, Group } from '@mantine/core';
import classes from './HeroTitle.module.scss';
import { useNavigate } from 'react-router-dom';
import styles from "./StartLearningPage.module.css"

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <h1 className={classes.title} style={{ fontSize: '4rem', lineHeight: '1.2' }}>
          A{' '}
          <Text component="span" className={styles.headerTitle} inherit>
            blazingly fast
          </Text>{' '}
          and <Text component="span" className={styles.headerTitle} inherit>
            fun
          </Text>{' '}way to study by racing against your peers.
        </h1>

        <Text className={classes.description} color="dimmed" style={{ fontSize: '2em' }}>
          We leverage LangChain to allow you and your peers to study together through active recall.
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
