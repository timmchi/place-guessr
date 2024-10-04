import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

const NavList = ({ handleLogout }) => {
  const user = useSelector((state) => state.user);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="paragraph"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link
          to="/about"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          About
        </Link>
      </Typography>
      {user ? (
        <>
          <Typography
            as="li"
            variant="paragraph"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              className="flex items-center hover:text-blue-500 transition-colors"
              onClick={handleLogout}
            >
              Log Out
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="paragraph"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              className="flex items-center hover:text-blue-500 transition-colors"
              to={`/users/${user.id}`}
            >
              Profile
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="paragraph"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              to="/login"
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              Log In
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="paragraph"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              to="/register"
              className="flex items-center hover:text-blue-500 transition-colors"
            >
              Sign Up
            </Link>
          </Typography>
        </>
      )}
    </ul>
  );
};

export default NavList;
