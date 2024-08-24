import { apiEndpoints } from "@/config/api";

export const useIncrementScore = () => {
    const incrementScore = async (material_id: string, email: string, increment_value = 1) => {
        const response = await fetch(`${apiEndpoints.incrementScore}/${material_id}/increment`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, increment_value }),
        });

        if (!response.ok) {
            console.error("something went wrong")
        }

        const responsePayload = await response.json();

        return responsePayload;
    }

    return { incrementScore }
}
