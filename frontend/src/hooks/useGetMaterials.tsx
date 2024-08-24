import { apiEndpoints } from "@/config/api";
import { useState } from "react"

export const useGetMaterials = () => {
    const [loading, setLoading] = useState(false);

    const getMaterials = async (id: string) => {
        setLoading(true)

        try {
            const response = await fetch(`${apiEndpoints.getMaterial}/${id}`)

            const responsePayload = await response.json()

            if (!response.ok) {

            }
        } catch (err: any) {

        } finally {

        }
    }
}