import { apiEndpoints } from "@/config/api";

export const useGetPlayers = () => {
    const getPlayers = async (material_id: string) => {

        const response = await fetch(`${apiEndpoints.getPlayers}/${material_id}/participants`)
        const responsePayload = await response.json()

        return responsePayload.data
    }

    return { getPlayers }
}