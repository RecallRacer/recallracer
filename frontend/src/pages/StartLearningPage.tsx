import { useGetMaterials } from "@/hooks/useGetMaterials";
import { Button, Center, Container, Loader, Modal, Stack, Text, TextInput, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './StartLearningPage.module.css';
import { useAddPlayer } from "@/hooks/useAddPlayer";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import { useGetPlayers } from "@/hooks/useGetPlayers";
import { useToggleRace } from "@/hooks/useToggleRace";
import { useGetRace } from "@/hooks/useGetRace";
import { useInitLeaderboard } from "@/hooks/useInitLeaderboard";
import { useCreateProgression } from "@/hooks/useCreateProgression";

export function StartLearningPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getMaterials, loading } = useGetMaterials()
    const { initLeaderboard } = useInitLeaderboard()
    const { createProgression } = useCreateProgression();
    const { getPlayers } = useGetPlayers();
    const { toggleRace } = useToggleRace()
    const { getRace } = useGetRace();
    const [opened, { open, close }] = useDisclosure(false);
    const { addPlayer } = useAddPlayer();
    const [data, setData] = useState({
        title: 'Loading...',
        short_description: 'Please wait while we load the content.',
        materials: []
    });
    const [players, setPlayers] = useState<string[]>([])
    const [refetchMaterials, setRefetchMaterials] = useState(false)
    const [refetchPlayers, setRefetchPlayers] = useState(false)
    const [refetchRace, setRefetchRace] = useState(false)
    const [raceActive, setRaceActive] = useState(false)

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
        const fetchAPI = async () => {
            const materialsPayload = await getMaterials(id as string)
            setData(materialsPayload)
        }

        fetchAPI()
        setRefetchMaterials(false)
    }, [refetchMaterials])

    useEffect(() => {
        const fetchAPI = async () => {
            const playersPayload = await getPlayers(id as string)
            setPlayers(playersPayload)
        }

        fetchAPI()
        setRefetchPlayers(false)
    }, [refetchPlayers])

    useEffect(() => {
        const fetchAPI = async () => {
            const racePayload = await getRace(id as string)
            setRaceActive(racePayload.is_active)
        }

        fetchAPI()
        setRefetchRace(false)
    }, [refetchRace])

    return (
        <div className={styles.pageContainer}>
            <Modal opened={opened} onClose={close} title="Add a Player">
                <form onSubmit={form.onSubmit((values) => {
                    addPlayer(id as string, values.email)
                    setRefetchPlayers(true)
                    close()
                })}>
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
            <Title className={styles.headerTitle}>RecallRacer</Title>
            <div className={styles.cardContainer}>
                <Stack>
                    {loading ? (
                        <>
                            <Title className={styles.loading} mt={30} mb={40} />
                            <span className={styles.loader}></span>
                        </>
                    ) : (
                        <>
                            <Title className={styles.title}>
                                {data.title}
                            </Title>
                            <Text size="xl" className={styles.text}>
                                {data.short_description}
                            </Text>
                            <Text size="xl">
                                <span style={{ fontWeight: "bold" }}>Players:</span> {players.length === 0 ? "There are currently no players" : players.join(", ")}
                            </Text>
                            <Button onClick={open} size="lg" color="gray" variant="outline" loading={loading}>
                                Invite another player to the study race!
                            </Button>
                            <Button
                                variant="gradient"
                                size="xl"
                                gradient={!raceActive ? { from: 'maroon', to: 'orange', deg: 90 } : { from: 'orange', to: 'yellow', deg: 90 }}
                                onClick={async () => {
                                    if (raceActive) {
                                        await initLeaderboard(id as string);
                                        navigate(`/learn/${id}/question/1`)
                                    } else {
                                        const responsePayload = await toggleRace(id as string, !raceActive);
                                        await setRaceActive(responsePayload.data.is_active)
                                        setRefetchRace(true)
                                    }
                                }}
                            >
                                {raceActive ? "Click here to start learning!" : "Start Racing"}
                            </Button>
                        </>
                    )}
                </Stack>
            </div>
        </div >
    )
}
