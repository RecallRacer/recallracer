import { Center, Code, Stack, Text, Title } from '@mantine/core';
import { Input } from '@mantine/core';
import { useState } from 'react';
import pdfToText from 'react-pdftotext'

export function LearnPage() {
    const [extractedText, setExtractedText] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    function extractText(event: any) {
        const file = event.target.files[0]
        setLoading(true);
        pdfToText(file)
            .then(text => setExtractedText(text))
            .catch(error => setError(error))
        setLoading(false);
    }

    return (
        <>
            <Center>
                <Stack>
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
                            <Title>Test</Title>
                        </>
                    }
                </Stack>
            </Center>
        </>
    );
}

function setError(error: any): any {
    throw new Error('Function not implemented.');
}
