import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext";
import { doSignOut } from "../../firebase/auth";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  return (
    <>
      {userLoggedIn ? (
        <nav className="">
                  <div className='text-2xl font-bold pt-14'>Hello {currentUser?.displayName ? currentUser.displayName : currentUser?.email}, you are now logged in.</div>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-sm text-blue-600 underline"
          >
            Logout
          </button>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};
export default Header;