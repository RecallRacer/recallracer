import { apiEndpoints } from "@/config/api";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useInitLeaderboard = () => {
    const [loading, setLoading] = useState(false);

    const initLeaderboard = async (material_id: string) => {
        setLoading(true);

        const response = await fetch(apiEndpoints.initLeaderboard, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ material_id }),
        });

        const responsePayload = await response.json();

        if (!response.ok) {
            setLoading(false);
        } else {
            setLoading(false);
        }

        return responsePayload;
    };

    return { initLeaderboard, loading };
};
