import { Container, Text, Button, Group, stylesToString, Title } from '@mantine/core';
import classes from './HeroTitle.module.scss';
import { useNavigate } from 'react-router-dom';
import styles from "./StartLearningPage.module.css"

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <Title mb={40} className={styles.headerTitle}>RecallRacer</Title>
        <Text className={classes.description} style={{ fontSize: '2em' }}>
          We leverage LangChain to allow you and your peers to study and race together through active recall.
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
