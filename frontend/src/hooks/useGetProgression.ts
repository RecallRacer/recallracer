import { useState, useEffect } from 'react';
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
                    message: responsePayload.message || 'Failed to retrieve progression.',
                    color: 'red',
                });
            } else {
                setProgression(responsePayload.data);
                notifications.show({
                    title: 'Success',
                    message: 'Progression retrieved successfully!',
                    color: 'green',
                });
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

    useEffect(() => {
        // Optional: Can be used to automatically fetch progression on component mount if material_id is known
    }, []);

    return { getProgression, progression, loading };
};
