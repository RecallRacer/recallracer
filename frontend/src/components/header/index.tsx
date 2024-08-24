import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import { doSignOut } from "../../firebase/auth";
import styles from "./Header.module.css";
import { MdLogout } from "react-icons/md";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <>
      {userLoggedIn ? (
        <nav className={styles.navbar}>
          <span
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className={styles.userInfo}
          >
            <MdLogout size={22} />&nbsp;Logout
          </span>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
