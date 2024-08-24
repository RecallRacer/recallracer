import { apiEndpoints } from "@/config/api";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useCreateRace = () => {
    const [loading, setLoading] = useState(false);

    const createRace = async (email: string, material_id: string) => {
        setLoading(true);

        const response = await fetch(apiEndpoints.createRace, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, material_id }),
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
                "title": "Successfully created a race!",
                "message": "You can now invite other players to race with!",
                "color": "green",
            })
        }

        return responsePayload;
    }

    return { createRace, loading }
}