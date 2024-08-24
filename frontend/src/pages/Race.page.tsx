import { useGetMaterials } from "@/hooks/useGetMaterials"; import { Button, Card, Center, Container, Grid, GridCol, Loader, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from './StartLearningPage.module.css';
import { notifications } from "@mantine/notifications";
import { useIncrementScore } from "@/hooks/useIncrementScore";
import { useAuth } from "@/authContext";
import { useGetProgression } from "@/hooks/useGetProgression";
import { useIncrementProgression } from "@/hooks/useIncrementProgression";

const getSingularMaterial = (materials: any, q_number: number) => {
    console.log(q_number)
    const material = materials.find((item: any) => item._id === q_number);
    console.log("dapet", material)
    return material;
};

function QuestionType(qtype: string) {
    if (qtype === "reading") {
        return "Reading"
    } else if (qtype === "mcq_quiz") {
        return "Quiz"
    }
}

function hasNextQuestion(allMaterials: any, current_q_number: number): boolean {
    const next_q_number = current_q_number + 1;
    const nextMaterial = allMaterials.find((item: any) => item._id === next_q_number);
    return nextMaterial !== undefined;
}

function ReadingModule({ content }: { content: string }) {
    return (
        <Text size="xl" className={styles.text}>
            {content}
        </Text>
    )
}

function MCQModule({ question, options, selectedOption, setSelectedOption }: { question: string, options: any, selectedOption: any, setSelectedOption: any }) {
    return (
        <>
            <Text size="xl" className={styles.question}>
                {question}
            </Text>
            <Grid>
                {Object.keys(options).map((key) => (
                    <Grid.Col span={6} key={key}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            onClick={() => setSelectedOption(key)}
                            style={{
                                transition: "background-color 0.3s ease, transform 0.3s ease",
                                cursor: "pointer",
                                backgroundColor: selectedOption === key ? "#111111" : "#222222", // Darker gray if selected, default dark background if not
                                borderColor: selectedOption === key ? "green" : "#333", // Teal border if selected
                                color: selectedOption === key ? "green" : "#ffffff", // Teal text if selected, white if not
                                transform: selectedOption === key ? "scale(1.02)" : "none",
                            }}
                        >
                            <Text><span style={{ fontWeight: "bold" }}>{key}:</span>&nbsp;{options[key]}</Text>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>
        </>
    );
}

export function RacePage() {
    const { m_id, q_number } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { getMaterials, loading } = useGetMaterials();
    const { getProgression } = useGetProgression()
    const { incrementProgression } = useIncrementProgression();
    const [material, setMaterial] = useState<any>(null);
    const [allMaterials, setAllMaterials] = useState<any[]>([]);
    const [selectedOption, setSelectedOption] = useState();
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [progression, setProgression] = useState<any>();
    const { incrementScore } = useIncrementScore()

    function goToNextQuestion() {
        setHasSubmitted(false);

        const nextQuestionExists = hasNextQuestion(allMaterials, parseInt(q_number as string, 10));

        if (nextQuestionExists) {
            notifications.show({
                title: `You have successfully completed module ${q_number}`,
                message: "On to the next question! Gotta go fast!",
                color: "green",
            });
            navigate(`/learn/${m_id}/question/${parseInt(q_number as string, 10) + 1}`);
        } else {
            notifications.show({
                title: `Hooray! You have reached the finish line!`,
                message: "Well, did you manage to finish ahead of the others?",
                color: "green",
            });
            navigate(`/learn/${m_id}/leaderboard`);
        }
    }

    async function handleSubmit() {
        if (!material) return;

        if (material.type === "mcq_quiz") {
            if (selectedOption === material.correct_answer) {
                notifications.show({
                    title: `Congratulations! You answered correctly!`,
                    message: "Keep up the good work!",
                    color: "green",
                });
                console.log(currentUser?.email)
                await incrementScore(m_id as string, currentUser?.email as string)
                await incrementProgression(m_id as string, currentUser?.email as string)
            } else {
                notifications.show({
                    title: `Sorry, you answered incorrectly. The correct answer was ${material.correct_answer}`,
                    message: "Better luck next time!",
                    color: "red",
                });
            }
        }

        setSelectedOption(undefined)
        setHasSubmitted(true)
    }

    useEffect(() => {
        const fetchMaterials = async () => {
            const responsePayload = await getMaterials(m_id as string);
            setAllMaterials(responsePayload.materials || []);

            const singularMat = await getSingularMaterial(responsePayload.materials, parseInt(q_number as string, 10));
            setMaterial(singularMat);

            const resProgression = await getProgression(m_id as string)
            setProgression(resProgression)
        }

        fetchMaterials();
    }, [m_id, q_number]);

    console.log(progression)

    return (
        <div className={styles.pageContainer}>
            <Title className={styles.headerTitle}>RecallRacer</Title>
            <div className={styles.cardContainer}>
                <Stack>
                    {loading || !material ? (
                        <Center>
                            <Stack align="center">
                                <Title mb={16} className={styles.title}>Loading module {q_number}</Title>
                                <Loader color="red" size="xl" />
                            </Stack>
                        </Center>
                    ) : (
                        <>
                            <Grid mb={10} justify="space-between" align="center">
                                <GridCol span="auto">
                                    <Title className={styles.title}>
                                        Module {q_number} ({QuestionType(material.type)})
                                    </Title>
                                </GridCol>
                                <GridCol span="content">
                                    {material.type !== "reading" ?
                                        <Button disabled={hasSubmitted} color="green" size="lg" onClick={handleSubmit}>
                                            Submit
                                        </Button>
                                        : ""}
                                    {hasSubmitted || material.type === "reading" ?
                                        <Button ml={8} color="orange" size="lg" onClick={goToNextQuestion}>
                                            Next Module
                                        </Button>
                                        : ""}
                                </GridCol>
                            </Grid>
                            {material.type === "reading" && (
                                <ReadingModule content={material.material} />
                            )}
                            {material.type === "mcq_quiz" && (
                                <MCQModule question={material.question} options={material.options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                            )}
                            {material.type === "open_ended_quiz" && (
                                <></>
                            )}
                        </>
                    )}
                </Stack>
            </div>
        </div>
    );
}
