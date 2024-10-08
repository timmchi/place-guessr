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

const pathsNotToRender = ["/rooms", "/lobby", "/test"];

const NavBar = ({ handleLogout }) => {
  const [openNav, setOpenNav] = useState(false);

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
    <div className="max-h-[768px] w-screen">
      <Navbar className="fixed top-0 z-10 h-max max-w-full rounded-none py-2 lg:px-8 bg-indigo-400 border-none bg-opacity-100">
        <div className="flex items-center justify-between text-amber-300">
          <Typography
            variant="h5"
            className="mr-4 cursor-pointer py-1.5 text-3xl"
          >
            <Link to="/">Place Guesser</Link>
          </Typography>
          <div className="hidden lg:block">
            <NavList handleLogout={handleLogout} />
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
          <NavList handleLogout={handleLogout} />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
