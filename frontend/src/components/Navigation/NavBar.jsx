import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavList from "./NavList";
import { Link, useLocation } from "react-router-dom";

const pathsNotToRender = ["/rooms", "/lobby"];

const NavBar = ({ user, handleLogout }) => {
  const [openNav, setOpenNav] = useState(false);
  console.log("user in navbar", user);

  const location = useLocation();

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  for (let i = 0; i < pathsNotToRender.length; i++) {
    if (location.pathname.startsWith(pathsNotToRender[i])) return null;
  }

  return (
    <Navbar
      style={{ transform: "translate(-50%, 0%)" }}
      className="fixed top-0 left-[50%] max-w-screen-xl px-6 py-3 bg-opacity-55"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography variant="h5" className="mr-4 cursor-pointer py-1.5">
          <Link to="/">Place Guesser</Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList user={user} handleLogout={handleLogout} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList user={user} handleLogout={handleLogout} />
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
