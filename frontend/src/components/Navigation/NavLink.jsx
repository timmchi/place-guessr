import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const NavLink = ({ path, title, onClick }) => {
  return (
    <Typography as="li" variant="h5" className="p-1 font-large">
      <Link
        to={path}
        onClick={onClick}
        className="flex items-center hover:text-amber-600 transition-colors"
      >
        {title}
      </Link>
    </Typography>
  );
};

export default NavLink;
