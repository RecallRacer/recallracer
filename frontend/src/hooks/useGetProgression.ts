import { useState } from 'react';
import { apiEndpoints } from '@/config/api';
import { notifications } from '@mantine/notifications';

export const useGetProgression = () => {
    const [loading, setLoading] = useState(false);
    const [progression, setProgression] = useState<any | null>(null);

    const getProgression = async (material_id: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${apiEndpoints.progressions}/${material_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responsePayload = await response.json();

            if (!response.ok) {
                notifications.show({
                    title: 'Error',
                    message: responsePayload.message || 'Failed to fetch progression.',
                    color: 'red',
                });
                return;
            }

            setProgression(responsePayload.data);
            return responsePayload.data;

        } catch (error) {
            notifications.show({
                title: 'Network Error',
                message: 'Please check your connection and try again.',
                color: 'red',
            });
            console.error('Network error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { getProgression, progression, loading };
};
