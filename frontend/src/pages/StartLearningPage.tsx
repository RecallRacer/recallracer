import { Center, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

export function StartLearningPage() {
    const { id } = useParams();
    return (
        <Center>
            <Title>Test {id}</Title>
        </Center>
    )
}