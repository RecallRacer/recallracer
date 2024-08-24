import { apiEndpoints } from "@/config/api";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useInitLeaderboard = () => {
    const [loading, setLoading] = useState(false);

    const initLeaderboard = async (material_id: string) => {
        setLoading(true);

        try {
            const response = await fetch(apiEndpoints.initLeaderboard, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ material_id }),
            });

            const responsePayload = await response.json();

            if (!response.ok) {
                // Log the error details for debugging
                console.error('Error initializing leaderboard:', responsePayload);
                notifications.show({
                    title: 'Error',
                    message: responsePayload.message || 'Failed to initialize leaderboard.',
                    color: 'red',
                });
            } else {
                notifications.show({
                    title: 'Success',
                    message: 'Leaderboard has been successfully initialized!',
                    color: 'green',
                });
            }

            return responsePayload;
        } catch (error) {
            // Log the network error for debugging
            console.error("Network error:", error);
            notifications.show({
                title: 'Network Error',
                message: 'Please check your connection and try again.',
                color: 'red',
            });
        } finally {
            setLoading(false);
        }
    };

    return { initLeaderboard, loading };
};
