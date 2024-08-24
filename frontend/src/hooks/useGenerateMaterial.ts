import { apiEndpoints } from "@/config/api";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export const useGenerateMaterials = () => {
    const [loading, setLoading] = useState(false);
    const [materials, setMaterials] = useState<any>(null);

    const generateMaterials = async (text: string) => {
        setLoading(true);

        const response = await fetch(apiEndpoints.generateMaterial, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
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
            setMaterials(responsePayload)
            notifications.show({
                "title": "Successfully generated learning materials!",
                "message": "You can start learning now!",
                "color": "green",
            })
        }
    }

    return { generateMaterials, materials, loading }
}