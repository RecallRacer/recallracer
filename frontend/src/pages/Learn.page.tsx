import { Center, Loader, Stack, Text, Title } from '@mantine/core';
import { Input } from '@mantine/core';
import { useState } from 'react';
import pdfToText from 'react-pdftotext'
import { notifications } from '@mantine/notifications';

export function LearnPage() {
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function extractText(event: any) {
        const file = event.target.files[0]
        setLoading(true);
        pdfToText(file)
            .then(text => {
                notifications.show({
                    title: "We have successfully parsed your PDF!",
                    message: "Please wait as we generate learning materials for you!",
                    color: "green",
                })
                setExtractedText(text)
            })
            .catch((error) =>
                notifications.show({
                    title: "Failed to parse PDF..",
                    message: error,
                    color: "red"
                }))
        setLoading(false);
    }

    return (
        <>
            <Center pt={4}>
                <Stack>
                    {loading ? <Loader color="blue" /> : ""}
                    {extractedText === null ?
                        <>
                            <Title>Start Learning</Title>
                            <Text>
                                Upload a PDF and we will generate a sequence of content designed to help you with active recall.
                            </Text>
                            <Input type="file" accept="application/pdf" onChange={extractText} />
                        </>
                        :
                        <>
                            <Title>Generating content...</Title>
                        </>
                    }
                </Stack>
            </Center>
        </>
    );
}