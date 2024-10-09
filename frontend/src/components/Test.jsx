import PlayerOverlay from "./Player/PlayerOverlay";
import avatar from "../../test/vavatar.jpg";
import avatar2 from "../../test/avatar2.jpg";
import { Button } from "@material-tailwind/react";
import LoadingScreen from "./LoadingScreen";
import useNotification from "../hooks/useNotification";

const players = [
  { id: 1, name: "Kariz", avatar: avatar },
  { id: 2, name: "Sheldon", avatar: avatar2 },
];

const Test = () => {
  const { displayNotification } = useNotification();

  const showError = () => {
    displayNotification("error", "Showing error");
  };

  const showInfo = () => {
    displayNotification("info", "Showing info");
  };

  const showSuccess = () => {
    displayNotification("success", "Showing success");
  };

  return (
    <div className="bg-indigo-300 h-screen">
      <Button onClick={showError}>Error button</Button>
      <Button onClick={showInfo}>Info button</Button>
      <Button onClick={showSuccess}>Success button</Button>
      <LoadingScreen />
    </div>
  );
};

export default Test;
