import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import NavLink from "./NavLink";

const NavList = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-amber-300">
      <NavLink path="/about" title="About" />
      {user ? (
        <>
          <NavLink onClick={handleLogout} title="Log Out" />
          <NavLink path={`/users/${user.id}`} title="Profile" />
        </>
      ) : (
        <>
          <NavLink path="/login" title="Log In" />
          <NavLink path="/register" title="Sign Up" />
        </>
      )}
    </ul>
  );
};

export default NavList;
