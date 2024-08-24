import { useGetMaterials } from "@/hooks/useGetMaterials";
import { Button, Center, Container, Loader, Modal, Stack, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from './StartLearningPage.module.css';
import { useAddPlayer } from "@/hooks/useAddPlayer";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form';

export function StartLearningPage() {
    const { id } = useParams();
    const { getMaterials, loading } = useGetMaterials()
    const [opened, { open, close }] = useDisclosure(false);
    const { addPlayer } = useAddPlayer();
    const [data, setData] = useState({
        title: 'Loading...',
        short_description: 'Please wait while we load the content.',
        materials: []
    });

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
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
        <div className={styles.pageContainer}>
            <Modal opened={opened} onClose={close} title="Add a Player">
                <form onSubmit={form.onSubmit((values) => addPlayer(id as string, values.email))}>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="Enter player's email address here..."
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <Button mt={16} color="red" type="submit">Submit</Button>
                </form>
            </Modal>
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
                            <Title className={styles.title}>
                                {data.title}
                            </Title>
                            <Text size="xl" className={styles.text}>
                                {data.short_description}
                            </Text>
                            <Text size="xl">
                                <span style={{ fontWeight: "bold" }}>Players:</span> user1, user2
                            </Text>
                            <Button onClick={open} size="lg" color="red" variant="outline" loading={loading}>
                                Invite another player to the study race!
                            </Button>
                            <Button
                                variant="gradient"
                                size="xl"
                                gradient={{ from: 'maroon', to: 'orange', deg: 90 }}
                            >
                                Start the Race!
                            </Button>
                        </>
                    )}
                </Stack>
            </div>
        </div >
    )
}
