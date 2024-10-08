import { useState } from "react";
import {
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import { FaExclamation } from "react-icons/fa";

const CountryRoomPopover = () => {
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        <IconButton className="bg-amber-200 ml-2 hover:bg-amber-500 text-indigo-500 rounded-full ">
          <FaExclamation />
        </IconButton>
      </PopoverHandler>
      <PopoverContent {...triggers} className="z-50 max-w-[18rem]">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          Important
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="font-normal text-blue-gray-500"
        >
          Due to Geonames API availability issues, country rooms gameplay can be
          unreliable during evening EEST hours. If you encounter issues, please
          play The Entire World map instead and try country maps later.
        </Typography>
      </PopoverContent>
    </Popover>
  );
};

export default CountryRoomPopover;
