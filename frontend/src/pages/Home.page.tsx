import React, { Suspense } from 'react';
import { Container, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Spline from '@splinetool/react-spline';
import classes from './HeroTitle.module.scss';
import styled from "styled-components";

export function HomePage() {
  const navigate = useNavigate();

  const Wrapper = styled.div`
    font-family: "Spline sans", sans-serif;
    font-size: 16px;
    color: white;
    position: relative;

    .spline {
      position: absolute;
      margin: 0;
      top: 0;
      right: 0;
    }
  `;

  const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%; /* Optional: If you want the content to span the full width */
`;

  return (
    <div className={classes.wrapper}>
      <Wrapper>
        <Spline className={classes.splineBackground} scene="https://prod.spline.design/1mdDWKJzxyXYxiJX/scene.splinecode" />
        <Content>
          <Container size={800} className={classes.content}>
          <h1 className={classes.title}>
            Learn{' '}
            <Text component="span" variant="gradient" gradient={{ from: 'maroon', to: 'red' }} inherit>
              fully featured
            </Text>{' '}
            React components and hooks library
          </h1>

          <Text className={classes.description}>
            Learn contents of PDFs by letting $app name$'s AI make quizzes, and race your friends to finish the modules the fastest!
          </Text>

          <Group className={classes.controls}>
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
        </Content>
      </Wrapper>
    </div>
  );
}

{/* <Container size={800} className={classes.content}>
        <h1 className={classes.title}>
          Learn{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'maroon', to: 'red' }} inherit>
            fully featured
          </Text>{' '}
          React components and hooks library
        </h1>

        <Text className={classes.description} color="dimmed">
          Learn contents of PDFs by letting $app name$'s AI make quizzes, and race your friends to finish the modules the fastest!
        </Text>

        <Group className={classes.controls}>
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
      </Container> */}