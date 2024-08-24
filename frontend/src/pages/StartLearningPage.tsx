import { useGetMaterials } from "@/hooks/useGetMaterials";
import { Center, Loader, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function StartLearningPage() {
    const { id } = useParams();
    const { getMaterials, loading } = useGetMaterials()
    const [materials, setMaterials] = useState<any>(null)

    useEffect(() => {
        const fetchMaterials = async () => {
            const responsePayload = await getMaterials(id as string)
            setMaterials(responsePayload)
        }

        fetchMaterials()
    }, [])

    console.log(materials)

    return (
        <Center>
            {loading ? <>
                <Title>Loading your learning materials...</Title>
                <Loader color="red" />
            </>
                :
                ""}
            <Title>Test {id}</Title>
        </Center>
    )
}