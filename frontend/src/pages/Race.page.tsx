import { useParams } from 'react-router-dom';
import { Button, Container, Text } from '@mantine/core';
import classes from './HeroTitle.module.scss';
import './RacePage.css';

export function RacePage() {
  const { learnid, quesnumber } = useParams<{ learnid: string; quesnumber: string }>();
  const quizTitle = "ISYS2120 Weeks 1 - 5 !";
  const question = "What is a DDL query?";
  const points = "20 points";
  const questionType = "mcq";

  const options = ["Option A", "Option B", "Option C", "Option D"];

  console.log("RacePage rendered with", { learnid, quesnumber });

  return (
    <div>
      <h1 className={classes.title} style={{ fontSize: '4rem', lineHeight: '1.2' }}>🏁Race: {quizTitle}</h1>
      <p>Learn ID: {learnid}</p>
      <p>Question Number: {quesnumber}</p>
      <Container className="quizContainer">
        <Text className="questionText" style={{ fontSize: '2em' }}>{question}</Text>
        {questionType === "mcq" && (
          <div className="optionsGrid">
            {options.map((option, index) => (
              <button key={index} className="optionButton">{option}</button>
            ))}
          </div>
        )}
        <Button className="submitButton">Submit</Button>
      </Container>
    </div>
  );
}
