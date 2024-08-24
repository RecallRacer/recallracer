import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import classes from './Navbar.module.scss';

export function Navbar() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    return (
        <div className={classes.navbar}>
            <Text 
                className={classes.logo}
                onClick={() => navigate("/")} // Navigate to the home page on click
            >
                RecallRacer
            </Text>
        </div>
    );
}