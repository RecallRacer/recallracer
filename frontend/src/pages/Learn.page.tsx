import { Center, Container, Loader, Stack, Text, Title } from '@mantine/core';
import { Input } from '@mantine/core';
import { useEffect, useState } from 'react';
import pdfToText from 'react-pdftotext';
import { notifications } from '@mantine/notifications';
import '@mantine/dropzone/styles.css';
import './custom-file-input.css'; // Import the custom CSS
import { useGenerateMaterials } from '@/hooks/useGenerateMaterial';
import { useNavigate } from 'react-router-dom';
import { useCreateRace } from '@/hooks/useCreateRace';
import { useAuth } from '@/authContext';
import styles from './StartLearningPage.module.css';

export function LearnPage() {
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const { generateMaterials, loading } = useGenerateMaterials();
    const { createRace } = useCreateRace()
    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth()
    console.log(userLoggedIn)

    useEffect(() => {
        if (!userLoggedIn) {
            navigate("/login");
        }
    }, []);

    function extractText(event: any) {
        const file = event.target.files[0];
        pdfToText(file)
            .then(async text => {
                notifications.show({
                    title: "We have successfully parsed your PDF!",
                    message: "Please wait as we generate learning materials for you!",
                    color: "green",
                });

                setExtractedText(text);
                const response = await generateMaterials(text);
                await createRace(currentUser?.email as string, response.data.id)
                navigate(`/learn/${response.data.id}`)
            })
            .catch((error) =>
                notifications.show({
                    title: "Failed to parse PDF..",
                    message: error,
                    color: "red"
                })
            );
    }

    return (
        <Container>
            <Center pt={50}>
                <Stack align="center">
                    <Title className={styles.headerTitle}>RecallRacer</Title>
                    {loading ? <>
                        <Title className={styles.loading} mt={30} mb={40} />
                        <span className={styles.loader}></span>
                    </>
                        :
                        ""}
                    {extractedText === null ?
                        <>
                            <Title>Upload a Material. </Title>
                            <Text size="xl" mb={10}>We'll make you and your friends learn at the speed of light.</Text>
                            <Input
                                className="custom-file-input"
                                type="file"
                                accept="application/pdf"
                                onChange={extractText}
                                radius="md"
                                size="md"
                                styles={(theme) => ({
                                    input: {
                                        borderColor: theme.colors.gray[3],
                                        backgroundColor: theme.colors.gray[0],
                                    },
                                })}
                            />
                        </>
                        :
                        ""
                    }
                </Stack>
            </Center>
        </Container>
    );
}
