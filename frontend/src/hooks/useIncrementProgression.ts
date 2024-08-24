import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { apiEndpoints } from '@/config/api';

export const useIncrementProgression = () => {
    const [loading, setLoading] = useState(false);

    const incrementProgression = async (material_id: string, email: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${apiEndpoints.progressions}/${material_id}/increment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const responsePayload = await response.json();

            if (!response.ok) {
                notifications.show({
                    title: 'Error',
                    message: responsePayload.message || 'Failed to increment progression.',
                    color: 'red',
                });
            } else {
                notifications.show({
                    title: 'Success',
                    message: `Progression for ${email} has been successfully incremented!`,
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
            console.error('Network error:', error);
        } finally {
            setLoading(false);
        }
    };

    return { incrementProgression, loading };
};
