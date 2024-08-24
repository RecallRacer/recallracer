import { apiEndpoints } from "@/config/api";
import { notifications } from "@mantine/notifications";

export const useToggleRace = () => {
    const toggleRace = async (material_id: string, is_active: boolean) => {
        const response = await fetch(`${apiEndpoints.toggleRace}/${material_id}/toggle`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_active }),
        });

        const responsePayload = await response.json();

        if (!response.ok) {
            notifications.show({
                "title": responsePayload.message,
                "message": "Please try again!",
                "color": "red",
            })
        } else {
            notifications.show({
                "title": `The race has been started!`,
                "message": "Go go go! Learn as fast as you possibly can!",
                "color": "green",
            })
        }

        return responsePayload;
    }

    return { toggleRace }
}