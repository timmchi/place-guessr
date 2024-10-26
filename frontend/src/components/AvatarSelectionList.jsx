import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import useNotification from "../hooks/useNotification";

const avatarNames = [
  "anime-cat",
  "berlin-bara",
  "cartoon-shibu",
  "cowboy-bara-1",
  "cowboy-bara-2",
  "evil-cat",
  "paris-cat",
  "pixel-shibu",
  "weird-cat",
];

const AWS_CONST =
  "https://placeguessr-avatar-bucket.s3.eu-north-1.amazonaws.com";

const AvatarSelectionList = ({ userId, changeAvatarMutation }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { displayNotification } = useNotification();

  const handleOpen = () => setOpen(!open);

  const handleAvatarSelection = () => {
    if (!selectedImage) {
      displayNotification("info", "Please select an avatar first.");
      return;
    }

    console.log("userid and selected avatar", userId, selectedImage);
    changeAvatarMutation.mutate({ id: userId, selectedImage });
    setSelectedImage(null);
    handleOpen();
  };

  return (
    <>
      <Button
        size="sm"
        className="mt-2 bg-deep-purple-300 hover:bg-deep-purple-400 w-full"
        onClick={handleOpen}
      >
        Change avatar
      </Button>
      <Dialog open={open} handler={handleOpen} className="bg-indigo-200">
        <DialogHeader className="text-white text-center">
          Avatar Selection
        </DialogHeader>
        <DialogBody className="h-[30rem] md:h-[42rem] overflow-y-scroll">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {avatarNames.map((name) => (
              <img
                key={name}
                src={`${AWS_CONST}/${name}`}
                alt={`${name} avatar`}
                className={`h-48 w-48 md:h-64 md:w-64 object-cover object-center hover:border-green-300 shadow-lg rounded-lg ${
                  selectedImage === name
                    ? "border-amber-400 border-8"
                    : "border-white border-4"
                }`}
                onClick={() => setSelectedImage(name)}
              />
            ))}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="white" onClick={handleOpen}>
            cancel
          </Button>
          <Button
            className="bg-deep-purple-300 hover:bg-deep-purple-400"
            onClick={handleAvatarSelection}
          >
            confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AvatarSelectionList;
