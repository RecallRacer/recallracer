import { apiEndpoints } from "@/config/api";

export const useIncrementProgression = () => {
    const incrementProgression = async (material_id: string, email: string, increment_value = 1) => {
        try {
            const response = await fetch(`${apiEndpoints.initLeaderboard}/${material_id}/progressions/increment`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, increment_value }),
            });

            // Check if the response is OK before trying to parse it
            if (!response.ok) {
                console.error(`Failed to increment progression. Status: ${response.status}`);
                return null; // or throw an error
            }

            // Attempt to parse the response
            const responsePayload = await response.json();
            return responsePayload;
        } catch (error) {
            console.error("Network error or invalid JSON response:", error);
            return null; // or rethrow the error
        }
    }

    return { incrementProgression }
}
