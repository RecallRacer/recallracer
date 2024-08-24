import { Center, Container, Loader, Stack, Text, Title } from '@mantine/core';
import { Input } from '@mantine/core';
import { useState } from 'react';
import pdfToText from 'react-pdftotext';
import { notifications } from '@mantine/notifications';
import '@mantine/dropzone/styles.css';
import './custom-file-input.css'; // Import the custom CSS
import { useGenerateMaterials } from '@/hooks/useGenerateMaterial';
import { useNavigate } from 'react-router-dom';

export function LearnPage() {
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const { generateMaterials, loading } = useGenerateMaterials();
    const navigate = useNavigate();

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
                <Stack>
                    {loading ? <>
                        <Title>Generating active learning materials...</Title>
                        <Loader color="red" />
                    </>
                        :
                        ""}
                    {extractedText === null ?
                        <>
                            <Title>Start Learning</Title>
                            <Text>
                                Upload a PDF and we will generate a sequence of content designed to help you with active recall.
                            </Text>
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
