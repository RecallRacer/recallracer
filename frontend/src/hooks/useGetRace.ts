import { apiEndpoints } from "@/config/api";

export const useGetRace = () => {
    const getRace = async (material_id: string) => {

        const response = await fetch(`${apiEndpoints.getRace}/${material_id}`)
        const responsePayload = await response.json()

        return responsePayload.data
    }

    return { getRace }
}