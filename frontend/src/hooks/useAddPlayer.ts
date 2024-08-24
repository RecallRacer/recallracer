import { apiEndpoints } from "@/config/api";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useAddPlayer = () => {
    const [loading, setLoading] = useState(false);

    const addPlayer = async (material_id: string, email: string) => {
        setLoading(true);

        const response = await fetch(`${apiEndpoints.addPlayer}/${material_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const responsePayload = await response.json();

        if (!response.ok) {
            setLoading(false);
            notifications.show({
                "title": responsePayload.message,
                "message": "Please try again!",
                "color": "red",
            })
        } else {
            setLoading(false);
            notifications.show({
                "title": `Successfully added ${email} into the race!`,
                "message": "You can start learning now!",
                "color": "green",
            })
        }

        return responsePayload;
    }

    return { addPlayer, loading }
}