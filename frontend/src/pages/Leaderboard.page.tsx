import { Card, Stack, Text, Title } from '@mantine/core';
import styles from './StartLearningPage.module.css';
import { useParams } from 'react-router-dom';
import { useGetLeaderboard } from '@/hooks/useGetLeaderboard';
import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export function LeaderboardPage() {
    const { m_id } = useParams();
    const { getLeaderboard } = useGetLeaderboard();
    const [leaderboard, setLeaderboard] = useState<{ email: string, score: number }[]>([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getLeaderboard(m_id as string);
            const sortedLeaderboard = Object.entries(response.data.players ?? {}).sort(
                ([, scoreA], [, scoreB]) => scoreB - scoreA
            );

            const leaderboardData = sortedLeaderboard.map(([email, score]) => ({
                email,
                score,
            }));
            setLeaderboard(leaderboardData);
        };

        fetchAPI();
    }, [m_id]);

    return (
        <div className={styles.pageContainer}>
            <Title className={styles.headerTitle}>RecallRacer</Title>
            <Title mt={20} mb={20}>Leaderboard</Title>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={leaderboard}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="email" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="maroon" />
                </BarChart>
            </ResponsiveContainer>
            {leaderboard.length > 0 ? (
                <>
                    <Text size="lg" mb={40}>{leaderboard[0].email} has won the race!</Text>
                    <Stack>
                        {leaderboard.map(({ email, score }, index) => (
                            <Card
                                key={email}
                                mb={12}
                                shadow="sm"
                                padding="lg"
                                radius="md"
                                style={{
                                    backgroundColor: index === 0 ? '#ffeb3b' : index === 1 ? '#e0e0e0' : index === 2 ? '#cd7f32' : 'inherit',
                                }}
                            >
                                <Stack>
                                    <span style={{ fontWeight: index + 1 <= 3 ? 'bold' : 'normal' }}>
                                        {index + 1}) {email} : {score} points
                                    </span>
                                </Stack>
                            </Card>
                        ))}
                    </Stack>
                </>
            ) : (
                <Text size="lg">No participants found.</Text>
            )}
        </div>
    );
}
