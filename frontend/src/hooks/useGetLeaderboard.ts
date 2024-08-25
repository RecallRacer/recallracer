import { useState } from 'react';
import { apiEndpoints } from '@/config/api';
import { notifications } from '@mantine/notifications';

export const useGetLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [loading, setLoading] = useState(false)

    const getLeaderboard = async (material_id: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${apiEndpoints.getLeaderboard}/${material_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responsePayload = await response.json();

            if (!response.ok) {
                notifications.show({
                    title: 'Error',
                    message: responsePayload.message || 'Failed to retrieve leaderboard.',
                    color: 'red',
                });
            } else {
                setLeaderboard(responsePayload.data);
            }

            return responsePayload;
        } catch (error) {
            notifications.show({
                title: 'Network Error',
                message: 'Please check your connection and try again.',
                color: 'red',
            });
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { getLeaderboard, leaderboard, loading };
};
