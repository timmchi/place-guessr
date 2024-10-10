import { useSelector } from "react-redux";
import { Alert } from "@material-tailwind/react";
import useNotification from "../../hooks/useNotification";

const Notification = () => {
  const { clearNotification } = useNotification();
  const notification = useSelector((state) => state.notification);

  const closeNotification = () => {
    console.log("closing notification...");
    clearNotification();
  };

  return (
    <div className="fixed top-32 left-0 z-10 w-80">
      <Alert
        open={notification.open}
        onClose={closeNotification}
        color={notification.color}
        className="bg-opacity-65 text-opacity-90"
      >
        {notification.message}
      </Alert>
    </div>
  );
};

export default Notification;
