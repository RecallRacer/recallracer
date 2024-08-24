import { useState } from 'react';
import { apiEndpoints } from '@/config/api';
import { notifications } from '@mantine/notifications';

export const useCreateProgression = () => {
    const [loading, setLoading] = useState(false);

    const createProgression = async (material_id: string, num_questions: number) => {
        setLoading(true);

        try {
            const response = await fetch(`${apiEndpoints.progressions}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ material_id, num_questions }),
            });

            const responsePayload = await response.json();

            return responsePayload;
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { createProgression, loading };
};
