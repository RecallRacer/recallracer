import { useParams } from 'react-router-dom';
import { Button, Container, Text } from '@mantine/core';
import { useState } from 'react';
import classes from './HeroTitle.module.scss';
import './RacePage.css';
import { notifications } from '@mantine/notifications';

export function RacePage() {
  const { learnid, quesnumber } = useParams<{ learnid: string; quesnumber: string }>();
  const quizTitle = "ISYS2120 Weeks 1 - 5 !";
  const question = "What is a DDL query?";
  const points = "20 points";
  const questionType = "mcq";

  const [answer, setAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle submission for open-ended questions
  const handleSubmitOpenEnded = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      console.log("Form submitted with answer:", answer);
      setAnswer(''); // Reset the input field
      setIsSubmitting(false); // Re-enable the submit button
    }, 2000); // Simulating a delay

    notifications.show({
      title: "Submitted answer successfully.",
      message: "On to the next question!",
      color: "green",
    });
  };

  // Handle submission for MCQ questions
  const handleSubmitMCQ = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (e.g., API call)
    setTimeout(() => {
      console.log("MCQ submitted with selected option:", selectedOption);
      setSelectedOption(''); // Reset the selected option
      setIsSubmitting(false); // Re-enable the submit button
    }, 2000); // Simulating a delay

    notifications.show({
      title: "Submitted answer successfully.",
      message: "On to the next question!",
      color: "green",
    });
  };

  return (
    <div>
      <h1 className={classes.title} style={{ fontSize: '4rem', lineHeight: '1.2' }}>🏁Race: {quizTitle}</h1>
      <p>Learn ID: {learnid}</p>
      <p>Question Number: {quesnumber}</p>
      <Container className="quizContainer">
        <Text className="questionText" style={{ fontSize: '2em' }}>{question}</Text>
        {questionType === "mcq" ? (
          <form className="optionsGrid" onSubmit={handleSubmitMCQ}>
            {["Option A", "Option B", "Option C", "Option D"].map((option, index) => (
              <button
                key={index}
                type="button"
                className={`optionButton ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => setSelectedOption(option)}
                disabled={isSubmitting} // Disable the options while submitting
              >
                {option}
              </button>
            ))}
            <Button
              className="submitButton"
              type="submit"
              disabled={isSubmitting || !selectedOption} // Disable the button if no option is selected or while submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        ) : (
          <form className="answerForm" onSubmit={handleSubmitOpenEnded}>
            <input
              className="answerField"
              placeholder='Enter your answer'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={isSubmitting} // Disable the input while submitting
            />
            <Button
              className="submitButton"
              type="submit"
              disabled={isSubmitting} // Disable the button while submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </Container>
    </div>
  );
}
