import { useGetMaterials } from "@/hooks/useGetMaterials";
import { Center, Container, Loader, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './StartLearningPage.module.css';

export function StartLearningPage() {
    const { id } = useParams();
    const { getMaterials, loading } = useGetMaterials()
    const [data, setData] = useState({
        title: 'Loading...',
        short_description: 'Please wait while we load the content.',
        materials: []
    });

    useEffect(() => {
        const fetchMaterials = async () => {
            const responsePayload = await getMaterials(id as string)
            setData(responsePayload)
        }

        fetchMaterials()
    }, [])

    console.log(data)

    return (
        <>
            <Title className={styles.headerTitle}>Ziptide</Title>
            <div className={styles.cardContainer}>
                <Stack>
                    {loading ? (
                        <Center>
                            <Stack align="center">
                                <Title mb={16} className={styles.title}>Loading your learning materials...</Title>
                                <Loader color="red" size="xl" />
                            </Stack>
                        </Center>
                    ) : (
                        <>
                            <Title mt={24} className={styles.title}>
                                {data.title}
                            </Title>
                            <Text size="xl" className={styles.text}>
                                {data.short_description}
                            </Text>
                        </>
                    )}
                </Stack>
            </div>
        </>
    )
}
