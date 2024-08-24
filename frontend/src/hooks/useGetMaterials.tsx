import { apiEndpoints } from "@/config/api";
import { useState } from "react"

export const useGetMaterials = () => {
    const [loading, setLoading] = useState(false);

    const getMaterials = async (id: string) => {
        setLoading(true)

        const response = await fetch(`${apiEndpoints.getMaterial}/${id}`)
        const responsePayload = await response.json()

        setLoading(false)

        return responsePayload.data
    }

    return { getMaterials, loading }
}